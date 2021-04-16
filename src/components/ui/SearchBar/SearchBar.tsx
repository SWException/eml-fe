import React, { useState, useRef, useEffect } from 'react';
import styles from './SearchBar.module.css';
import Image from 'next/image'
import {Button} from 'reactstrap';

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  //const searchRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className={styles.form}>
        <input className={styles.input} type="text" placeholder="Search Product by..."/>
        <Button className={styles.searchButton} type="submit" formAction="/products" color="light">
          <Image src="/iconsearch.png" width={20} height={20}/>
        </Button>
      </div>
    </>
  );
};

export default SearchBar;