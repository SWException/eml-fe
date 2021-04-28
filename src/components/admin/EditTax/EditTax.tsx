import { Button, PopoverHeader, PopoverBody,UncontrolledPopover } from 'reactstrap';
import React from 'react';


const EditTax: React.FC = () =>{

    return (
        <div>
            <Button color="primary" size="lg" id="PopoverLegacy2" type="button">EDIT</Button>
            <UncontrolledPopover trigger="legacy" placement="top" target="PopoverLegacy2">
                <PopoverHeader style={{fontSize:"1.5em"}}>Edit Tax</PopoverHeader>
                <PopoverBody>
                <label style={{fontSize:"1.5em"}}>Name:</label>
                <input type="text" className="form-control" placeholder="Insert name.." style={{fontSize:"1.5em"}}/>
                <br/>
                <label style={{fontSize:"1.5em"}}>Value:</label>
                <input type="number" className="form-control" placeholder="Insert value.." min="0" style={{fontSize:"1.5em"}}/>
                <Button size="lg" color="primary" style={{marginTop:"1em"}}>Save</Button>
                </PopoverBody>
            </UncontrolledPopover>
        </div>
    )

}

export default EditTax;