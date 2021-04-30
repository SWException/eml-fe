import { Button, PopoverHeader, PopoverBody,UncontrolledPopover } from 'reactstrap';
import React from 'react';
import { TaxesService } from 'services';
import { useState } from 'react';


const AddNewTax: React.FC = () =>{
    
    const [info, setInfo] = useState({
        error: '',
        messageShow: ''
    })

    const [newTaxDescription, setNewTaxDescription] = useState("");
    const [newTaxValue, setNewTaxValue] = useState("");

    const createTax = async() =>{
        try {
            const { status, message } = await TaxesService.createTax(newTaxValue, newTaxDescription);
            console.log(status, message);
            if(status == "success"){
                setInfo({
                    ...info,
                    messageShow: "Tax added"
                })
            } else {
                setInfo({
                    ...info,
                    error: "Error on loading the tax! Try again.."
                })
            }
        } catch(err) {
            setInfo({
                ...info,
                error: "Error on loading tax! Try later..."
            })
        }
    }

    const descriptionChange = (e:React.FormEvent<HTMLInputElement>) :void => {
        setNewTaxDescription((e.target as HTMLTextAreaElement).value);
    }
    const valueChange = (e:React.FormEvent<HTMLInputElement>) :void => {
        setNewTaxValue(parseFloat((e.target as HTMLTextAreaElement).value));
        
    }

    return (
        <div>
            <Button color="primary" size="lg" id="PopoverLegacy" type="button">Add New Tax</Button>
            <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverLegacy">
                <PopoverHeader style={{fontSize:"1.5em"}}>Add New Tax</PopoverHeader>
                <PopoverBody>
                    <label style={{fontSize:"1.5em"}}>Description:</label>
                    <input type="text" className="form-control" placeholder="Insert name.." onChange={(e:React.FormEvent<HTMLInputElement>)=>{descriptionChange(e)}} style={{fontSize:"1.5em"}}/>
                    <br/>
                    <label style={{fontSize:"1.5em"}}>Value:</label>
                    <input type="number" className="form-control" placeholder="Insert value.." onChange={(e:React.FormEvent<HTMLInputElement>)=>{valueChange(e)}} min="0" style={{fontSize:"1.5em"}}/>
                    <Button size="lg" color="primary" onClick={createTax} style={{marginTop:"1em"}}>Save</Button>
                </PopoverBody>
            </UncontrolledPopover>
        </div>
    )

}

export default AddNewTax;