import { Button, PopoverHeader, PopoverBody,UncontrolledPopover } from 'reactstrap';
import React, {useState} from 'react';
import {Tax} from 'types';
import { TaxesService } from 'services';

interface Props{
    tax: Tax,
}

const EditTax: React.FC<Props> = ({tax}) =>{

    const [newTaxDescription, setNewTaxDescription] = useState("");
    const [newTaxValue, setNewTaxValue] = useState<number>(0);

    const editTax = async(id: string, value:number, description:string) =>
    {
      try {
        let tax: Tax = {id, value, description};
        console.log(tax);
        const {status, message} = await TaxesService.modifyTax(tax.id, newTaxValue, newTaxDescription);
        console.log(status, message);
            if(status == "success"){
                //AGGINGERE ESITO POSITIVO
                /*setInfo({
                    ...info,
                    messageShow: "Tax added"
                })*/
            } else {
                /*setInfo({
                    ...info,
                    error: "Error on loading the tax! Try again.."
                })*/
            }
      } catch(err) {
        console.log("Errore", err)
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
            <Button color="primary" size="lg" id={"tax" + tax.id} type="button">EDIT</Button>
            <UncontrolledPopover trigger="legacy" placement="top" target={"tax" + tax.id}>
                <PopoverHeader style={{fontSize:"1.5em"}}>Edit Tax</PopoverHeader>
                <PopoverBody>
                    <label style={{fontSize:"1.5em"}}>Description:</label>
                    <input type="text" className="form-control" placeholder="Insert name.."  onChange={(e)=>{descriptionChange(e)}} style={{fontSize:"1.5em"}}/>
                    <br/>
                    <label style={{fontSize:"1.5em"}}>Value:</label>
                    <input type="number" className="form-control" placeholder="Insert value.."  onChange={(e)=>{valueChange(e)}} min="0" style={{fontSize:"1.5em"}}/>
                    <Button size="lg" color="primary" style={{marginTop:"1em"}} onClick={() => editTax(tax.id, newTaxValue, newTaxDescription )}>Save</Button>
                </PopoverBody>
            </UncontrolledPopover>
        </div>
    )
}

export default EditTax;