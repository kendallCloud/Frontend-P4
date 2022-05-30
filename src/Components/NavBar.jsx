import React from 'react'
 
class NavBar extends React.Component{
  
  sendDataToParent = (modulo) => { // the callback. Use a better name
    console.log(modulo);
    this.setState(modulo);
  }

  Getventana =  (event) => {
    console.log(event.target.innerText);
    this.props.pasarDato(event.target.innerText);
    event.preventDefault();
  }

  render() {
      return (
          <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <img src="http://drive.google.com/uc?export=view&id=1Px6nMpagJEU7m89vukXKV6M6mf9c7YvJ" width={112} height={28} alt="NO Carga"/>
            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item" value="Departamentos" onClick={this.Getventana}>
                Departamentos
              </a>
              <a className="navbar-item" onClick={this.Getventana}>
                Trámites
              </a>
              <a className="navbar-item" onClick={this.Getventana}>
                Casos
              </a>
              <a className="navbar-item" onClick={this.Getventana}>
                Parametros
              </a>

              <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                  Trackings
                </a>
                <div className="navbar-dropdown">
                  <a className="navbar-item" >
                    Contrataciónes
                  </a>
                  <a className="navbar-item" >
                    Despidos
                  </a>
                  <a className="navbar-item" >
                    Incapacidades
                  </a>
                  <hr className="navbar-divider" />
                  <a className="navbar-item">
                    otros
                  </a>
                </div>
              </div>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <a className="button is-danger">
                    <strong>Cerrar sesion</strong>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
        
      );
    }
  }

export default NavBar;

