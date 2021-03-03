import { Layout } from "components/ui";
import { ProductCard } from 'components/cart';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Button } from 'reactstrap';

interface Props {
    cartItems: string, //ASSOLUTAMENTE DA CONTROLLARE
}

const Cart: React.FC<Props> = ({cartItems}) => {

    //Inserire Fetch

    const router = useRouter();

    const [total, setTotal] = useState(0);

    useEffect(()=>{
        setTotalPrice();
        getItem();
    }, [])


    const getItem = () => {
        console.log(cartItems.carrello.products);
    }

    const setTotalPrice = () => {
        var paytotal = 0;
        cartItems.carrello.products.forEach(product=>{
            paytotal = paytotal + (product.price*product.quantity)
        })
        setTotal(paytotal);
    }

    const onSubmit = () => {
        router.push('/payment/checkout');
    }

    return (
        <Layout>
            <div className="items">
                <div className="title-main">
                    <h1>Cart</h1>
                </div>
                <div className="cart-item-layout">
                <ProductCard 
                title={cartItems.carrello.products[0].name}
                quantity={cartItems.carrello.products[0].quantity}
                price={cartItems.carrello.products[0].price}/> 
                <ProductCard 
                quantity={cartItems.carrello.products[1].quantity}
                title={cartItems.carrello.products[1].name}
                price={cartItems.carrello.products[1].price}/>  
                </div>
            </div>
            <div className="total">
                <div style={{marginRight: "10px"}}><strong>{total}{",00 €"} </strong></div>
                <Button color="primary" onClick={()=>{onSubmit()}}>Vai al checkout</Button>
            </div>

        </Layout>
    );
};

export async function getStaticProps() {
    const res = await fetch('https://5qsqmpfpm8.execute-api.eu-central-1.amazonaws.com/dev/getCart/1');
    const cartItems = await res.json();

    return {
        props: {
            cartItems,
        }
    };    
}

export default Cart;