import { Button, PopoverHeader, PopoverBody, UncontrolledPopover } from 'reactstrap';
import React, { ChangeEvent } from 'react';
import { CategoriesService } from 'services';
import { Category, EditCategory } from 'types';
import { useState } from 'react';

interface Props {
    category: Category;
    error: () => void;
    messageIn: () => void;
}

const EditExistingCategory: React.FC<Props> = ({ category, error, messageIn }) => {

    const [newCategoryName, setNewCategory] = useState("");

    const editCategory = async (id: string, name: string) => {
        try {
            const editCategory: EditCategory = { name: name };
            const response: boolean = await CategoriesService.modifyCategory(category.id, editCategory);
            console.log(response);
            if (response) {
                messageIn()
            } else {
                error()
            }
        } catch (err) {
            console.log("Errore", err)
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setNewCategory(e.target.value);
    }

    return (
        <div>
            <Button color="primary" size="lg" id={"cat" + category.id} type="button">EDIT</Button>
            <UncontrolledPopover trigger="legacy" placement="top" target={"cat" + category.id}>
                <PopoverHeader style={{ fontSize: "1.5em" }}>Edit Category</PopoverHeader>
                <PopoverBody>
                    <label style={{ fontSize: "1.5em" }}>Name:</label>
                    <input type="text" className="form-control" placeholder="Insert name.." onChange={(e) => { handleChange(e) }} style={{ fontSize: "1.5em" }} />
                    <Button size="lg" color="primary" style={{ marginTop: "1em" }} onClick={() => editCategory(category.id, newCategoryName)}>Save</Button>
                </PopoverBody>
            </UncontrolledPopover>
        </div>
    )

}

export default EditExistingCategory;