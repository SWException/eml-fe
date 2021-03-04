import { useRouter } from 'next/router';
import { Container } from 'components/ui';
import { ProductList } from 'components/products';
import React from 'react';
import styles from 'styles/PLP.module.css';
import { Product } from 'types';

const PLP: React.FC = () => {
    const router = useRouter()

    let products = [];
    for(var i = 0; i < 20; i++){
      var prodotto: Product = {
        _id : "ID" + i,
        name: "TEST",
        imageURL: "https://dress-shop.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdjlbfjouc%2Fimage%2Fupload%2Fv1582456742%2Flongsleeves-hershel_mampai.jpg&w=640&q=75",
        category: "CAT",
        description: "DESCR",
        price: 50 + i,
      };  
      products[i] = prodotto;
    }

    return (
        <>
            {/*<Meta title="Search" />*/}
            <Container>
                {/*<div className={styles.searchBarContainer}>
                <SearchBar onSubmit={handleSearchSubmit} style={{ width: '100%' }} isFocus />
                </div>
                <div className={styles.sortContainer}>
                <SearchCategory active={category} onChangeTab={handleTabChange} />
                <SearchFilter handleChange={handleFilterChange} active={sort} />
                </div>
                {isLoading ? (
                <ProductListSkeleton number={20} />
                ) : (*/
                <>
                    {products.length > 0 ? (
                    <ProductList products={products} />
                    ) : (
                    <div className={styles.message}>
                        No products found. Try searching for other keyword.
                    </div>
                    )}
                </>
                /*)*/}
                {/*<MobileBottomMenu />*/}
            </Container>
        </>
    );
};

export default PLP;