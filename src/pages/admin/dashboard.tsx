import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AdminLayout } from 'components/layouts/AdminLayout';
import styles from 'styles/Dashboard.module.css';
import Image from 'next/image';
import { sessionService } from 'services';
import { User } from 'types';

const Dashboard: React.FC = () => {
    const router = useRouter();

    useEffect(()=>{
        const userProfile: User = sessionService.getLocalStorage();
        if(userProfile?.role != 'Admin'){
            router.push('/');
        }
    })

    const redirectProductManagement = (): void => {
        router.push('/admin/productManagement');
    }
    const redirectOrdersManagement = (): void => {
        router.push('/admin/orderManagement');
    }
    const redirectTaxManagement = (): void => {
        router.push('/admin/taxManagement');
    }
    const redirectCategoryManagement = (): void => {
        router.push('/admin/categoryManagement');
    }
    const redirectCustomerManagement = (): void => {
        router.push('/admin/customerManagement');
    }
    const redirectProfile = (): void => {
        router.push('/profile');
    }

    return (
        <AdminLayout header>
            <table className={styles.table}>
                <tbody>
                    <tr className={styles.tr}>
                        <th className={styles.th}>
                            <button className={styles.div} onClick={() => {redirectProductManagement()}}>
                                <Image src="/product.png" width={40} height={40} />
                                <p><b>Manage product</b></p>
                                <p>Here you can add, edit and remove a product</p>
                            </button>
                        </th>
                        <th className={styles.th}>
                            <button className={styles.div} onClick={() => {redirectOrdersManagement()}}>
                                <Image src="/orders.png" width={40} height={40} />
                                <p><b>Manage orders</b></p>
                                <p>Here you can see all clients's orders and manage them.</p>
                            </button>
                        </th>
                    </tr>
                    <tr className={styles.tr}>
                        <th className={styles.th}>
                            <button className={styles.div} onClick={() => {redirectCategoryManagement()}}>
                                <Image src="/category.png" width={40} height={40} />
                                <p><b>Manage categories</b></p>
                                <p>Here you can add, edit and remove a category</p>
                            </button>
                        </th>
                        <th className={styles.th}>
                            <button className={styles.div} onClick={() => {redirectTaxManagement()}}>
                                <Image src="/tax.png" width={40} height={40} />
                                <p><b>Manage taxes</b></p>
                                <p>Here you can add, edit and remove a taxes</p>
                            </button>
                        </th>
                    </tr>
                    <tr className={styles.tr}>
                        <th className={styles.th}>
                            <button className={styles.div} onClick={() => {redirectCustomerManagement()}}>
                                <Image src="/customers.png" width={40} height={40} />
                                <p><b>Manage customers</b></p>
                                <p>Here you can see all customers and contact them</p>
                            </button>
                        </th>
                        <th className={styles.th}>
                            <button className={styles.div} onClick={() => {redirectProfile()}}>
                                <Image src="/profile.png" width={40} height={40} />
                                <p><b>Profile</b></p>
                                <p>Here you can see your profile</p>
                            </button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </AdminLayout>
    );
};

export default Dashboard;