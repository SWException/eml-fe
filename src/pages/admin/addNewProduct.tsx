import { AdminLayout } from 'components/layouts/AdminLayout';
import React from 'react';
import styles from 'styles/AddNewProduct.module.css'
import {Button} from 'reactstrap'


interface Props{
    product: any; //DA MODIFICARE NON APPENA E' PRONTO
}

const AddNewProduct: React.FC<Props> = ({product}) => {

    return (
        <AdminLayout header>
            <h1>Add new product</h1>
            <form className={styles.form}> 
                <div className={styles.div}>
                <label>Name:</label>
                <input className={styles.input} type="text" placeholder="Insert product name"/>
                </div>
                <div className={styles.div}>  
                <label >Description:</label>
                <textarea className={styles.textarea} placeholder="Insert description"/>
                </div> 
                <div className={styles.div}> 
                <label>Photo:</label>
                <input className={styles.inputfile} type="file"/>
                </div> 
                <div className={styles.div}> 
                <label>Secondary photos (MAX 4)</label>
                <input className={styles.inputfile} type="file"/>
                </div> 
                <div className={styles.div}> 
                <label>Category:</label>
                <select className={styles.select}>
                    <option>CATEGORY 1</option>
                    <option>CATEGORY 2</option>
                    <option>CATEGORY 3</option>
                    <option>CATEGORY 4</option>
                    <option>CATEGORY 5</option>
                    <option>CATEGORY 6</option>
                </select>
                </div> 
                <div className={styles.div}> 
                <label>Net price</label>
                <input className={styles.input} type="number" min="0" placeholder="Insert product net price"/>
                </div> 
                <div className={styles.div}> 
                <label>VAT</label>
                <select className={styles.select}>
                    <option>10%</option>
                    <option>22%</option>
                    <option>24%</option>
                </select>
                </div> 
                <div className={styles.div}> 
                <label >Visibility:</label>
                <input className={styles.inputcheck} type="radio" id="visible" name="visibilty" value="visible"/>
                <label>Visible</label>
                <input className={styles.inputcheck} type="radio" id="notVisible" name="visibilty" value="notVisible" checked/>
                <label>Not visible</label>
                </div> 
                <div className={styles.div}> 
                <label>Warehouse stock:</label>
                <input className={styles.input} type="number" min="0" placeholder="Insert product net price"/>
                </div> 
                <div className={styles.div}> 
                <label>Visible in Best Product:</label>
                <input className={styles.inputcheck} type="radio" id="BPv" name="BP" value="v"/>
                <label>Visible</label>
                <input className={styles.inputcheck} type="radio" id="BPnv" name="BP" value="nv" checked/>
                <label>Not visible</label>
                </div> 
                <div className={styles.div}> 
                <Button color="primary" size="lg" type="button">SAVE</Button>
                </div> 
            </form>
        </AdminLayout>
    );
};

export default AddNewProduct;