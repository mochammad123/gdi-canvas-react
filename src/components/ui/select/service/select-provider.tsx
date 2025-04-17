import { ReactNode } from 'react';
import { ISelectContext, SelectContext } from './select-context';

interface ISelectProvider extends ISelectContext {
  children: ReactNode;
}

const SelectProvider = ({ children, ...contextValue }: ISelectProvider) => {
  return <SelectContext.Provider value={contextValue}>{children}</SelectContext.Provider>;
};

export default SelectProvider;
