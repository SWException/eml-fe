import React, {useEffect, useState} from 'react';

interface Props {
    id: number,
    date: string,
    total: number,
    totart: number,
    state: string,    
}

const OrderCard: React.FC<Props> = ({id, date, total, totart, state}) => {
    return (
        <div className="">
            <div className="">
                <div className="">
                    <div className="" style={{}}>
                        <p>{id} {date} {total} {totart} {state} <button type="button">Order Summary</button></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
