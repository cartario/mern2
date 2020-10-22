import React from 'react';
import {useRoutes} from './routes';

function App() {
  const [toggle, setToggle] = React.useState(false);
  const routes = useRoutes(toggle);
  return (    
      <div className="App">
        <div className="wrapper">
          <button onClick={()=>setToggle(!toggle)}>Auth</button><span>{JSON.stringify(toggle)}</span>
          {routes}   
        </div>   
      </div>    
  );
}

export default App;
