import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import InputProduct from '../pages/InputProduct';
import OutputProduct from '../pages/OutputProduct';
import Inventory from '../pages/Inventory';
import UpdateProduct from '../pages/UpdateProduct';
import Login from '../pages/Login'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/input-product" exact component={InputProduct}/>
        <Route path="/output-product" exact component={OutputProduct}/>
        <Route path="/inventory" exact component={Inventory}/>
        <Route path="/update-product" exact component={UpdateProduct}/>
        <Route path="/home" exact component={Dashboard}/>

      </Switch>
    </BrowserRouter>
  );
}