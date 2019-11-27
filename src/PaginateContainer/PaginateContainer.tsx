import React, { FC } from 'react';
import { PaginateElement } from '../PaginateElement';
import { PaginateContainerType } from 'type';
import { PaginateContext, usePaginateContext } from '../PaginateContext';

export const PaginateContainer: FC<PaginateContainerType> = ({ elements }) => {
  const { className } = usePaginateContext();
  return (
    <div className={className}>
      {elements.map((elm, idx) => (
        <PaginateElement key={idx} {...elm} />
      ))}
    </div>
  );
};
