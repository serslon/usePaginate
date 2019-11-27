import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, number } from '@storybook/addon-knobs';
import { Paginate } from '../src';

export default {
  title: 'Default component',
  decorators: [withKnobs],
};

export const defaultPagination = () => {
  return (
    <Paginate
      total={number('Total records', 180)}
      offset={number('Offet', 20)}
      onClick={p => action('click by page number')(p)}
    />
  );
};
