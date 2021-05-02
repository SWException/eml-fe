import { ProductsData, ProductData, InsertProduct, EditProduct } from '../types/product';
import { sessionService } from './sessionService';

type ProductPayload = { params: any };

interface Response {
    status: string;
    message: string;
}

const fetchProducts = async (payload?: ProductPayload): Promise<ProductsData> => {
    const token = sessionService.getCookie('token');
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}` // Necessario se si è venditore, altrimenti ritorna solo i prodotti visibili al cliente e non quelli nascosti
            }
        };

        const category = (payload?.params?.category) ? "&category=" + payload.params.category : "";
        const search = (payload?.params?.search) ? "&search=" + payload.params.search : "";
        const res = await fetch(`${process.env.AWS_ENDPOINT}/products?${category}${search}`, requestOptions);
        const products = await res.json();

        console.log(products.data);

        const productsData: ProductsData = {
            products: products.data,
            total: products.data.length,
        };

        return productsData;

    }
    catch (error) {
        throw new Error('Error on fetching Products' + error.message);
    }
};

const addProduct = async (product: InsertProduct): Promise<Response> => {
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

    }
    catch (error) {
        throw new Error('Error on posting new Product');
    }
};

export const fetchProduct = async (id: string): Promise<ProductData> => {
    const token = sessionService.getCookie('token');
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}` // Necessario se si è venditore, altrimenti ritorna il prodotto solo se è visibile al cliente, se è nascosto non lo ritorna
            }
        };
        const res = await fetch(`${process.env.AWS_ENDPOINT}/products/${id}`, requestOptions)
        const data = await res.json();

        if(data.status == "error"){
            throw new Error(data.message);
        }

        const productData: ProductData = {
            product: data.data
        };

        return productData;
    }
    catch (error) {
        throw new Error(error);
    }
};

export const modifyProduct = async (id: string, product: EditProduct): Promise<Response> => {
    const token = sessionService.getCookie('token');
    try {
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify(product),
        };
        const res = await fetch(`${process.env.AWS_ENDPOINT}/products/${id}`, requestOptions)
        const data = await res.json();

        const responseDelete: Response = {
            status: data.status,
            message: data.message
        };

        return responseDelete;
    }
    catch (error) {
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
    }
    catch (error) {
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
