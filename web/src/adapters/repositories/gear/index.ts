import { Gear } from '../../../domains/gear';
import { IGearRepository } from '../../../interface/repository/gear';
import gearDriver from '../../infrastructure/gear';

export default function gearRepository(): IGearRepository {
  const create = async (data: Gear): Promise<void> => {
    await gearDriver().create(data);
  };

  const destroy = async (data: Gear): Promise<void> => {
    await gearDriver().destroy(data);
  };

  const list = async (): Promise<Gear[]> =>
    gearDriver()
      .list()
      .then((querySnapshot) =>
        querySnapshot.docs.map((doc): Gear => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt.toDate(),
            updatedAt: data.updatedAt.toDate(),
          };
        })
      );

  const update = async (data: Gear): Promise<void> => {
    await gearDriver().update(data);
  };

  return { create, destroy, list, update };
}
