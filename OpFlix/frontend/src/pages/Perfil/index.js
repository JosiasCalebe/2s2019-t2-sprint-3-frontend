import React, { Component } from 'react';
import '../../assets/css/reset.css';
import '../../assets/css/style.css';
import api, { ENDPOINT } from '../../services/api';
import Axios from 'axios';
import { Link } from 'react-router-dom';

class Favoritos extends Component {
    constructor() {

        super();
        this.state = {
            favoritos: [],
            lancamentos: []
        };
    }

    buscarUsuario = async () => {
    await Axios({
        method: 'get',
        headers: { 'Authorization': "bearer " + localStorage.getItem('user') },
        url: ENDPOINT + '/usuarios'
    }).then(data => {
        this.setState({favoritos : data.data.favoritos});
        });
    }

    buscarLancamento = async (id) => {
        await api.get("/lancamentos/" + id)
            .then(data => {
                this.setState({lancamentos : [...this.state.lancamentos, data.data]})})
    }

    juntarLancamentos = async () => {
      await this.state.favoritos.map(element => this.buscarLancamento(element.idLancamento));
    }

    async componentDidMount() {
        await this.buscarUsuario();
        await this.juntarLancamentos();
    }

    render() {
        return (
            <div className="Busca">
                {
                    this.state.lancamentos.map(element => {
                        return (
                            <Link className="slide" to={"/lancamento/" + element.idLancamento}>
                                <div className="poster">
                                    <p className="nota" style={{ backgroundColor: (element.notaMedia > 60) ? 'green' : (element.notaMedia < 40) ? '#FF493F' : '#FFC601' }}>{element.notaMedia}</p>
                                    <img src={`http://localhost:5000` + element.poster} />
                                </div>
                                <br></br>
                                <p>{element.titulo}</p>
                                <p>{element.dataDeLancamento.slice(0, 4)}</p>
                            </Link>
                        )
                    })
                }
            </div>

        )
    }

}

export default Favoritos; 