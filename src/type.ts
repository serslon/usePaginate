import { ElementType, ReactElement } from 'react';

export type PaginateType = {
  total: number;
  limit?: number;
  offset: number;
  className?: string;
  useNextPrev?: boolean;
  useLastFirst?: boolean;
  onClick: (p: number) => void;
};

export type UseLastFirstType = {
  lastTitle: string | ElementType;
  firstTitle: string | ElementType;
  LastComponent: ElementType;
  FirstComponent: ElementType;
};

export type UseNextPrevType = {
  nextTitle: string | ElementType;
  prevTitle: string | ElementType;
  NextComponent: ElementType;
  PrevComponent: ElementType;
};

export type PaginationPropsType = {
  limit?: number;
  maxPages?: number;
  morePage?: string | ElementType;
  className?: string;
  activeClass?: string;
  elementClass?: string;
  disableClass?: string;
  useNextPrev?: boolean | UseLastFirstType;
  useLastFirst?: boolean | UseNextPrevType;
  functionPaginate?: FunctionPaginateType;
  PaginateComponent?: ElementType;
};

export type PaginateOnClickType = (next: number) => void;

export type PaginateContextType = {
  total: number;
  limit: number;
  offset: number;
  maxPages: number;
  morePage: string | ElementType;
  currPage: number;
  className: string;
  totalPages: number;
  activeClass: string;
  elementClass: string;
  disableClass: string;
  useNextPrev: null | UseNextPrevType;
  useLastFirst: null | UseLastFirstType;
  functionPaginate: FunctionPaginateType;
  PaginateComponent: ElementType;
  onClick: PaginateOnClickType;
};

export type PaginateElementType = {
  title: string | number | ElementType;
  page: number | null;
  isActive?: boolean;
  isDisabled?: boolean;
};

export type PaginateContainerType = {
  elements: Array<PaginateElementType>;
};

export type NameTypePaginateType = 'small' | 'medium' | 'large';

export type FunctionParamsType = {
  maxPages: number;
  currPage: number;
  totalPages: number;
  morePage: string | ElementType;
};

export type FunctionPaginateType = (props: FunctionParamsType) => Array<PaginateElementType>;

export type UsePaginateIncomingType = (props: {
  limit?: number;
  offset?: number;
  useNextPrev?: boolean;
  useLastFirst?: boolean;
}) => {
  Paginate: (props: { total: number }) => ReactElement;
  offset: number;
};
