import api from '../../services/api';
import * as yup from "yup";
import {Form, Input} from '@rocketseat/unform';
import {useHistory} from 'react-router-dom';
import React, {useState } from 'react';

  const validateLogin = yup.object().shape({
    user: yup.string().required("O usuário é orbigátorio"),
    password: yup.string().min(6, "A senha deve ter 6 caracteres no mínimo").required("A senha é obrigatória"),
  });

  export default function SignIn(){
    const [loading, setLoading] = useState(false)
    const history = useHistory() 
  

      async function handleLoginSubmit(data) {
        setLoading(true)  
        try{
          const response = await api.post('/login', data)
          console.log(response.data)
          history.push('/home')
          alert("Usuário conectado!")
        } catch(err){
            alert("Usuário não conectado ou não foi encontrado!");
        } finally{
          setLoading(false)
        }
      };
    
      return (
        <>
        <section className="logo-container" style={{width:'auto'}}>
        <h1 className="title-lgcontainer">Central.Inventory</h1>
      </section>  

          <div className="client-container">
          <div className="container-login" style={{ marginTop:20, padding:20, borderRadius:8, width:'auto'}}>
              <h1 className='title-lgcontainer' style={{background:'transparent', color:'#FFF' ,marginBottom:40, padding:10}}>LOGIN</h1>
                  <Form onSubmit={handleLoginSubmit} class="login-form" schema={validateLogin}>
                    <div className='container-login'>
                    <label style={{}}>Usuário</label>
                    <div className="login-form-group">
                      <Input name="user"  required class="input" placeHolder="Informe seu usuário"/>
                    </div>
    
                    <label>Senha</label>
                    <div className="login-form-group">
                      <Input name="password" type="password"  required class="input" placeHolder="Digite sua senha"/>
                    </div>

                    </div>
                    <div className='container-buttons'>
                      <button className="button btn" type="submit" style={{display:'flexbox', justifyContent:'center', alignItems:'center', marginTop:20, marginLeft:410}}>
                        {loading ? 'Caregando...' : 'Acessar'}
                        Login
                      </button>
                    </div>
                  </Form>
          </div>
        </div>  
      </>
      );    
  }
  
  