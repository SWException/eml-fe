import { Button, PopoverHeader, PopoverBody,UncontrolledPopover } from 'reactstrap';
import React from 'react';


const AddNewCategory: React.FC = () =>{

    return (
        <div>
            <Button color="primary" size="lg" id="PopoverLegacy" type="button">Add New Category</Button>
            <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverLegacy">
                <PopoverHeader style={{fontSize:"1.5em"}}>Add New Category</PopoverHeader>
                <PopoverBody>
                <label style={{fontSize:"1.5em"}}>Name:</label>
                <input type="text" className="form-control" placeholder="Insert name.." style={{fontSize:"1.5em"}}/>
                <Button size="lg" color="primary" style={{marginTop:"1em"}}>Save</Button>
                </PopoverBody>
            </UncontrolledPopover>
        </div>
    )

}

export default AddNewCategory;