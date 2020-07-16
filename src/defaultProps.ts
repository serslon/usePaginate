import {
  UseNextPrevType,
  UseLastFirstType,
  PaginateContextType,
  PaginateElementType,
  PaginationPropsType,
  FunctionPaginateType,
} from './type';
import { PaginateElement } from './PaginateElement';
import styles from './styles.module.css';
import React from 'react';

const functionPaginate: FunctionPaginateType = ({ maxPages, morePage, currPage, totalPages }) => {
  const countOfResult: number = maxPages < totalPages ? maxPages : totalPages;
  const delta: number =
    countOfResult >= totalPages || currPage <= 4 ? 1 : totalPages - currPage < 4 ? totalPages - 6 : currPage - 3;

  const result: Array<PaginateElementType> = Array<string>(Math.ceil(countOfResult))
    .fill('')
    .map((_, idx) => {
      const title =
        countOfResult >= totalPages
          ? idx + delta
          : idx === 0
          ? 1
          : idx + 1 === maxPages
          ? totalPages
          : (delta > 1 && idx == 1) || (idx + 2 == maxPages && totalPages - 6 !== delta)
          ? morePage
          : idx + delta;
      const isDisabled = title === morePage;
      const isActive = idx + delta === currPage;
      const page = title === morePage ? null : <number>title;
      return { title, page, isActive, isDisabled };
    });
  return result;
};

const defaultUseLastFirst: UseLastFirstType = {
  lastTitle: '>>',
  firstTitle: '<<',
  LastComponent: PaginateElement,
  FirstComponent: PaginateElement,
};

const defaultUseNextPrev: UseNextPrevType = {
  nextTitle: '>',
  prevTitle: '<',
  NextComponent: PaginateElement,
  PrevComponent: PaginateElement,
};

const proxyObject = (obj: any) =>
  new Proxy(obj, {
    set(target, prop, val) {
      if (prop in target) {
        target[prop] = val;
      }
      return true;
    },
  });

let limit = 20;
let offset = 0;

let defaultProps: PaginateContextType = {
  total: 0,
  limit: limit,
  offset: offset,
  currPage: 0,
  totalPages: 0,
  morePage: '...',
  maxPages: 7,
  className: styles.container,
  activeClass: styles.active,
  disableClass: styles.disabled,
  elementClass: styles.element,
  functionPaginate,
  useNextPrev: defaultUseNextPrev,
  useLastFirst: null,
  PaginateComponent: PaginateElement,
  onClick: (next: number) => (offset = (next - 1) * limit),
};

type PropsColumn = keyof PaginateContextType;

defaultProps = new Proxy(defaultProps, {
  set(target, prop: PropsColumn, val) {
    if (['total', 'limit', 'offset', 'maxPages', 'currPage', 'totalPages'].some(t => t === prop)) {
      if (typeof val !== 'number') {
        console.warn(`The value ${val} for the props ${prop} is not a number`);
        return false;
      }
      //@ts-ignore
      target[prop] = val;
    } else if (['className', 'activeClass', 'elementClass', 'disableClass'].some(t => t === prop)) {
      if (typeof val !== 'string') {
        console.warn(`The value ${val} for the props ${prop} is not a string`);
        return false;
      }
      //@ts-ignore
      target[prop] = val;
    } else if (prop === 'morePage') {
      const type = typeof prop;
      if (type !== 'string' && !React.isValidElement(prop)) {
        console.warn(`The value ${val} for the props ${prop} is not a string or React element`);
        return false;
      }
      target.morePage = val;
    } else if (prop === 'PaginateComponent') {
      if (!React.isValidElement(val())) {
        console.warn(`The value ${val} for the props ${prop} is not a React element`);
        return false;
      }
      target.PaginateComponent = val;
    } else if (prop === 'functionPaginate') {
      if (typeof val !== 'function') {
        console.warn(`The value ${val} for the props ${prop} is not a function`);
        return false;
      }
      target.functionPaginate = val;
    } else if (prop === 'useNextPrev') {
      if (typeof val === 'boolean') {
        target.useNextPrev = val ? defaultUseNextPrev : null;
      } else {
        // TODO check deeply the val
        target.useNextPrev = { ...defaultUseNextPrev, ...val };
      }
    } else if (prop === 'useLastFirst') {
      if (typeof val === 'boolean') {
        target.useLastFirst = val ? defaultUseLastFirst : null;
      } else {
        // TODO check deeply the val
        target.useLastFirst = { ...defaultUseLastFirst, ...val };
      }
    }
    return true;
  },
});

export { defaultProps };

export const paginateConfig = (props: PaginationPropsType) => {
  for (let key in props) {
    if (key in defaultProps) {
      //@ts-ignore
      defaultProps[key] = props[key];
    }
  }
};
