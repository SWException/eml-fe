import React from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from 'styles/Detail.module.css';
import { ProductService } from 'services/productService';
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import { Product } from 'types/product'
import { Button, Carousel, CarouselItem, CarouselControl, CarouselIndicators } from 'reactstrap';
import { GetStaticPaths, GetStaticProps } from 'next';
import { CartService, CategoriesService, sessionService } from 'services';
import { CartNotAuth } from 'types';

interface Props {
    product: Product;
}

const Detail: React.FC<Props> = (props) => {
    const [images, setImages] = useState<string[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [info, setInfo] = useState({
        error: '',
        messageShow: ''
    })

    useEffect(() => {
        addImagesToCarousel();
        product.stock > 0 ? setQuantity(1) :  setQuantity(0);
    }, [])

    const product = props.product;
    const { error, messageShow } = info;

    let items = [];

    const addImagesToCarousel = () => {
        const arrayImg = [];
        if(product.primaryPhoto)
            arrayImg.push(product.primaryPhoto);
        if(product.secondaryPhotos?.length > 0){
            product.secondaryPhotos.forEach((img) => {
                arrayImg.push(img);
            })
        }
        console.log("IMMAGINI", arrayImg);
        setImages(arrayImg);
        items = arrayImg.map((img) => {
            return {src: img};
        });
    }

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    const modifyQuantityByStep = async (increment: boolean): Promise<void> => {
        if (increment && quantity < product.stock) {
            setQuantity(quantity + 1);
        }
        else if (!increment && quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const modifyQuantity = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
        const QTA = Math.trunc(e.target.valueAsNumber);
        console.log(QTA);

        if (QTA && QTA > 0) {
            if (QTA <= product.stock)
                setQuantity(QTA);
        }
        e.target.setAttribute("value", quantity.toString());
    }

    const slides = images?.map((image, i) => {
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

    const addCart = async () => {
        if(sessionService.isAuth()){
            try {
                const res = await CartService.addToCart(product.id, quantity);
                if (res) {
                    setInfo({
                        ...info,
                        messageShow: "Product Added to Cart"
                    })
                }
                else {
                    setInfo({
                        ...info,
                        error: "Error on loading the product to the cart! Try again.."
                    })
                }
            }
            catch (err) {
                setInfo({
                    ...info,
                    error: "Error on loading cart! Try later..."
                })
            }
        }
        else {
            const cartLocal:CartNotAuth[] = JSON.parse(window.localStorage.getItem('cart'));
            const item:CartNotAuth = {
                id: product.id,
                quantity: quantity
            }
            if(cartLocal){
                cartLocal.push(item);
                window.localStorage.removeItem('cart');
                window.localStorage.setItem('cart', JSON.stringify(cartLocal));
            }
            else {
                const cartNotAuth:CartNotAuth[] = [];
                cartNotAuth.push(item);
                window.localStorage.setItem('cart', JSON.stringify(cartNotAuth));
            }
            setInfo({
                ...info,
                messageShow: "Product Added to Local Cart! Login or Signup if you want to checkout!"
            })
        }
    }

    const displayErr = () => {
        return (error ? <div className="alert alert-danger">{error}</div> : '');
    }

    const displayInfo = () => {
        return (messageShow ? <div className="alert alert-info">{messageShow}</div> : '');
    }

    return (
        <CustomerLayout header categories footer>
            <div className={styles.productContainer}>
                <div>
                    <Carousel className={styles.carousel} activeIndex={activeIndex} next={next} previous={previous}>
                        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                        {slides}
                        <CarouselControl className={styles.carouselcontrolprevicon} direction="prev" directionText="Previous" onClickHandler={previous} />
                        <CarouselControl className={styles.carouselcontrolnexticon} direction="next" directionText="Next" onClickHandler={next} />
                    </Carousel>
                </div>
                <div className={styles.productInfo}>
                    <div className={styles.productName}>{product.name}</div>
                    <div className={styles.productPrice}>Price: € {product.price}</div>
                    <div className={styles.productDesc}>{product.description}</div>
                    <div className={styles.productAction}>
                        <div>
                            <button className={styles.plus} onClick={() => { modifyQuantityByStep(false) }} type="button" name="button">
                                <img src="meno.png" style={{width:25, height: 25}}/>
                            </button>
                            <input type="number" name="name" value={quantity}
                                className={styles.input}
                                onChange={(e) => modifyQuantity(e)}
                                max={product.stock}>
                            </input>
                            <button className={styles.minus} onClick={() => { modifyQuantityByStep(true) }} type="button" name="button">
                                <img src="plus.png" style={{width:25, height: 25}}/>
                            </button>
                        </div>
                    </div>
                    <div className={styles.productAction}>
                        <Button color="primary" onClick={addCart} size="lg" margin-top="20px">Add to Cart</Button>
                    </div>
                </div>
                <div style={{ marginTop: "20px" }}>
                    {displayErr()}
                    {displayInfo()}
                </div>
            </div>
        </CustomerLayout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = [];
    const categories = await CategoriesService.fetchAllCategories();
    for(let i = 0; i < categories.length; i++){
        const category = categories[i];
        const productsCategoryList = await ProductService.fetchProducts({category: category.id});
        productsCategoryList.forEach(product => {
            paths.push({params: { id: product.id }});
        });
    }
    return {paths, fallback: 'blocking',};
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const id = params.id as string;

    try {
        const product: Product = await ProductService.fetchProduct(id);
        console.log(product)
        return {
            props: { product },
            revalidate: 30,
        };
    }
    catch (error) {
        return {
            props: { product: null },
            revalidate: 30,
        };
    }
};

export default Detail;