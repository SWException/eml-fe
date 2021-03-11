import React from 'react';
//import { AuthProvider } from './auth';
//import { CartProvider } from './cart';
import { ShopProvider } from './shop';
//import { ToastProvider } from './toast';
import { User } from '../types/user';

//ContextProvider

type InitialStateProps = {
  currentUser: User | null;
};

type ProviderProps = {
  contexts: any;
};

const ProviderComposer: React.FC<ProviderProps> = ({ contexts, children }) =>
  contexts.reduceRight(
    (
      kids: React.ReactNode,
      parent: React.DetailedReactHTMLElement<{ children: React.ReactNode }, HTMLElement>
    ) =>
      React.cloneElement(parent, {
        children: kids,
      }),
    children
  );

export const StoreProvider: React.FC<InitialStateProps> = ({ children, currentUser }) => {
  return (
    <ProviderComposer
      contexts={[
        <ShopProvider key="1" />,
      ]}
    >
      {children}
    </ProviderComposer>
  );
};

/*<ToastProvider key="1" />,
        <AuthProvider currentUser={currentUser} key="2" />,
        <CartProvider key="3" />, */