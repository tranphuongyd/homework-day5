import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Home } from './components/home/home';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { EditProfile } from './components/user-profile/edit-profile';
import { EditRequest } from './components/requests/requestEdit';
import { AddRequest } from './components/requests/requestAdd';
import 'antd/dist/antd.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path='/' exact={true}>
            <Home />
          </Route>
          <Route path='/edit-profile'>
            <EditProfile />
          </Route>
          <Route path='/requests/add' exact={true}>
            <AddRequest />
          </Route>
          <Route path='/requests/:id'>
            <EditRequest />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
