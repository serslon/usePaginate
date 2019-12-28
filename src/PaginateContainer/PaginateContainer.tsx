import React, { FC } from 'react';
import { PaginateContainerType } from 'type';
import { usePaginateContext } from '../PaginateContext';

export const PaginateContainer: FC<PaginateContainerType> = ({ elements }) => {
  const { className, useNextPrev, PaginateComponent, currPage, totalPages, useLastFirst } = usePaginateContext();
  return (
    <div className={className}>
      {useLastFirst && (
        <useLastFirst.FirstComponent title={useLastFirst.firstTitle} isActive={currPage === 1} page={1} />
      )}
      {useNextPrev && (
        <useNextPrev.PrevComponent title={useNextPrev.prevTitle} isActive={currPage === 1} page={currPage - 1} />
      )}
      {elements.map((elm, idx) => (
        <PaginateComponent key={idx} {...elm} />
      ))}
      {useNextPrev && (
        <useNextPrev.NextComponent
          title={useNextPrev.nextTitle}
          isActive={currPage === totalPages}
          page={currPage + 1}
        />
      )}
      {useLastFirst && (
        <useLastFirst.LastComponent
          title={useLastFirst.lastTitle}
          isActive={currPage === totalPages}
          page={totalPages}
        />
      )}
    </div>
  );
};
