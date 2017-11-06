import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './Navbar';
import Products from './Products';
import Customers from './Customers';
import Invoices from './Invoices';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Invoices}/>
            <Route path="/invoices" component={Invoices} />
            <Route path="/products" component={Products} />
            <Route path="/customers" component={Customers} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
