import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {

    return (
        <div className={styles.footer}>
            <p><strong>SWException</strong></p>
            <p>Via Paolotti, 12 , Padova</p>
            <p>Contatti:</p>
            <p>04525-15488441</p>
            <p>
                <a href="mailto:swexception@outlook.com?subject=Cancel%20Request&body=This%20is%20an%20example">swexception@outlook.com</a>
            </p>
        </div>
    );
}

export default Footer;