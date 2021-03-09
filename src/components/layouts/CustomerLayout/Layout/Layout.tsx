import { CustomerHeader,  CustomerCategories } from 'components/layouts/CustomerLayout';
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
            {header && <CustomerHeader />}
            {categories && <CustomerCategories/>}
            <main className={styles.main}>{children}</main>
        </>
    );
}

export default Layout;