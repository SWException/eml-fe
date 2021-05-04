import { Button, PopoverHeader, PopoverBody, UncontrolledPopover } from 'reactstrap';
import React, { ChangeEvent } from 'react';
import { TaxesService } from 'services';
import { useState } from 'react';
import { InsertTax } from 'types';

interface Props {
    loadTaxes: (() => void)
}

const AddNewTax: React.FC<Props> = ({loadTaxes}) => {

    const [newTaxDescription, setNewTaxDescription] = useState("");
    const [newTaxValue, setNewTaxValue] = useState<number>(0);

    const createTax = async () => {
        try {
            const newTax: InsertTax = { value: newTaxValue, description: newTaxDescription }
            const result: boolean = await TaxesService.createTax(newTax);
            console.log(result);
            if(result){
                await loadTaxes();
                alert("Tax added successfully!");
            }
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
            <Button color="primary" size="lg" id="PopoverLegacy" type="button">Add New Tax</Button>
            <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverLegacy">
                <PopoverHeader style={{ fontSize: "1.5em" }}>Add New Tax</PopoverHeader>
                <PopoverBody>
                    <label style={{ fontSize: "1.5em" }}>Description:</label>
                    <input type="text" className="form-control" placeholder="Insert name.." onChange={(e) => { descriptionChange(e) }} style={{ fontSize: "1.5em" }} />
                    <br />
                    <label style={{ fontSize: "1.5em" }}>Value:</label>
                    <input type="number" className="form-control" placeholder="Insert value.." onChange={(e) => { valueChange(e) }} min="0" style={{ fontSize: "1.5em" }} />
                    <Button size="lg" color="primary" onClick={createTax} style={{ marginTop: "1em" }}>Save</Button>
                </PopoverBody>
            </UncontrolledPopover>
        </div>
    )

}

export default AddNewTax;