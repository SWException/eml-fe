import React, { useState } from 'react';
import styles from './Filters.module.css';

const Filters: React.FC = () => {
  return (
    <>
      <form className={styles.searchForm}>
        <input
          type="number"
          placeholder="Minimum cost"
        />
        <p>Between</p>
        <input
          type="number"
          placeholder="Maximum cost"
        />
        <button className={styles.searchButton} type="submit" formaction="/plp">
          FILTER
        </button>
      </form>
    </>
  );
};

export default Filters;