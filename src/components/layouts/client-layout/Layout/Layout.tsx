import { ClientHeader,  ClientCategories } from 'components/layouts/client-layout';
import React, {Fragment} from 'react';
import styles from './Layout.module.css';

const Layout: React.FC = ({children}) => {
    //decidere quando stampare o no le categories
    return (
        <Fragment>
            <ClientHeader />
            <ClientCategories/>
            <main className={styles.main}>{children}</main>
        </Fragment>
    );
}

export default Layout;