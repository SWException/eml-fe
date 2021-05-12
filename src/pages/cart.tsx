import { ProductCard } from 'components/cart';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Button, Spinner, Card, CardText, CardBody, CardTitle} from 'reactstrap';
import { CustomerLayout } from 'components/layouts/CustomerLayout';
import styles from 'styles/Cart.module.css'
import { CartService, sessionService } from 'services';
import { Cart, ProductCart } from 'types';

const CartUser: React.FC = () => {

    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [cart, setCart] = useState<Cart>();
    const [idCart, setIdCart] = useState<string>();

    useEffect(() => {
        if(sessionService.isAuth()){
            reloadCart();
        }
        else {
            const id_cart: string = window.localStorage.getItem('id_cart');
            if(id_cart){
                setIdCart(id_cart)
                console.log("Carrello guest ", id_cart);
                reloadCart(id_cart);
            }
            else {
                displayMessage();
            }
        }
    }, [])

    const onSubmit = () => {
        router.push('/payment/checkout');
    }

    const reloadCart = async (id_cart?: string) => {
        if(!id_cart && idCart){
            id_cart = idCart;
        }
        setLoading(true);
        const cart = await CartService.fetchCart(id_cart);
        setCart(cart);
        console.log(cart);
        
        console.log('Done');
        setLoading(false);
    }

    const removeAllCart = async () => {
        window.localStorage.removeItem("id_cart")
        const res = await CartService.removeCart(idCart);
        if (res) {
            reloadCart();
        }
    }
    
    const displayMessage = () => {
        return(
            <div className={styles.cartempty}>
                <img src="cart_empty2.png" style={{width:"70%", height:"60%"}}/>
            </div>
        ) 
    }

    return (
        <CustomerLayout header footer>
            {loading ? (
                <div className={styles.loadingitemlayout}>
                    <Spinner style={{ width: '3rem', height: '3rem' }} />
                </div>
            ) : (
                <div>
                    {cart?.products?.length > 0 ? (
                        <div>
                            <div className={styles.gridcontainer}>
                                <div className={styles.products}>
                                    <div className={styles.titlebox}>
                                        <div className={styles.title}>
                                            <h2>Cart</h2>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    {cart ? (
                                        cart.products.map((product: ProductCart) => (
                                            <ProductCard
                                                id_cart = {idCart}
                                                product = {product}
                                                loadCart = {() => { reloadCart() }}
                                            />
                                        ))
                                    ) : (
                                        <div>
                                            {displayMessage()}
                                        </div>
                                    )}
                                    {cart?.products.length >0 ? (
                                        <div>
                                            <Button color="primary" onClick={removeAllCart} size="lg">Remove all</Button>
                                        </div>
                                    ):(
                                        <div>
                                            {displayMessage()}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={styles.griditemtotal}>
                                <Card width="20rem">
                                    <CardBody>
                                        <CardTitle className={styles.cardtitle}>Total Cart</CardTitle>
                                        <CardText>
                                            <div className={styles.user}>
                                                <span>Total</span>   
                                                <strong  className={styles.strong}>{" €"}{cart?.total}</strong> 
                                            </div>
                                            <div className={styles.user}>
                                                <span>Taxes</span>
                                                <strong className={styles.strong}>{"€"}{cart?.tax}</strong>
                                            </div>
                                            {
                                                sessionService.isAuth() ?(
                                                    <div>
                                                        <Button color="primary" size="lg" className={styles.check} onClick={() => { onSubmit() }}>Checkout</Button>
                                                    </div>
                                                ):(<div><br /><p>Signin for the checkout</p></div>)
                                            }
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
        </CustomerLayout>
    );
};

export default CartUser;