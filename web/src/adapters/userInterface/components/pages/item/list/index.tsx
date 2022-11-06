import React, { useEffect, useState } from 'react';

import useItemUseCase from '../../../../../../application/useCases/item';
import { ItemWithURL } from '../../../../../../domains/item';
import itemRepository from '../../../../../repositories/item';
import mediumRepository from '../../../../../repositories/medium';
import ItemSectionList from '../../../organisms/sectionList/item';
import Loading from '../../loading';
import Header from '../header';

export default function ItemList() {
  const { subscribe } = useItemUseCase(itemRepository(), mediumRepository());
  const [items, setItems] = useState<ItemWithURL[]>();
  const [limit] = useState(100);

  useEffect(() => {
    const unsubscribe = subscribe(limit, setItems);
    return () => unsubscribe();
  }, []);

  if (typeof items === 'undefined') return <Loading />;
  return (
    <>
      <Header />
      <ItemSectionList items={items} sx={{ mt: 3 }} />
    </>
  );
}
