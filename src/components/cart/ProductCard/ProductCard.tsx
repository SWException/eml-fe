import { ProductQuantity } from 'components/products';
import React, {useEffect, useState} from 'react';
import styles from 'components/cart/ProductCard/ProductCard.module.css'
import { CartService } from 'services';
interface Props {
    id: number,
    name: string,
    photo: string,
    price: number,
    quantity: number, 
    loadCart: (() => void)
}

const ProductCard: React.FC<Props> = ({id, name, photo, price, loadCart, quantity}) => {

    const [_quantity, setQuantity] = useState(quantity);
    const [_subTotal, setSubTotal] = useState(price*quantity);

    useEffect(()=>{
        setQuantity(quantity);
        setSubTotal(price*_quantity);
    }, [])

    const modifyQuantity = async(name:string) => {
        if(name == 'plus'){
            setQuantity(_quantity+1);
        } else {
            setQuantity(_quantity-1);
        }
        setSubTotal(price*_quantity);
        const { status, message } = await CartService.updateCart(_quantity, id.toString())
        if(status == "success"){
            loadCart();
        }
    }

    const deleteProduct = async() =>{
        const { status, message } = await CartService.removeProductCart(id.toString());
        if(status == "success"){
            loadCart();
        }
    }

    return (
        <div className={styles.item}>
            <button className={styles.delete} onClick={deleteProduct}>X</button>
            <img className={styles.img} src={photo} height="100" width="100" alt="..."/>
            <span className={styles.information}>
            <div><strong>ID: </strong>{id}</div>
            <div><strong>{name.toUpperCase()}</strong></div>
            </span>
            <span className={styles.information}><strong>PRICE: </strong>€ {price}</span>
            <div className={styles.quantity}>
                <button className={styles.plus} onClick={()=>{modifyQuantity('minus')}} type="button" name="button">
                    -
                </button>
                <input type="text" name="name" value={_quantity}></input>
                <button className={styles.minus} onClick={()=>{modifyQuantity('plus')}} type="button" name="button">
                    +
                </button>
            </div>
            <span className={styles.information}><strong>SUBTOTAL: € {_subTotal} </strong></span>
        </div>    
    )
};

export default ProductCard;
