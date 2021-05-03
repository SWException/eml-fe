import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {

    return (
        <div className={styles.footer} expand="md">
            <p style={{ marginTop: "10px" }} >NOME AZIENDA</p>
            <p>partita iva</p>
            <p>indirizzo</p>
            <p>Contatti:</p>
            <p>telefono</p>
            <p>e-mail cliccabile</p>
        </div>
    );
}

export default Footer;