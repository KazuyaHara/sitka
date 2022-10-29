import { Gear } from '../../../domains/gear';
import { IGearUseCase } from '../../../interface/useCase/gear';
import gearDriver from '../../infrastructure/gear';

export default function gearRepository(): IGearUseCase {
  const create = async (data: Gear) => {
    await gearDriver().create(data);
  };

  const get = async (id: string) =>
    gearDriver()
      .get(id)
      .then((doc) => {
        if (!doc.exists()) return null;
        const data = doc.data();
        return new Gear({ id: doc.id, maker: data.maker, name: data.name, type: data.type });
      });

  const list = async () =>
    gearDriver()
      .list()
      .then((querySnapshot) =>
        querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return new Gear({ id: doc.id, maker: data.maker, name: data.name, type: data.type });
        })
      );

  return { create, get, list };
}
