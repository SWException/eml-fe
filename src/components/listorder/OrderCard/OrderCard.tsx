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
                        <p>ORDER ID: {id} DATE: {date} TOTAL: {total} ARTICLE COUNT: {totart} STATUS: {state} </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
