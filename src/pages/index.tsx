import {Layout, ProductList} from 'components';
import { useRouter } from 'next/router';
import Product from 'types';

const Index = () => {
    const router = useRouter()

    const prodotto : Product = {
        _id : "1234",
        name: "TEST",
        imageURL: "https://dress-shop.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdjlbfjouc%2Fimage%2Fupload%2Fv1581158056%2Fdqtdtglewxjvig4x7rlk.jpg&w=640&q=75",
        category: "CAT",
        description: "DESCR",
        price: 1234,
      };  
    
      let products = [prodotto, prodotto, prodotto, prodotto, prodotto, prodotto, prodotto, prodotto, prodotto, prodotto, prodotto, prodotto, prodotto, prodotto, prodotto, prodotto];
    return (
        <Layout>
            <div className="title-main">
              <h1>Emporio Lambda</h1>
            </div>
            <ProductList products={products}/>
        </Layout>
    );
};

export default Index;