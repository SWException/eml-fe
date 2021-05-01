import React, { useEffect, useState } from 'react';
import styles from 'components/cart/ProductCard/ProductCard.module.css'
import { CartService } from 'services';
interface Props {
    id: string,
    name: string,
    photo: string,
    price: number,
    quantity: number,
    loadCart: (() => void)
}

const ProductCard: React.FC<Props> = ({ id, name, photo, price, loadCart, quantity }) => {

    const [_quantity, setQuantity] = useState(quantity);
    const [_subTotal, setSubTotal] = useState(price * _quantity);

    useEffect(() => {
        setQuantity(_quantity);
        setSubTotal(price * _quantity);
    }, [])

    const modifyQuantity = async (name: string) => {
        if (name == 'plus') {
            setQuantity(_quantity + 1);
        } else {
            if (_quantity != 1)
                setQuantity(_quantity - 1);
        }
        const { status, message } = await CartService.updateCart(_quantity, id);
        setSubTotal(price * _quantity);
        if (status == "success") {
            await loadCart();
        }
    }

    const deleteProduct = async () => {
        const { status, message } = await CartService.removeProductFromCart(id);
        if (status == "success") {
            loadCart();
        }
    }

    return (
        <div className={styles.item}>
            <button className={styles.delete} onClick={deleteProduct}>X</button>
            <img className={styles.img} src={photo} height="100" width="100" alt="..." />
            <span className={styles.information}>
                <div><strong>ID: </strong>{id}</div>
                <div><strong>{name.toUpperCase()}</strong></div>
            </span>
            <span className={styles.information}><strong>PRICE: </strong>€ {price}</span>
            <div className={styles.quantity}>
                <button className={styles.plus} onClick={() => { modifyQuantity('minus') }} type="button" name="button">
                    -
                </button>
                <input type="text" name="name" value={_quantity} min="1"></input>
                <button className={styles.minus} onClick={() => { modifyQuantity('plus') }} type="button" name="button">
                    +
                </button>
            </div>
            <span className={styles.information}><strong>SUBTOTAL: € {_subTotal} </strong></span>
        </div>
    )
};

export default ProductCard;
