import { Filters, Sort } from 'components/ui';
import { ProductList } from 'components/products';
import React from 'react';
import styles from 'styles/PLP.module.css';
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import { GetServerSideProps } from 'next';
import { ProductService } from 'services';
import { Products } from 'types';

interface Props {
    products: Products;
}

const ProductsPage: React.FC<Props> = ({ products }) => {
    return (
        <CustomerLayout header categories footer>
            <div>
                <div className={styles.filter}>  Price:<Filters /> </div>
                <div className={styles.filter}>  Price sorting:<Sort /></div>
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
    const id = context?.query?.category as string;
    const products = (await ProductService.fetchProducts({params: {category: id}})).products;
    try {
        console.log(id);
        return {
            props: { products },
        };
    } catch (error) {
        return {
            props: {
                products: null
            },
        };
    }
};

export default ProductsPage;