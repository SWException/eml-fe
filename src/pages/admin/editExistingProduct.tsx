import { AdminLayout } from 'components/layouts/AdminLayout';
import React, { useEffect, useState } from 'react'
import styles from 'styles/AddNewProduct.module.css'
import {Button} from 'reactstrap'
import { Category, Product } from 'types';
import { CategoriesService, ProductService } from 'services';
import { GetServerSideProps } from 'next';
import { TaxService } from 'services/taxesService';

interface Props{
    product: Product,
    categories: Category[],
}

const EditExistingProduct: React.FC<Props> = ({product, categories, taxes}) => { 

  
    const renderShow = () :void => {
        if(product.show == true){
            return (
                <div className={styles.div}>
                    <label>Show:</label>
                    <input className={styles.inputcheck} type="radio" id="visible" name="visibilty" value="visible" checked/>
                    <label>Visible</label>
                    <input className={styles.inputcheck} type="radio" id="notVisible" name="visibilty" value="notVisible"/>
                    <label>Not visible</label>
                </div>
            );
        }else {
            return (
                <div className={styles.div}>
                    <label>Show:</label>
                    <input className={styles.inputcheck} type="radio" id="visible" name="visibilty" value="visible"/>
                    <label>Visible</label>
                    <input className={styles.inputcheck} type="radio" id="notVisible" name="visibilty" value="notVisible" checked/>
                    <label>Not visible</label>
                </div>
            );
        }
    }

    const renderShowHome = () :void => {
        if(product.showHome == true){
            return (
                <div className={styles.div}> 
                    <label>Show in Best Product:</label>
                    <input className={styles.inputcheck} type="radio" id="BPv" name="BP" value="v" checked/>
                    <label>Visible</label>
                    <input className={styles.inputcheck} type="radio" id="BPnv" name="BP" value="nv" />
                    <label>Not visible</label>
                </div> 
            );
        }else {
            return (
                <div className={styles.div}> 
                    <label>Show in Best Product:</label>
                    <input className={styles.inputcheck} type="radio" id="BPv" name="BP" value="v" />
                    <label>Visible</label>
                    <input className={styles.inputcheck} type="radio" id="BPnv" name="BP" value="nv" checked/>
                    <label>Not visible</label>
                </div> 
            );
        }
    }
      
    const renderCategoryCombobox = () :void => {
        return (
            <div className={styles.div}> 
                <label>Category:</label>
                <select className={styles.select}>
                    {categories?.map((category)=>(
                        <option value={category.id} selected = {category.id == product.categoryId}>{category.name}</option>
                    ))}
                </select>
            </div> 
        );
    }

    const renderTaxesCombobox = () :void => {
        return (
            <div className={styles.div}> 
                <label>Category:</label>
                <select className={styles.select}>
                    {taxes?.map((tax)=>(
                        <option value={tax.id} selected = {tax.id == product.categoryId}>{tax.value} - {tax.description}</option>
                    ))}
                </select>
            </div> 
        );
    }

    return (
        <AdminLayout header>
            <h1>Edit existing product</h1>
            {product ? (
            <form className={styles.form}> 
                <div className={styles.div}>
                <label>Name:</label>
                <input className={styles.input} type="text" value={product.name}/>
                </div>
                <div className={styles.div}>  
                <label >Description:</label>
                <textarea className={styles.textarea} value={product.description}/>
                </div> 
                <div className={styles.div}> 
                <label>Photo:</label>
                <input className={styles.inputfile} type="file"/>
                </div> 
                <div className={styles.div}> 
                <label>Secondary photos (MAX 4)</label>
                <input className={styles.inputfile} type="file"/>
                </div> 
                {renderCategoryCombobox()}
                <div className={styles.div}> 
                <label>Price</label>
                <input className={styles.input} type="number" min="1" value={product.netPrice}/>
                </div> 
                <div className={styles.div}> 
                <label>VAT</label>
                <select className={styles.select}>
                    <option>10%</option>
                    <option>22%</option>
                    <option>24%</option>
                </select>
                </div> 
                {renderShow()}
                <div className={styles.div}> 
                <label>Warehouse stock:</label>
                <input className={styles.input} type="number" min="0" value={product.stock}/>
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
        const { categories } = await CategoriesService.fetchAllCategories();
        const { taxes } = await TaxService.getVATTaxes();
        return {
            props: {product, categories},
        }
    } catch(err) {
        console.log(err);
    }
}