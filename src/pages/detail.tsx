import React from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import styles from 'styles/Detail.module.css';
import { ProductService } from 'services/productService';
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import { Product } from 'types/product'
import { Button, Carousel, CarouselItem, CarouselControl, CarouselIndicators } from 'reactstrap';
import { GetServerSideProps } from 'next';
import { CartService } from 'services';

interface Props {
    product: Product;
}

const Detail: React.FC<Props> = ({ product }) => {

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
        setQuantity(1);
    }, [])

    const { name, description, primaryPhoto, secondaryPhotos, price, id, stock } = product;
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

    const modifyQuantityByStep = async (increment: boolean) => {
        const QTA = quantity;
        if (increment) {
            setQuantity(QTA + 1);
        }
        else {
            if (QTA != 1)
                setQuantity(QTA - 1);
        }
    }

    const modifyQuantity = async (e: ChangeEvent<HTMLInputElement>) => {
        const QTA = Math.trunc(e.target.valueAsNumber);
        console.log(QTA);

        if (QTA && QTA > 0) {
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
            const { status, message } = await CartService.addToCart(quantity, id);
            if (status == "success") {
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
                    <div className={styles.productName}>{name}</div>
                    <div className={styles.productPrice}>Price: € {price}</div>
                    <div className={styles.productDesc}>{description}</div>
                    <div className={styles.productAction}>
                        <div>
                            <button className={styles.plus} onClick={() => { modifyQuantityByStep(false) }} type="button" name="button">
                                -
                            </button>
                            <input type="number" name="name" value={quantity} 
                                className={styles.input} onChange={(e) => modifyQuantity(e)} max={stock}></input>
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
        const { product } = await ProductService.fetchProduct(id);
        console.log(product)
        return {
            props: { product },
        };
    }
    catch (error) {
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

