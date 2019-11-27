import React, { Component } from 'react';
import { PaginateType, PaginateElementType } from '../type';
import { PaginateContext } from '../PaginateContext';
import { PaginateContainer } from '../PaginateContainer';
import { defaultProps } from '../defaultProps';

export class Paginate extends Component<PaginateType> {
  static configure = () => {};

  render() {
    const props = { ...defaultProps, ...this.props };
    const { limit, offset, total, functionPaginate, maxPages, morePage } = props;
    const elements: Array<PaginateElementType> = functionPaginate({ limit, offset, total, maxPages, morePage });
    return (
      <PaginateContext.Provider value={props}>
        <PaginateContainer elements={elements} />
      </PaginateContext.Provider>
    );
  }
}
