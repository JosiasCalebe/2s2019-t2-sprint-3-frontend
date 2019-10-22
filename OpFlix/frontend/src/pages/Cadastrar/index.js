import React, { Component } from 'react';
import '../../assets/css/reset.css';
import '../../assets/css/style.css';
import Axios from 'axios';

class Cadastrar extends Component {

    constructor() {

        super();
        this.state = {
            selecionado: '',
            metodo: '',
            novoPoster: '',
            categorias: [],
            plataformas: [],
            lancamento: {},
            id: 0,
            idCategoria: 0,
            idPlataforma: 0,
            idClassificacaoIndicativa: 0,
            titulo: "",
            sinopse: "",
            dataDeLancamento: "",
            tipoDeMidia: "F",
            tempoDeDuracao: "",
            episodios: 0,
            poster: null,
            erro: ''
        };
    }

    listarCategorias = () => {
        Axios.get("http://localhost:5000/api/categorias")
            .then(data => {
                this.setState({ categorias: data.data });
                console.log(data.data);
            });
    }

    listarPlataformas = () => {
        Axios.get("http://localhost:5000/api/plataformas")
            .then(data => {
                this.setState({ plataformas: data.data });
            });
    }

    listarCategorias = () => {
        Axios.get("http://localhost:5000/api/categorias")
            .then(data => {
                this.setState({ categorias: data.data });
            });
    }

    buscarLancamento = async () => {
        await Axios.get("http://localhost:5000/api/lancamentos/" + document.getElementById("cadastrar--lancamento--id").value)
            .then(data => {
                this.setState({ lancamento: data.data });
            });
        console.log(this.state.lancamento);
        this.setState({
              idCategoria: this.state.lancamento.idCategoria
            , idPlataforma: this.state.lancamento.idPlataforma
            , idClassificacaoIndicativa: this.state.lancamento.idClassificacaoIndicativa
            , titulo: this.state.lancamento.titulo
            , sinopse: this.state.lancamento.sinopse
            , dataDeLancamento: this.state.lancamento.dataDeLancamento
            , tipoDeMidia: this.state.lancamento.tipoDeMidia
            , tempoDeDuracao: this.state.lancamento.tempoDeDuracao
            , episodios: this.state.lancamento.episodios
        });
        document.getElementById("cadastrar--lancamento--categoria").value = this.state.lancamento.idCategoria;
        document.getElementById("cadastrar--lancamento--plataforma").value = this.state.lancamento.idPlataforma;
        document.getElementById("cadastrar--lancamento--ci").value = this.state.lancamento.idClassificacaoIndicativa;
        document.getElementById("cadastrar--lancamento--titulo").value = this.state.lancamento.titulo;
        document.getElementById("cadastrar--lancamento--sinopse").value = this.state.lancamento.sinopse;
        document.getElementById("cadastrar--lancamento--dataLancamento").value = this.state.lancamento.dataDeLancamento.slice(0, 10);
        document.getElementById("cadastrar--lancamento--duracao").value = this.state.lancamento.tempoDeDuracao;
        document.getElementById("cadastrar--lancamento--midia").value = this.state.lancamento.tipoDeMidia;
        document.getElementById("cadastrar--lancamento--episodios").value = this.state.lancamento.episodios;
        console.log(this.state);
    }

    addLancamento = async (event) => {
        event.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.set('IdCategoria', this.state.idCategoria);
        bodyFormData.set('IdPlataforma', this.state.idPlataforma);
        bodyFormData.set('IdClassificacaoIndicativa', this.state.idClassificacaoIndicativa);
        bodyFormData.set('Titulo', this.state.titulo);
        bodyFormData.set('Sinopse', this.state.sinopse);
        bodyFormData.set('DataDeLancamento', this.state.dataDeLancamento);
        bodyFormData.set('TipoDeMidia', this.state.tipoDeMidia);
        bodyFormData.set('TempoDeDuracao', this.state.tempoDeDuracao);
        bodyFormData.set('episodios', this.state.episodios);
        bodyFormData.append('Poster', this.state.poster);

        await Axios({
            method: 'post',
            url: 'http://localhost:5000/api/lancamentos',
            data: bodyFormData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        });
    }

    alterarLancamento = async (event) => {
        event.preventDefault();
        var bodyFormData = new FormData();
        bodyFormData.set('IdCategoria', this.state.idCategoria);
        bodyFormData.set('IdPlataforma', this.state.idPlataforma);
        bodyFormData.set('IdClassificacaoIndicativa', this.state.idClassificacaoIndicativa);
        bodyFormData.set('Titulo', this.state.titulo);
        bodyFormData.set('Sinopse', this.state.sinopse);
        bodyFormData.set('DataDeLancamento', this.state.dataDeLancamento);
        bodyFormData.set('TipoDeMidia', this.state.tipoDeMidia);
        bodyFormData.set('TempoDeDuracao', this.state.tempoDeDuracao);
        bodyFormData.set('Episodios', this.state.episodios);
        bodyFormData.append('Poster', this.state.poster);

        await Axios({
            method: 'put',
            url: 'http://localhost:5000/api/lancamentos/' + this.state.id,
            data: bodyFormData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        });
    }

    componentDidMount() {
        this.listarCategorias();
        this.listarPlataformas();
    }


    render() {
        return (
            <div className="Cadastrar">
                <select onChange={event => { this.setState({ selecionado: event.target.value }); }}>
                    <option selected disabled>Escolha um item para adicionar...</option>
                    <option value="L">Lançamento</option>
                    <option value="C">Categoria</option>
                    <option value="P">Plataforma</option>
                    <option value="U">Usuários</option>
                </select>
                <select onChange={event => { this.setState({ metodo: event.target.value }); }} style={{ display: (this.state.selecionado) ? 'block' : 'none' }}>
                    <option selected disabled>Escolha o método...</option>
                    <option value="A">Adicionar</option>
                    <option value="E">Editar</option>
                </select>
                <div style={{ display: (this.state.metodo === "E") ? 'block' : 'none' }}>
                    <input id="cadastrar--lancamento--id" type="number" onChange={event => { this.setState({ id: event.target.value }); }} />
                    <button onClick={this.buscarLancamento}>autocomplete</button>
                </div>
                <div id="cadastrar--lancamento" style={{ display: (this.state.selecionado === "L") ? 'block' : 'none' }}>
                    <form>
                        <select id="cadastrar--lancamento--categoria" onChange={event => { this.setState({ idCategoria: event.target.value }); }}>
                            <option selected disabled>Escolha sua categoria...</option>
                            {this.state.categorias.map(element => {
                                return (
                                    <option value={element.idCategoria}>{element.categoria}</option>
                                )
                            })}
                        </select>
                        <select id="cadastrar--lancamento--plataforma" onChange={event => { this.setState({ idPlataforma: event.target.value }); }}>
                            <option selected disabled>Escolha sua plataforma...</option>
                            {this.state.plataformas.map(element => {
                                return (
                                    <option value={element.idPlataforma}>{element.plataforma}</option>
                                )
                            })}
                        </select>
                        <select id="cadastrar--lancamento--ci" onChange={event => { this.setState({ idClassificacaoIndicativa: event.target.value }); }}>
                            <option selected disabled>Escolha a classificação indicativa...</option>
                            <option value="1">L</option>
                            <option value="2">+10</option>
                            <option value="3">+12</option>
                            <option value="4">+14</option>
                            <option value="5">+16</option>
                            <option value="6">+18</option>
                        </select>
                        <input id="cadastrar--lancamento--titulo" type="text" onChange={event => { this.setState({ titulo: event.target.value }) }} />
                        <textarea id="cadastrar--lancamento--sinopse" type="text" onChange={event => { this.setState({ sinopse: event.target.value }); }} />
                        <input id="cadastrar--lancamento--dataLancamento" type="date" onChange={event => { this.setState({ dataDeLancamento: event.target.value }); }}></input>
                        <input id="cadastrar--lancamento--duracao" type="time" onChange={event => { this.setState({ tempoDeDuracao: event.target.value }); }}></input>
                        <select id="cadastrar--lancamento--midia" onChange={event => { this.setState({ tipoDeMidia: event.target.value }); }}>
                            <option selected disabled>Escolha o tipo de mídia...</option>
                            <option value="F">Filme</option>
                            <option value="S">Série</option>
                        </select>
                        <input id="cadastrar--lancamento--episodios" type="number" onChange={event => { this.setState({ episodios: event.target.value }); }} style={{ display: (this.state.tipoDeMidia === "S") ? 'block' : 'none' }} />
                        <select onChange={event => { this.setState({ novoPoster: event.target.value }); }} style={{ display: (this.state.metodo === "E" && this.state.selecionado === "L") ? 'block' : 'none' }}>
                            <option selected disabled>Escolha uma opção...</option>
                            <option value="N">Manter o mesmo poster</option>
                            <option value="S">Adicionar novo poster</option>
                        </select>
                        <input type="file" onChange={event => { this.setState({ poster: event.target.files[0] }); }} style={{ display: (this.state.novoPoster === "S" || (this.state.selecionado === "L" && this.state.metodo === "A")) ? 'block' : 'none' }}></input>

                        <button onClick={(this.state.metodo === "E") ? this.alterarLancamento : this.addLancamento}>xablau</button>
                    </form>
                </div>

                <div className="cadatrar--categoria" style={{ display: (this.state.selecionado == "C") ? 'block' : 'none' }}>
                    <input type="text" />
                </div>
                <div className="cadastrar--plataforma" style={{ display: (this.state.selecionado == "P") ? 'block' : 'none' }}>
                    <input type="text" />
                </div>
            </div>

        );
    }
}

export default Cadastrar; 