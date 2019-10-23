import React, { Component } from 'react';
import '../../assets/css/reset.css';
import '../../assets/css/style.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';

class Busca extends Component {
    constructor() {

        super();
        this.state = {
            lancamentos: []
        };
    }

    buscarLancamentos = async (titulo) => {
        await api.get("/lancamentos/buscar/" + titulo)
            .then(data => {
                this.setState({ lancamentos: data.data });
            });
    }

    componentDidMount() {
        const {titulo} = this.props.match.params;
        this.buscarLancamentos(titulo);
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

export default Busca; 