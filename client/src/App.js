import React, {useContext} from 'react';
import {useRoutes} from './routes';
import useAuth from './hooks/auth.hook';
import {AuthContext} from './context/auth.context';
import Navbar from './components/navbar';


function App() {  
  const {token, userId, login, logout} = useAuth();  
  
  const isAuthenticated = !!token;  
  const routes = useRoutes(isAuthenticated);

  return (
    <AuthContext.Provider value={{token, userId, login, logout, isAuthenticated}}>  
      <div className="App">
        <div className="wrapper">
          {isAuthenticated && <Navbar />}
          {routes}   
        </div>   
      </div>  
      </AuthContext.Provider>   
  );
}

export default App;
