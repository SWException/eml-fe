import { Button, PopoverHeader, PopoverBody, UncontrolledPopover } from 'reactstrap';
import { CategoriesService } from 'services';
import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';

interface Props {
    loadCategories: (() => void)
}

const AddNewCategory: React.FC<Props> = ({ loadCategories }) => {
    const [newCategory, setNewCategory] = useState("");

    const createCategories = async () => {
        try {
            const response: boolean = await CategoriesService.createCategories(newCategory);
            console.log(response);
            if (response) {
                await loadCategories();
                alert("Category added successfully!");
            } else {
                alert("Something went wrong, try again later ..");
            }
        } catch (err) {
            console.log("Errore", err);
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setNewCategory(e.target.value);
    }

    return (
        <div>
            <Button color="primary" size="lg" id="PopoverLegacy" type="button">Add New Category</Button>
            <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverLegacy">
                <PopoverHeader style={{ fontSize: "1.5em" }}>Add New Category</PopoverHeader>
                <PopoverBody>
                    <label style={{ fontSize: "1.5em" }}>Category name:</label>
                    <input type="text" className="form-control" onChange={(e) => { handleChange(e) }} placeholder="Insert name.." style={{ fontSize: "1.5em" }} />
                    <Button size="lg" color="primary" style={{ marginTop: "1em" }} onClick={() => { createCategories() }}>Save</Button>
                </PopoverBody>
            </UncontrolledPopover>
        </div>
    )

}

export default AddNewCategory;