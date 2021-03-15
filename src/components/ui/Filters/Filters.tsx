import React, { useState } from 'react';
import styles from './Filters.module.css';

const Filters: React.FC = () => {
  return (
    <>
      <form>
        <div class="d-flex align-items-center mt-4 pb-1">
          <div class="md-form md-outline my-0">
            <input id="from" type="number" min="0" placeholder="€ Min"/>
          </div>
          <p> - </p>
          <div class="md-form md-outline my-0">
            <input id="to" type="number" min="0" placeholder="€ Max"/>
          </div>
          <button className={styles.filterButton} formAction="/plp">
          FILTER
        </button>
        </div>
      </form>
    </>
  );
};

export default Filters;