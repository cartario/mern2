import React, {useState, useCallback, useEffect, useContext} from 'react';
import {useParams} from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import useHttp from '../hooks/http.hook';
import Preloader from '../components/Preloader';
import LinkCard from '../components/Card';

const DetailPage = () => {
  const {token} = useContext(AuthContext);
  const [link, setLink] = useState(null);
  const linkId = useParams().id;
  const {request, loading} = useHttp(); 
  
  const getLink = useCallback(async ()=>{
    try {
      const fetchedLink = await request(`/api/links/${linkId}`, 'GET', null, {Authorization: `Bearer ${token}`});
      setLink(fetchedLink);
    } catch(err){}
  }, [linkId, request, token]);

  useEffect(()=>{
    getLink();    
  }, [getLink])
  
  if(loading){
    return <Preloader />
  }
    
  return (
    <div className="container">
      <h1 className="mainTitlePage">DetailPage</h1>
      {!loading&&link&&<LinkCard link={link.link}/>}
    </div>
  );
};

export default DetailPage;
