import api from '../../services/api';
import * as yup from "yup";
import {Form, Input} from '@rocketseat/unform';


const validateRegister = yup.object().shape({
    user: yup.string().required("O nome de usuário é obrigatório"),
    name: yup.string().required("O nome é obrigatário"),
    password: yup.string().min(6, "A senha precisa ter 6 caracteres").required("A senha é obrigatória"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "As senhas não conferem"),
  });
  const validateLogin = yup.object().shape({
    user: yup.string().required("O usuário é orbigátorio"),
    password: yup.string().min(6, "A senha tem 6 caracteres no mínimo").required("A senha é obrigatória"),
  });
  
    function Home() {
      async function handleRegisterSubmit({
        name,
        user,
        password
      }) {
        try{
          const response = await api.post('/register', {name, user,password})
          console.log(response.data)
          alert("User registred!")
        } catch(err){
            alert("User not register!");
        };
      };
    
      async function handleLoginSubmit({
        user, 
      }) {
        try{
          const response = await api.post('/login', {user})
          console.log(response.data)
          alert("User connected!")
        } catch(err){
            alert("User not found!");
        };
      };
    
      return (
        <>
        <section className="logo-container" style={{width:'auto'}}>
        <h1 className="title-lgcontainer">Central.Inventory</h1>
      </section>  

          <div className="client-container">
          <div style={{background:'#FFF', marginTop:20, padding:20, borderRadius:8, width:'auto'}}>
            <div>
              <h1 className='title-lgcontainer' style={{background:'#FFF', color:'#00008B'}}>Login</h1>
                  <Form onSubmit={handleLoginSubmit} class="login-form" schema={validateLogin}>
                    <label>Usuário</label>
                    <div className="login-form-group">
                      <Input name="user"  placeHolder="Informe seu usuário"/>
                    </div>
    
                    <label>Senha</label>
                    <div className="login-form-group">
                      <Input name="password" type="password" className="form-field" placeHolder="Digite sua senha"/>
    
                    </div>
                    
                    <div className='container-buttons'>
                      <button className="button btn" type="submit" style={{display:'flexbox', justifyContent:'center', alignItems:'center', marginTop:20, marginLeft:400}}>
                        Login
                      </button>
                    </div>
                  </Form>
            </div>
          </div>

          <div class="separator">
              <div></div>
              <h3 className='title-lgcontainer' style={{background:'#FFF', color:'#00008B' ,size:20}}>OU</h3>
              <div></div>
          </div>

          <div style={{background:'#FFF', marginTop:20, padding:20, borderRadius:8, width:'auto'}}>
            <div className="input-group">
            <h1 className='title-lgcontainer' style={{background:'#FFF', color:'#00008B'}}>Cadastrar usuário</h1>
                  <Form onSubmit={handleRegisterSubmit} schema={validateRegister} className="login-form">
                    <label>Nome</label>
                    <div className="login-form-group">
                      <Input name="name" className="form-field" placeHolder="Digite seu nome"/>
                    </div>
                    
                    <label>Usuário</label>
                    <div className="login-form-group">
                      <Input name="user" className="form-field" placeHolder="Informe o nome de usuário que deseja"/> 
                    </div>
    
                    <label>Senha</label>
                    <div className="login-form-group">
                      <Input name="password" type="password" className="form-field" placeHolder="Informe a senha desejada"/>
    
                    </div>
    
                    <label>Confirma senha</label>
                    <div className="login-form-group">
                      <Input name="confirmPassword" type="password" className="form-field" placeHolder="Informe novamente a senha desejada"/>
                    </div>
                    
                    <div className='container-buttons'>
                      <button className="button" type="submit" style={{display:'flex', justifyContent:'center', alignItems:'center', marginTop:20, marginLeft:400}}>
                        Registrar
                      </button>
                    </div>
    
                  </Form>
            </div>
          </div>  
          </div>  
      </>
      );    
  }
  
  export default Home;