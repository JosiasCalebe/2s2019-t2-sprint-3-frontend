import {Route, Link, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './pages/Home/App';
import Cadastro from './pages/Cadastrar';
import * as serviceWorker from './serviceWorker';

const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path='/' component={App} />
                <Route exact path='/cadastrar' component={Cadastro} />

            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
