import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import './index.css';
// import configureStore from './store/configureStore';
// import routes from './routes';
import App from './App';
import * as serviceWorker from './serviceWorker';

// const store = configureStore();
import { configureFakeBackend } from './_helpers';
configureFakeBackend();

ReactDOM.render(
<BrowserRouter>
<App />
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
