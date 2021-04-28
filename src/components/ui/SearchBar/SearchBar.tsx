import React, { useState, useRef, useEffect } from 'react';
import styles from './SearchBar.module.css';
import {Button} from 'reactstrap';

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  //const searchRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className={styles.div}>
            <input className={styles.input} type="text" placeholder="Search Product by name..."/>
            <Button type="submit" formAction="/products" color="light" style={{borderRadius: "0px 25px 25px 0px"}}>
                <img src="/iconsearch.png" style={{width:"2.1rem", height:"2.1rem"}}/>
            </Button>
      </div>
    </>
  );
};

export default SearchBar;