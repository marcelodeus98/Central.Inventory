import React from 'react';
import GoBackLink from '../../components/GoBackLink';
import  Header  from '../../components/Header';
import {Form, Input} from '@rocketseat/unform';
import * as yup from "yup";
import api from '../../services/api';
import './styles.css';

const InputEquipment = yup.object().shape({
  id_equipment: yup.number().required("O nome do produto é obrigatório"),
  quant_equipment: yup.number().required("A quantidade do produto é obrigatório"),

}
)

function OutputProduct() {

  async function handleUpdateQuant_all({
    id_equipment,
    quant_equipment,
  }) {
    try{
      const response = await api.post('/outputProduct', {id_equipment, quant_equipment})
      console.log(response.data)
      alert("Quantidade atualizado, com sucesso!")
    } catch(err){
        alert("Quantidade não atualizada!");
    };
  };



  return (
    <>
      <section className="logo-container">
        <h1 className="title-lgconatiner">Central.Inventory</h1>
      </section>  
      <Form onSubmit={handleUpdateQuant_all} schema={InputEquipment}>  
        <div className='client-container'>
          <GoBackLink/>
          <div className='content'>
            <div className='input-group'>
              <Input name="id_equipment" type="number" placeholder='ID do equipamento'/>
              <Input name="quant_equipment" type="number" placeholder='Quantidade'/>  
              <Input name="setor_output"  placeholder='Setor'/>
              <Input name="date_output" type="date" placeholder='Data'/>
            </div>
          </div>
        </div>
    
        <Header/>
      </Form>
    </>
  )
}

export default OutputProduct;