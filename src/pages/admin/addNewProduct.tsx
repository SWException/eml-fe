import { AdminLayout } from 'components/layouts/AdminLayout';
import React, { ChangeEvent, useState } from 'react';
import styles from 'styles/AddNewProduct.module.css'
import { Button } from 'reactstrap'
import { Category, InsertProduct, Tax } from 'types';
import { CategoriesService, ProductService } from 'services';
import { GetServerSideProps } from 'next';
import { TaxesService } from 'services';

interface Props {
    categories: Category[],
    taxes: Tax[],
}

const AddNewProduct: React.FC<Props> = ({ categories, taxes }) => {

    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrimaryPhoto, setProductPrimaryPhoto] = useState("");
    const [productSecondaryPhotos, setProductSecondaryPhotos] = useState([]);
    const [productCategoryId, setProductCategoryId] = useState("");
    const [productNetPrice, setProductNetPrice] = useState(0);
    const [productTaxId, setProductTaxId] = useState("");
    const [productShow, setProductShow] = useState(true);
    const [productStock, setProductStock] = useState(0);
    const [productShowHome, setProductShowHome] = useState(false);

    const addProduct = async () => {
        let productPrimaryPhotoBase64 = await onFileUpload(productPrimaryPhoto);
        let productSecondaryPhotosBase64 = [];
        for (var i = 0; i < productSecondaryPhotos.length; i++) {
            productSecondaryPhotosBase64.push(await onFileUpload(productSecondaryPhotos[i]));
        }
        try {
            const newProduct: InsertProduct = {
                name: productName,
                description: productDescription,
                category: productCategoryId,
                primaryPhoto: productPrimaryPhotoBase64,
                secondaryPhotos: productSecondaryPhotosBase64,
                netPrice: productNetPrice,
                tax: productTaxId,
                show: productShow,
                showHome: productShowHome,
                stock: productStock,
            }
            console.log("Prodotto da inserire", newProduct);
            const { status, message } = await ProductService.addProduct(newProduct);
            console.log(status, message);
        } catch (err) {
            console.log(err);
        }
    };

    const onFileUpload = async (file: Blob) => {

        return new Promise<string>((resolve, reject) => {
            try {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    var base64 = fileReader.result as string;
                    base64 = base64.substring(base64.indexOf(",") + 1);
                    resolve(base64);
                }
            } catch (e) {
                console.log(e);
            }
        })
    };

    const renderShow = (): any => (
        <div className={styles.div}>
            <label>Show:</label>
            <input className={styles.inputcheck} type="radio" id="visible" name="visibilty" value="visible" onChange={(e) => showHandler(true)} />
            <label>Visible</label>
            <input className={styles.inputcheck} type="radio" id="notVisible" name="visibilty" value="notVisible" onChange={(e) => showHandler(false)} />
            <label>Not visible</label>
        </div>
    );

    const renderShowHome = (): any => (
        <div className={styles.div}>
            <label>Show in Best Product:</label>
            <input className={styles.inputcheck} type="radio" id="BPv" name="BP" value="v" onChange={(e) => showHomeHandler(true)} />
            <label>Visible</label>
            <input className={styles.inputcheck} type="radio" id="BPnv" name="BP" value="nv" onChange={(e) => showHomeHandler(false)} />
            <label>Not visible</label>
        </div>
    );

    const renderCategoryCombobox = (): any => (
        <div className={styles.div}>
            <label>Category:</label>
            <select className={styles.select} onChange={(e) => categoryIdHandler(e)}>
                <option value='' selected disabled> - - - </option>
                {categories?.map((category) => (
                    <option value={category.id}>{category.name}</option>
                ))}
            </select>
        </div>
    );

    const renderTaxesCombobox = (): any => (
        <div className={styles.div}>
            <label>VAT</label>
            <select className={styles.select} onChange={(e) => taxIdHandler(e)}>
                <option value='' selected disabled> - - - </option>
                {taxes?.map((tax) => (
                    <option value={tax.id}>{tax.value} - {tax.description}</option>
                ))}
            </select>
        </div>
    );

    const nameHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const name = e.target.value;
        setProductName(name);
    };

    const descriptionHandler = (e: ChangeEvent<HTMLTextAreaElement>): void => {
        const description = e.target.value;
        setProductDescription(description);
    };

    const primaryPhotoHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files[0];
        setProductPrimaryPhoto(file);
    };

    const secondaryPhotosHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        let files = [];
        for (var i = 0; i < e.target.files.length; i++) {
            files.push(e.target.files[i]);
        }
        setProductSecondaryPhotos(files);
    };

    const categoryIdHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
        const categoryId = e.target.value; //COMBOBOX
        setProductCategoryId(categoryId);
    };

    const netPriceHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const netPrice = e.target.value;
        setProductNetPrice(+netPrice);
    };

    const taxIdHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
        const taxId = e.target.value;
        setProductTaxId(taxId);
    };

    const showHandler = (value: boolean): void => {
        const show = value;
        setProductShow(show);
    };

    const stockHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const stock = e.target.value;
        setProductStock(+stock);
    };

    const showHomeHandler = (value: boolean): void => {
        const shoeHome = value;
        setProductShowHome(shoeHome);
    };

    return (
        <AdminLayout header>
            <h1>Add new product</h1>
            <form className={styles.form}>
                <div className={styles.div}>
                    <label>Name:</label>
                    <input className={styles.input} type="text" placeholder="Insert product name" onChange={(e) => nameHandler(e)} />
                </div>
                <div className={styles.div}>
                    <label >Description:</label>
                    <textarea className={styles.textarea} placeholder="Insert description" onChange={(e) => descriptionHandler(e)} />
                </div>
                <div className={styles.div}>
                    <label>Photo:</label>
                    <input className={styles.inputfile} type="file" accept="image/*" onChange={(e) => primaryPhotoHandler(e)} />
                </div>
                <div className={styles.div}>
                    <label>Secondary photos (MAX 4)</label>
                    <input className={styles.inputfile} type="file" multiple accept="image/*" onChange={(e) => secondaryPhotosHandler(e)} />
                </div>
                {renderCategoryCombobox()}
                <div className={styles.div}>
                    <label>Net price</label>
                    <input className={styles.input} type="number" min="0" placeholder="Insert product net price" onChange={(e) => netPriceHandler(e)} />
                </div>
                {renderTaxesCombobox()}
                {renderShow()}
                <div className={styles.div}>
                    <label>Warehouse stock:</label>
                    <input className={styles.input} type="number" min="0" placeholder="Insert stock quantity" onChange={(e) => stockHandler(e)} />
                </div>
                {renderShowHome()}
                <div className={styles.div}>
                    <Button color="primary" size="lg" type="button" onClick={() => addProduct()}>SAVE</Button>
                </div>
            </form>
        </AdminLayout>
    );
};

export default AddNewProduct;

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const categories = await CategoriesService.fetchAllCategories();
        const { data } = await TaxesService.getVATTaxes();
        const taxes = data; // DA VEDERE PORCAMANADOONA
        return {
            props: { categories, taxes },
        }
    } catch (err) {
        console.log(err);
    }
}