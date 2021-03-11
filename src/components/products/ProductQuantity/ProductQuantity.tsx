import React, { useEffect, useState } from 'react';
import {Button} from 'reactstrap'
import styles from './ProductPhoto.module.css';


const ProductQuantity: React.FC = () => {

  const [quantity, setQuantity] = useState(0);

  useEffect(()=>{
    setQuantity(1);
  }, [])

  return (
    <>
      <Button onClick={()=>{
        if(quantity>1){
          setQuantity(quantity-1);
        }
      }}>-</Button>
      <input type="text" value={quantity} onChange={()=>{
        console.log('Changed');
      }}/>
      <Button onClick={()=>{
        setQuantity(quantity+1)
      }}>+</Button>
    </>
  );
};

export default ProductQuantity;