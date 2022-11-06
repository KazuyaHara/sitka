import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { firestore, storage } from 'firebase-admin';
import { logger, region } from 'firebase-functions';

import * as mkdirp from 'mkdirp';
import * as sharp from 'sharp';

export const processUploadedMedia = region('asia-northeast1')
  .storage.object()
  .onFinalize(async (object) => {
    const { contentType, name } = object;

    if (!contentType) return logger.log('File has no Content-Type.');
    if (!contentType.startsWith('image/')) return logger.log('This is not an image.');
    if (!name) return logger.log('File has no file name.');
    const fileName = path.basename(name).split('.')[0];
    if (fileName === 'thumbnail') return logger.log('Already a Thumbnail.');

    // Download original file from bucket.
    const localFile = path.join(os.tmpdir(), name);
    await mkdirp(path.dirname(localFile));
    const bucket = storage().bucket();
    await bucket.file(name).download({ destination: localFile });

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
    await bucket.upload(localThumbnail, { destination }).catch((error) => {
      logger.error('Error occurred while uploading thumbnail');
      throw new Error(error);
    });

    // Once the image has been uploaded delete the local files to free up disk space.
    fs.unlinkSync(localFile);
    fs.unlinkSync(localThumbnail);

    // Add thumbnail path to the item
    const mediaPath = path.dirname(name);
    const itemPath = mediaPath.replace('media/', 'items/');
    const itemRef = firestore().doc(itemPath);
    return itemRef
      .set(
        {
          medium: { thumbnail: `${mediaPath}/${destinationFileName}` },
          updatedAt: firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      )
      .catch((error) => {
        logger.error('Error occurred while updating thumbnail path');
        throw new Error(error);
      });
  });
