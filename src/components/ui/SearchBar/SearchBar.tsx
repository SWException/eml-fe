import { useRouter } from 'next/router';
import React, { Dispatch, ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import styles from './SearchBar.module.css';


const SearchBar: React.FC = () => {

    const router = useRouter();
    const [searchField, setSearchField]: [string, Dispatch<string>] = useState<string>("");
    const [isListened, setIsListened]: [boolean, Dispatch<boolean>] = useState<boolean>(false);
    
    const updateSearchField = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearchField(e.target.value);
    }

    const setListeners = (e: FormEvent<HTMLInputElement>): void => {
        
        if(isListened === false){
            setIsListened(true);
            e.target.addEventListener("keyup", function (event: any) {
                console.log(event.target.value);
                if (event.key === "Enter" ) {  
                    router.push('/search?search=' + event.target.value);
                    event.preventDefault();
                }
            });
        }
    }

    return (
        <>
            <div className={styles.div}>
                <input className={styles.input} type="text" onInput={(e) => {setListeners(e)}} onChange={(e) => updateSearchField(e)} placeholder="Search Product by name..." />
            </div>
        </>
    );
};

export default SearchBar;