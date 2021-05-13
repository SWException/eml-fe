import { AdminHeader } from 'components/layouts/AdminLayout';
import React from 'react';
import styles from './Layout.module.css';

interface Props {
    header?: boolean,
    children: any,
}

const Layout: React.FC<Props> = ({ header, children }) => {
    return (
        <>
            {header && <AdminHeader />}
            <main className={styles.main}>{children}</main>
        </>
    );
}

export default Layout;