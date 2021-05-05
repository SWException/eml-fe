import React, { useEffect, useState } from 'react';
import styles from 'components/cart/ProductCard/ProductCard.module.css'
import { CartService } from 'services';
import { ProductCart } from 'types';
interface Props {
    product: ProductCart,
    loadCart: (() => void)
}

const ProductCard: React.FC<Props> = ({ product, loadCart }) => {

    const [quantity, setQuantity] = useState(product.quantity);
    const [subTotal, setSubTotal] = useState(product.price * product.quantity);

    useEffect(() => {
        setQuantity(quantity); // è necessario?
        setSubTotal(product.price * quantity); // è necessario? 
    }, [])

    const modifyQuantity = async (name: string) => {
        if (name == 'plus') {
            setQuantity(quantity + 1);
        }
        else {
            if (quantity != 1)
                setQuantity(quantity - 1);
        }
        const response: boolean = await CartService.updateCart(product.id, product.quantity);
        setSubTotal(product.price * quantity);
        if (response) {
            await loadCart();
        }
    }

    const deleteProduct = async () => {
        const response: boolean = await CartService.removeProductFromCart(product.id);
        if (response) {
            loadCart();
        }
    }

    return (
        <>
            <td width="10rem"><button className={styles.delete} onClick={deleteProduct}>X</button></td>
            <td>
                <img className={styles.img} src={product.primaryPhoto} height="100" width="100" alt="..." />
            </td>
            <td>{product.name.toUpperCase()}</td>
            <td>€ {product.price}</td>
            <td>{product.tax}%</td>
            <td>
                <div className={styles.quantity}>
                    <button className={styles.plus} onClick={() => { modifyQuantity('minus') }} type="button" name="button">
                        -
                    </button>
                    <input type="text" name="name" value={quantity} min="1"></input>
                    <button className={styles.minus} onClick={() => { modifyQuantity('plus') }} type="button" name="button">
                        +
                    </button>
                </div>
            </td>
            <td>€ {subTotal}</td>
        </>
    )
};

export default ProductCard;
