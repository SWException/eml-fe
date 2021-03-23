import { ProductQuantity } from 'components/products';
import React, {useEffect, useState} from 'react';
import {Button} from 'reactstrap'
import styles from 'components/cart/ProductCard/ProductCard.module.css'
interface Props {
    id: number,
    name: string,
    photo: string,
    price: number,
    quantity: number,    
}

const ProductCard: React.FC<Props> = ({id, name, photo, price, quantity}) => {

    const [_quantity, setQuantity] = useState(0);

    useEffect(()=>{
        setQuantity(quantity);
    }, [])
  
    const totart=price*quantity;

    return (
        <div className={styles.item}>
            <button className={styles.delete}>X</button>
            <img className={styles.img} src={photo} height="100" width="100" alt="..."/>
            <span className={styles.information}>
            <div><strong>ID: </strong>{id}</div>
            <div><strong>{name.toUpperCase()}</strong></div>
            </span>
            <span className={styles.information}><strong>PRICE: </strong>€ {price}</span>
            <div className={styles.quantity}>
                <button className={styles.plus} type="button" name="button">
                    -
                </button>
                <input type="text" name="name" value={quantity}></input>
                <button className={styles.minus} type="button" name="button">
                    +
                </button>
            </div>
            <span className={styles.information}><strong>SUBTOTAL: € {totart} </strong></span>
        </div>    
    )
};

export default ProductCard;
