import { Filters, Sort } from 'components/ui';
import { ProductList } from 'components/products';
import React, { useState, Dispatch, useEffect } from 'react';
import styles from 'styles/PLP.module.css';
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import { GetServerSideProps } from 'next';
import { ProductService } from 'services';
import { Products, SearchRules } from 'types';

interface Props {
    initialProducts: Products;
    search: string
}

const ProductsPage: React.FC<Props> = ({ initialProducts, search }) => {

    const [searchRules]: [SearchRules, Dispatch<SearchRules>] = useState<SearchRules>({search});
    const [products, setProducts]: [Products, Dispatch<Products>] = useState<Products>(initialProducts);

    useEffect(() => {
        setProducts(initialProducts);
        searchRules.search = search;
        updateProducts();
    }, [initialProducts, search])


    const setFilters = async (filters: SearchRules) => {
        searchRules.maxPrice = (filters.maxPrice)? filters.maxPrice : searchRules.maxPrice;
        searchRules.minPrice = (filters.minPrice)? filters.minPrice : searchRules.minPrice;
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
                <div className={styles.filter}> Price:<Filters setFilters={setFilters} /> </div>
                <div className={styles.filter}> Price sorting:<Sort setFilters={setFilters} /></div>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const search: string = context?.query?.search as string;
    try {
        return {
            props: { search },
        };
    }
    catch (error) {
        return {
            props: {
                search: null
            },
        };
    }
};

export default ProductsPage;