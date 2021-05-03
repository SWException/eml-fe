import { InsertProduct, EditProduct, SearchRules, Products, Product } from 'types';
import { sessionService } from './sessionService';

const fetchProducts = async (params?: SearchRules): Promise<Products> => {
    const token = sessionService.getCookie('token');
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}` // Necessario se si è venditore, altrimenti ritorna solo i prodotti visibili al cliente e non quelli nascosti
        }
    };
    

    const minPrice = (params?.minPrice) ? "&minPrice=" + params.minPrice : "";
    const maxPrice = (params?.maxPrice) ? "&maxPrice=" + params.maxPrice : "";
    const category = (params?.category) ? "&category=" + params.category : "";
    const sorting = (params?.sorting) ? "&sorting=" + params.sorting : "";
    const search = (params?.search) ? "&search=" + params.search : "";

    //console.log(`${minPrice}${maxPrice}${category}${sorting}${search}`);
    const res = await fetch(`${process.env.AWS_ENDPOINT}/products?${minPrice}${maxPrice}${category}${sorting}${search}`, requestOptions)
        .catch(() => { throw new Error('Error on fetching all products') });

    const productsReturned = await res.json();
    console.log(productsReturned);
    if (productsReturned.status == 'error')
        throw new Error(productsReturned.message);

    const products: Products = productsReturned.data;
    return products;
};

const addProduct = async (product: InsertProduct): Promise<boolean> => {
    const token = sessionService.getCookie('token')
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify(product)
    };

    const res = await fetch(`${process.env.AWS_ENDPOINT}/products`, requestOptions);
    const response = await res.json();

    if (response.status == "error") {
        throw new Error(response.message);
    }

    return true;
};

export const fetchProduct = async (id: string): Promise<Product> => {
    const token = sessionService.getCookie('token');
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}` // Necessario se si è venditore, altrimenti ritorna il prodotto solo se è visibile al cliente, se è nascosto non lo ritorna
        }
    };
    const res = await fetch(`${process.env.AWS_ENDPOINT}/products/${id}`, requestOptions)
        .catch(() => { throw new Error('Error on fetching all products') });

    const productReturned = await res.json();

    if (productReturned.status == 'error')
        throw new Error(productReturned.message);

    const product: Product = productReturned.data;
    return product;
};

export const modifyProduct = async (id: string, product: EditProduct): Promise<boolean> => {
    const token = sessionService.getCookie('token');
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
        },
        body: JSON.stringify(product),
    };

    const res = await fetch(`${process.env.AWS_ENDPOINT}/products/${id}`, requestOptions)
        .catch(() => { throw new Error('Error on modify product') });

    const response = await res.json();

    if (response.status == 'error')
        throw new Error(response.message);

    return true;
};

export const deleteProduct = async (id: string): Promise<boolean> => {
    const token = sessionService.getCookie('token');

    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    }

    const res = await fetch(`${process.env.AWS_ENDPOINT}/products/${id}`, requestOptions)
        .catch(() => { throw new Error('Error on deleting product') });

    const response = await res.json();

    if (response.status == 'error')
        throw new Error(response.message);

    return true;
};

export const ProductService = {
    fetchProducts,
    fetchProduct,
    addProduct,
    modifyProduct,
    deleteProduct,
};
