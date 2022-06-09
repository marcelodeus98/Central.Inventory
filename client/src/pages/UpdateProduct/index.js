import React from 'react';
import GoBackLink from '../../components/GoBackLink';
import  Header  from '../../components/Header';
import {Form, Input} from '@rocketseat/unform';
import * as yup from "yup";
import api from '../../services/api';
import './styles.css';

const UpdateEquipment = yup.object().shape({
  id_equipment: yup.number().required("O ID do equipamento é obrigatório"),
  name_equipment: yup.string().required("É nome do equipamento é obrigatório"), 
}
)

function UpdateProduct() {

  async function handleUpdateName_all({
    id_equipment,
    name_equipment,
  }) {
    try{
      const response = await api.post('/updateProduct', {id_equipment, name_equipment})
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
              <Input name="id_equipment" type="number" placeholder='Informe o ID do equipamento'/>
              <Input name="name_equipment" type="text" placeholder='Nome'/>  
            </div>
          </div>
        </div>
    
        <Header/>
      </Form>
    </>
  )
}

export default UpdateProduct;