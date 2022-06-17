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
    password: yup.string().min(6, "A senha deve ter 6 caracteres no mínimo").required("A senha é obrigatória"),
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
                        Login
                      </button>
                    </div>
                  </Form>
          </div>
        </div>  
      </>
      );    
  }
  
  export default Home;