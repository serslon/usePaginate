import { PaginateContextType, FunctionPaginateType, PaginateElementType } from "./type";
import { PaginateElement } from "./PaginateElement";
import styles from './styles.module.css';

const functionPaginate: FunctionPaginateType = ({ limit, offset, total, maxPages, morePage }) => {
  const currPage: number = Math.ceil(offset / limit) + 1;
  const totalPages: number = Math.ceil(total / limit);
  const countOfResult: number = maxPages < totalPages ? maxPages : totalPages;
  const delta: number = countOfResult >= totalPages || currPage <= 4 ? 1 :
    totalPages - currPage < 4 ? totalPages - 6 : currPage - 3;

  const result: Array<PaginateElementType> = Array(Math.ceil(countOfResult))
    .fill('')
    .map((_, idx) => {
      const title = countOfResult >= totalPages ? idx + delta :
        idx === 0 ? 1 :
          idx + 1 === maxPages ? totalPages :
            (delta > 1 && idx == 1) || (idx + 2 == maxPages && totalPages - 6 !== delta) ? morePage :
              idx + delta
      const isDisabled = title === morePage;
      const isActive = idx + delta === currPage;
      const page = title === morePage ? null : <number>title;
      return { title, page, isActive, isDisabled };
    });
  return result;
}

export const defaultProps: PaginateContextType = {
  total: 0,
  limit: 20,
  offset: 0,
  morePage: '...',
  maxPages: 7,
  className: styles.container,
  activeClass: styles.active,
  disableClass: styles.disabled,
  elementClass: styles.element,
  functionPaginate,
  PaginateComponent: PaginateElement,
  onClick: (p: number) => { console.log(p) },
}
