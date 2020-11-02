import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {AuthContext} from '../context/auth.context';
import useHttp from '../hooks/http.hook';

const ContentPage = () => {
  const [link, setLink] = useState("");  
  const auth = useContext(AuthContext);
  const {request} = useHttp();
  const history = useHistory();
  const {token} = auth;

  const handleChange = (e) => { 
    setLink(e.target.value)
  }

  const handleEnter = async (e) => {
    try {
      if(e.key === 'Enter'){        
        const data = await request('/api/links/generate', 'POST', {from: link}, {Authorization: `Bearer ${token}`});
        
        history.push(`/detail/${data.link._id}`)
      }      
    }
    catch (err){}
  };

  return (
    <div className="container">
      <h1 className="mainTitlePage">Создать ссылку</h1>
      <div className="create">
      <label htmlFor="create">Введите ссылку</label>
        <input 
          className="create__input"
          id="create"
          placeholder="вставьте ссылку"
          type="text"
          name="create"
          value={link}
          onChange={handleChange}
          onKeyPress = {handleEnter}
        />
        
      </div>      
    </div>
  );
};

export default ContentPage;
