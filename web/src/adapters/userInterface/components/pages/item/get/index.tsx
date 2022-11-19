import React, { useEffect, useState } from 'react';

import { saveAs } from 'file-saver';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import useItemUseCase from '../../../../../../application/useCases/item';
import useMediumUseCase from '../../../../../../application/useCases/medium';
import { ItemWithURL } from '../../../../../../domains/item';
import itemRepository from '../../../../../repositories/item';
import mediumRepository from '../../../../../repositories/medium';
import { useAlertStore } from '../../../../../stores/alert';
import Dialog from '../../../molecules/dialog/item/delete';
import Lightbox from '../../../organisms/lightbox';
import Loading from '../../loading';

export default function ItemGet() {
  const { get: getItem, softDelete: softDeleteItem } = useItemUseCase(
    itemRepository(),
    mediumRepository()
  );
  const { getBlob } = useMediumUseCase(mediumRepository());
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<ItemWithURL | null>();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (id) {
      getItem(id).then(setItem);
    } else {
      navigate('/media');
    }
  }, [id]);

  const backToList = () => navigate('/media');

  const onDelete = async () => {
    if (!id) return navigate('/media');

    setLoading(true);
    return softDeleteItem(id)
      .then(() => {
        useAlertStore.setState({
          message: 'メディアを削除しました',
          open: true,
          severity: 'success',
        });
        navigate('/media');
      })
      .catch(({ message }: Error) => {
        setLoading(false);
        useAlertStore.setState({ message, open: true, severity: 'error' });
      });
  };

  const onDownload = async () => {
    if (!item) return navigate('/media');

    setLoading(true);
    return getBlob(item.medium.path)
      .then((blob) => saveAs(blob, item.medium.name))
      .catch(({ message }: Error) => {
        setLoading(false);
        useAlertStore.setState({ message, open: true, severity: 'error' });
      })
      .finally(() => setLoading(false));
  };

  const toggleDialog = () => setOpenDialog(!openDialog);

  if (typeof item === 'undefined') return <Loading />;
  if (!item) return <Navigate to="/media" />;
  return (
    <>
      <Lightbox
        item={item}
        loading={loading}
        onClose={backToList}
        onDelete={toggleDialog}
        onDownload={onDownload}
      />
      <Dialog onClose={toggleDialog} onSubmit={onDelete} open={openDialog} />
    </>
  );
}
