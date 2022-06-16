import React from 'react';
import axios from 'axios';
import Departamento from './Departamento.jsx'; 
var totalReactPackages=[];

function ObtenerDatos(){
  axios.get('api/departamento/all')
      .then(response => {totalReactPackages=response.data
      console.log(totalReactPackages)})
      .catch(error => {
          this.setState({ errorMessage: error.message });
          console.error('There was an error!', error);

      },[]);


}

class Departamentos extends React.Component {

  constructor() {
    super();
    ObtenerDatos();
    this.state = {
      list:["Juan Gabriel","Josias"],
      departamentos:["juan","Maria","jose","pedro","ana","","ee34"],
      aux:"",
      busq:"",
      arrBusq:[]
    };
  }

  insertarDepartamentos(){
    let depar = [];
    if(this.state.arrBusq.length < 1){

      for(var i = 0; i < this.state.departamentos.length;i++){
        depar.push(<Departamento key={i}/>)
      } 
    }
    else {

      for(var j = 0; j < this.state.arrBusq.length;j++){
        depar.push(<Departamento key={j}/>)
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
            <center>Departamentos</center>
            <div className="is flex" style={{}}>
            <input type="text" className="input" id="search" placeholder="Buscar" style={{width: '25%'}}/>
            </div>
        </header>
        <main className="grid">
            {this.insertarDepartamentos()}
        </main>
      </div>  
      
      );
    }
  }

export default Departamentos;