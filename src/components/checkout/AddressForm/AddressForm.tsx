import React from "react";
import style from './AddressForm.module.css'
import {Form, Label, Input } from 'reactstrap';


const AddressForm: React.FC = () => {

  return (
    <Form>
      <Label>Name:</Label>
      <Input type="text" placeholder="Name"/>
      <Label>Surname:</Label>
      <Input type="text" placeholder="Surname"/>
      <Label>Address:</Label>
      <Input type="text" placeholder="Address"/>
      <Label>Number:</Label>
      <Input type="text" placeholder="Number"/>
      <Label>CAP:</Label>
      <Input type="text" placeholder="CAP"/>
      <Label>City:</Label>
      <Input type="text" placeholder="City"/>
      <Label>Province:</Label>
      <Input type="text" placeholder="Province"/>
      <Label>Country:</Label>
      <Input type="text" placeholder="Country"/>
    </Form>
  );
}

export default AddressForm;
