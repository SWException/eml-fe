import { ProductCard } from 'components/cart';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Button, Spinner, Card, CardText, CardBody, CardTitle} from 'reactstrap';
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
        }
        else {
            const cart:CartNotAuth[] = JSON.parse(window.localStorage.getItem('cart'));
            if(cart){
                setMessageShow('Signin or Signup if you want to load your local cart!')
            }
            else {
                setMessageShow('The cart is empty! Add some products or Signin')
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
        return(
            <div className={styles.cartempty}>
                <img src="cart_empty2.png"/>
            </div>
        ) 
    }

    return (
        <CustomerLayout header footer>
                    {sessionService.isAuth()? (
                        <div>
                            {loading ? (
                                <div className={styles.loadingitemlayout}>
                                    <Spinner style={{ width: '3rem', height: '3rem' }} />
                                </div>
                            ) : (
                                <div>
                                    {cart?.products.length != 0 ? (
                                        <div className={styles.gridcontainer}>
                                        <div className={styles.products}>
                                            <div className={styles.titlebox}>
                                                <div className={styles.title}>
                                                    <h2>Cart</h2>
                                                </div>
                                            </div>
                                            <div>
                                                {cart ? (
                                                    cart.products.map((product: ProductCart) => (
                                                        <ProductCard
                                                            product={product}
                                                            loadCart={() => { reloadCart() }}
                                                        />
                                                    ))
                                                ) : (
                                                    <div/>
                                                )}
                                                <div>
                                                    <Button color="primary" onClick={removeAllCart} size="lg">Remove all</Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.total}>
                                            <Card width="20rem">
                                                <CardBody>
                                                    <CardTitle className={styles.cardtitle}>Total Cart</CardTitle>
                                                    <CardText>
                                                            <span>Total</span>   
                                                            <strong  className={styles.strong}>{" €"}{cart?.total}</strong> 
                                                        </div>
                                                        <div className={styles.user}>
                                                            <span>Taxes</span>
                                                            <strong className={styles.strong}>{"€"}{cart?.tax}</strong>
                                                        </div>
                                                        <div>
                                                            <Button color="primary" size="lg" className={styles.check} onClick={() => { onSubmit() }}>Checkout</Button>
                                                        </div>    
                                                    </CardText>
                                                </CardBody>
                                            </Card>
                                         </div>
                                    </div>
                                    ):(
                                        <div>
                                        {displayMessage()}
                                        </div>
                                    )}
                                </div>
                                    
                                )}
                        </div>
                    ):(
                        <div>
                            {displayMessage()}
                        </div>
                    )}
        </CustomerLayout>
    );
};

export default CartUser;