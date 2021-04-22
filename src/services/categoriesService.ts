import { Categories, Category } from 'types';

interface CategoriesData {
    categories: Category[]
}

const fetchAllCategories = async (): Promise<CategoriesData> => {
  //Da implementare meglio richiesta token jwt
  try {
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
       }
    };
    const res = await fetch(`${process.env.AWS_ENDPOINT}/categories`, requestOptions)
    const categoriesReturned = await res.json();

    const categoriesData: CategoriesData = {
      categories: categoriesReturned.data
    };

    return categoriesData;
    
  } catch (error) {
    console.log(error);
  }
};

export const CategoriesService = {
  fetchAllCategories
};