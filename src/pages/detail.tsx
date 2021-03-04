import React, { useRouter } from 'next/router';
import { Container } from 'components/ui';
import styles from 'styles/Detail.module.css';
import { Product } from 'types';

interface Props {
    product: Product;
}

const Detail: React.FC<Props> = ({product}) => {
    product = {
        _id : "1234",
        name: "TEST",
        imageURL: "https://dress-shop.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdjlbfjouc%2Fimage%2Fupload%2Fv1581158056%2Fdqtdtglewxjvig4x7rlk.jpg&w=640&q=75",
        category: "CAT",
        description: "DESCR",
        price: 1234,
      };  

    const router = useRouter();
    return (
        <Container>
            <div className={styles.productContainer}>
                <div className={styles.main}>
                    <div className={styles.coverImg}>
                        <img className={styles.img} src={product.imageURL} alt={product.name}/>
                    </div>
                </div>
                <div className="row-flex">
                    <div className="description">
                        <p>Lorem Ipsum è un testo segnaposto utilizzato nel
                        settore della tipografia e della stampa. Lorem Ipsum
                        è considerato il testo segnaposto standard sin dal 
                        sedicesimo secolo, quando un anonimo tipografo prese
                        una cassetta di caratteri e li assemblò per preparare 
                        un testo campione. È sopravvissuto non solo a più di cinque
                        secoli, ma anche al passaggio alla videoimpaginazione, 
                        pervenendoci sostanzialmente inalterato. Fu reso popolare, 
                        negli anni ’60, con la diffusione dei fogli di caratteri 
                        trasferibili “Letraset”, che contenevano passaggi del 
                        Lorem Ipsum, e più recentemente da software di 
                        impaginazione come </p>
                        <a onClick={()=> router.push('/cart')} className="pointer btn btn-primary">Add to Cart</a>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Detail;