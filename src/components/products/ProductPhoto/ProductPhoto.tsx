import React from 'react';
import Slider from 'react-slick';
import styles from './ProductPhoto.module.css';


const ProductPhoto: React.FC = () => {
    let settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        dotsClass: 'slick-dots dots',
    };

    let images = ['/image.jpg', '/image2.jpg'];
    images.map((image) => {
        console.log(image);
    });

    return (
        <>
            <Slider {...settings}>
                {images.map((image) => (
                    <div className={styles.banner} key={1}>
                        <div
                            className={styles.img}
                            style={{ backgroundImage: `url(${image})` }}
                        ></div>
                    </div>
                ))}
            </Slider>
        </>
    );
};

export default ProductPhoto;