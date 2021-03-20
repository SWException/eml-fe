import React, { useState, useRef, useEffect } from 'react';
import styles from './SearchBar.module.css';

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  //const searchRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className={styles.form}>
        <input className={styles.input} type="text" placeholder="Search Product..."/>
        <button className={styles.searchButton} type="submit" formAction="/products">
          <img src="iconsearch.png" style={{width:25, height: 25}}/>
        </button>
      </div>
    </>
  );
};

export default SearchBar;