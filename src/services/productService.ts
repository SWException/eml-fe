import { APIClass } from 'aws-amplify';
import { Product, ProductsData, ProductData } from '../types/product';
import { sessionService } from './sessionService';

type ProductPayload = { params: any };

interface Response {
  status: string;
  message: string;
}

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

const addProduct = async (product: Product): Promise<Response> => {
  const token = sessionService.getCookie('token')
  try {
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(product)
    };

    const res = await fetch(`${process.env.AWS_ENDPOINT}/products`, requestOptions);
    const products = await res.json();

    const productsData: Response = {
      status: products.status,
      message: products.message
    };

    return productsData;

  } catch (error) {
    throw new Error('Error on posting new Product');
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

export const modifyProduct = async (id: string, price:number): Promise<Response> => {
  const token = sessionService.getCookie('token')
  const modify = {
    id,
    price
  }
  try {
    const requestOptions = {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(modify)
    };
    const res = await fetch(`${process.env.AWS_ENDPOINT}/products/${id}`, requestOptions)
    const data = await res.json();

    const responseDelete: Response = {
      status: data.status,
      message: data.message
    };
    
    return responseDelete;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteProduct = async (id: string): Promise<Response> => {
  const token = sessionService.getCookie('token')
  try {
    const requestOptions = {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `${token}`
       }
    };
    const res = await fetch(`${process.env.AWS_ENDPOINT}/products/${id}`, requestOptions)
    const data = await res.json();

    const responseDelete: Response = {
      status: data.status,
      message: data.message
    };
    
    return responseDelete;
  } catch (error) {
    throw new Error(error);
  }
};


export const ProductService = {
  fetchProducts,
  fetchProduct,
  addProduct,
  modifyProduct,
  deleteProduct,
};
