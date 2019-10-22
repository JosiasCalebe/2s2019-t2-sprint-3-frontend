import React, { Component } from 'react';
import '../../assets/css/reset.css';
import '../../assets/css/style.css';
import Axios from 'axios';

class Busca extends Component {
    constructor() {

        super();
        this.state = {
            lancamentos: []
        };
    }

    buscarLancamentos = async (titulo) => {
        await Axios.get("http://localhost:5000/api/lancamentos/buscar/" + titulo)
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
                            <div className="slide">
                                <div className="poster">
                                    <p className="nota" style={{ backgroundColor: (element.notaMedia > 60) ? 'green' : (element.notaMedia < 40) ? '#FF493F' : '#FFC601' }}>{element.notaMedia}</p>
                                    <img src={`http://localhost:5000` + element.poster} />
                                </div>
                                <br></br>
                                <p>{element.titulo}</p>
                                <p>{element.dataDeLancamento.slice(0, 4)}</p>
                            </div>
                        )
                    })
                }
            </div>

        )
    }

}

export default Busca; 