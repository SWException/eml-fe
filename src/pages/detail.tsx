import React from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from 'styles/Detail.module.css';
import { ProductService } from 'services/productService';
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import { Product } from 'types/product'
import { Button, Carousel, CarouselItem, CarouselControl, CarouselIndicators } from 'reactstrap';
import { GetServerSideProps } from 'next';
import { CartService } from 'services';


const Detail: React.FC<Product> = (product: Product) => {
    
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

    const { error, messageShow } = info;

    const items = [
        {
            src: 'https://images-na.ssl-images-amazon.com/images/I/61GqztpFduL._AC_UX679_.jpg',
        }
    ];

    const addImagesToCarousel = () => {
        const arrayImg = [];
        arrayImg.push(product.primaryPhoto);
        arrayImg.push(product.secondaryPhotos);
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

    const addCart = async () => {
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

    const displayErr = () => {
        return (error ? <div className="alert alert-danger">{error}</div> : '');
    }

    const displayInfo = () => {
        return (messageShow ? <div className="alert alert-info">{messageShow}</div> : '');
    }


    return (
        <CustomerLayout header categories footer>
            <div className={styles.productContainer}>
                <Carousel className={styles.carousel} activeIndex={activeIndex} next={next} previous={previous}>
                    <CarouselIndicators items={items} activeIndex={activeIndex} color="dark" onClickHandler={goToIndex} />
                    {slides}
                    <CarouselControl style={{ borderColor: "black" }} direction="prev" directionText="Previous" onClickHandler={previous} />
                    <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
                </Carousel>
                <div className={styles.productInfo}>
                    <div className={styles.productName}>{product.name}</div>
                    <div className={styles.productPrice}>Price: € {product.price}</div>
                    <div className={styles.productDesc}>{product.description}</div>
                    <div className={styles.productAction}>
                        <div>
                            <button className={styles.plus} onClick={() => { modifyQuantityByStep(false) }} type="button" name="button">
                                -
                            </button>
                            <input type="number" name="name" value={quantity}
                                className={styles.input}
                                onChange={(e) => modifyQuantity(e)}
                                max={product.stock}>
                            </input>
                            <button className={styles.minus} onClick={() => { modifyQuantityByStep(true) }} type="button" name="button">
                                +
                            </button>
                        </div>
                    </div>
                    <div className={styles.productAction}>
                        <Button color="primary" onClick={addCart} size="lg" marginTop="20px">Add to Cart</Button>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query.id as string;

    try {
        const product: Product = await ProductService.fetchProduct(id);
        console.log(product)
        return product;
    }
    catch (error) {
    
    }
};

export default Detail;

