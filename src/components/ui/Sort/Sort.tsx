import React, { ChangeEvent } from 'react';
import { SearchRules } from 'types';
import styles from './Sort.module.css';

interface Props {
    setFilters: ((T: SearchRules) => Promise<void>)
}

const Sort: React.FC<Props> = ({ setFilters }) => {

    const updateProducts = async (e: ChangeEvent<HTMLSelectElement>): Promise<void> => {
        const filters: SearchRules = {
            sorting: e.target.value
        }
        setFilters(filters);
    }

    return (
        <>
          <form className={styles.form}>
                <div>
                    <select className={styles.select} onChange={(e: ChangeEvent<HTMLSelectElement>) => updateProducts(e)}>
                        <option value = "asc">
                            Low to High
                        </option>
                        <option value = "desc">
                            High to Low
                        </option>
                    </select>
                </div>
            </form>
        </>
    );
};

export default Sort;