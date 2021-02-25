import Layout from "../components/Layout";
import CartLayout from '../components/Card';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { Button } from 'reactstrap'
import { on } from "events";

const Cart = () => {

    //Inserire Fetch

    const router = useRouter();

    const [price, setPrice] = useState([10, 12, 32]);
    const [title, setTitle] = useState(['Scarpa elegante uomo', 'Scarpa elegante uomo', 'Scarpa elegante uomo']);
    const [description, setDescription] = useState(['Scarpa elegante uomo', 'Scarpa elegante uomo', 'Scarpa elegante uomo']);
    const [total, setTotal] = useState(0);
    const [elements, setElements] = useState(3);

    useEffect(()=>{
        setTotalPrice();
    }, [])

    const setTotalPrice = () => {
        var paytotal = 0;
        price.forEach(price=>{
            paytotal = paytotal + price;
        });
        setTotal(paytotal);
    }

    const onSubmit = () => {
        router.push('/payment/stripe');
    }

    return (
        <Layout>
            <div className="items">
                <div className="title-main">
                    <h1>Cart</h1>
                </div>
                <div className="cart-item-layout">
                <CartLayout 
                description={description[0]}
                title={title[0]}
                price={price[0]}/> 
                <CartLayout 
                title={title[1]}
                description={description[1]}
                price={price[1]}/>  
                <CartLayout 
                title={title[2]}
                description={description[2]}
                price={price[2]}/> 
                </div>
            </div>
            <div className="total">
                <div style={{marginRight: "10px"}}><strong>{total}{",00 €"} </strong></div>
                <Button color="primary" onClick={()=>{onSubmit()}}>Vai al checkout</Button>
            </div>

        </Layout>
    );
};

export default Cart;