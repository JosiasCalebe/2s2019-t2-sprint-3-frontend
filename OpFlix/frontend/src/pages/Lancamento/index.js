import React, { Component } from 'react';
import '../../assets/css/reset.css';
import '../../assets/css/style.css';
import api, { ENDPOINT } from '../../services/api';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import Axios from 'axios';

class Busca extends Component {

    constructor() {
        super();
        this.state = {
            favorito: false,
            lancamento: {},
            localizacoes:[],
            nota: 0,
            review: ''
        };
    }


    buscarLancamentos = async (id) => {
        await api.get("/lancamentos/" + id)
            .then(data => {
                this.setState({ lancamento: data.data });
            });
    }


    escreverReview = async (event) => {
        event.preventDefault();
        await Axios({
            method: 'post',
            headers: { 'Authorization': "bearer " + localStorage.getItem('user') },
            url: ENDPOINT + '/api/lancamentos/' + this.props.match.params.id,
            data: { nota: this.state.nota, review: this.state.review },
            config: {
                headers: { 'Content-Type': 'application/json' }
            }
        }).then(data => {
            console.log(data);
        });
    }
    checarFav = async () => {
        await Axios({
            method: 'get',
            headers: { 'Authorization': "bearer " + localStorage.getItem('user') },
            url: ENDPOINT + '/api/lancamentos/favoritos/' + this.props.match.params.id,
            config: {
                headers: { 'Content-Type': 'application/json' }
            }
        })
            .then(data => {
                console.log(data.data);
                this.setState({ favorito: data.data });
            });
    }

    desfavoritar = async (event) => {
        event.preventDefault();
        await Axios({
            method: 'delete',
            headers: { 'Authorization': "bearer " + localStorage.getItem('user') },
            url: ENDPOINT + '/api/lancamentos/favoritos',
            data: { idLancamento: this.props.match.params.id },
            config: {
                headers: { 'Content-Type': 'application/json' }
            }
        }).then(data => {
            console.log(data);
        });
    }

    favoritar = async (event) => {
        event.preventDefault();
        await Axios({
            method: 'post',
            headers: { 'Authorization': "bearer " + localStorage.getItem('user') },
            url: ENDPOINT + '/api/lancamentos/favoritos',
            data: { idLancamento: this.props.match.params.id },
            config: {
                headers: { 'Content-Type': 'application/json' }
            }
        }).then(data => {
            console.log(data);
        });
    }

    showValue = async (newValue) => {
        document.getElementById("number").innerHTML = newValue;
        this.setState({ nota: document.getElementById("number").value });
    }

    changeRangeValue = async (val) => {
        document.getElementById("range").value = isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10);
        this.showValue(val);
    }

    changeInputValue = async (val) => {
        document.getElementById("number").value = isNaN(parseInt(val, 10)) ? 0 : parseInt(val, 10);
        this.showValue(val);
    }
    buscarLocalizacoes = async () => {
        await fetch(ENDPOINT + "/api/localizacoes")
            .then(res => res.json())
            .then(data => this.setState({localizacoes:data}))
            .catch(error => console.log(error));
    }

    displayMarkers = () => {
        return this.state.localizacoes.map((store, index) => {
          return <Marker key={index} id={index} position={{
           lat: store.latitude,
           lng: store.longitude
         }}
         onClick={() => console.log("You clicked me!")} />
        })
      }

    componentDidMount() {
        this.checarFav();
        this.buscarLancamentos(this.props.match.params.id);
        this.buscarLocalizacoes();
    }

    render() {
        return (

            <div className="Busca">

                <div>
                    <div className="poster">
                        <p className="nota" style={{ backgroundColor: (this.state.lancamento.notaMedia > 60) ? 'green' : (this.state.lancamento.notaMedia < 40) ? '#FF493F' : '#FFC601' }}>{this.state.lancamento.notaMedia}</p>
                        <img src={ENDPOINT + this.state.lancamento.poster} alt="poster" />
                    </div>
                    <br></br>
                    <p>{this.state.lancamento.titulo}</p>
                    <br />
                    <p>{this.state.lancamento.sinopse}</p>
                    <br />
                    <p>{this.state.lancamento.tempoDeDuracao}</p>
                    <br />
                    <p>{new Date(this.state.lancamento.dataDeLancamento).toLocaleDateString("pt-BR")}</p>
                    <button onClick={this.state.favorito ? this.desfavoritar : this.favoritar}>{this.state.favorito ? "Desfavoritar" : "Favoritar"}</button>
                </div>
                <br />
                <p>Reviews: </p>
                <br />
                <form className="write-review">
                    <label htmlFor="number">Nota: </label>
                    <input type="number" id="number" min="0" max="100" onChange={event => this.changeRangeValue(event.target.value)} />
                    <br />
                    <input type="range" min="0" max="100" id="range" name="monday" step="5" onChange={event => this.changeInputValue(event.target.value)} />
                    <p>Escreva sua review: </p>
                    <textarea onChange={event => this.setState({ review: event.target.value })} />
                    <button type="submit" onClick={this.escreverReview}>Enviar Review</button>
                </form>
                <div>
                    {
                        this.state.lancamento.reviews === undefined ? '' :
                            this.state.lancamento.reviews.map(element => {
                                return (
                                    <div>
                                        <br />
                                        <div className="review">
                                            <p></p>
                                            <p className="nota--reviews" style={{ backgroundColor: (element.nota > 60) ? 'green' : (element.nota < 40) ? '#FF493F' : '#FFC601' }}>{element.nota}</p>
                                            <p>{element.review}</p>
                                        </div>
                                    </div>
                                )
                            })
                    }
                </div>
                <Map
                    google={this.props.google}
                    zoom={8}
                    style={{
                        width: '100%',
                        height: '100%',
                      }}
                    initialCenter={{ lat: 47.444, lng: -122.176 }}
                >
                    {this.displayMarkers()}
                    
                </Map>
            </div>

        )
    }    
}
export default GoogleApiWrapper({

})(Busca);