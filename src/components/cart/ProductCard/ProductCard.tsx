import { ProductQuantity } from 'components/products';
import React, {useEffect, useState} from 'react';

interface Props {
    id: number,
    name: string,
    photo: string,
    price: number,
    quantity: number,    
}

const ProductCard: React.FC<Props> = ({id, name, photo, price, quantity}) => {

    const [_quantity, setQuantity] = useState(0);

    useEffect(()=>{
        setQuantity(quantity);
    }, [])

    return (
        <div className="">
            <div className="">
                <div className="">
                    <img className="" src={photo} height="500" width="500" alt="..."></img>
                </div>
                <div className="">
                    <div className="" style={{}}>
                        <p>This is the id: {id}</p>
                        <p className="">{name.toUpperCase()}</p>
                        <p><strong>{price} €</strong></p>
                        <p>Quantità: {_quantity}</p>
                    </div>
                </div>
                <div>
                    <ProductQuantity/>
                    <button type="button">Remove all</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
