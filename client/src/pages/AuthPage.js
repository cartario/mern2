import React, {useContext} from 'react';
import { AuthContext } from '../context/auth.context';
import useHttp from '../hooks/http.hook';


const AuthPage = () => {
  const auth = useContext(AuthContext);

  const {loading, request, error, clearError} = useHttp();
  
  const [form, setForm] = React.useState({email: '', password: ''});
  const [data, setData] = React.useState(null);
  
  React.useEffect(()=>{
    setTimeout(clearError, 1000);    
  }, [error, clearError]);

  React.useEffect(()=>{
    setTimeout(()=>{setData(null)}, 1000);    
  }, [data]);

  const handleChange = (e) => {
    const target = e.target.value;
    const name = e.target.name;
    setForm({
      ...form, [name]:target
    })
  }

  const handleRegister = async () => {
    try {
      await request('/api/auth/register', 'POST', {...form});      
    }
    catch (err) {
      
    }
  }

  const handleLogin = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      setData(data);
      auth.login(data.token, data.userId);      
    }
    catch(err){
      
    }    
  }

  return (
    <div className="container">
      <h1 className="mainTitlePage">MERN</h1>
      <section className="auth">
        <h2 className="auth__title">Autharization</h2>
        <div className="auth__field">          
          <label className="auth__label" htmlFor="email">email</label>
          <input
            onChange= {handleChange}
            value={form.email}
            placeholder="введите email"
            name="email"
            id="email"
            className="auth__input"/>
        </div>
        <div className="auth__field">          
          <label className="auth__label" htmlFor="password">password</label>
          <input
            onChange= {handleChange}
            value={form.password}
            placeholder="введите пароль"
            name="password"
            id="password"
            type="password"
            className="auth__input"/>
        </div>
        {error ? <p style={{color: "red"}}>{error}</p> : ''}
        {data ? <p style={{color: "green"}}>Success</p> : ''}
        <button className="auth__signin btn" onClick={handleLogin} disabled={loading}>Войти</button>
        <button className="auth__signup btn" onClick={handleRegister} disabled={loading}>Зарегистрироваться</button>
      </section>
    </div>
  );
};

export default AuthPage;
