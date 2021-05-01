import { AdminLayout } from 'components/layouts/AdminLayout';
import React, { useEffect, useState } from 'react'
import styles from 'styles/AddNewProduct.module.css'
import { Button } from 'reactstrap'
import { Category, Product, Tax } from 'types';
import { CategoriesService, ProductService } from 'services';
import { GetServerSideProps } from 'next';
import { TaxesService } from 'services/taxesService';

interface Props {
    product: Product,
    categories: Category[],
    taxes: Tax[],
}

const EditExistingProduct: React.FC<Props> = ({ product, categories, taxes }) => {

    const renderShow = (): any => (
        <div className={styles.div}>
            <label>Show:</label>
            <input className={styles.inputcheck} type="radio" id="visible" name="visibilty" value="visible" checked={product.show == true} />
            <label>Visible</label>
            <input className={styles.inputcheck} type="radio" id="notVisible" name="visibilty" value="notVisible" checked={product.show == false} />
            <label>Not visible</label>
        </div>
    )

    const renderShowHome = (): any => (
        <div className={styles.div}>
            <label>Show in Best Product:</label>
            <input className={styles.inputcheck} type="radio" id="BPv" name="BP" value="v" checked={product.showHome == true} />
            <label>Visible</label>
            <input className={styles.inputcheck} type="radio" id="BPnv" name="BP" value="nv" checked={product.showHome == false} />
            <label>Not visible</label>
        </div>
    )

    const renderCategoryCombobox = (): any => (
        <div className={styles.div}>
            <label>Category:</label>
            <select className={styles.select}>
                {categories?.map((category) => (
                    <option value={category.id} selected={category.id == product.categoryId}>{category.name}</option>
                ))}
            </select>
        </div>
    )

    const renderTaxesCombobox = (): any => (
        <div className={styles.div}>
            <label>VAT</label>
            <select className={styles.select}>
                {taxes?.map((tax) => (
                    <option value={tax.id} selected={tax.id == product.taxId}>{tax.value} - {tax.description}</option>
                ))}
            </select>
        </div>
    )

    return (
        <AdminLayout header>
            <h1>Edit existing product</h1>
            {product ? (
                <form className={styles.form}>
                    <div className={styles.div}>
                        <label>Name:</label>
                        <input className={styles.input} type="text" value={product.name} />
                    </div>
                    <div className={styles.div}>
                        <label >Description:</label>
                        <textarea className={styles.textarea} value={product.description} />
                    </div>
                    <div className={styles.div}>
                        <label>Photo:</label>
                        <input className={styles.inputfile} type="file" />
                    </div>
                    <div className={styles.div}>
                        <label>Secondary photos (MAX 4)</label>
                        <input className={styles.inputfile} type="file" />
                    </div>
                    {renderCategoryCombobox()}
                    <div className={styles.div}>
                        <label>Price</label>
                        <input className={styles.input} type="number" min="1" value={product.netPrice} />
                    </div>
                    {renderTaxesCombobox()}
                    {renderShow()}
                    <div className={styles.div}>
                        <label>Warehouse stock:</label>
                        <input className={styles.input} type="number" min="0" value={product.stock} />
                    </div>
                    {renderShowHome()}
                    <div className={styles.div}>
                        <Button color="primary" size="lg" type="button">SAVE</Button>
                    </div>
                </form>
            ) : (
                <div>LOADING SPINNER</div>
            )}
        </AdminLayout>
    );
};

export default EditExistingProduct;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.query?.id as string;

    try {
        const { product } = await ProductService.fetchProduct(id);
        const categories = await CategoriesService.fetchAllCategories();
        const { data } = await TaxesService.getVATTaxes();
        const taxes = data; // DA VEDERE PORCAMANADOONA
        return {
            props: { product, categories, taxes },
        }
    } catch (err) {
        console.log(err);
    }
}