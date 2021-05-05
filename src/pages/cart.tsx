import { ProductCard } from 'components/cart';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Button, Spinner } from 'reactstrap';
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import styles from 'styles/Cart.module.css'
import { CartService, sessionService } from 'services';
import { Cart, CartNotAuth, ProductCart } from 'types';

const CartUser: React.FC = () => {

    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [cart, setCart] = useState<Cart>();
    const [messageShow, setMessageShow] = useState('');

    useEffect(() => {
        if(sessionService.isAuth()){
            reloadCart();
        } else {
            let cart:CartNotAuth[] = JSON.parse(window.localStorage.getItem('cart'));
            if(cart){
                setMessageShow('Signin or Signup if you want to load your local cart!')
            } else {
                setMessageShow('Add some products or Signin')
            }
            displayMessage();
        }
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
    
    const displayMessage = () => {
        return <div className={styles.messageCart}>{messageShow}</div>
    }

    return (
        <CustomerLayout header footer>
            <div className={styles.container}>
                <div className={styles.title}>
                    <h1>Cart</h1>
                </div>
                {sessionService.isAuth() ? (
                    <div>
                        <div className={styles.cart}>
                        {loading ? (
                            <div className={styles.loadingitemlayout}>
                                <Spinner style={{ width: '3rem', height: '3rem' }} />
                            </div>
                        ) : (
                            <div className={styles.tab}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th ></th>
                                            <th></th>
                                            <th><strong>NAME</strong></th>
                                            <th><strong>PRICE</strong></th>
                                            <th><strong>TAX</strong></th>
                                            <th><strong>QUANTITY</strong></th>
                                            <th><strong>SUBTOTAL</strong></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {cart ? (
                                                cart.products.map((product: ProductCart) => (
                                                    <tr>
                                                    <ProductCard
                                                        product={product}
                                                        loadCart={() => { reloadCart() }}
                                                    />
                                                    </tr>
                                                    ))
                                                ) : (
                                                    <div/>
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    <div>
                        {cart?.products.length != 0 ? (
                            <div className={styles.remove}>
                                <Button color="primary" onClick={removeAllCart} size="lg">Remove all</Button>
                            </div>
                        ) : (
                            <div className={styles.message}>
                                The cart is empty, add an item to continue.
                            </div>
                        )}
                    </div>
                    <div className={styles.total}>
                        <div><strong>Total: {cart?.total}{" €"} </strong></div>
                        <div><strong>Taxes: {cart?.tax}{" €"} </strong></div>
                        {loading ? (
                            <div className={styles.loadingitemlayout}>
                                <Spinner />
                            </div>
                        ) : (
                            <div>
                                {cart?.products.length != 0 ? (
                                    <Button color="primary" size="lg" style={{ marginTop: "10px" }} onClick={() => { onSubmit() }}>Checkout</Button>
                                ) : (
                                    <div/>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                ) : (
                    <div>
                        {displayMessage()}
                    </div>
                )}
                
            </div>
        </CustomerLayout>
    );
};

export default CartUser;