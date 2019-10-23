import React, { useState } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import '../../assets/css/style.css';



export default function App({ history }) {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState(false);

    async function hanldeSubmit(event) {
        event.preventDefault();
        await api.post('/usuarios/login', { email, senha })
            .then(response => {
                if (response.status === 200) {
                    localStorage.setItem('user', response.data.token);
                    history.push('/');
                } else {
                    console.log(response.status);
                }
            })
            .catch(error => {
                if (error.response.status === 404) {
                    setErro(true);
                }
                console.log(erro);
            });
    }

    return (
        <div className="container login">
            <div className="loginForm">
                <form className="">
                    <div className="inputLog">
                        <label htmlFor="email">
                            <span>Email: </span>
                        </label>
                        <input
                            type="text"
                            name="email"
                            className="email"
                            autoComplete="off"
                            value={email}
                            onInput={event => setEmail(event.target.value)}
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
                            value={senha}
                            onInput={event => setSenha(event.target.value)}
                            required
                        />
                        <br/>
                    </div>
                    <button
                        onClick={hanldeSubmit}
                    >Logar</button>
                </form>
                <div className="utils">
                    <span><Link to="/cadastrar">Quero me cadastrar</Link></span>
                </div>
            </div>
        </div >
    );
}
