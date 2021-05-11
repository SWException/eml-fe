import { Filters, Sort } from 'components/ui';
import { ProductList } from 'components/products';
import React, { useState, Dispatch, useEffect } from 'react';
import styles from 'styles/PLP.module.css';
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ProductService, CategoriesService } from 'services';
import { Products, SearchRules } from 'types';

interface Props {
    initialProducts: Products;
    categoryId: string;
}

const ProductsPage: React.FC<Props> = ({ initialProducts, categoryId }) => {

    const [searchRules]: [SearchRules, Dispatch<SearchRules>] = useState<SearchRules>({category: categoryId});
    const [products, setProducts]: [Products, Dispatch<Products>] = useState<Products>(initialProducts);

    useEffect(() => {
        setProducts(initialProducts);
        searchRules.category = categoryId;
    }, [initialProducts, categoryId])


    const setFilters = async (filters: SearchRules) => {
        searchRules.maxPrice = (filters.maxPrice)? filters.maxPrice : searchRules.maxPrice;
        searchRules.minPrice = (filters.minPrice && filters.minPrice >= 0)? filters.minPrice : searchRules.minPrice;
        searchRules.sorting = (filters.sorting)? filters.sorting : searchRules.sorting;
        console.log("NEW FILTERS", filters);
        console.log("NEW RULES", searchRules);
        await updateProducts();
    }

    const updateProducts = async () => {
        const productsUpdated = await ProductService.fetchProducts(searchRules);
        setProducts(productsUpdated);
        console.log(productsUpdated);
    }

    return (
        <CustomerLayout header categories footer>
            <div>
                <div className={styles.filter}>
                    <div> 
                        Price:<Filters setFilters={setFilters} /> 
                    </div>
                    <div className={styles.sortbox}> 
                        Price sorting:<Sort setFilters={setFilters} />
                    </div>
                </div>
                <div>
                    {products?.length > 0 ? (
                        <ProductList products={products} />
                    ) : (
                        <div style={{ textAlign: "center" }}>
                            No products found. Try searching for other keyword.
                        </div>
                    )}
                </div>
            </div>
        </CustomerLayout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const categories = await CategoriesService.fetchAllCategories();
    const paths =categories.map(category => ({params: {id: category.id}}));
    return { paths, fallback: 'blocking' };
}


export const getStaticProps: GetStaticProps = async ({params}) => {
    const id = params?.id as string;
    const initialProducts = await ProductService.fetchProducts({category: id}).catch(() => null);
    return {
        props: { initialProducts, categoryId: id? id : "" },
        revalidate: 30,
    };
};

export default ProductsPage;