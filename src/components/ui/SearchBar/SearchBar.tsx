import React, { useState, useRef, useEffect } from 'react';
import styles from './SearchBar.module.css';

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  //const searchRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <form className={styles.searchForm}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search Product..."
        />
        <button className={styles.searchButton} type="submit" formAction="/plp">
          SEARCH
        </button>
      </form>
    </>
  );
};

export default SearchBar;