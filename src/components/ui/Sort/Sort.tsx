import React, { useState } from 'react';
import styles from './Sort.module.css';

const Sort: React.FC = () => {
  return (
    <>
      <form className={styles.searchForm}>
        <select
          type="number"
          placeholder="Minimum cost"
        >
        <option>
          Price: Low to High
        </option>
        <option>
          Price: High to Low
        </option>
        </select>
      </form>
    </>
  );
};

export default Sort;