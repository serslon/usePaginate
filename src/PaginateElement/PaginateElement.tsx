import React, { FC } from 'react';
import classnames from 'classnames';

import { PaginateElementType } from '../type';
import { PaginateContext } from '../PaginateContext';

export const PaginateElement: FC<PaginateElementType> = ({ title, page, isActive, isDisabled }) => (
  <PaginateContext.Consumer>
    {({ activeClass, elementClass, disableClass, onClick }) => (
      <div
        className={classnames(elementClass, isActive && activeClass, isDisabled && disableClass)}
        onClick={() => onClick && page && !isActive && !isDisabled && onClick(page)}>
        {title}
      </div>
    )}
  </PaginateContext.Consumer>
);
