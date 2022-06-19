import React, { useState } from 'react';
import Caso from './Caso.jsx'; 
import CasoNuevo from './CasoNuevo.jsx'

function Casos () {
  const [data,setData] = useState({arrBusq:[],tramites:[]});
  const [visible,setVisible] = useState(false);

 const insertarCasos = ()=>{
    let depar = [];
    if(typeof data != 'undefined' && typeof data.arrBusq != 'undefined'){
        if(data.arrBusq.length < 1 || typeof data.arrBusq === 'undefined'){

          for(var i = 0; i < data.tramites.length;i++){
            depar.push(<Caso key={i}/>)
          } 
        }
        else {
          for(var j = 0; j < data.arrBusq.length;j++){
            depar.push(<Caso className ="Depa" key={j}/>)
          } 
        }
    }
        return depar;
  }

//  const buscarDepart = (valor)=>{
//     var sortArrray = [];
//     for (let index = 0; index < data.departamentos.length; index++) {
//       console.log(data.departamentos[index]);
//       if(data.departamentos[index].includes(valor)) {sortArrray.push(data.departamentos[index])}
//     }
//     this.setState({arrBusq:sortArrray});
//   }

      return (

      <div className="container">
         <header className="title is-size-1">
            <center>Casos  registrados</center>
            <div className="is flex" style={{}}>
            <input type="text" className="input" id="search" placeholder="Buscar" style={{width: '25%'}}/>
            <button className="button is-info" onClick={() => {setVisible(!visible);}}>Nuevo caso</button>
            </div>
        </header>
        <main className="grid">
        {visible?<CasoNuevo active={visible} tramites={data.tramites}/>:console.log("LOL")}
          {insertarCasos()}
        </main>
      </div>  
      
      )
    
  }

export default Casos;