import React, {useEffect, useState } from 'react'; 
import GoBackLink from '../../components/GoBackLink';
import  Header  from '../../components/Header';
import {FiTrash2 } from 'react-icons/fi';
import {ImEnter} from 'react-icons/im';
import {ImExit} from 'react-icons/im';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import {Form, Input} from '@rocketseat/unform';
import Modal from "react-modal";
import * as yup from "yup";
import './styles.css';

Modal.setAppElement("#root");

const validateNameEquipment = yup.object().shape({
  name_equipment: yup.string().required("O nome do produto é obrigatório"),
}
)

function Client() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]) 

  async function loadEquipments() {
    try{
      const response = await api.get('/loadProduct')
      setProducts(response.data)
      console.log(products)
    }catch(err){
      alert("Falha na listagem de equipamentos");
    };
  };

  async function handleDeleteSubmit(id_equipment) {
    try{
      const response = await api.delete(`/deleteProduct/${id_equipment}`)
      setProducts(products.filter(product => product.id_equipment !== id_equipment))
      console.log(response.data)
    }catch(err){
      alert("Não foi possível deletar equipamento!");
    };
  };

  async function handleRegisterSubmit(name_equipment) {
     try{
      const response = await api.post('/registerProduct', name_equipment)
      console.log(response.data)
      alert("Equipamento cadastrado!")
      }catch(err){
        alert("Equipamento não cadastrado!");
      };
    };

    let openModal = () => {
      setIsOpen(true);
    }
    
    let closeModal = () => {
      setIsOpen(false);
    }

  useEffect(()=> {loadEquipments()}, []);
  
  return (
    <>
      <section className="logo-container" style={{width:'auto'}}>
        <h1 className="title-lgcontainer">Central.Inventory</h1>
      </section>   
        <Form onSubmit={handleRegisterSubmit} schema={validateNameEquipment}>   
          <div className='client-container'>
            <GoBackLink/>
        

          <div style={{background:'#1E90FF', marginTop:20, padding:20, borderRadius:8, width:'auto'}}>
            <div className='input-group'>
              <h1 className="title-lgcontainer">Cadastro de produto</h1>
              <Input name='name_equipment' className='title-lgconatainer' placeholder='Produto'/>
            </div>
          </div>
          <Header/>
          <div className='container-client-itens'>
          <ul className ="container-client-itens" style={{background:'#1E90FF',marginTop:10, padding:40, borderRadius:8, width:'auto'}}>
              {products.map(product => (
                <li key={product.id} style={{width:'auto'}}>
                <div>
                  <strong>ID do equipamento</strong>
                  <p name="id_equipment">{product.id_equipment}</p>

                  <strong>Nome do equipamento:</strong>
                  <p>{product.name_equipment}</p>

                  <strong>Quantidade de equipamento:</strong>
                  <p>{product.quant_equipment}</p>
                  </div>
                
                  <div className='separator'>
                    <div></div>  
                  </div>

                  <div className='container-buttons'>
                  
                  <Link to='/input-product'>
                      <button  type="button">
                        <ImEnter size={20} color="#a8a8b3" />
                      </button>
                    </Link>

                    <Link to='/output-product'>
                      <button  type="button">
                        <ImExit size={20} color="#a8a8b3" />
                      </button>
                    </Link>

                    <button onClick={openModal} type="button" style={{paddingLeft:20}}>
                        <FiTrash2 size={20} color="#a8a8b3" />
                      </button>

                      <div className="container-modal">
                        <Modal 
                          isOpen={modalIsOpen}
                          onRequestClose={closeModal}
                          contentLabel="Modal"
                          overlayClassName="modal-overlay"
                          className="modal-content">
                          <h1 className='modal-title'>Você deseja excluir o item ?</h1>
                          <button onClick={() => handleDeleteSubmit(product.id_equipment)} className="button-modal">Sim</button>
                          <button onClick={closeModal} className="button-modal">Cancelar</button>
                        </Modal> 
                      </div>   
              
                </div>
                
                </li>
              ))}
        </ul>        
        </div>
      </div>
    </Form>
    </>
  )
}

export default Client;