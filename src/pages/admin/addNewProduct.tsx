import React from 'react';

const AddNewProduct: React.FC = ({product}) => {
    let product2 =  {
        "id": 1,
        "name": "giochi",
        "description": "descrizione del prodotto",
        "photo": "https://www.technogym.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/e/wellness_ball_active_sitting_hero_3_3.jpg",
        "secondaryPhoto": "https://www.technogym.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/w/e/wellness_ball_active_sitting_hero_3_3.jpg",
        "category": "giochi",
        "netprice": 5.99,
        "tax": null
    };

    return (
        <>
            <p>Add new product</p>
            <form>  
                <label for="" >Name</label>
                <input type="text" placeholder="Insert product name"/>
                <br/>
                <label for="" >Description</label>
                <textarea type="text" placeholder="Insert description"/>
                <br/>
                <label for="" >Photo</label>
                <input type="file"/>
                <br/>
                <label for="" >Secondary photos (MAX 4)</label>
                <input type="file"/>
                <br/>
                <label for="" >Category</label>
                <select>
                    <option>CATEGORY 1</option>
                    <option>CATEGORY 2</option>
                    <option>CATEGORY 3</option>
                    <option>CATEGORY 4</option>
                    <option>CATEGORY 5</option>
                    <option>CATEGORY 6</option>
                </select>
                <br/>
                <label for="" >Net price</label>
                <input type="number" placeholder="Insert product net price"/>
                <br/>
                <label for="" >VAT</label>
                <select>
                    <option>10%</option>
                    <option>22%</option>
                    <option>24%</option>
                </select>
                <br/>
                <label for="" >Visibility</label>
                <input type="radio" id="visible" name="visibilty" value="visible"/>
                <label for="visible">Visible</label>
                <input type="radio" id="notVisible" name="visibilty" value="notVisible" checked/>
                <label for="notVisible">Not visible</label>
                <br/>
                <label for="" >Warehouse stock</label>
                <input type="number" placeholder="Insert product net price"/>
                <br/>
                <label for="" >Visible in Best Product</label>
                <input type="radio" id="BPv" name="BP" value="v"/>
                <label for="v">Visible</label>
                <input type="radio" id="BPnv" name="BP" value="nv" checked/>
                <label for="nv">Not visible</label>
            </form>
        </>
    );
};

export default AddNewProduct;