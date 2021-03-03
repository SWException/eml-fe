import React, {useEffect, useState} from 'react';

interface Props {
    quantity: number,
    title: string,
    price: number
}

const ProductCard: React.FC<Props> = ({quantity, title, price}) => {

    const [_quantity, setQuantity] = useState(0);

    useEffect(()=>{
        setQuantity(quantity);
    }, [])

    //title
    //IMG
    //Descrizione

    return (
        <div className="card mb-3 card-cart">
            <div className="row g-0 cont">
                <div className="col-md-2 img-container-cart">
                    <img className="img-cart-info" src="https://www.artimondo.it/media/cvp/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/p/h/phpSlOF8Z.jpg" alt="..."></img>
                </div>
                <div className="col-md-9 price-title">
                    <div className="card-body" style={{}}>
                        <h5 className="card-title">{title.toUpperCase()}</h5>
                        <h3><strong>{price} €</strong></h3>
                        <p>Quantità: {_quantity}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
