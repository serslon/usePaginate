import React, { useContext } from 'react';
import { defaultProps } from '../defaultProps';
import { PaginateContextType } from '../type';

export const PaginateContext = React.createContext<PaginateContextType>(defaultProps);

PaginateContext.displayName = 'PaginateContext';
