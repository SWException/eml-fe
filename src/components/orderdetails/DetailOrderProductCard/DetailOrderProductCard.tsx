import React, {useEffect, useState} from 'react';
import styles from './DetailOrderProductCard.module.css';

interface Props {   //DA RIVEDERE ASSOLUTAMENTE
    id?: number,
    date?: string,
    total?: number,
    state?: string, 
    idp?: number,
    name?: string,
    price?: number,
    quantity?: number,
}

const DetailOrderProductCard: React.FC<Props> = ({id, date, total, state, idp, name, price, quantity}) => {
    
    return (
        <div className="">
            <div className="">
                <div className="">
                    <div className="DetOrder" style={{}}>
                        <p>{id} {date} {total} {state}</p>
                    </div>
                    <div className="DetProducts" style={{}}>
                        <p>{idp} {name} {price}{" €"} x{quantity}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailOrderProductCard;
