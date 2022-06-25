import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Departamento from './Departamento.jsx';
import Swal from 'sweetalert2'

function Departamentos() {
  const [departas, setDepartas] = useState([]);
  const GetDepartamentos = async () => {
    try {
      const { data } = await axios.get('api/departamento/all');
      if (data === undefined) {
        Swal.fire({
          title: 'Error!',
          text: 'Fallo obteniendo los departamentos',
          icon: 'error',
          confirmButtonText: 'ok'
        })
      }
      console.log(data);
      setDepartas(data);
    }

    catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Fallo obteniendo los departamentos',
        icon: 'error',
        confirmButtonText: 'ok'
      })
      console.error('error!', error);

    }
    console.log("Component has been rendered");
  }

  useEffect(() => {
    GetDepartamentos();
  }, []);

  const insertarDepartamentos = () => {
    let depar = [];
    console.log(departas);
    if (departas !== undefined) {
      for (var i = 0; i < departas.length; i++) {
        depar.push(<Departamento key={i} datos={departas[i]} />)
      }
    }
    return depar;
  }

  // const  buscarDepart = (valor)=>{
  //     var sortArrray = [];
  //     for (let index = 0; index < data.departamentos.length; index++) {
  //       console.log(data.departamentos[index]);
  //       if(data.departamentos[index].includes(valor)) {sortArrray.push(data.departamentos[index])}
  //     }

  //   }
  return (

    <div className="container">
      <header className="title is-size-1">
        <center>Departamentos</center>
        <div className="is flex" style={{}}>
          <input type="text" className="input" id="search" placeholder="Buscar" style={{ width: '25%' }} />
        </div>
      </header>
      <main className="grid">
        {insertarDepartamentos()}
      </main>
    </div>

  );

}

export default Departamentos;