import React from 'react';

const AuthPage = () => {
  const [form, setForm] = React.useState({email: '', password: ''});

  const handleChange = (e) => {
    const target = e.target.value;
    const name = e.target.name;
    setForm({
      ...form, [name]:target
    })
  }

  const handleRegister = () => {
    
    const options = {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {...form}      
    };  
    
    options.headers['Content-Type'] = 'application/json';

    fetch('/api/auth/register', options).then((res)=>{      
      console.log(res)
    }).catch((err)=> console.log(err));
  }

  const handleLogin = () => {
    
    const options = {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {...form}      
    };  
    
    options.headers['Content-Type'] = 'application/json';

    fetch('/api/auth/login', options).then((res)=>{  
        
      console.log(res)
    }).catch((err)=> console.log(err));
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
        <button className="auth__signin btn" onClick={handleLogin}>Войти</button>
        <button className="auth__signup btn" onClick={handleRegister}>Зарегистрироваться</button>
      </section>
    </div>
  );
};

export default AuthPage;
