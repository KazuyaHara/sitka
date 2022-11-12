import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { firestore, storage } from 'firebase-admin';
import { logger } from 'firebase-functions';

import { zonedTimeToUtc } from 'date-fns-tz';
import exifReader from 'exif-reader';
import mkdirp from 'mkdirp';
import sharp from 'sharp';

const { increment, serverTimestamp } = firestore.FieldValue;
const getZonedTime = (date?: any) => {
  if (!date) return new Date(0);
  return zonedTimeToUtc(date, 'Asia/Tokyo');
};

export default async function processUploadedImage(name: string) {
  // Download original file from bucket.
  const localFile = path.join(os.tmpdir(), name);
  await mkdirp(path.dirname(localFile));
  const bucket = storage().bucket();
  await bucket.file(name).download({ destination: localFile });

  // Read exif from original file
  const exif = await sharp(localFile)
    .metadata()
    .then((metadata) => metadata.exif && exifReader(metadata.exif));

  // Generate a thumbnail using sharp.
  const destinationFileName = 'thumbnail.jpg';
  const destination = path.normalize(path.join(path.dirname(name), destinationFileName));
  const localThumbnail = path.join(os.tmpdir(), destination);
  await sharp(localFile)
    .resize(1000)
    .toFormat('jpeg')
    .toFile(localThumbnail)
    .catch((error) => {
      logger.error('Error occurred while processing thumbnail');
      throw new Error(error);
    });

  // Upload the thumbnail.
  await bucket
    .upload(localThumbnail, { destination })
    .then(() => logger.info('Thumbnail uploaded.'))
    .catch((error) => {
      logger.error('Error occurred while uploading thumbnail');
      throw new Error(error);
    });

  // Once the image has been uploaded delete the local files to free up disk space.
  fs.unlinkSync(localFile);
  fs.unlinkSync(localThumbnail);

  // Register gear if needed
  const gearName = exif?.image?.Model;
  if (!gearName) return logger.log('No model name.');
  const gearsRef = firestore().collection('gears');
  const gear = await gearsRef
    .where('model', '==', gearName)
    .limit(1)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) return null;
      return querySnapshot.docs[0];
    });
  let gearId = gear?.id;
  if (gear) {
    await gear.ref
      .set({ items: increment(1), updatedAt: serverTimestamp() }, { merge: true })
      .then(() => logger.info('Gear items has been incremented.'))
      .catch((error) => {
        logger.error('Error occurred while updating gear');
        throw new Error(error);
      });
  } else {
    await gearsRef
      .add({
        items: increment(1),
        maker: exif.image?.Make || null,
        model: gearName,
        name: gearName,
        type: 'photo',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      .then((ref) => {
        logger.info('New gear has been added.');
        gearId = ref.id;
      })
      .catch((error) => {
        logger.error('Error occurred while creating gear');
        throw new Error(error);
      });
  }

  // Update item
  const mediaPath = path.dirname(name);
  const itemPath = mediaPath.replace('media/', 'items/');
  const itemRef = firestore().doc(itemPath);
  return itemRef
    .set(
      {
        date: getZonedTime(exif?.exif?.DateTimeOriginal),
        gearId,
        medium: {
          exif: {
            ...exif,
            exif: {
              ...exif?.exif,
              DateTimeDigitized: getZonedTime(exif?.exif?.DateTimeDigitized),
              DateTimeOriginal: getZonedTime(exif?.exif?.DateTimeOriginal),
            },
            image: {
              ...exif?.image,
              ModifyDate: getZonedTime(exif?.image?.ModifyDate),
            },
            thumbnail: {
              ...exif?.thumbnail,
              ModifyDate: getZonedTime(exif?.thumbnail?.ModifyDate),
            },
          },
          thumbnail: `${mediaPath}/${destinationFileName}`,
        },
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )
    .then(() => logger.info('Item information updated.'))
    .catch((error) => {
      logger.error('Error occurred while updating thumbnail path');
      throw new Error(error);
    });
}
