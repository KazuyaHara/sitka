import { firestore, storage } from 'firebase-admin';
import { logger, region } from 'firebase-functions';

import { subDays } from 'date-fns';

export const batchDeleteItems = region('asia-northeast1')
  .region('asia-northeast1')
  .pubsub.schedule('0 0 * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    const deadlineDate = subDays(new Date(), 30);

    // delete firestore data
    const db = firestore();
    const batchArray = [] as Array<firestore.WriteBatch>;
    batchArray.push(db.batch());
    let operationCounter = 0;
    let batchIndex = 0;

    const deletableItems = await db
      .collection('items')
      .where('deletedAt', '!=', null)
      .where('deletedAt', '<', deadlineDate)
      .get()
      .catch((error) => {
        logger.error('Error occurred while listing deletable items');
        throw new Error(error);
      });
    if (deletableItems.empty) return logger.log('No items to be deleted');
    deletableItems.forEach(({ ref }) => {
      batchArray[batchIndex].delete(ref);
      operationCounter += 1;
      if (operationCounter >= 499) {
        batchArray.push(db.batch());
        batchIndex += 1;
        operationCounter = 0;
      }
    });
    await Promise.all(batchArray.map(async (batch) => batch.commit()))
      .then(() => logger.info('Items have been deleted'))
      .catch((error) => {
        logger.error('Error occurred while deleting items');
        throw new Error(error);
      });

    // delete storage files
    const bucket = storage().bucket();
    return Promise.all(
      deletableItems.docs.map((doc) => bucket.deleteFiles({ prefix: `media/${doc.id}` }))
    )
      .then(() => logger.info('Media have been deleted'))
      .catch((error) => {
        logger.error('Error occurred while deleting files');
        throw new Error(error);
      });
  });
