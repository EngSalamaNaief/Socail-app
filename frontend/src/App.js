import React,{useEffect,useState} from 'react';
import Home from './pages/home/Home';
import PersonalPage from './pages/PersonalPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Regiter from './pages/Regiter';
import Login from './pages/Login';
import {Provider} from 'react-redux';
import Store from './redux/Store';
import {LoadedUer} from './redux/actions/AuthActions';
import FrindPage from './pages/FrindPage';
import SittingsPage from './pages/SittingsPage';
import PostEditPage from './pages/PostEditPage';
import MessagePage from './pages/MessagePage';
function App() {
  
 
 useEffect(()=>{
    Store.dispatch(LoadedUer());
  })
  return (
    <Provider store={Store}>
    <Router >

      <Switch>

        <Route path="/" exact>
          <Home/>
        </Route>

        <Route path="/userpage" >
          <PersonalPage/> 
        </Route>

        <Route path="/register" >
           <Regiter/> 
        </Route>

        <Route path="/login" >
           <Login/> 
        </Route>
        <Route path="/friend/:id" >
           <FrindPage/> 
        </Route>
        <Route path="/sittings/:id" >
           <SittingsPage/> 
        </Route>
        <Route path="/editpost/:id" >
           <PostEditPage/> 
        </Route>
        <Route path="/message" >
           <MessagePage/> 
        </Route>

      </Switch>

    </Router>
  </Provider>
  );
}

export default App;
