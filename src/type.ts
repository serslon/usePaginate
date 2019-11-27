import { ElementType } from "react";

export type PaginateType = {
  total: number;
  limit?: number;
  offset: number;
  className?: string;
  onClick: (p: number) => void;
}

export type PaginateContextType = {
  total: number;
  limit: number;
  offset: number;
  maxPages: number;
  morePage: string | ElementType;
  className: string;
  activeClass: string;
  elementClass: string;
  disableClass: string;
  functionPaginate: FunctionPaginateType;
  PaginateComponent: ElementType;
  onClick: (p: number) => void;
}

export type PaginateElementType = {
  title: string | number | ElementType;
  page: number | null;
  isActive?: boolean;
  isDisabled?: boolean;
}

export type PaginateContainerType = {
  elements: Array<PaginateElementType>;
}

export type NameTypePaginateType = 'small' | 'medium' | 'large'

export type FunctionParamsType = {
  total: number;
  limit: number;
  offset: number;
  maxPages: number;
  morePage: string | ElementType;
}

export type FunctionPaginateType = (props: FunctionParamsType) => Array<PaginateElementType>;
