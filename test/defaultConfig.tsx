import React from 'react';
// import { render, fireEvent, waitForElement } from '@testing-library/react';
import { paginateConfig, defaultProps } from '../src/defaultProps';
import { FunctionPaginateType } from '../src/type';

describe('Default Config', () => {
  test('default options', () => {
    const {
      total,
      limit,
      offset,
      // onClick,
      morePage,
      maxPages,
      className,
      activeClass,
      // useNextPrev,
      // useLastFirst,
      disableClass,
      elementClass,
    } = defaultProps;
    // expect(useLastFirst).toBe(false);
    // expect(useNextPrev).toBe(true);
    // expect(opnClick). ???
    expect(total).toBe(0);
    expect(limit).toBe(20);
    expect(offset).toBe(0);
    expect(morePage).toBe('...');
    expect(maxPages).toBe(7);
    expect(className).toBe('container');
    expect(activeClass).toBe('active');
    expect(disableClass).toBe('disabled');
    expect(elementClass).toBe('element');
  });

  test('Change default params', () => {
    const myFunctionPaginate: FunctionPaginateType = () => [];
    const MyPComponent = () => <div />;
    paginateConfig({
      limit: 40,
      maxPages: 9,
      morePage: '-',
      className: 'paginate',
      activeClass: 'active-paginate',
      elementClass: 'element-paginate',
      disableClass: 'disable-paginate',
      functionPaginate: myFunctionPaginate,
      PaginateComponent: MyPComponent,
    });
    const {
      limit,
      maxPages,
      morePage,
      className,
      activeClass,
      elementClass,
      disableClass,
      functionPaginate,
      PaginateComponent,
    } = defaultProps;
    expect(limit).toBe(40);
    expect(maxPages).toBe(9);
    expect(morePage).toBe('-');
    expect(className).toBe('paginate');
    expect(activeClass).toBe('active-paginate');
    expect(elementClass).toBe('element-paginate');
    expect(disableClass).toBe('disable-paginate');
    expect(functionPaginate).toBe(myFunctionPaginate);
    expect(PaginateComponent).toBe(MyPComponent);
  });

  test('Disable useNextPrev', async () => {
    await paginateConfig({ useNextPrev: false });
    const { useNextPrev } = defaultProps;
    console.log(useNextPrev);
    expect(useNextPrev).toBeNull();
  });

  // test('Disable useLastFirst', () => {
  //   paginateConfig({ useLastFirst: false });
  //   const { useLastFirst } = defaultProps;
  //   expect(useLastFirst).toBeUndefined();
  // });
});
