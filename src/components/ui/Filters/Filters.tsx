import React, { useState } from 'react';
import styles from './Filters.module.css';
import { SearchRules } from 'types';
import { Button } from 'reactstrap';

interface Props {
    setFilters: ((T: SearchRules) => Promise<void>)
}

const Filters: React.FC<Props> = ({ setFilters }) => {

    const [minPrice, setMinPrice] = useState<string>();
    const [maxPrice, setMaxPrice] = useState<string>();

    const updateProducts = (minPrice: string, maxPrice: string): void => {
        const filters: SearchRules = {
            minPrice: parseFloat(minPrice),
            maxPrice: parseFloat(maxPrice)
        }
        setFilters(filters);
    }

    const reset = (): void => {
        setMinPrice("");
        setMaxPrice("");
        updateProducts(undefined, undefined);
    }

    return (
        <>
            <form>
                <div className="d-flex align-items-center mt-4 pb-1">
                    <div className="md-form md-outline my-0">
                        <input id="from" type="number" min="0" placeholder="€ Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                    </div>
                    <p> - </p>
                    <div className="md-form md-outline my-0">
                        <input id="to" type="number" min="0" placeholder="€ Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                    </div>
                    <Button className={styles.filterButton} onClick={() => updateProducts(minPrice, maxPrice)}>FILTER</Button>
                    <Button className={styles.filterButton} onClick={() => reset()}>RESET</Button>
                </div>
            </form>
        </>
    );
};

export default Filters;