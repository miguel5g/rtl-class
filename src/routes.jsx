import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Product from './pages/product';
import Products from './pages/products';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Products} />
        <Route exact path="/:id" component={Product} />
      </Switch>
    );
  }
}

export default Routes;
