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
        <button className="auth__signin btn" onClick={()=>console.log(form)}>Войти</button>
        <button className="auth__signup btn" >Зарегистрироваться</button>
      </section>
    </div>
  );
};

export default AuthPage;
