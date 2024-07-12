import React, { useEffect ,useState } from 'react';
import {useHistory} from 'react-router-dom';
import {MdNotificationsNone} from 'react-icons/md';
import {IoIosListBox} from 'react-icons/io';
import { BiListCheck } from 'react-icons/bi';
import {BsFillBagPlusFill} from 'react-icons/bs';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Modal from "react-modal";
import './styles.css';

Modal.setAppElement("#root");

function Dashboard() {
  const [products, setProducts] = useState([]) 
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const {push} = useHistory();


  function handleLogout(){
    setLoading(true);
    setLoading(false);
    push('/')
  }

  async function loadEquipments() {
    try{
      const response = await api.get('/productsBuy/')
      setProducts(response.data)
      console.log(products)
    } catch(err){
        alert("Falha na listagem de equipamentos");
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
    <section className="logo-container">
        <h1 className="title-lgcontainer">Central.Inventory</h1>
    </section>
    <div className='dashboard-container'>
      <header>
        <span>BEM VINDO</span>
        <Link className='button' onClick={openModal}>Notificações
          <MdNotificationsNone size={48} color='#000' />
        </Link>
        
      </header>

      <h1>Operações disponíveis</h1>

      <ul>


        <Link to='/inventory'>
          <li>
            <strong style={{color:'#000'}}>CONTROLE DE ESTOQUE</strong>
            <button type='button'>
              <IoIosListBox size={24} color='#000' />
            </button>
          </li>
        </Link>

        <Link to='/inventory'>
          <li>
            <strong style={{color:'#000'}}>CONTROLE DE EQUIPAMENTO</strong>
            <button type='button'>
              <IoIosListBox size={24} color='#000' />
            </button>
          </li>
        </Link>

        <Link to='/inventory'>
          <li>
            <strong style={{color:'#000'}}>USUÁRIOS</strong>
            <button type='button'>
              <IoIosListBox size={24} color='#000' />
            </button>
          </li>
        </Link>

        <Link to='#'>
          <li>
            <strong style={{color:'#000'}}>LEVANTAMENTO</strong>
            <button type='button'>
              <BiListCheck size={24} color='#000' />
            </button>
          </li>
        </Link>

      </ul>
    </div>

    <div className="container-modal">
      <Modal 
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        overlayClassName="modal-overlay"
        className="modal-content">
          <h1 className='modal-title'>Notificações</h1>
          <div className='modal-separator'></div>
          <div className='modal-itens'>
          <ul style={{marginTop:10, padding:30, borderRadius:6, background:'#FFD700'}}>
              {products.map(product => (
                <li key={product.id} style={{background:'#FFF'}}>
                  <div className='modal-item'>
                    <BsFillBagPlusFill size={25} color="#" style={{paddingRigth:10, marginRight:10}} />
                    <p><b>{product.nameEquipment}</b>, o equipamento está abaixo da quantidade aceitavél</p>
                  </div>
                  <div className='modal-separator'></div>
                </li>
              ))}
          </ul>
          </div>
          <div className='modal-separator'></div>
          <button onClick={closeModal} className="button-modal">Sair</button>
      </Modal>  
    
    </div>
  </>  
  )
}
export default Dashboard;
