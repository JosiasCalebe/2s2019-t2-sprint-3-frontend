import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import App from './pages/Home/App';
import AdminCadastro from './pages/AdminDashboard';
import Cadastro from './pages/Cadastro';
import Busca from './pages/Busca';
import Lancamento from './pages/Lancamento';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import NEncontrado from './pages/NaoEncontrado';
import { parseJwt } from './services/auth';


export default function Routes() {
    const RouteAdmin = ({ component: Component }) => (
        parseJwt() != null ?
            <Route
                render={
                    props => parseJwt().TipoDeUsuario === 'A' ? (
                        <Component {...props} />
                    ) : (
                            <Redirect
                                to={{ pathname: '/error404', state: { from: props.location } }}
                            />
                        )
                }
            /> : <Route
                render={
                    props =>
                        <Redirect
                            to={{ pathname: '/error404', state: { from: props.location } }}
                        />
                }
            />
    )

    const RouteLogged = ({ component: Component }) => (
        localStorage.getItem('user') != null ?
            <Route
                render={
                    props => localStorage.getItem('user') ? (
                        <Component {...props} />
                    ) : (
                            <Redirect
                                to={{ pathname: '/error404', state: { from: props.location } }}
                            />
                        )
                }
            /> : <Route
                render={
                    props =>
                        <Redirect
                            to={{ pathname: '/error404', state: { from: props.location } }}
                        />
                }
            />
    )

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App} />
                <RouteAdmin path='/admin/cadastrar' component={AdminCadastro}/>
                <RouteLogged path='/usuario' component={Perfil} />
                <Route path='/cadastrar' component={Cadastro} />
                <Route path='/login' component={Login} />
                <Route path='/buscar/:titulo' component={Busca} />
                <Route path='/lancamento/:id' component={Lancamento} />
                <Route component={NEncontrado} />
            </Switch>
        </BrowserRouter>
    )
}
