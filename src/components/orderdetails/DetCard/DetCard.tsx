import React, {useEffect, useState} from 'react';

interface Props {
    id: number,
    date: string,
    total: number,
    state: string, 
    idp: number,
    name: string,
    price: number,
    quantity: number,
}

const DetCard: React.FC<Props> = ({id, date, total, state, idp, name, price, quantity}) => {
    
    return (
        <div className="">
            <div className="">
                <div className="">
                    <div className="DetOrder" style={{}}>
                        <p>{id} {date} {total} {state}</p>
                    </div>
                    <div className="DetProducts" style={{}}>
                        <p>{idp} {name} {price}{" €"} {quantity}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetCard;
