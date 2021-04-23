import { APIClass } from 'aws-amplify';
import { Products, ProductsData, ProductData } from '../types/product';
//import { catchError } from 'utils/catchError';
//import apiClient from 'utils/apiClient';

type ProductPayload = { params: any };

//mockare fetchProducts

const fetchProducts = async (payload?: ProductPayload): Promise<ProductsData> => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json'
       }
    };

    const category = (payload.params.category)? "category="+payload.params.category : null;
    const res = await fetch(`${process.env.AWS_ENDPOINT}/products?${category}`, requestOptions);
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
