import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import TramiteNuevo from './TramiteNuevo';
import Tramite from './Tramite.jsx';
import '../Styles/estilo.css';

function Tramites() {

  const [visible, setVisible] = useState(false);
  const [tramites, setTramites] = useState([]);
  const GetTramites = async () => {
    try {
      const { data } = await axios.get('api/tramite/all');
      setTramites(data);
      if (tramites === []) {
        Swal.fire({
          title: 'Error!',
          text: 'Fallo obteniendo los departamentos',
          icon: 'error',
          confirmButtonText: 'ok'
        })
      }
      console.log(data);
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
    console.log(tramites);
    console.log("Component has been rendered");
  }

  const Borrar = async (index) => {
    console.log(tramites[index]._id)
    try {
      let resp = await axios.delete('api/tramite/borrar', { data: { id: tramites[index]._id } });
      console.log(resp);
    }
    catch (error) {
      console.error('error!', error);
    }
  }

  const deleteItem = (index) => () => {
    setTramites((tramites) => tramites.filter((_, i) => i !== index));
    Borrar(index);
  }


  useEffect(() => {
    GetTramites();
  }, []);


  const RenderTramites = () => {
    let tramt = [];
    if (tramites !== undefined) {
      for (let i = 0; i < tramites.length; i++) {
        tramt.push(
          <div className="tramite">
            <Tramite data={tramites[i]} key={i} />
            <button className="button is-small is-danger is-light" onClick={deleteItem(i)}>Eliminar</button>
          </div>
        )
      }
      return tramt;
    }
    else return <div>LISTA VACIA</div>;
  }
  return (
    <div>
      <header>
        <h1 className="title is-1"><center>Trámites</center></h1>
        <button className="button is-info" onClick={() => { setVisible(!visible) }}>Nuevo tramite</button>
      </header>
      {visible ? <TramiteNuevo active={visible} /> : console.log("LOL")}
      <br />
      <main className="tramites">
        {RenderTramites()}
      </main>
    </div>);
}


export default Tramites;