import React from 'react';
import { render } from '@testing-library/react';
import { Paginate } from '../src';
import '@testing-library/jest-dom/extend-expect';

describe('Default component', () => {
  test('simple use', () => {
    const { getByTestId } = render(
      <Paginate
        total={120}
        offset={0}
        onClick={num => {
          console.log(num);
        }}
      />,
    );
    expect(true).toBe(true);
  });
});
