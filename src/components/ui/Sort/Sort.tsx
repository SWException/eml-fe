import React, { ChangeEvent, useState } from 'react';
import { useEffect } from 'react';
import { SearchRules } from 'types';
import styles from './Sort.module.css';

interface Props {
    setFilters: (() => Promise<void>);
    searchRules: SearchRules;
}

const Sort: React.FC<Props> = ({ setFilters, searchRules }) => {

    const [currentValue, setCurrentValue] = useState<string>();
    useEffect(() => {
        setCurrentValue("");
    }, [searchRules.category])

    const updateProducts = async (e: ChangeEvent<HTMLSelectElement>): Promise<void> => {
        searchRules.sorting = e.target.value;
        setCurrentValue(e.target.value);
        setFilters();
    }

    return (
        <>
            <form className={styles.form}>
                <div>
                    <select className={styles.select} value={currentValue} onChange={(e: ChangeEvent<HTMLSelectElement>) => updateProducts(e)}>
                        <option value = "">
                            ---
                        </option>
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