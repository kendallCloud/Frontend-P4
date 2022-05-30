import React from 'react';
import TramiteNuevo from './TramiteNuevo';
import Tramite from './Tramite.jsx';
import '../Styles/estilo.css';
class Tramites extends React.Component {

  constructor() {
    super();
    this.state = {
      visible: false,
      depart:["recursos humanos","financiero","gerencia"],
      tramites:["juan","pedro","maria","juan2"]
    };
  }

    RenderTramites(){
      let tramt = [];
      for(let i=0;i<this.state.tramites.length;i++){tramt.push(<Tramite key={i}/>)}
      return tramt;
    }
    render() {  
      return(
        <div>
          <header>
              <h1 className="title is-1"><center>Trámites</center></h1>
              <button className="button is-info" onClick={() => {this.setState({visible:!this.state.visible});}}>Nuevo tramite</button>
          </header>    
          {this.state.visible?<TramiteNuevo active={this.state.visible} departamentos={this.state.depart}/>:console.log("LOL")}
          <br/>
          <main className="tramites">
          {this.RenderTramites()}
          </main>
        </div>
     
      
      );
    }
  }

export default Tramites;