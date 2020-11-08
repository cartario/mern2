import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import ContentPage from './pages/ContentPage';
import DetailPage from './pages/DetailPage';
import LinksPage from './pages/Links';

export const useRoutes = (isAuth) => {
  if(isAuth){
    return (
      <Switch>
        <Route path="/" exact>
          <div className="container">
            <h1 className="mainTitlePage">Hello</h1>
          </div>
        </Route>
        <Route path="/content" exact>
          <ContentPage />
        </Route>
        <Route path="/detail/:id">        
          <DetailPage />
        </Route>
        <Route path="/links" exact>        
          <LinksPage />
        </Route>
        {/* <Route path="/404">
          <div className="container">
            <h1 className="mainTitlePage">Not Found 404</h1>
          </div>          
        </Route>
        <Redirect to="/404" /> */}
      </Switch>
    );
  } 
  return (
    <Switch>
      <Route path="/">
        <AuthPage/>
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
