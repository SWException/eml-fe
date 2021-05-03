import { AdminLayout } from 'components/layouts/AdminLayout';
import React, { ChangeEvent, useEffect, useState, Dispatch } from 'react';
import styles from 'styles/AddNewProduct.module.css'
import { Button } from 'reactstrap'
import { Category, InsertProduct, Tax } from 'types';
import { CategoriesService, ProductService, sessionService } from 'services';
import { GetServerSideProps } from 'next';
import { TaxesService } from 'services';
import { useRouter } from 'next/router'

interface Props {
    categories: Category[],
    taxes: Tax[],
}

const AddNewProduct: React.FC<Props> = ({ categories, taxes }) => {

    const router = useRouter();

    const [productName, setProductName]: [string, Dispatch<string>] = useState<string>("");
    const [productDescription, setProductDescription]: [string, Dispatch<string>] = useState<string>("");
    const [productPrimaryPhoto, setProductPrimaryPhoto]: [Blob, Dispatch<Blob>] = useState<Blob>();
    const [productSecondaryPhotos, setProductSecondaryPhotos]: [Blob[], Dispatch<Blob[]>] = useState<Blob[]>();
    const [productCategoryId, setProductCategoryId]: [string, Dispatch<string>] = useState<string>("");
    const [productNetPrice, setProductNetPrice]: [number, Dispatch<number>] = useState<number>(0);
    const [productTaxId, setProductTaxId]: [string, Dispatch<string>] = useState<string>("");
    const [productShow, setProductShow]: [boolean, Dispatch<boolean>] = useState<boolean>(true);
    const [productStock, setProductStock]: [number, Dispatch<number>] = useState<number>(0);
    const [productShowHome, setProductShowHome]: [boolean, Dispatch<boolean>] = useState<boolean>(false);

    useEffect(() => {
        const user = sessionService.getLocalStorage();
        if (sessionService.isAuth() && user.role == 'user') {
            router.push('/');
        }
        else if (!sessionService.isAuth()) {
            router.push('/')
        }
    });

    const addProduct = async (): Promise<void> => {
        const { productPrimaryPhotoBase64, productSecondaryPhotosBase64 } = await getPhotos(productPrimaryPhoto, productSecondaryPhotos);
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
            const res = await ProductService.addProduct(newProduct);
            console.log(res);
        }
        catch (err) {
            console.log(err);
        }
    };

    const getPhotos = async (primaryPhoto: Blob, secondaryPhotos: Blob[]): Promise<{ productPrimaryPhotoBase64: string, productSecondaryPhotosBase64: string[] }> => {
        let productPrimaryPhotoBase64;
        const productSecondaryPhotosBase64 = [];
        if (primaryPhoto) {
            productPrimaryPhotoBase64 = await onFileUpload(primaryPhoto);
        }
        if (secondaryPhotos) {
            for (let i = 0; i < productSecondaryPhotos.length; i++) {
                productSecondaryPhotosBase64.push(await onFileUpload(secondaryPhotos[i]));
            }
        }
        return { productPrimaryPhotoBase64, productSecondaryPhotosBase64 }
    }

    const onFileUpload = async (file: Blob): Promise<string> => {
        return new Promise<string>((resolve) => {
            try {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(file);
                fileReader.onload = () => {
                    let base64 = fileReader.result as string;
                    base64 = base64.substring(base64.indexOf(",") + 1);
                    resolve(base64);
                }
            }
            catch (e) {
                console.log(e);
            }
        })
    };

    const renderShow = (): JSX.Element => (
        <div className={styles.div}>
            <label>Show:</label>
            <input className={styles.inputcheck} type="radio" id="visible" name="visibilty" value="visible" onChange={() => showHandler(true)} />
            <label>Visible</label>
            <input className={styles.inputcheck} type="radio" id="notVisible" name="visibilty" value="notVisible" onChange={() => showHandler(false)} />
            <label>Not visible</label>
        </div>
    );

    const renderShowHome = (): JSX.Element => (
        <div className={styles.div}>
            <label>Show in Best Product:</label>
            <input className={styles.inputcheck} type="radio" id="BPv" name="BP" value="v" onChange={() => showHomeHandler(true)} />
            <label>Visible</label>
            <input className={styles.inputcheck} type="radio" id="BPnv" name="BP" value="nv" onChange={() => showHomeHandler(false)} />
            <label>Not visible</label>
        </div>
    );

    const renderCategoryCombobox = (): JSX.Element => (
        <div className={styles.div}>
            <label>Category:</label>
            <select className={styles.select} defaultValue='#' onChange={(e) => categoryIdHandler(e)}>
                <option value='#' selected disabled> - - - </option>
                {categories?.map((category) => (
                    <option value={category.id}>{category.name}</option>
                ))}
            </select>
        </div>
    );

    const renderTaxesCombobox = (): JSX.Element => (
        <div className={styles.div}>
            <label>VAT</label>
            <select className={styles.select} defaultValue='#' onChange={(e) => taxIdHandler(e)}>
                <option value='#' disabled> - - - </option>
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
        const files = [];
        for (let i = 0; i < e.target.files.length; i++) {
            files.push(e.target.files[i]);
        }
        setProductSecondaryPhotos(files);
    };

    const categoryIdHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
        const categoryId = e.target.value;
        setProductCategoryId(categoryId);
    };

    const netPriceHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        const netPrice = e.target.valueAsNumber;
        setProductNetPrice(netPrice);
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
        const stock = e.target.valueAsNumber;
        setProductStock(stock);
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

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const categories = await CategoriesService.fetchAllCategories();
        const taxes = await TaxesService.fetchTaxes();
        return {
            props: { categories, taxes },
        }
    }
    catch (err) {
        console.log(err);
    }
}