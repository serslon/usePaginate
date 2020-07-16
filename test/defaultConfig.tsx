import React from 'react';
// import { render, fireEvent, waitForElement } from '@testing-library/react';
import { paginateConfig, defaultProps } from '../src/defaultProps';
import { FunctionPaginateType } from '../src/type';
import { PaginateElement } from '../src/PaginateElement';

describe('Default Config', () => {
  test('default options', () => {
    const {
      total,
      limit,
      offset,
      onClick,
      morePage,
      maxPages,
      className,
      activeClass,
      useNextPrev,
      useLastFirst,
      disableClass,
      elementClass,
    } = defaultProps;
    expect(typeof useNextPrev).toBe('object');
    expect(useNextPrev?.nextTitle).toBe('>');
    expect(useNextPrev?.prevTitle).toBe('<');
    expect(useNextPrev?.NextComponent).toBe(PaginateElement);
    expect(useNextPrev?.PrevComponent).toBe(PaginateElement);
    expect(useLastFirst).toBeNull();
    expect(typeof onClick).toBe('function');
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
      useLastFirst: false,
      useNextPrev: false,
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
      useLastFirst,
      useNextPrev,
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
    expect(useNextPrev).toBeNull();
    expect(useLastFirst).toBeNull();
  });

  test('Check customs params as empty object', () => {
    paginateConfig({
      useLastFirst: {},
      useNextPrev: {},
    });
    let { useNextPrev, useLastFirst } = defaultProps;
    expect(typeof useNextPrev).toBe('object');
    expect(useNextPrev?.nextTitle).toBe('>');
    expect(useNextPrev?.prevTitle).toBe('<');
    expect(useNextPrev?.NextComponent).toBe(PaginateElement);
    expect(useNextPrev?.PrevComponent).toBe(PaginateElement);
    expect(typeof useLastFirst).toBe('object');
    expect(useLastFirst?.firstTitle).toBe('<<');
    expect(useLastFirst?.lastTitle).toBe('>>');
    expect(useLastFirst?.FirstComponent).toBe(PaginateElement);
    expect(useLastFirst?.LastComponent).toBe(PaginateElement);
  });

  test('Check customs params as boolean', () => {
    paginateConfig({
      useLastFirst: true,
      useNextPrev: true,
    });
    let { useNextPrev, useLastFirst } = defaultProps;
    expect(typeof useNextPrev).toBe('object');
    expect(useNextPrev?.nextTitle).toBe('>');
    expect(useNextPrev?.prevTitle).toBe('<');
    expect(useNextPrev?.NextComponent).toBe(PaginateElement);
    expect(useNextPrev?.PrevComponent).toBe(PaginateElement);
    expect(typeof useLastFirst).toBe('object');
    expect(useLastFirst?.firstTitle).toBe('<<');
    expect(useLastFirst?.lastTitle).toBe('>>');
    expect(useLastFirst?.FirstComponent).toBe(PaginateElement);
    expect(useLastFirst?.LastComponent).toBe(PaginateElement);
  });

  test('Check customs params as part pof params #1', () => {
    paginateConfig({
      useLastFirst: { lastTitle: '++', firstTitle: '++' },
      useNextPrev: { nextTitle: '+', prevTitle: '+' },
    });
    let { useNextPrev, useLastFirst } = defaultProps;
    expect(typeof useNextPrev).toBe('object');
    expect(useNextPrev?.nextTitle).toBe('+');
    expect(useNextPrev?.prevTitle).toBe('+');
    expect(useNextPrev?.NextComponent).toBe(PaginateElement);
    expect(useNextPrev?.PrevComponent).toBe(PaginateElement);
    expect(typeof useLastFirst).toBe('object');
    expect(useLastFirst?.firstTitle).toBe('++');
    expect(useLastFirst?.lastTitle).toBe('++');
    expect(useLastFirst?.FirstComponent).toBe(PaginateElement);
    expect(useLastFirst?.LastComponent).toBe(PaginateElement);
  });

  test('Check customs params as part of params #2', () => {
    const MyComponent = () => <div />;
    const MyComponent2 = () => <span />;
    paginateConfig({
      useLastFirst: { LastComponent: MyComponent, FirstComponent: MyComponent2 },
      useNextPrev: { PrevComponent: MyComponent, NextComponent: MyComponent2 },
    });
    let { useNextPrev, useLastFirst } = defaultProps;
    expect(typeof useNextPrev).toBe('object');
    expect(useNextPrev?.nextTitle).toBe('>');
    expect(useNextPrev?.prevTitle).toBe('<');
    expect(useNextPrev?.NextComponent).toBe(MyComponent2);
    expect(useNextPrev?.PrevComponent).toBe(MyComponent);
    expect(typeof useLastFirst).toBe('object');
    expect(useLastFirst?.firstTitle).toBe('<<');
    expect(useLastFirst?.lastTitle).toBe('>>');
    expect(useLastFirst?.FirstComponent).toBe(MyComponent2);
    expect(useLastFirst?.LastComponent).toBe(MyComponent);
  });
});
