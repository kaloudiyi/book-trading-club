import '../style/style.css';

import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';

import Header from './Header';
import Signin from './auth/Signin';
import Signout from './auth/Signout';
import Signup from './auth/Signup';
import Welcome from './Welcome';
import RequireAuth from './auth/RequireAuth';
import Settings from './Settings';
import MyBooks from './MyBooks';
import AllBooks from './AllBooks';
import history from './history';

class App extends Component {
  render() {
    return (
      <div>
        <Router history={history}>
          <div className="container">
            <Header />
            <Route exact path="/" component={Welcome} />
            <Route path="/signin" component={Signin} />
            <Route path="/signout" component={Signout} />
            <Route path="/signup" component={Signup} />
            <Route path="/settings" component={RequireAuth(Settings)} />
            <Route path="/mybooks" component={RequireAuth(MyBooks)} />
            <Route path="/allbooks" component={RequireAuth(AllBooks)} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
