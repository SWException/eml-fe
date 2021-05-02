import { Button, PopoverHeader, PopoverBody, UncontrolledPopover } from 'reactstrap';
import { CategoriesService } from 'services';
import React from 'next/router';
import { ChangeEvent, useState } from 'react';

interface Props {
    error: () => void;
    messageIn: () => void;
}

const AddNewCategory: React.FC<Props> = ({ error, messageIn }) => {
    const [info, setInfo] = useState({
        error: '',
        messageShow: ''
    })

    const [newCategory, setNewCategory] = useState("");

    const createCategories = async () => {
        try {
            const response: boolean = await CategoriesService.createCategories(newCategory);
            console.log(response);
            if (response) {
                messageIn();
            } else {
                error();
            }
        } catch (err) {
            setInfo({
                ...info,
                error: "Error on loading category! Try later..."
            })
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