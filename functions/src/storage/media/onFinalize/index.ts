import * as path from 'path';

import { logger, region } from 'firebase-functions';

import processUploadedImage from './image';
import processUploadedVideo from './video';

export const processUploadedMedia = region('asia-northeast1')
  .storage.object()
  .onFinalize(async ({ contentType, name }) => {
    if (!contentType) return logger.log('File has no Content-Type.');
    if (!name) return logger.log('File has no file name.');
    const fileName = path.basename(name).split('.')[0];
    if (fileName === 'thumbnail') return logger.log('Already a Thumbnail.');

    if (contentType.startsWith('image/')) return processUploadedImage(name);
    if (contentType.startsWith('video/')) return processUploadedVideo(name);
    return logger.log('This content is not supported.');
  });
