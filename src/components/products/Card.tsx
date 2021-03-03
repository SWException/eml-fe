import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import {useEffect, useState} from 'react';

const CardLayout = (props) => {

    const [quantity, setQuantity] = useState(0);

    useEffect(()=>{
        setQuantity(props.quantity);
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
                        <h5 className="card-title">{props.title.toUpperCase()}</h5>
                        <h3><strong>{props.price} €</strong></h3>
                        <p>Quantità: {quantity}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardLayout;
