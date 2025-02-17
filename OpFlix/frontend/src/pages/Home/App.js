import React, { Component } from 'react';
import './App.css';
import '../../assets/css/reset.css';
import '../../assets/css/style.css';
import api,{ ENDPOINT} from '../../services/api';
import { parseJwt } from '../../services/auth';
import logo from '../../assets/img/logo.png';
import { Link } from 'react-router-dom';

class App extends Component {

  constructor() {
    super();
    this.state = {
      lista: [
      ],
      nome: ''
    };
  }

  listarLancamentos = () => {
    api.get("/lancamentos")
      //this.setState({ lista: xablau.data });
      .then(data => {
        this.setState({ lista: data.data });
        console.log(data.data);
        var slider = document.getElementById('slider'),
          sliderItems = document.getElementById('items'),
          prev = document.getElementById('prev'),
          next = document.getElementById('next');

        this.slide(slider, sliderItems, prev, next)
      });



  }

  slide = (wrapper, items, prev, next) => {
    var posX1 = 0,
      posX2 = 0,
      posInitial,
      posFinal,
      threshold = 100,
      slides = items.getElementsByClassName('slide'),
      slidesLength = slides.length,
      slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
      firstSlide = slides[0],
      lastSlide = slides[slidesLength - 1],
      cloneFirst = firstSlide.cloneNode(true),
      cloneLast = lastSlide.cloneNode(true),
      index = 0,
      allowShift = true;

    console.log(slides);

    // Clone first and last slide
    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);
    wrapper.classList.add('loaded');


    // Click events
    prev.addEventListener('click', function () { shiftSlide(-1) });
    next.addEventListener('click', function () { shiftSlide(1) });

    // Transition events
    items.addEventListener('transitionend', checkIndex);


    function shiftSlide(dir, action) {
      items.classList.add('shifting');

      if (allowShift) {
        if (!action) { posInitial = items.offsetLeft; }

        if (dir === 1) {
          items.style.left = (posInitial - slideSize) + "px";
          index++;
        } else if (dir === -1) {
          items.style.left = (posInitial + slideSize) + "px";
          index--;
        }
      };

      allowShift = false;
    }

    function checkIndex() {
      items.classList.remove('shifting');

      if (index === -1) {
        items.style.left = -(slidesLength * slideSize) + "px";
        index = slidesLength - 1;
      }

      if (index === slidesLength) {
        items.style.left = -(1 * slideSize) + "px";
        index = 0;
      }

      allowShift = true;
    }

    console.log(firstSlide);
  }
  componentDidMount() {
    this.listarLancamentos();
  }




  render() {
    return (
      <div className="App">
        <header className="mainHeader">
          <div className="container">
            <img src={logo} />
            <div className="mainHeader-busca">
              <input className="mainHeader-barra" placeHolder="Buscar..." type="text" onKeyPress={(event) => event.key === 'Enter' ? this.props.history.push(`/buscar/` + event.target.value) : null} />
            </div>
            <nav className="mainHeader-nav">
              {localStorage.getItem('user') ?
                <div>
                  <Link className="mainHeader-nav-item" onClick={event => localStorage.clear('user')}>Logoff</Link>
                  <Link className="mainHeader-nav-item" to="/usuario">{parseJwt().NomeUsuario}</Link>
                </div> :
                <div>
                  <Link className="mainHeader-nav-item" to="/login">Login</Link>
                  <Link className="mainHeader-nav-cadastro" to="/cadastrar">Cadastrar-se</Link>
                </div>
              }

            </nav>
          </div>
        </header>
        <div id="slider" className="slider">
          <div className="wrapper">
            <div id="items" className="items">
              {this.state.lista.map(element => {
                return (
                  <Link className="slide" to={"/lancamento/" + element.idLancamento}>
                    <div className="poster">
                      <p className="nota" style={{ backgroundColor: (element.notaMedia > 60) ? 'green' : (element.notaMedia < 40) ? '#FF493F' : '#FFC601' }}>{element.notaMedia}</p>
                      <img src={ENDPOINT + element.poster} alt="poster"/>
                    </div>
                    <br></br>
                    <p>{element.titulo}</p>
                    <p>{element.dataDeLancamento.slice(0, 4)}</p>
                    </Link>
                  
                )
              })}
            </div>
          </div>
          <a id="prev" className="control prev"></a>
          <a id="next" className="control next"></a>
        </div>
      </div>
    );
  }
}



export default App;
