import React, { useState } from 'react';
import styles from './Filters.module.css';
import { SearchRules } from 'types';
import { Button } from 'reactstrap';
import { useEffect } from 'react';

interface Props {
    setFilters: (() => Promise<void>);
    searchRules: SearchRules;
}

const Filters: React.FC<Props> = ({ setFilters, searchRules }) => {

    useEffect(() => {
        setMaxPrice("");
        setMinPrice("");
    }, [searchRules.category])

    const [minPrice, setMinPrice] = useState<string>();
    const [maxPrice, setMaxPrice] = useState<string>();

    const updateProducts = (minPrice: string, maxPrice: string): void => {
        searchRules.minPrice = parseFloat(minPrice);
        searchRules.maxPrice = parseFloat(maxPrice);

        setFilters();
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
                        <Button color="primary" size="lg" className={styles.filterButton} onClick={() => reset()}>RESET PRICE FILTER</Button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Filters;