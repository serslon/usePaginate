import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import { Paginate, usePaginate } from '../src';

export default {
  title: 'Default component',
  decorators: [withKnobs],
};

export const defaultPagination = () => {
  return (
    <Paginate
      total={number('Total records', 180)}
      offset={number('Offset', 20)}
      useLastFirst={boolean('Show Last/First links', false)}
      useNextPrev={boolean('Show Next/Prev links', true)}
      onClick={p => action('click by page number')(p)}
    />
  );
};

export const paginationWithHook = () => {
  const { Paginate } = usePaginate({
    useLastFirst: boolean('Show Last/First links', false),
    useNextPrev: boolean('Show Next/Prev links', true),
    limit: 20,
  });
  return <Paginate total={number('Total records', 180)} />;
};
