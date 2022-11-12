import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { firestore, storage } from 'firebase-admin';
import { logger } from 'firebase-functions';

import { zonedTimeToUtc } from 'date-fns-tz';
import ffmpeg from 'fluent-ffmpeg';
import mkdirp from 'mkdirp';
import sharp from 'sharp';

const { serverTimestamp } = firestore.FieldValue;
const getZonedTime = (date?: any) => {
  if (!date) return new Date(0);
  return zonedTimeToUtc(date, 'Asia/Tokyo');
};

export default async function processUploadedVideo(name: string) {
  // Download original file from bucket.
  const localFile = path.join(os.tmpdir(), name);
  await mkdirp(path.dirname(localFile));
  const bucket = storage().bucket();
  await bucket.file(name).download({ destination: localFile });

  // Generate a thumbnail using ffmpeg.
  const thumbnailFileName = 'thumbnail.png';
  const thumbnail = path.normalize(path.join(path.dirname(name), thumbnailFileName));
  const tmpThumbnail = path.join(os.tmpdir(), thumbnail);
  await mkdirp(path.dirname(tmpThumbnail));
  await new Promise((resolve) => {
    ffmpeg(localFile)
      .on('end', () => resolve(undefined))
      .on('error', (error) => {
        logger.error('Error occurred while processing thumbnail');
        throw new Error(error);
      })
      .thumbnail({
        filename: path.basename(tmpThumbnail),
        folder: path.dirname(tmpThumbnail),
        timestamps: [1],
      });
  });

  // Resize the thumbnail using sharp.
  const destinationFileName = 'thumbnail.jpg';
  const destination = path.normalize(path.join(path.dirname(name), destinationFileName));
  const localThumbnail = path.join(os.tmpdir(), destination);
  await sharp(tmpThumbnail)
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

  // Update item
  const mediaPath = path.dirname(name);
  const itemPath = mediaPath.replace('media/', 'items/');
  const itemRef = firestore().doc(itemPath);
  return itemRef
    .set(
      {
        date: getZonedTime(),
        medium: { thumbnail: `${mediaPath}/${destinationFileName}` },
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
