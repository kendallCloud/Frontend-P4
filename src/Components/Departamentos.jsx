import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Departamento from './Departamento.jsx';
import Swal from 'sweetalert2'

function Departamentos() {
  const [departas, setDepartas] = useState([]);
  const [parametros, setParametros] = useState([]);

  const setearParametros = async () => {
    try {
      const { data } = await axios.get('api/parametros/all');
      setParametros(data[0]);
    }

    catch (error) {
      console.error('error!', error);

    }
    console.log(parametros);
    console.log("Component has been rendered");
  }


  const PostDepartamento = async (nombre) => {
    let json = {
      dep_nombre:nombre,
      dep_cantidadEmpleados:0,
      dep_telefono:"",
      dep_email:"",
    }
    try {
    let  resp  = await axios.post('api/departamento/agregar',json);
    console.log(resp);
    }

    catch (error) {
      console.error('error!', error);

    }
  }

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

  const ActDepar = ()=> {
    let nombres = [];

    departas.forEach((element) => {
      nombres.push(element.dep_nombre);
    });

    parametros.par_depart.forEach((element) => {
        if(!nombres.includes(element)){//no existe un departamento con ese nombre?
            PostDepartamento(element)
        }
    })

  }
  return (

    <div className="container">
      <header className="title is-size-1">
        <center>Departamentos</center>
          <button className="button is-info" onClick={ActDepar}>Recargar departamentos</button>
      </header>
      <main className="grid">
        {insertarDepartamentos()}
      </main>
    </div>

  );

}

export default Departamentos;