import React from 'react';
import GoBackLink from '../../components/GoBackLink';
import  Header  from '../../components/Header';
import { useLocation } from 'react-router-dom';
import {Form, Input} from '@rocketseat/unform';
import * as yup from "yup";
import api from '../../services/api';
import './styles.css';

const InputEquipment = yup.object().shape({
  quantEquipment: yup.number().required("A quantidade do produto é obrigatório"),

});

function OutputProduct() {
  const location = useLocation();
  const { idEquipment } = location.state || {};

  async function handleUpdateQuantAll({
    quantEquipment,
  }) {
    try{
      const response = await api.post('/product/output/', {idEquipment, quantEquipment})
      console.log(response.data)
      alert("Quantidade atualizado, com sucesso!")
    } catch(err){
        alert("Quantidade não atualizada!");
    };
  };

  return (
    <>
      <section className="logo-container">
        <h1 className="title-conatiner">Central.Inventory</h1>
      </section>  
      <Form onSubmit={handleUpdateQuantAll} schema={InputEquipment}>  
        <div className='client-container'>
          <GoBackLink/>
          <div className='content'>
            <div className='input-group'>
              <Input name="quantEquipment" type="number" placeholder='Quantidade'/>  
              <Input name="dateOutput" type="date" placeholder='Data'/>
            </div>
          </div>
        </div>
    
        <Header/>
      </Form>
    </>
  )
}

export default OutputProduct;