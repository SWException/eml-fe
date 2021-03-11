import { CustomerHeader,  CustomerCategories, CustomerFooter } from 'components/layouts/CustomerLayout';
import React from 'react';
import styles from './Layout.module.css';

interface Props{
    header?: boolean,
    categories?: boolean,
    footer?: boolean,
    children: any,
}

const Layout: React.FC<Props> = ({header, categories, footer, children}) => {
    return (
        <>
            {header && <CustomerHeader />}
            {categories && <CustomerCategories/>}
            <main className={styles.main}>{children}</main>
            {footer && <CustomerFooter/>}
        </>
    );
}

export default Layout;