import { ProductCard } from 'components/cart';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Button, Spinner } from 'reactstrap';
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import styles from 'styles/Cart.module.css'
import { CartService } from 'services';
import { Cart } from 'types';

interface Props {
    cart: Cart,
}

/**
 * Inserire fetch del Service per ADD e REMOVE
 */

const CartUser: React.FC<Props> = () => {

    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [cartShow, setCartShow] = useState<Cart>({
        id: "",
        product: [],
        tax: 0,
        total: 0
    });

    useEffect(() => {
        reloadCart();
    }, [])

    const onSubmit = () => {
        router.push('/payment/checkout');
    }

    const reloadCart = async () => {
        setLoading(true);
        const { cart } = await CartService.fetchCart();
        setCartShow({
            id: cart.id,
            product: cart.product,
            tax: cart.tax,
            total: cart.total
        });
        console.log('Done');
        setLoading(false);
    }

    const removeAllCart = async () => {
        const { status, message } = await CartService.removeCart();
        if (status == "success") {
            reloadCart();
        }
    }

    return (
        <CustomerLayout header footer>
            <div className={styles.title}>
                <h1>Cart</h1>
            </div>
            <div className={styles.cart}>
                {loading ? (
                    <div style={{display: "flex", justifyContent: "center", alignItems: 'center', margin: '100px'}}>
                        <Spinner style={{width: '3rem', height: '3rem'}}/>
                    </div>
                ) : (
                    <div className="cart-item-layout">
                    {cartShow.product.map((product) => (
                        <ProductCard
                            id={product.productId}
                            name={product.name}
                            photo={product.primaryPhoto}
                            price={product.price}
                            loadCart={() => { reloadCart() }}
                            quantity={product.quantity}
                        />
                    ))}
                </div>
                )
            }
            </div>
            <div className={styles.remove}>
                <Button color="primary" onClick={removeAllCart} size="lg">Remove all</Button>
            </div>
            <div className={styles.total}>
                <div><strong>Total: {cartShow.total}{" €"} </strong></div>
                <div><strong>Taxes: {cartShow.tax}{" €"} </strong></div>
                <Button color="primary" size="lg" style={{ marginTop: "10px" }} onClick={() => { onSubmit() }}>Checkout</Button>
            </div>

        </CustomerLayout>
    );
};

/*export async function getServerSideProps() {
    const { cart } = await CartService.fetchCart();

    return {
        props: {
            cart
        }
    };    
}*/

export default CartUser;