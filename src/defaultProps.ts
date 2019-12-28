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

const functionPaginate: FunctionPaginateType = ({ maxPages, morePage, currPage, totalPages }) => {
  const countOfResult: number = maxPages < totalPages ? maxPages : totalPages;
  const delta: number =
    countOfResult >= totalPages || currPage <= 4 ? 1 : totalPages - currPage < 4 ? totalPages - 6 : currPage - 3;

  const result: Array<PaginateElementType> = Array(Math.ceil(countOfResult))
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

export let defaultProps: PaginateContextType = {
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
  useNextPrev: proxyObject(defaultUseNextPrev),
  useLastFirst: proxyObject(defaultUseLastFirst),
  PaginateComponent: PaginateElement,
  onClick: (p: number) => (next: number) => (offset = (next - 1) * limit),
};

export const paginateConfig = (props: PaginationPropsType) => {
  const { useNextPrev, useLastFirst, ...customProps } = props;
  if (useLastFirst !== undefined) {
    if (typeof useLastFirst === 'boolean') {
      defaultProps.useLastFirst = useLastFirst ? defaultUseLastFirst : null;
    } else {
      defaultProps.useLastFirst = {
        ...defaultUseLastFirst,
        ...useLastFirst,
      };
    }
  }

  if (useNextPrev) {
    if (typeof useNextPrev === 'boolean') {
      defaultProps.useNextPrev = useNextPrev ? defaultUseNextPrev : null;
    } else {
      defaultProps.useNextPrev = {
        ...defaultUseNextPrev,
        ...useNextPrev,
      };
    }
  }

  defaultProps = { ...defaultProps, ...customProps };
};
