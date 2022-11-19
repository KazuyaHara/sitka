import React from 'react';

import { Box, BoxProps, Grid, Typography } from '@mui/material';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import { ItemWithURL } from '../../../../../../domains/item';
import AspectRetioMedia from '../../../atoms/aspectRatioMedia';

type Props = Pick<BoxProps, 'sx'> & { items: ItemWithURL[] };

export default function ItemSectionList({ items, sx }: Props) {
  const months = items
    .map((item) => format(item.date, 'yyyy-MM'))
    .filter((elem, index, self) => self.indexOf(elem) === index);
  const sections = months.map((month) => {
    const list = items.filter((item) => format(item.date, 'yyyy-MM') === month);
    const title = format(list[0].date, 'yyyy年M月');
    return { list, title };
  });

  return (
    <Box sx={sx}>
      {sections.map((section) => (
        <Box key={section.title} mb={3}>
          <Typography gutterBottom variant="h3">
            {section.title}
          </Typography>
          <Grid container spacing={1}>
            {section.list.map((item) => (
              <Grid
                component={Link}
                item
                key={item.id}
                xs={4}
                sm={3}
                md={2}
                to={`/media/${item.id}`}
              >
                <AspectRetioMedia
                  borderRadius={1}
                  component="img"
                  duration={item.medium.metadata?.format?.duration}
                  extension={item.medium.extension}
                  src={item.url}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
