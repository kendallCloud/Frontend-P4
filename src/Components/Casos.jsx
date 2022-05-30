import React from 'react';
import Caso from './Caso.jsx'; 
import CasoNuevo from './CasoNuevo.jsx'

class Casos extends React.Component {

  constructor() {
    super();
    this.state = {
      visible:false,
      list:["Juan Gabriel","Josias"],
      tramites:["juan","Maria","jose","pedro","ana","","ee34"],
      aux:"",
      busq:"",
      arrBusq:[]
    };
  }

  insertarCasos(){
    let depar = [];
    if(this.state.arrBusq.length < 1){

      for(var i = 0; i < this.state.tramites.length;i++){
        depar.push(<Caso key={i}/>)
      } 
    }
    else {
      for(var j = 0; j < this.state.arrBusq.length;j++){
        depar.push(<Caso className ="Depa" key={j}/>)
      } 
    }
    return depar;
  }

  buscarDepart(valor){
    var sortArrray = [];
    for (let index = 0; index < this.state.departamentos.length; index++) {
      console.log(this.state.departamentos[index]);
      if(this.state.departamentos[index].includes(valor)) {sortArrray.push(this.state.departamentos[index])}
    }
    this.setState({arrBusq:sortArrray});
  }

    render() {
      return (

      <div className="container">
         <header className="title is-size-1">
            <center>Casos  registrados</center>
            <div className="is flex" style={{}}>
            <input type="text" className="input" id="search" placeholder="Buscar" style={{width: '25%'}}/>
            <button className="button is-info" onClick={() => {this.setState({visible:!this.state.visible});}}>Nuevo caso</button>
            </div>
        </header>
        <main className="grid">
        {this.state.visible?<CasoNuevo active={this.state.visible} tramites={this.state.tramites}/>:console.log("LOL")}
          {this.insertarCasos()}
        </main>
      </div>  
      
      );
    }
  }

export default Casos;