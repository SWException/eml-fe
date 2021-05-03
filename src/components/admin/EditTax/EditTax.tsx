import { Button, PopoverHeader, PopoverBody, UncontrolledPopover } from 'reactstrap';
import React, { ChangeEvent, useState } from 'react';
import { EditTax, Tax } from 'types';
import { TaxesService } from 'services';

interface Props {
    tax: Tax,
}

const EditExistingTax: React.FC<Props> = ({ tax }) => {

    const [newTaxDescription, setNewTaxDescription] = useState(tax.description);
    const [newTaxValue, setNewTaxValue] = useState(tax.value);

    const editTax = async () => {
        try {
            const editTax: EditTax = { value: newTaxValue, description: newTaxDescription };
            const result: boolean = await TaxesService.modifyTax(tax.id, editTax);
            console.log(result);
            confirm("Tax edited successfully!");
        } catch (err) {
            console.log(err);
            alert("Something went wrong, try again later ..");
        }
    }

    const descriptionChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setNewTaxDescription(e.target.value);
    }
    const valueChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setNewTaxValue(e.target.valueAsNumber);
    }

    return (
        <div>
            <Button color="primary" size="lg" id={"tax" + tax.id} type="button">EDIT</Button>
            <UncontrolledPopover trigger="legacy" placement="top" target={"tax" + tax.id}>
                <PopoverHeader style={{ fontSize: "1.5em" }}>Edit Tax</PopoverHeader>
                <PopoverBody>
                    <label style={{ fontSize: "1.5em" }}>Description:</label>
                    <input type="text" className="form-control" placeholder="Insert name.." value={newTaxDescription} onChange={(e) => { descriptionChange(e) }} style={{ fontSize: "1.5em" }} />
                    <br />
                    <label style={{ fontSize: "1.5em" }}>Value:</label>
                    <input type="number" className="form-control" placeholder="Insert value.." value={newTaxValue} onChange={(e) => { valueChange(e) }} min="0" style={{ fontSize: "1.5em" }} />
                    <Button size="lg" color="primary" style={{ marginTop: "1em" }} onClick={() => editTax()}>Save</Button>
                </PopoverBody>
            </UncontrolledPopover>
        </div>
    )
}

export default EditExistingTax;