import React, { Component } from 'react';
import api, { ENDPOINT } from '../../services/api';
import { Link } from 'react-router-dom';

import '../../assets/css/style.css';
import Axios from 'axios';



class Cadastrar extends Component {

    constructor() {
        super();
        this.state = {
            usuario: {},
            nome : '',
            senha : '',
            email : '',
            nomeDeUsuario :'',
            dataDeNascimento :''
        };
    }

    handleSubmit = async(event) => {
    event.preventDefault();

        await this.setState({usuario: {
            nome: this.state.nome,
            senha: this.state.senha,
            email: this.state.email,
            nomeDeUsuario: this.state.nomeDeUsuario,
            dataDeNascimento: this.state.dataDeNascimento
        }});

        console.log(this.state.dataDeNascimento);
        console.log(this.state.nomeDeUsuario);
        console.log(this.state.nome);
        console.log(this.state.email);
        console.log(this.state.usuario);

    await Axios({
        method:'post',
        url: ENDPOINT + '/usuarios/cadastrar',
        data: this.state.usuario,
        config: {headers:{'Content-Type': 'application/json'}}
    }).then(response => {
            if (response.status === 200) {
                localStorage.setItem('user', response.data.token);
                this.props.history.push('/');
            } else {
                console.log(response.status);
            }
        })
        .catch(error => {
            if (error.response.status === 404) {
            console.log('ta');
            }
        });
}

render(){
    return (
        <div className="container login">
            <div className="loginForm">
                <form className="">
                <div className="inputLog">
                        <label htmlFor="nome">
                            <span>Nome: </span>
                        </label>
                        <input
                            type="text"
                            name="nome"
                            className="nome"
                            autoComplete="off"
                            value={this.state.nome}
                            onInput={event => this.setState({nome:event.target.value})}
                            autoFocus
                            required
                        />
                        <br />
                    </div>
                    <div className="inputLog">
                        <label htmlFor="nomeDeUsuario">
                            <span>Nome de usuário: </span>
                        </label>
                        <input
                            type="text"
                            name="nomeDeUsuario"
                            className="nomeDeUsuario"
                            autoComplete="off"
                            value={this.state.nomeDeUsuario}
                            onInput={event => this.setState({nomeDeUsuario:event.target.value})}
                            autoFocus
                            required
                        />
                        <br />
                    </div>
                    <div className="inputLog">
                        <label htmlFor="email">
                            <span>Email: </span>
                        </label>
                        <input
                            type="text"
                            name="email"
                            className="email"
                            autoComplete="off"
                            value={this.state.email}
                            onInput={event => this.setState({email:event.target.value})}
                            autoFocus
                            required
                        />
                        <br />
                    </div>
                    <div className="inputLog">
                        <label htmlFor="password">
                            <span>Senha: </span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="password"
                            autoComplete="off"
                            value={this.state.senha}
                            onInput={event => this.setState({senha:event.target.value})}
                            required
                        />
                        <br />
                    </div>
                    <div className="inputLog">
                        <label htmlFor="dataDeNascimento">
                            <span>Data de nascimento: </span>
                        </label>
                        <input
                            type="date"
                            name="dataDeNascimento"
                            className="dataDeNascimento"
                            autoComplete="off"
                            value={this.state.dataDeNascimento}
                            onInput={event => this.setState({dataDeNascimento:event.target.value})}
                            autoFocus
                            required
                        />
                        <br />
                    </div>
                    <button
                        onClick={this.handleSubmit}
                    >Cadastrar</button>
                </form>
                <div className="utils">
                    <span><Link to="/cadastrar">Quero me cadastrar</Link></span>
                </div>
            </div>
        </div >
    )
}
    }

export default Cadastrar
