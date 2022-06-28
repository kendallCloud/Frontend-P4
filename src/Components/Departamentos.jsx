import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Departamento from './Departamento.jsx';
import Swal from 'sweetalert2';
import ModalForm from './ConfigDepartamentos.jsx';

function Departamentos() {
  const [departas, setDepartas] = useState([]);
  const [visible, setVisible] = useState(false);
  const active = visible ? "is-active" : "";

  const ReqBorrar = async (index)=>{
    console.log(departas[index]._id)
    try {
      let resp = await axios.delete('api/departamento/borrar', { data: {id:departas[index]._id}});
      console.log(resp);
    }
    catch (error) {
      console.error('error!', error);
    }
  }

  const deleteItem = (index) => () =>{
    setDepartas((departas) => departas.filter((_, i) => i !== index));
    ReqBorrar(index);
  }


  const PostDepartamento = async (nombre) => {
    let json = {
      dep_nombre: nombre,
      dep_cantidadEmpleados: 0,
      dep_telefono: "",
      dep_email: "",
    }
    try {
      let resp = await axios.post('api/departamento/agregar', json);
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
        depar.push(
          <div>
            <button className="delete" aria-label="close" onClick={deleteItem(i)} />
            <Departamento key={i} datos={departas[i]} />)
          </div>
      )}
    }
    return depar;
  }

  return (

    <div className="container">
      <header className="title is-size-1">
        <center>Departamentos</center>
        <button className="button is-info" onClick={() => { setVisible(!visible) }}>Nuevo departamento</button>
      </header>
      <main className="grid">
        {insertarDepartamentos()}
        {visible ? (<ModalForm active={active} datos={{}} />) : (console.log("false"))}
      </main>
    </div>

  );
}

export default Departamentos;