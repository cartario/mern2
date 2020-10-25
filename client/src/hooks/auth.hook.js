import {useCallback, useState, useEffect} from 'react';

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const storageName = 'userData';

  const login = useCallback((token, userId)=>{
    setToken(token);
    setUserId(userId);

    localStorage.setItem(storageName, JSON.stringify({token, userId}))
  }, []);

  const logout = useCallback(()=>{
    
    setToken(null);
    setUserId(null);

    localStorage.removeItem(storageName);
  }, []);

  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem(storageName));
    if(data && data.token){
      login(data.token, data.userId);
    }
  }, [login]);

  return {token, userId, login, logout};
};

export default useAuth;
