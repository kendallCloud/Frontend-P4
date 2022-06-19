import React from 'react';
 
class NavBar extends React.Component{

  Getventana =  (event) => {
    console.log(event.target.innerText);
    this.props.pasarDato(event.target.innerText);
    event.preventDefault();
  }

  LogOut = ()=>{
    try{
      fetch('http://localhost:4000/logout').then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.props.pasarDato("X");
      })
      }
      catch (err) {
        console.error('err', err);
        alert(err);
      }
  }

  render() {
      return (
          <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <img src="http://drive.google.com/uc?export=view&id=1Px6nMpagJEU7m89vukXKV6M6mf9c7YvJ" width={112} height={28} alt="NO Carga"/>
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
                  Trackings
              </a>
              <a className="navbar-item" onClick={this.Getventana}>
                Parametros
              </a>
           </div>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <a className="button is-danger" onClick={this.LogOut}>
                    <strong>Cerrar sesion</strong>
                  </a>
                </div>
              </div>
            </div>
        </nav>
        
      );
    }
  }

export default NavBar;

