import React, { useEffect, useState } from 'react';

import { Paper, Typography } from '@mui/material';

import useItemUseCase from '../../../../../../application/useCases/item';
import { ItemWithURL } from '../../../../../../domains/item';
import itemRepository from '../../../../../repositories/item';
import mediumRepository from '../../../../../repositories/medium';
import ItemList from '../../../organisms/list/item';
import Loading from '../../loading';
import Header from '../header';

export default function TrashList() {
  const { listDeleted: listDeletedMedia } = useItemUseCase(itemRepository(), mediumRepository());
  const [items, setItems] = useState<ItemWithURL[]>();
  const [selectedItems, setSelectedItems] = useState<ItemWithURL[]>([]);

  useEffect(() => {
    listDeletedMedia().then(setItems);
  }, []);

  const toggleItem = (item: ItemWithURL) => {
    const toggled = selectedItems.find(({ id }) => id === item.id)
      ? selectedItems.filter(({ id }) => id !== item.id)
      : selectedItems.concat(item);
    setSelectedItems(toggled);
  };

  if (typeof items === 'undefined') return <Loading />;
  return (
    <>
      <Header selectedItems={selectedItems} />
      <Paper sx={{ p: 2 }}>
        <Typography variant="h3">ゴミ箱に移動した項目は30日後に完全に削除されます</Typography>
      </Paper>
      <ItemList
        items={items}
        selectedItems={selectedItems}
        sx={{ mt: 2 }}
        onSelectItem={toggleItem}
      />
    </>
  );
}
