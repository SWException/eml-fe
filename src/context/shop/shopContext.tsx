import React, { createContext, useReducer, useContext } from 'react';
import { shopReducer, LOAD_PRODUCTS } from 'context/shop';
import { ProductService } from 'services/productService';
import { Products } from 'types/product';

interface InitialStateType {
    products: Products;
    isLoading: boolean;
    hasLoadMore: boolean;
    currentPage: number;
    loadProducts(id?: string): void;
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
    const [state, dispatch] = useReducer(shopReducer, initialState);

    //Aggiungere funzione per aggiungere prodotti?

    async function loadProducts(category?: string) {
        const payload = {
            params: { page: state.currentPage, limit: 10, category: category },
        };

        const data = await ProductService.fetchProducts(payload);

        dispatch({ type: LOAD_PRODUCTS, payload: data });
    }

    return <ShopContext.Provider value={{ ...state, loadProducts }}>{children}</ShopContext.Provider>;
};

export const useShop = (): InitialStateType => useContext(ShopContext);