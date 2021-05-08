import { AdminLayout } from 'components/layouts/AdminLayout';
import React, { useState, useEffect, ChangeEvent, Dispatch } from 'react'
import styles from 'styles/AddNewProduct.module.css'
import { Button } from 'reactstrap'
import { useRouter } from 'next/router';
import { Category, Product, Tax, EditProduct } from 'types';
import { CategoriesService, ProductService, sessionService } from 'services';
import { GetStaticPaths, GetStaticProps } from 'next';
import { TaxesService } from 'services/taxesService';

interface Props {
    product: Product,
    categories: Category[],
    taxes: Tax[],
    id: string
}

const EditExistingProduct: React.FC<Props> = ({ product, categories, taxes, id }) => {

    const router = useRouter();

    const [productName, setProductName]: [string, Dispatch<string>] = useState<string>(product.name);
    const [productDescription, setProductDescription]: [string, Dispatch<string>] = useState<string>(product.description);
    const [productPrimaryPhoto, setProductPrimaryPhoto]: [Blob, Dispatch<Blob>] = useState<Blob>();
    const [productSecondaryPhotos, setProductSecondaryPhotos]: [Blob[], Dispatch<Blob[]>] = useState<Blob[]>();
    const [productCategoryId, setProductCategoryId]: [string, Dispatch<string>] = useState<string>(product.categoryId);
    const [productNetPrice, setProductNetPrice]: [number, Dispatch<number>] = useState<number>(product.netPrice);
    const [productTaxId, setProductTaxId]: [string, Dispatch<string>] = useState<string>(product.taxId);
    const [productShow, setProductShow]: [boolean, Dispatch<boolean>] = useState<boolean>(product.show);
    const [productStock, setProductStock]: [number, Dispatch<number>] = useState<number>(product.stock);
    const [productShowHome, setProductShowHome]: [boolean, Dispatch<boolean>] = useState<boolean>(product.showHome);

    useEffect(() => {
        if(product==null || product.name == null){
            setProductDetailsIfNotPublic();
        }
        const user = sessionService.getLocalStorage();
        if (sessionService.isAuth() && user.role == 'user') {
            router.push('/');
        }
        else if (!sessionService.isAuth()) {
            router.push('/')
        }
    });

    const setProductDetailsIfNotPublic = async (): Promise<void> => {
        const currentProduct: Product = await ProductService.fetchProduct(id).catch(() => {
            router.push('/admin/productManagement');
            return null;
        });
        setProductName(currentProduct?.name);
        setProductDescription(currentProduct?.description);
        setProductCategoryId(currentProduct?.categoryId);
        setProductNetPrice(currentProduct?.netPrice);
        setProductTaxId(currentProduct?.taxId);
        setProductShow(currentProduct?.show);
        setProductStock(currentProduct?.stock);
        setProductShowHome(currentProduct?.showHome);
    }

    const updateProduct = async (): Promise<void> => {
        const { productPrimaryPhotoBase64, productSecondaryPhotosBase64 } = await getPhotos(productPrimaryPhoto, productSecondaryPhotos);
        try {
            const updatedProduct: EditProduct = {
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
            const res = await ProductService.modifyProduct(product.id, updatedProduct);
            console.log(res);
            router.push('/admin/productManagement');
            alert("Product successfully edited!");
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
            for (let i = 0; i < secondaryPhotos.length; i++) {
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
            <input className={styles.inputcheck} type="radio" id="visible" name="visibility" value="visible" checked={productShow == true} onChange={() => showHandler(true)} />
            <label>Visible</label>
            <input className={styles.inputcheck} type="radio" id="notVisible" name="visibility" value="notVisible" checked={productShow == false} onChange={() => showHandler(false)} />
            <label>Not visible</label>
        </div>
    )

    const renderShowHome = (): JSX.Element => (
        <div className={styles.div}>
            <label>Show in Best Product:</label>
            <input className={styles.inputcheck} type="radio" id="BPv" name="BP" value="v" checked={productShowHome == true} onChange={() => showHomeHandler(true)} />
            <label>Visible</label>
            <input className={styles.inputcheck} type="radio" id="BPnv" name="BP" value="nv" checked={productShowHome == false} onChange={() => showHomeHandler(false)} />
            <label>Not visible</label>
        </div>
    )

    const renderCategoryCombobox = (): JSX.Element => (
        <div className={styles.div}>
            <label>Category:</label>
            <select className={styles.select} value={productCategoryId} onChange={(e) => categoryIdHandler(e)}>
                {categories?.map((category) => (
                    <option key={category.id} value={category.id} >{category.name}</option>
                ))}
            </select>
        </div>
    )

    const renderTaxesCombobox = (): JSX.Element => (
        <div className={styles.div}>
            <label>VAT</label>
            <select className={styles.select} value={productTaxId} onChange={(e) => taxIdHandler(e)}>
                {taxes?.map((tax) => (
                    <option key={tax.id} value={tax.id} >{tax.value} - {tax.description}</option>
                ))}
            </select>
        </div>
    )

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
            <h1>Edit existing product</h1>
            {product ? (
                <form className={styles.form}>
                    <div className={styles.div}>
                        <label>Name:</label>
                        <input className={styles.input} type="text" placeholder="Insert product name" value={productName} onChange={(e) => nameHandler(e)} />
                    </div>
                    <div className={styles.div}>
                        <label >Description:</label>
                        <textarea className={styles.textarea} placeholder="Insert description" value={productDescription} onChange={(e) => descriptionHandler(e)} />
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
                        <input className={styles.input} type="number" min="0" placeholder="Insert product net price" value={productNetPrice} onChange={(e) => netPriceHandler(e)} />
                    </div>
                    {renderTaxesCombobox()}
                    {renderShow()}
                    <div className={styles.div}>
                        <label>Warehouse stock:</label>
                        <input className={styles.input} type="number" min="0" placeholder="Insert stock quantity" value={productStock} onChange={(e) => stockHandler(e)} />
                    </div>
                    {renderShowHome()}
                    <div className={styles.div}>
                        <Button color="primary" size="lg" type="button" onClick={() => { updateProduct() }}>SAVE</Button>
                    </div>
                </form>
            ) : (
                <div>LOADING SPINNER</div>
            )}
        </AdminLayout>
    );
};

export default EditExistingProduct;

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = [];
    const categories = await CategoriesService.fetchAllCategories();
    for(let i = 0; i < categories.length; i++){
        const category = categories[i];
        const productsCategoryList = await ProductService.fetchProducts({category: category.id});
        productsCategoryList?.forEach(product => {
            paths.push({params: { id: product.id }});
        });
    }
    return {paths, fallback: 'blocking'};
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const id = params?.id as string;

    const product = await ProductService.fetchProduct(id).catch((): Product => {
        return {
            id: null,
            name: null,
            description: null,
            primaryPhoto: null,
            secondaryPhotos: null,
            categoryId: null,
            category: null,
            price: null,
            netPrice: null,
            taxId: null,
            tax: null,
            show: null,
            showHome: null,
            stock: null,
        }
    }); // DA SISTEMARE
    const categories = await CategoriesService.fetchAllCategories().catch(() => null);
    const taxes = await TaxesService.fetchTaxes().catch(() => null);
    return {
        props: { product, categories, taxes, id },
        revalidate: 30
    }
}