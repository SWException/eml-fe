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
                <div className={styles.filterbox}>
                    <div className="md-form md-outline my-0">
                        <input id="from" type="number" min="0" placeholder="€ Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                        - 
                        <input id="to" type="number" min="0" placeholder="€ Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                    </div>
                    <div>
                    <Button color="primary" size="lg" className={styles.filterButton} onClick={() => updateProducts(minPrice, maxPrice)}>FILTER</Button>
                    <Button color="primary" size="lg" className={styles.filterButton} onClick={() => reset()}>RESET</Button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Filters;