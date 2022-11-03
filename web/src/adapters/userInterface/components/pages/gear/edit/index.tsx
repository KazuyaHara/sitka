import React, { useEffect, useState } from 'react';

import { Box, Button, Typography } from '@mui/material';
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom';

import useGearUseCase from '../../../../../../application/useCases/gear';
import { Gear } from '../../../../../../domains/gear';
import { GearSubmit } from '../../../../../../interface/useCase/gear';
import gearRepository from '../../../../../repositories/gear';
import { useAlertStore } from '../../../../../stores/alert';
import Dialog from '../../../molecules/dialog/gear/delete';
import Form from '../../../organisms/form/gear';
import Loading from '../../loading';

export default function GearEdit() {
  const {
    destroy: deleteGear,
    list: listGears,
    update: updateGear,
  } = useGearUseCase(gearRepository());
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [gear, setGear] = useState<Gear | null>();
  const [gears, setGears] = useState<Gear[]>();
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (id) {
      listGears().then(setGears);
    } else {
      navigate('/gears');
    }
  }, []);

  useEffect(() => {
    if (gears) {
      const found = gears.find((item) => item.id === id);
      if (found) {
        setGear(found);
      } else {
        navigate('/gears');
      }
    }
  }, [gears]);

  const onDelete = async () => {
    if (!gear) return navigate('/gears');

    setLoading(true);
    return deleteGear(gear)
      .then(() => {
        useAlertStore.setState({ message: '機材を削除しました', open: true, severity: 'success' });
        navigate('/gears');
      })
      .catch(({ message }: Error) => {
        setLoading(false);
        useAlertStore.setState({ message, open: true, severity: 'error' });
      });
  };

  const onUpdate = async (data: GearSubmit) => {
    if (!id) return navigate('/gears');

    setLoading(true);
    return updateGear(id, data)
      .then(() => {
        useAlertStore.setState({ message: '機材を更新しました', open: true, severity: 'success' });
        navigate('/gears');
      })
      .catch(({ message }: Error) => {
        setLoading(false);
        useAlertStore.setState({ message, open: true, severity: 'error' });
      });
  };

  const toggleDialog = () => setOpenDialog(!openDialog);

  if (typeof gear === 'undefined' || typeof gears === 'undefined') return <Loading />;
  if (!gear) return <Navigate to="/gears" />;
  return (
    <>
      <Box mt={1.5}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h2">{gear.name}</Typography>
          <Button component={Link} size="small" to={`/gears/${gear.id}/media`} variant="outlined">
            {`この機材で取られた${gear.typeJP}を表示`}
          </Button>
        </Box>
        <Form data={gear} loading={loading} onSubmit={onUpdate} options={gears} sx={{ mt: 3 }} />
        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button color="error" onClick={toggleDialog} size="small">
            この機材を削除する
          </Button>
        </Box>
      </Box>
      <Dialog onClose={toggleDialog} onSubmit={onDelete} open={openDialog} />
    </>
  );
}
