import React, { useEffect, useState } from 'react';

import { CloudUpload } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import useItemUseCase from '../../../../../../application/useCases/item';
import itemRepository from '../../../../../repositories/item';
import mediumRepository from '../../../../../repositories/medium';
import { useItemStore } from '../../../../../stores/item';
import ItemSectionList from '../../../organisms/sectionList/item';

export default function ItemList() {
  const { items } = useItemStore();
  const { subscribe } = useItemUseCase(itemRepository(), mediumRepository());
  const [limit] = useState(100);

  useEffect(() => {
    const unsubscribe = subscribe(limit, (nextItems) =>
      useItemStore.setState({ items: nextItems })
    );
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Box display="flex" justifyContent="flex-end" mb={3}>
        <Button
          component={Link}
          disableElevation
          startIcon={<CloudUpload />}
          sx={{ borderRadius: 2 }}
          to="/media/add"
          variant="contained"
        >
          メディアをアップロードする
        </Button>
      </Box>
      <ItemSectionList items={items} sx={{ mt: 3 }} />
    </>
  );
}
