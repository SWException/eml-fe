import React, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from 'styles/Detail.module.css';
import { ProductService } from 'services/productService';
import { ProductQuantity } from 'components/products';
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import { Product } from '../types/product'
import { Button, Carousel, CarouselItem,CarouselControl,CarouselIndicators,CarouselCaption} from 'reactstrap';
import { GetServerSideProps } from 'next';
import { CartService } from 'services';

interface Props {
    product: Product;
}


const Detail: React.FC<Props> = ({product}) => {

    const router = useRouter();

    const [images, setImages] = useState<string[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [_quantity, setQuantity] = useState(0);
    const [info, setInfo] = useState({
        error: '',
        messageShow: ''
    })

    useEffect(()=>{
        addImagesToCarousel();
        setQuantity(1);
    }, [])

    const { name, description, primaryPhoto, secondaryPhotos, price, id } = product;
    const { error, messageShow } = info;

    const items = [
        {
        src: 'https://images-na.ssl-images-amazon.com/images/I/61GqztpFduL._AC_UX679_.jpg',
        }
    ];
    
    const addImagesToCarousel = () => {
        const arrayImg = [];
        arrayImg.push(primaryPhoto);
        arrayImg.push(secondaryPhotos);
        setImages(arrayImg);
    }


    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const modifyQuantity = async(name:string) => {
        if(name == 'plus'){
            setQuantity(_quantity+1);
        } else {
            setQuantity(_quantity-1);
        }
    }

    const slides = images.map((image, i) => {
        return (
        <CarouselItem
            key={i}
            onExiting={() => setAnimating(true)}
            onExited={() => setAnimating(false)}
            height="400" width="400"
        >
            <img src={image} height="400" width="400" alt={'Product Image'} />
        </CarouselItem>
        );
    });

    const addCart = async() =>{
        try {
            const { status, message } = await CartService.addCart(_quantity, id);
            if(status == "success"){
                setInfo({
                    ...info,
                    messageShow: "Product Added to Cart"
                })
            }
        } catch(err) {
            setInfo({
                ...info,
                error: "Error on loading cart! Try later..."
            })
        }
    }

    const displayErr = () =>{
        return (error ? <div className="alert alert-danger">{error}</div> : '');
    }

    const displayInfo = () =>{
        return (messageShow ? <div className="alert alert-info">{messageShow}</div> : '');
    }

        
    return (
        <CustomerLayout header categories footer>
            <div className={styles.productContainer}>
                <Carousel className={styles.carousel} activeIndex={activeIndex} next={next} previous={previous}>
                            <CarouselIndicators items={items} activeIndex={activeIndex}  color="dark" onClickHandler={goToIndex} />
                            {slides}
                            <CarouselControl style={{borderColor:"black"}}direction="prev" directionText="Previous" onClickHandler={previous} />
                            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                </Carousel>
                <div className={styles.productInfo}>
                        <div className={styles.productName}>{name}</div>
                        <div className={styles.productPrice}>Price: € {price}</div>
                        <div className={styles.productDesc}>{description}</div>
                        <div className={styles.productAction}>
                            <div>
                                <button className={styles.plus} onClick={()=>{modifyQuantity('minus')}} type="button" name="button">
                                    -
                                </button>
                                <input type="text" name="name" value={_quantity} className={styles.input}></input>
                                <button className={styles.minus} onClick={()=>{modifyQuantity('plus')}} type="button" name="button">
                                    +
                                </button>
                            </div>
                        </div>
                        <div className={styles.productAction}>
                            <Button color="primary" onClick={addCart} size="lg" marginTop="20px">Add to Cart</Button>
                        </div>
                </div>
                <div  style={{marginTop: "20px"}}>
                    {displayErr()}
                    {displayInfo()}
                </div>
            </div>
        </CustomerLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query.id as string;

    try {
        const { product } = await ProductService.fetchProduct(id);
        console.log(product)
        return {
            props: { product },
        };
    } catch (error) {
        return {
            props: {
                product: null,
                relatedProducts: [],
                error: 'Error in getting product',
            },
        };
    }
};

export default Detail;

