import React, { useState }from 'react';
import axios from 'axios';
import Departamento from './Departamento.jsx'; 
var totalReactPackages=[];

function ObtenerDatos(){
  axios.get('api/departamento/all')
      .then(response => {totalReactPackages=response.data
      console.log(totalReactPackages)})
      .catch(error => {
          console.error('There was an error!', error);

      },[]);
}

function Departamentos (){
  const [data,setData] = useState({
    list:[],
    departamentos:[],
    aux:"Z",
    busq:"Y",
    arrBusq:[]
  });

  const insertarDepartamentos = ()=>{
    let depar = [];
    if(data.arrBusq.length < 1){

      for(var i = 0; i < data.departamentos.length;i++){
        depar.push(<Departamento key={i}/>)
      } 
    }
    else {

      for(var j = 0; j < data.arrBusq.length;j++){
        depar.push(<Departamento key={j}/>)
      } 

    }
    return depar;
  }

const  buscarDepart = (valor)=>{
    var sortArrray = [];
    for (let index = 0; index < data.departamentos.length; index++) {
      console.log(data.departamentos[index]);
      if(data.departamentos[index].includes(valor)) {sortArrray.push(data.departamentos[index])}
    }
      
  }
      return (

      <div className="container">
         <header className="title is-size-1">
            <center>Departamentos</center>
            <div className="is flex" style={{}}>
            <input type="text" className="input" id="search" placeholder="Buscar" style={{width: '25%'}}/>
            </div>
        </header>
        <main className="grid">
            {insertarDepartamentos()}
        </main>
      </div>  
      
      );
    
  }

export default Departamentos;