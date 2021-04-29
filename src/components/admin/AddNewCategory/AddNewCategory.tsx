import { Button, PopoverHeader, PopoverBody,UncontrolledPopover } from 'reactstrap';
import { CategoriesService } from 'services';
import { Categories, Category } from 'types';
import React, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';



const AddNewCategory: React.FC = () =>{

    const [info, setInfo] = useState({
        error: '',
        messageShow: ''
    })

    const [values, setValues] = useState<Category>({
        name:""
    });


    const createCategories = async() =>{
        try {
            const { status, message } = await CategoriesService.createCategories(values);
            console.log(status);
            if(status == "success"){
                setInfo({
                    ...info,
                    messageShow: "Category added"
                })
            } else {
                setInfo({
                    ...info,
                    error: "Error on loading the category! Try again.."
                })
            }
        } catch(err) {
            setInfo({
                ...info,
                error: "Error on loading category! Try later..."
            })
        }
    }

    const handleChange = (name:string, e:React.FormEvent<HTMLInputElement>) :void => {
        setValues({
            ...values,
            [name]: e.currentTarget.value
        })
    }


    return (
        <div>
            <Button color="primary" size="lg" id="PopoverLegacy" type="button">Add New Category</Button>
            <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverLegacy">
                <PopoverHeader style={{fontSize:"1.5em"}}>Add New Category</PopoverHeader>
                <PopoverBody>
                <label style={{fontSize:"1.5em"}}>Name:</label>
                <input type="text" className="form-control" onChange={(e)=>{handleChange('recipientName', e)}} placeholder="Insert name.." style={{fontSize:"1.5em"}}/>
                <Button size="lg" color="primary" style={{marginTop:"1em"}} onClick={createCategories}>Save</Button>
                </PopoverBody>
            </UncontrolledPopover>
        </div>
    )

}

export default AddNewCategory;