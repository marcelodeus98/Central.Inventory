import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import InputProduct from '../pages/InputProduct';
import OutputProduct from '../pages/OutputProduct';
import Inventory from '../pages/Inventory';


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/input-product" exact component={InputProduct}/>
        <Route path="/output-product" exact component={OutputProduct}/>
        <Route path="/inventory" exact component={Inventory}/>

      </Switch>
    </BrowserRouter>
  );
}