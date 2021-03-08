import { ClientHeader,  ClientCategories } from 'components/layouts/client-layout';
import React from 'react';
import styles from './Layout.module.css';

const Layout: React.FC = ({header, categories, children}) => {
    return (
        <>
            {header && <ClientHeader />}
            {categories && <ClientCategories/>}
            <main className={styles.main}>{children}</main>
        </>
    );
}

export default Layout;