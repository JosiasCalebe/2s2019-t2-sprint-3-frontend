import React, { Component, useState } from 'react';
import '../../assets/css/reset.css';
import '../../assets/css/style.css';
import api from '../../services/api';

export default function Busca(props) {

    const [lancamento, setLancamento] = useState({});
    const { id } = props.match.params;

    async function buscarLancamentos(id) {
        await api.get("/lancamentos/" + id)
            .then(data => {

                setLancamento(data.data);
            });
    }


    buscarLancamentos(id);

    return (
        <div className="Busca">

            <div>
                <div className="poster">
                    <p className="nota" style={{ backgroundColor: (lancamento.notaMedia > 60) ? 'green' : (lancamento.notaMedia < 40) ? '#FF493F' : '#FFC601' }}>{lancamento.notaMedia}</p>
                    <img src={`http://localhost:5000` + lancamento.poster} />
                </div>
                <br></br>
                <p>{lancamento.titulo}</p>
                <p>{new Date(lancamento.dataDeLancamento).toLocaleDateString("pt-BR")}</p>
            </div>
            <br/>
            <p>Reviews: </p>
            <div>
                {
                    lancamento.reviews == undefined ? '' :
                    lancamento.reviews.map(element => {
                        return (
                            <div>
                                <br/>
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
        </div>

    )

}