import { ProductCard } from 'components/cart';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Button, Spinner } from 'reactstrap';
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import styles from 'styles/Cart.module.css'
import { CartService } from 'services';
import { Cart, ProductCart } from 'types';

const CartUser: React.FC = () => {

    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [cart, setCart] = useState<Cart>();

    useEffect(() => {
        reloadCart();
    }, [])

    const onSubmit = () => {
        router.push('/payment/checkout');
    }

    const reloadCart = async () => {
        setLoading(true);
        const cart = await CartService.fetchCart();
        setCart(cart);
        console.log('Done');
        setLoading(false);
    }

    const removeAllCart = async () => {
        const res = await CartService.removeCart();
        if (res) {
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
                    <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', margin: '100px' }}>
                        <Spinner style={{ width: '3rem', height: '3rem' }} />
                    </div>
                ) : (
                    <div className="cart-item-layout">
                        {cart ? (
                            cart.products.map((product: ProductCart) => (
                                <ProductCard
                                    product={product}
                                    loadCart={() => { reloadCart() }}
                                />
                            ))
                        ) : (
                            <div>
                                NON C'E' NULLA NEL CARRELLAO
                            </div>
                        )}
                    </div>
                )}
            </div>
            <div className={styles.remove}>
                <Button color="primary" onClick={removeAllCart} size="lg">Remove all</Button>
            </div>
            <div className={styles.total}>
                <div><strong>Total: {cart?.total}{" €"} </strong></div>
                <div><strong>Taxes: {cart?.tax}{" €"} </strong></div>
                {loading ? (
                    <div style={{ margin: '100px' }}>
                        <Spinner />
                    </div>
                ) : (
                    <div>
                        {cart?.products.length != 0 ? (
                            <Button color="primary" size="lg" style={{ marginTop: "10px" }} onClick={() => { onSubmit() }}>Checkout</Button>
                        ) : (
                            <div style={{ marginTop: "20px" }}><strong>Add something to your cart if you want to proceed to checkout</strong></div>
                        )}
                    </div>
                )}
            </div>

        </CustomerLayout>
    );
};

export default CartUser;