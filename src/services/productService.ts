import { APIClass } from 'aws-amplify';
import { Products, ProductsData, ProductData } from '../types/product';
//import { catchError } from 'utils/catchError';
//import apiClient from 'utils/apiClient';

type ProductPayload = { params: unknown };

//mockare fetchProducts

const fetchProducts = async (payload?: ProductPayload): Promise<ProductsData> => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json'
       }
    };

    const res = await fetch('https://95kq9eggu9.execute-api.eu-central-1.amazonaws.com/dev/products', requestOptions)
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

export const fetchProduct = async (id: string): Promise<ProductData> => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json'
       }
    };
    const res = await fetch(`${process.env.AWS_ENDPOINT}/products/${id}`, requestOptions)
    const data = await res.json();

    const productData: ProductData = {
      product: data.data
    };
    
    return productData;
  } catch (error) {
    throw new Error(error);
  }
};


export const ProductService = {
  fetchProducts,
  fetchProduct,
  /*
  addProduct,
  deleteProduct,*/
};
