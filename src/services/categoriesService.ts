import { Categories, Category } from 'types';
import { sessionService } from './sessionService';

interface CategoriesData {
    categories: Category[]
}

interface Data {
    id: string;
    name: string;
}

interface CategoryData {
    status: string;
    data: Data
}

interface Response {
    status: string;
    message: string;
}


const fetchAllCategories = async (): Promise<Categories> => {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const res = await fetch(`${process.env.AWS_ENDPOINT}/categories`, requestOptions)
        const categoriesReturned = await res.json();

        const categories: Categories = categoriesReturned.data;

        return categories;

    } catch (error) {
        console.log(error);
    }
};

const createCategories = async (name: string): Promise<Response> => {
    console.log(JSON.stringify({ name }));
    const token = sessionService.getCookie('token');
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({ name }),
        };
        //console.log(requestOptions);
        const res = await fetch(`${process.env.AWS_ENDPOINT}/categories`, requestOptions)
        const categoriesReturned = await res.json();

        const categoriesData: Response = {
            status: categoriesReturned.status,
            message: categoriesReturned.message
        };

        return categoriesData;

    } catch (error) {
        console.log(error);
    }
};

const fetchCategory = async (id: string): Promise<CategoryData> => {
    //Da implementare meglio richiesta token jwt
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const res = await fetch(`${process.env.AWS_ENDPOINT}/categories/${id}`, requestOptions)
        const categoryReturned = await res.json();

        const categoryData: CategoryData = {
            status: categoryReturned.status,
            data: {
                name: categoryReturned.data.name,
                id: categoryReturned.data.id
            }
        };

        return categoryData;

    } catch (error) {
        throw new Error('Error on fetching a single Category')
    }
};

const fetchCategoriesByName = async (name: string): Promise<CategoriesData> => {
    try {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const res = await fetch(`${process.env.AWS_ENDPOINT}/categories?search=${name}`, requestOptions)
        const categoriesReturned = await res.json();

        const categoriesData: CategoriesData = {
            categories: categoriesReturned.data
        };

        return categoriesData;

    } catch (error) {
        throw new Error('Error on fetching a single Category')
    }
};

const updateCategory = async (category: Category): Promise<Response> => {
    const token = sessionService.getCookie('token')
    try {
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify(category),
        };
        const res = await fetch(`${process.env.AWS_ENDPOINT}/categories/${category.id}`, requestOptions)
        const response = await res.json();

        const responseData: Response = {
            status: response.status,
            message: response.message
        };

        return responseData;

    } catch (error) {
        throw new Error('Error on updating Category');
    }
};

const deleteCategory = async (id: string): Promise<Response> => {
    //Da implementare meglio richiesta token jwt
    const token = sessionService.getCookie('token')
    try {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        };
        const res = await fetch(`${process.env.AWS_ENDPOINT}/categories/${id}`, requestOptions)
        const categoryReturned = await res.json();

        const categoryData: Response = {
            status: categoryReturned.status,
            message: categoryReturned.message
        };

        return categoryData;

    } catch (error) {
        throw new Error('Error on fetching a single Category')
    }
};

export const CategoriesService = {
    fetchAllCategories,
    fetchCategory,
    fetchCategoriesByName,
    updateCategory,
    deleteCategory,
    createCategories
};