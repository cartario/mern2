import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import {AuthContext} from '../context/auth.context';

const Navbar = () => {
  const auth = useContext(AuthContext);
  
  const handleClick = (e) => {
    auth.logout();    
  }

  return (
    <nav className="nav">
      <ul className="nav__list" >
        <li className="nav__item">
          <NavLink className="nav__link" to="/content">Content</NavLink>
        </li> 
        <li className="nav__item">
          <NavLink className="nav__link" to="/detail/1">Detail</NavLink>
        </li> 
        <li className="nav__item">
          <a className="nav__link" href="#" onClick = {handleClick}>Logout</a>
        </li>        
      </ul>
    </nav>
  )
};

export default Navbar;
