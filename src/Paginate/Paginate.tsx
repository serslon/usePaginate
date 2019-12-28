import React, { Component } from 'react';
import { PaginateType, PaginateElementType } from '../type';
import { PaginateContext } from '../PaginateContext';
import { PaginateContainer } from '../PaginateContainer';
import { defaultProps } from '../defaultProps';

export class Paginate extends Component<PaginateType> {
  render() {
    const { useNextPrev = true, useLastFirst = true, ...compProps } = this.props;
    const props = { ...defaultProps, ...compProps };
    !useLastFirst && (props.useLastFirst = null);
    !useNextPrev && (props.useNextPrev = null);
    const { limit, offset, total, functionPaginate, maxPages, morePage } = props;
    const currPage: number = Math.ceil(offset / limit) + 1;
    const totalPages: number = Math.ceil(total / limit);
    const elements: Array<PaginateElementType> = functionPaginate({ maxPages, morePage, currPage, totalPages });
    return (
      <PaginateContext.Provider value={{ ...props, currPage, totalPages }}>
        <PaginateContainer elements={elements} />
      </PaginateContext.Provider>
    );
  }
}
