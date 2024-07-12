import React, {useEffect, useState } from 'react'; 
import GoBackLink from '../../components/GoBackLink';
import  Header  from '../../components/Header';
import {FiTrash2 } from 'react-icons/fi';
import {ImEnter} from 'react-icons/im';
import {ImExit} from 'react-icons/im';
import {TbEdit} from 'react-icons/tb';
import api from '../../services/api';
import { Link, useHistory } from 'react-router-dom';
import {Form, Input} from '@rocketseat/unform';
import Modal from "react-modal";
import * as yup from "yup";
import './styles.css';

Modal.setAppElement("#root");

const validateNameEquipment = yup.object().shape({
  nameEquipment: yup.string().required("O nome do produto é obrigatório"),
}
)

function Client() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentIdEquipment, setCurrentIdEquipment] = useState(null);
  const history = useHistory();

  async function loadEquipments() {
    try{
      const response = await api.get('/products/')
      setProducts(response.data)
      console.log(products)
    }catch(err){
      alert("Falha na listagem de equipamentos");
    };
  };

  async function handleDeleteSubmit(idEquipment) {
    try{
      const response = await api.delete(`/product/delete/${currentIdEquipment}/`)
      setProducts(products.filter(product => product.idEquipment !== currentIdEquipment))
      console.log(response.data)
    }catch(err){
      alert("Não foi possível deletar equipamento!");
    };
    closeModal();
  };

  async function handleRegisterSubmit(nameEquipment) {
     try{
      const response = await api.post('/product/register/', nameEquipment)
      console.log(response.data)
      alert("Equipamento cadastrado!");
      loadEquipments();
      }catch(err){
        if (err.response && err.response.status === 409) {
          alert("Equipamento já cadastrado!");
        } else {
          alert("Equipamento não cadastrado!");
        }
      };
    };

    let openModal = (idEquipment) => {
      setCurrentIdEquipment(idEquipment);
      setIsOpen(true);
    }
    
    let closeModal = () => {
      setCurrentIdEquipment(null);
      setIsOpen(false);
    }

    const handleRedirect = (path, idEquipment) => {
      history.push({
        pathname: path,
        state: { idEquipment }
      });
    };

  useEffect(()=> {loadEquipments()}, []);
  
  return (
    <>
      <section className="logo-container" style={{width:'auto'}}>
        <h1 className="title-lgcontainer" style={{background:'#1E8EF8'}}>Central.Inventory</h1>
      </section>   
        <Form onSubmit={handleRegisterSubmit} schema={validateNameEquipment}>   
          <div className='client-container'>
            <GoBackLink/>
        

          <div style={{background:'#1E8EF8', marginTop:20, padding:20, borderRadius:8, width:'auto'}}>
            <div className='input-group'>
              <h1 className="title-lgcontainer" style={{background:'#1E8EF8', color:'#FFF'}}>Cadastro de Equipamento</h1>
              <Input name='nameEquipment' className='title-lgconatainer' placeholder='Produto' style={{width:'100%'}}/>
            </div>
          </div>
          <Header/>
          
          <div className='container-client-itens'>
          <ul className ="container-client-itens" style={{background:'#1E8EF8',marginTop:10, padding:40, borderRadius:8, width:'auto'}}>
              {products.map(product => (
                <li key={product.id} style={{width:'auto'}}>
                
                <div>
                  <strong>ID do equipamento</strong>
                  <p name="idEquipment">{product.idEquipment}</p>

                  <strong>Nome do equipamento:</strong>
                  <p>{product.nameEquipment}</p>

                  <strong>Quantidade de equipamento:</strong>
                  <p>{product.quantEquipment}</p>
                  </div>
                
                  <div className='separator'>
                    <div></div>  
                  </div>

                  <div className='container-buttons'>

                  <button onClick={() => handleRedirect('/update-product', product.idEquipment)} type="button">
                      <TbEdit className='button-delete' size={40} color="#a8a8b3" />
                    </button>

                    <button onClick={() => handleRedirect('/input-product', product.idEquipment)} type="button">
                      <ImEnter className='button-delete' size={40} color="#a8a8b3"/>
                    </button>

                    <button onClick={() => handleRedirect('/output-output', product.idEquipment)} type="button" >
                      <ImExit className='button-delete' size={40} color="#a8a8b3" />
                    </button>

                    <button onClick={() => openModal(product.idEquipment)} type="button" style={{paddingLeft:20}}>
                        <FiTrash2 className='button-delete' size={40} color="#a8a8b3" />
                      </button>

                      <div className="container-modal">
                        <Modal 
                          isOpen={modalIsOpen}
                          onRequestClose={closeModal}
                          contentLabel="Modal"
                          overlayClassName="modal-overlay"
                          className="modal-content">
                          <h1 className='modal-title'>Você deseja excluir o item ?</h1>
                          <button onClick={handleDeleteSubmit} className="button-modal">Sim</button>
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