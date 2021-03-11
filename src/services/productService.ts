import { APIClass } from 'aws-amplify';
import { Products, ProductsData } from '../types/product';
//import { catchError } from 'utils/catchError';
//import apiClient from 'utils/apiClient';

type ProductPayload = { params: unknown };

//mockare fetchProducts

const fetchProducts = async (payload?: ProductPayload): Promise<ProductsData> => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: { 
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json'
       }
    };
    const res = await fetch('https://virtserver.swaggerhub.com/swexception4/OpenAPI/0.0.2/products', requestOptions)
    const products = await res.json();

    console.log(products.data);

    const productsData: ProductsData = {
      products: products.data,
      total: products.data.length,
    };

    return productsData;

  } catch (error) {
    throw new Error('Error on fetching Products');
  }
};

export const ProductService = {
  fetchProducts,
  /*
  fetchProduct,
  addProduct,
  deleteProduct,*/
};
/*
export const fetchProduct = async (id: string): Promise<ProductData> => {
  try {
    const url = `/products/${id}`;
    const { data } = await apiClient.get(url);

    const productData: ProductData = {
      product: data.data.product,
      relatedProducts: data.data.relatedProducts,
    };
    return productData;
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const addProduct = async (product: AddProduct): Promise<AddProductData> => {
  try {
    const url = '/products';
    const { data } = await apiClient.post(url, product);
    return {
      product: data.data.product,
    };
  } catch (error) {
    throw new Error(catchError(error));
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  const url = `/products/${id}`;
  try {
    return await apiClient.delete(url);
  } catch (error) {
    throw new Error(catchError(error));
  }
};
*/
