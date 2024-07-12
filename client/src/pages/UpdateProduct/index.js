import React from 'react';
import GoBackLink from '../../components/GoBackLink';
import  Header  from '../../components/Header';
import { useLocation } from 'react-router-dom';
import {Form, Input} from '@rocketseat/unform';
import * as yup from "yup";
import api from '../../services/api';
import './styles.css';

const UpdateEquipment = yup.object().shape({
  nameEquipment: yup.string().required("É nome do equipamento é obrigatório"), 
});

function UpdateProduct() {
  const location = useLocation();
  const {idEquipment} = location.state || {};

  async function handleUpdateName_all({
    nameEquipment,
  }) {
    try{
      const response = await api.post('/updateProduct', {idEquipment, nameEquipment})
      console.log(response.data)
      alert("Equipamento editado com sucesso!")
    } catch(err){
        alert("Equipamento não atualizada!");
    };
  };

  return (
    <>
      <section className="logo-container">
        <h1 className="title-lgconatiner">Central.Inventory</h1>
      </section>  
      <Form onSubmit={handleUpdateName_all} schema={UpdateEquipment}>  
        <div className='client-container'>
          <GoBackLink/>
          <div className='content'>
            <div className='input-group'>
              <Input name="nameEquipment" type="text" placeholder='Nome'/>  
            </div>
          </div>
        </div>
    
        <Header/>
      </Form>
    </>
  );
};

export default UpdateProduct;