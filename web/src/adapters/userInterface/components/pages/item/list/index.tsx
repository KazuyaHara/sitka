import React, { useEffect, useState } from 'react';

import { CloudUpload } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import useItemUseCase from '../../../../../../application/useCases/item';
import { ItemWithURL } from '../../../../../../domains/item';
import itemRepository from '../../../../../repositories/item';
import mediumRepository from '../../../../../repositories/medium';
import ItemSectionList from '../../../organisms/sectionList/item';
import Loading from '../../loading';

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
