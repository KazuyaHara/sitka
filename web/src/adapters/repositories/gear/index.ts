import { Gear } from '../../../domains/gear';
import { IGearRepository } from '../../../interface/repository/gear';
import gearDriver from '../../infrastructure/gear';

export default function gearRepository(): IGearRepository {
  const create = async (data: Gear) => {
    await gearDriver().create(data);
  };

  const list = async () =>
    gearDriver()
      .list()
      .then((querySnapshot) =>
        querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return new Gear({ id: doc.id, maker: data.maker, name: data.name, type: data.type });
        })
      );

  const update = async (data: Gear) => {
    await gearDriver().update(data);
  };

  return { create, list, update };
}
