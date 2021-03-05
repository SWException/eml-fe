import { Button } from "components/ui";
import React from "react";
import style from './AddressForm.module.css'


const AddressForm: React.Props = () => {

  return (
    <>
      <input type="text" placeholder="Name"/>
      <input type="text" placeholder="Surname"/>
      <input type="text" placeholder="Address"/>
      <input type="text" placeholder="Number"/>
      <input type="text" placeholder="CAP"/>
      <input type="text" placeholder="City"/>
      <input type="text" placeholder="Province"/>
      <input type="text" placeholder="Country"/>
    </>
  );
}

export default AddressForm;
