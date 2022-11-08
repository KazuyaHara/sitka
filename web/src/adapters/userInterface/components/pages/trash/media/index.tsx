import React, { useEffect, useState } from 'react';

import { Paper, Typography } from '@mui/material';

import useItemUseCase from '../../../../../../application/useCases/item';
import { ItemWithURL } from '../../../../../../domains/item';
import itemRepository from '../../../../../repositories/item';
import mediumRepository from '../../../../../repositories/medium';
import { useAlertStore } from '../../../../../stores/alert';
import ItemList from '../../../organisms/list/item';
import Loading from '../../loading';
import Header from '../header';

export default function TrashList() {
  const { listDeleted: listDeletedMedia, restoreItems } = useItemUseCase(
    itemRepository(),
    mediumRepository()
  );
  const [items, setItems] = useState<ItemWithURL[]>();
  const [loading, setLoading] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);

  useEffect(() => {
    listDeletedMedia().then(setItems);
  }, []);

  const onSubmit = async () => {
    if (!items) return;

    setLoading(true);
    await restoreItems(selectedItemIds)
      .then(() => {
        useAlertStore.setState({
          message: '選択されたメディアを復元しました',
          open: true,
          severity: 'success',
        });
        setItems(items.filter((item) => !selectedItemIds.includes(item.id)));
        setSelectedItemIds([]);
      })
      .catch(({ message }: Error) =>
        useAlertStore.setState({ message, open: true, severity: 'error' })
      )
      .finally(() => setLoading(false));
  };

  const toggleItem = (item: ItemWithURL) => {
    const toggled = selectedItemIds.find((id) => id === item.id)
      ? selectedItemIds.filter((id) => id !== item.id)
      : selectedItemIds.concat(item.id);
    setSelectedItemIds(toggled);
  };

  if (typeof items === 'undefined') return <Loading />;
  return (
    <>
      <Header loading={loading} onSubmit={onSubmit} selectedItemIds={selectedItemIds} />
      <Paper sx={{ p: 2 }}>
        <Typography variant="h3">
          {items.length > 0 ? 'ゴミ箱に移動した項目は30日後に完全に削除されます' : 'ゴミ箱は空です'}
        </Typography>
      </Paper>
      <ItemList
        items={items}
        selectedItemIds={selectedItemIds}
        sx={{ mt: 2 }}
        onSelectItem={toggleItem}
      />
    </>
  );
}
