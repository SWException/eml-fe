import React, { createContext, useReducer, useContext } from 'react';
import { LOAD_PRODUCTS } from './shopTypes';
import { ProductService } from 'services/productService';
import { Product } from '../../types/product';
import reducer from './shopReducer';

interface InitialStateType {
  products: Product[];
  isLoading: boolean;
  hasLoadMore: boolean;
  currentPage: number;
  loadProducts(): void;
}

const initialState = {
  products: [],
  isLoading: true,
  hasLoadMore: true,
  currentPage: 1,
  loadProducts: () => null,
};

const ShopContext = createContext<InitialStateType>(initialState);

export const ShopProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function loadProducts() {
    const payload = {
      params: { page: state.currentPage, limit: 10 },
    };
    const data = await ProductService.fetchProducts(payload);
    console.log(data);
    dispatch({ type: LOAD_PRODUCTS, payload: data });
  }

  return <ShopContext.Provider value={{ ...state, loadProducts }}>{children}</ShopContext.Provider>;
};

export const useShop = (): InitialStateType => useContext(ShopContext);