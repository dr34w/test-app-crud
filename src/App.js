import React, { Component } from 'react';
import './App.css';
import './components/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Create from './components/create.component';
import Edit from './components/edit.component';
import Index from './components/index.component';
import Details from './components/details.component';
import Back from "./components/Back";

import { LoginPage } from '../src/LoginPage/LoginPage';
import { HomePage } from '../src/HomePage/HomePage';
import { history, Role } from './_helpers';
import { authenticationService } from './_services';
import { PrivateRoute } from '../src/_components';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
        currentUser: null,
        isAdmin: false
    };
}

componentDidMount() {
    authenticationService.currentUser.subscribe(x => this.setState({
        currentUser: x,
        isAdmin: x && x.role === Role.Admin
    }));
}

logout() {
    authenticationService.logout();
    history.push('/login');
}


  render() {
    const { currentUser, isAdmin } = this.state;
    return (
      <Router history={history}>
        <div className="container">
        
          <nav className="navbar-expand navbar-light bg-light gradient">
           <Link to={'/'} className="navbar-brand head">React CRUD Example</Link>
           <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link to={'/'} className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                {currentUser && <Link to={'/create'} className="nav-link">Create</Link>}
              </li>
              <li className="nav-item">
                <Link to={'/index'} className="nav-link">Index</Link>
              </li>
              <li className="nav-item">
                {currentUser &&<a onClick={this.logout} className="nav-item nav-link">Logout</a>}
              </li>
              </ul>
              <div>
                <Back></Back>
              </div>
          </div>
          </nav>
          <br/>
          
          <h2 className="welcome">Welcome to React CRUD Tutorial</h2>
          

          <Switch>
            <Route exact path="/create" component={Create}></Route>
            <Route path="/edit/:id" component={Edit}></Route>
            <Route path="/index" component={Index}></Route>
            <Route path="/details/:id" component={Details}></Route>

            <Route path="/login" component={LoginPage} />
            <PrivateRoute exact path="/" component={HomePage} /> 
          </Switch>
          </div>
      </Router>
      
    );
  }
}

export default App;
