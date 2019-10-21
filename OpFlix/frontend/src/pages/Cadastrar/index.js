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
                console.log(data.data);
            });
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
                <input type="number" onChange={event => { this.setState({ id: event.target.value }); }} style={{ display: (this.state.metodo === "E") ? 'block' : 'none' }} />
                <div className="cadastrar--lancamento" style={{ display: (this.state.selecionado === "L") ? 'block' : 'none' }}>
                    <form>
                        <select onChange={event => { this.setState({ idCategoria: event.target.value }); }}>
                            <option selected disabled>Escolha sua categoria...</option>
                            {this.state.categorias.map(element => {
                                return (
                                    <option value={element.idCategoria}>{element.categoria}</option>
                                )
                            })}
                        </select>
                        <select onChange={event => { this.setState({ idPlataforma: event.target.value }); }}>
                            <option selected disabled>Escolha sua plataforma...</option>
                            {this.state.plataformas.map(element => {
                                return (
                                    <option value={element.idPlataforma}>{element.plataforma}</option>
                                )
                            })}
                        </select>
                        <select onChange={event => { this.setState({ idClassificacaoIndicativa: event.target.value }); }}>
                            <option selected disabled>Escolha a classificação indicativa...</option>
                            <option value="1">L</option>
                            <option value="2">+10</option>
                            <option value="3">+12</option>
                            <option value="4">+14</option>
                            <option value="5">+16</option>
                            <option value="6">+18</option>
                        </select>
                        <input type="text" onChange={event => { this.setState({ titulo: event.target.value }) }} />
                        <input type="text" onChange={event => { this.setState({ sinopse: event.target.value }); }} />
                        <input type="date" onChange={event => { this.setState({ dataDeLancamento: event.target.value }); }}></input>
                        <input type="time" onChange={event => { this.setState({ tempoDeDuracao: event.target.value }); }}></input>
                        <select onChange={event => { this.setState({ tipoDeMidia: event.target.value }); }}>
                            <option selected disabled>Escolha o tipo de mídia...</option>
                            <option value="F">Filme</option>
                            <option value="S">Série</option>
                        </select>
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