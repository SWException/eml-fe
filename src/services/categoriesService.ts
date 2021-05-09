import { Categories, EditCategory } from 'types';
import { AuthService } from 'services';

const fetchAllCategories = async (): Promise<Categories> => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const res = await fetch(`${process.env.AWS_ENDPOINT}/categories`, requestOptions)
        .catch(() => { throw new Error('Error on fetching all categories') });

    const categoriesReturned = await res.json();

    if (categoriesReturned.status == 'error')
        throw new Error(categoriesReturned.message);

    const categories: Categories = categoriesReturned.data;
    return categories;
};

const fetchCategoriesByName = async (name: string): Promise<Categories> => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const res = await fetch(`${process.env.AWS_ENDPOINT}/categories?search=${name}`, requestOptions)
        .catch(() => { throw new Error('Error on fetching all categories') });

    const categoriesReturned = await res.json();

    if (categoriesReturned.status == 'error')
        throw new Error(categoriesReturned.message);

    const categories: Categories = categoriesReturned.data;
    return categories;
};

const createCategories = async (name: string): Promise<boolean> => {
    const token = await AuthService.getTokenJwt();
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify({ name }),
    }

    const res = await fetch(`${process.env.AWS_ENDPOINT}/categories`, requestOptions)
        .catch(() => { throw new Error('Error on creating a category') });
    const response = await res.json();

    if (response.status == 'error')
        throw new Error(response.message);

    return true;
};


const modifyCategory = async (id: string, category: EditCategory): Promise<boolean> => {
    const token = await AuthService.getTokenJwt();
    const requestOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify(category),
    }

    const res = await fetch(`${process.env.AWS_ENDPOINT}/categories/${id}`, requestOptions)
        .catch(() => { throw new Error('Error on creating a category') });
    const response = await res.json();

    if (response.status == 'error')
        throw new Error(response.message);

    return true;
}

const deleteCategory = async (id: string): Promise<boolean> => {
    const token = await AuthService.getTokenJwt();
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    };


    const res = await fetch(`${process.env.AWS_ENDPOINT}/categories/${id}`, requestOptions)
        .catch(() => { throw new Error('Error on deleting new tax') });

    const response = await res.json();

    if (response.status == 'error')
        throw new Error(response.message);

    return true;
};

export const CategoriesService = {
    fetchAllCategories,
    fetchCategoriesByName,
    modifyCategory,
    deleteCategory,
    createCategories
};