import { ProductCard } from 'components/cart';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Button } from 'reactstrap';
import { CustomerLayout } from 'components/layouts/CustomerLayout';

interface Props {
    cartItems: any, //ASSOLUTAMENTE DA CONTROLLARE
}

const Cart: React.FC<Props>= ({cartItems}) => { 
    console.log(cartItems);
    //Inserire Fetch
 
    const router = useRouter();

    const [total, setTotal] = useState(0);

    const onSubmit = () => {
        router.push('/payment/checkout');
    }

    return (
        <CustomerLayout header>
            <div className="items">
                <div className="title-main">
                    <h1>Cart</h1>
                </div>
                <div className="cart-item-layout">
                {cartItems.products.map((product) => (
                    <ProductCard 
                    id={product.id}
                    name = {product.name}
                    photo={product.photo}
                    price={product.price}
                    quantity={product.quantity}
                    /> 
                ))}
                </div>
            </div>
            <div className="total">
                <div style={{marginRight: "10px"}}><strong>Total: {cartItems.total}{" €"} </strong></div>
                <div style={{marginRight: "10px"}}><strong>Taxes: {cartItems.tax}{" €"} </strong></div>
                <Button color="primary" onClick={()=>{onSubmit()}}>Vai al checkout</Button>
            </div>
        </CustomerLayout>
    );
};

export async function getStaticProps() {
    const res = await fetch('https://virtserver.swaggerhub.com/swexception4/OpenAPI/0.0.1/getCart', {
        method: 'POST',
        headers: {
            "Accept":"application/json",
            "Content-Type":"application/json",
            'id': '1',
        }
    });
    const cart = await res.json();

    return {
        props: {
            cartItems: cart,
        }
    };    
}

export default Cart;