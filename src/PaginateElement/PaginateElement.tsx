import React, { FC } from 'react';
import classnames from 'classnames';

import { PaginateElementType } from '../type';
import { usePaginateContext } from '../PaginateContext';

export const PaginateElement: FC<PaginateElementType> = ({ title, page, isActive, isDisabled }) => {
  const { onClick } = usePaginateContext();
  const { activeClass, elementClass, disableClass } = usePaginateContext();
  return (
    <div
      className={classnames(elementClass, isActive && activeClass, isDisabled && disableClass)}
      onClick={() => onClick && page && !isActive && !isDisabled && onClick(page)}>
      {title}
    </div>
  );
};
