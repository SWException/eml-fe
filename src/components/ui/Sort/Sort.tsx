import React, { useState } from 'react';
import styles from './Sort.module.css';

const Sort: React.FC = () => {
  return (
    <>
      <form className={styles.form}>
        <div>
        <select>
          <option>
            Low to High     
          </option>
          <option>
            High to Low    
          </option>
        </select>
        </div>
      </form>
    </>
  );
};

export default Sort;