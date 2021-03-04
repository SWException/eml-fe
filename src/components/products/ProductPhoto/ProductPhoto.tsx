import React from 'react';
import Slider from 'react-slick';
//import { Banner } from 'types';
import styles from './ProductPhoto.module.css';

/*interface Props {
  banners: Banner[];
}*/

const Banners: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    dotsClass: 'slick-dots dots',
  };

  return (
    <>
      
          <div className={styles.banner} key={1}>
            <div
              className={styles.img}
              style={{ backgroundImage: 'url("/image.jpg")' }}
            ></div>
          </div>
        ))
      
    </>
  );
};

export default Banners;