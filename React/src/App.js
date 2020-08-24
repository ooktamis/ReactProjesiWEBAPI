import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
//import Button from 'react-bootstrap/Button';
import {Home} from './components/Home';
import {Department} from './components/Department';
import {Employee} from './components/Employee';
import {Navigation} from './components/Navigation';
function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h3 className="m-3 d-flex justify-content-center">
          React JS with Web Api Demo
      </h3>
      <h5 className="m-3 d-flex justify-content-center">
          Employee Management Portal
      </h5>
      <Navigation/>
      <Switch>
        <Route path='/' component={Home} exact></Route>
        <Route path='/department' component={Department} ></Route>
        <Route path='/employee' component={Employee} ></Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
}
//Home sayfasını çağırdık Birinci adım olarak.
export default App;
