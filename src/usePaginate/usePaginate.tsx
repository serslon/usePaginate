import React, { useState } from 'react';
import { Paginate as ComponentPaginate } from '../Paginate';
import { UsePaginateIncomingType, PaginateOnClickType } from '../type';
import { defaultProps } from '../defaultProps';

export const usePaginate: UsePaginateIncomingType = ({
  limit = defaultProps.limit,
  offset = 0,
  useNextPrev,
  useLastFirst,
}) => {
  const [stateOffset, setOffset] = useState(offset);
  const onClick: PaginateOnClickType = next => setOffset((next - 1) * limit);
  return {
    Paginate: ({ total }) => (
      <ComponentPaginate {...{ useNextPrev, useLastFirst, offset: stateOffset, total, limit, onClick }} />
    ),
    offset: stateOffset,
  };
};
