import { ProductCard } from 'components/cart';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Button } from 'reactstrap';
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

const CartUser: React.FC<Props>= () => {
 
    const router = useRouter();

    const [total, setTotal] = useState(0);
    const [cartShow, setCartShow] = useState<Cart>({
        id: 0,
        product: [],
        tax: 0,
        total: 0
    });

    useEffect(()=>{
        reloadCart();
    }, [])

    const onSubmit = () => {
        router.push('/payment/checkout');
    }

    const reloadCart = async() => {
        const { cart } = await CartService.fetchCart();
        setCartShow({
            id: cart.id,
            product: cart.product,
            tax: cart.tax,
            total: cart.total
        });
        console.log('Done');
    }

    const removeAllCart = async() => {
        const { status, message } = await CartService.removeAllCart();
        if(status == "success"){
            reloadCart();
        }
    }

    return (
        <CustomerLayout header footer>
             <div className={styles.title}>
                    <h1>Cart</h1>
            </div>
            <div className={styles.cart}>
                <div className="cart-item-layout">
                {cartShow.product.map((product) => (
                    <ProductCard 
                    id={product.id}
                    name = {product.name}
                    photo={product.primaryPhoto}
                    price={product.price}
                    loadCart={()=>{reloadCart()}}
                    quantity={product.quantity}
                    /> 
                ))}
                </div>
            </div>
            <div className={styles.remove}>
                <Button color="primary" onClick={removeAllCart} size="lg">Remove all</Button>
            </div>
            <div className={styles.total}>
                <div><strong>Total: {cartShow.total}{" €"} </strong></div>
                <div><strong>Taxes: {cartShow.tax}{" €"} </strong></div>
                <Button color="primary" size="lg" style={{marginTop: "10px"}} onClick={()=>{onSubmit()}}>Checkout</Button>
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