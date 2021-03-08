import { ClientHeader,  ClientCategories } from 'components/layouts/client-layout';
import React from 'react';
import styles from './Layout.module.css';

interface Props{
    header?: boolean,
    categories?: boolean,
    children: any,
}

const Layout: React.FC<Props> = ({header, categories, children}) => {
    return (
        <>
            {header && <ClientHeader />}
            {categories && <ClientCategories/>}
            <main className={styles.main}>{children}</main>
        </>
    );
}

export default Layout;