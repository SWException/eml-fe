import React from 'react';
import { useRouter } from 'next/router';
import { AdminLayout } from 'components/layouts/AdminLayout';
import {Button} from 'reactstrap'
import styles from 'styles/Dashboard.module.css'
import Image from 'next/image'

const Dashboard: React.FC = () => {
    const router = useRouter();

    const redirectProductManagement = () => {
        router.push('/admin/productManagement');
    }
    const redirectOrdersManagement = () => {
        router.push('/admin/orderManagement');
    }
    const redirectTaxManagement = () => {
        router.push('/admin/taxManagement');
    }
    const redirectCategoryManagement = () => {
        router.push('/admin/categoryManagement');
    }
    const redirectCustomerManagement = () => {
        router.push('/admin/customerManagement');
    }
    

    return (
        <AdminLayout header>
          <table className={styles.table}>
                <tr>
                    <th className={styles.th}>
                        <button className={styles.div} onClick={redirectProductManagement}>
                        <Image src="/product.png" width={40} height={40}/>
                        <p><b>Manage product</b></p>
                        <p>Here you can add, edit and remove a product</p>
                        </button>
                    </th>
                    <th className={styles.th}>
                        <button className={styles.div} onClick={redirectOrdersManagement}>
                        <Image src="/orders.png" width={40} height={40}/>
                        <p><b>Manage orders</b></p>
                        <p>Here you can see all clients's orders and manage them.</p>
                        </button>
                    </th>
                    <th className={styles.th}>
                        <button className={styles.div} onClick={redirectCategoryManagement}>
                        <Image src="/category.png" width={40} height={40}/>
                        <p><b>Manage categories</b></p>
                        <p>Here you can add, edit and remove a category</p>
                        </button>
                    </th>
                </tr>
                <tr>
                    <th className={styles.th}>
                        <button className={styles.div} onClick={redirectTaxManagement}>
                        <Image src="/tax.png" width={40} height={40}/>
                        <p><b>Manage taxes</b></p>
                        <p>Here you can add, edit and remove a taxes</p>
                        </button>
                    </th>
                    <th className={styles.th}>
                        <button className={styles.div} onClick={redirectCustomerManagement}>
                        <Image src="/customers.png" width={40} height={40}/>
                        <p><b>Manage customers</b></p>
                        <p>Here you can see all customers and contact them</p>
                        </button>
                    </th>
                </tr>
            </table>  
        </AdminLayout>
    );
};

export default Dashboard;
