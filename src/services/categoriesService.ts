import { Categories } from 'types';

interface CategoriesData {
    categories: Categories
}

const fetchAllCategories = async (): Promise<CategoriesData> => {
  //Da implementare meglio richiesta token jwt
  try {
    const requestOptions = {
      method: 'GET',
      headers: { 
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json',
       }
    };
    const res = await fetch('https://virtserver.swaggerhub.com/swexception4/OpenAPI/0.4.0/categories', requestOptions)
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