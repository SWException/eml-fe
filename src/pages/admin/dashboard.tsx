import React from 'react';
import { useRouter } from 'next/router';
import { AdminLayout } from 'components/layouts/AdminLayout';

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
            <button type="button" onClick={redirectProductManagement}>Manage your products</button>
            <button type="button" onClick={redirectOrdersManagement}>Manage your orders</button>
            <button type="button" onClick={redirectCategoryManagement}>Manage your categories</button>
            <button type="button" onClick={redirectTaxManagement}>Manage your taxes</button>
            <button type="button" onClick={redirectCustomerManagement}>Manage your customers</button>
        </AdminLayout>
    );
};

export default Dashboard;