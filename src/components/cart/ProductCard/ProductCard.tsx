import React, { useEffect, useState } from 'react';
import styles from 'components/cart/ProductCard/ProductCard.module.css'
import { CartService } from 'services';
import { ProductCart } from 'types';
interface Props {
    product: ProductCart,
    loadCart: (() => void),
    id_cart?: string
}

const ProductCard: React.FC<Props> = ({ product, loadCart, id_cart }) => {

    const [quantity, setQuantity] = useState(product.quantity);

    useEffect(() => {
        setQuantity(quantity);
    }, [])

    const modifyQuantity = async (name: string): Promise<void> => {
        let QTA = quantity;
        if (name == 'plus') {
            QTA ++;
        }
        else {
            if (quantity > 1)
                QTA --;
        }
        if(QTA != quantity){
            const response: boolean = await CartService.updateCart(product.id, QTA, id_cart);
            if (response) {
                await loadCart();
            }
        }
    }

    const deleteProduct = async (): Promise<void>  => {
        const response: boolean = await CartService.removeProductFromCart(product.id, id_cart);
        if (response) {
            loadCart();
        }
    }

    return (
        <div className={styles.singleproductbox}>
            <div className={styles.singleproduct}>
                <div className={styles.imagebox}>
                    <a href={"/products/" + product.id}>
                        <div className={styles.image}>
                            <img src={product.primaryPhoto} height="125" width="125" alt={product.name + " image"} />
                        </div>
                    </a>
                </div>
                <div className={styles.allinfobox}>
                    <div className={styles.upinfo}>
                        <div className={styles.productdetails}>
                            <div>
                                <span>{product.name.toUpperCase()}</span>
                            </div>
                            <div>
                                <span>€ {product.price}</span>
                            </div>
                            <div>
                                <span>Tax: {product.tax}%</span>
                            </div>
                            <div> 
                                <button onClick={deleteProduct} className={styles.removebutton}>
                                    <img src="remove.png" style={{width:25, height: 25}}/>
                                </button>
                            </div>
                        </div>
                        <div className={styles.quantitybox}>
                            <div>
                                <button className={styles.plus} onClick={() => { modifyQuantity('minus') }} type="button" name="button">
                                    <img src="meno.png" style={{width:25, height: 25}}/>
                                </button>
                                <input className={styles.quantityinput} type="text" name="name" value={quantity} min="1"></input>
                                <button className={styles.minus} onClick={() => { modifyQuantity('plus') }} type="button" name="button">
                                    <img src="plus.png" style={{width:25, height: 25}}/>
                                </button>
                            </div>
                            <div className={styles.subtotal}>
                                <span><strong>€ {product.total}</strong></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
    )
};

export default ProductCard;
