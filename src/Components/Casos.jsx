import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Caso from './Caso.jsx';
import CasoNuevo from './CasoNuevo.jsx'
import Swal from 'sweetalert2';

function Casos() {
  const [casos, setCasos] = useState([]);
  const [visible, setVisible] = useState(false);

  const GetCasos = async () => {
    try {
      const { data } = await axios.get('api/caso/all');
      setCasos(data);
      if (casos === []) {
        Swal.fire({
          title: 'Error!',
          text: 'Fallo obteniendo los casos',
          icon: 'error',
          confirmButtonText: 'ok'
        })
      }
      console.log(data);
    }

    catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Fallo obteniendo los casos',
        icon: 'error',
        confirmButtonText: 'ok'
      })
      console.error('error!', error);

    }
    console.log(casos);
    console.log("Component has been rendered");
  }
  useEffect(() => {
    GetCasos();
  }, []);

  const Borrar = async (index) => {
    console.log(casos[index]._id)
    try {
      let resp = await axios.delete('api/caso/borrar', { data: { id: casos[index]._id } });
      console.log(resp);
    }
    catch (error) {
      console.error('error!', error);
    }
  }

  const deleteItem = (index) => () => {
    setCasos((casos) => casos.filter((_, i) => i !== index));
    Borrar(index);
  }

  const insertarCasos = () => {
    let depar = [];
    if (casos !== undefined) {
      for (var i = 0; i < casos.length; i++) {
        depar.push(
          <div className="Depa">
            <Caso key={i} data={casos[i]}/>
            <button className="button is-small is-danger is-light" onClick={deleteItem(i)}>Eliminar</button>
          </div>
        )
      }
    }
    return depar;
  }

  return (

    <div className="container">
      <header className="title is-size-1">
        <center>Casos  registrados</center>
        <div className="is flex" style={{}}>
          <input type="text" className="input" id="search" placeholder="Buscar" style={{ width: '25%' }} />
          <button className="button is-info" onClick={() => { setVisible(!visible); }}>Nuevo caso</button>
        </div>
      </header>
      <main className="grid">
        {visible ? <CasoNuevo active={visible} /> : console.log("LOL")}
        {insertarCasos()}
      </main>
    </div>

  )

}

export default Casos;