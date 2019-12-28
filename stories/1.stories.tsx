import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';
import { Paginate, paginateConfig } from '../src';

export default {
  title: 'Configure component',
  decorators: [withKnobs],
};

export const changeUseLastFirst = () => {
  paginateConfig({
    useLastFirst: boolean('Show Last/First links', false),
  });
  return <Paginate total={180} offset={number('Offset', 20)} onClick={p => action('click by page number')(p)} />;
};
