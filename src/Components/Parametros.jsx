import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/estilo.css';
import Swal from 'sweetalert2';

const Parametros = () => {

  const [data, setData] = useState({});
  const [aux, setAux] = useState("");

  const setearParametros = async () => {
    try {
      const { data } = await axios.get('api/parametros/all');
      setData(data[0]);
      if(data === undefined || data === null || Object.keys(data).length === 0){
        Swal.fire({
          title: 'Error!',
          text: 'Fallo obteniendo los parametros',
          icon: 'error',
          timer:6000
        })
      }
    }

    catch (error) {
      console.error('error!', error);
      Swal.fire({
        title: 'Error!',
        text: 'Fallo obteniendo los parametros',
        icon: 'error',
        timer:6000
      })
    }
    console.log(data);
    console.log("Component has been rendered");
  }

  useEffect(() => {
    setearParametros();
  }, []);


  const OrderedList = () => {

    if (Array.isArray(data.par_depart)) {
      return data.par_depart.map((item) => {
        console.log(item);
        return <li key={item}><strong>{item}</strong></li>;
      })
    }
    else {
      return [];
    }
  }

  const AddtoLista = () => {
    var nueva = data.par_depart;
    console.log(nueva);
    nueva.push(aux);
    setData({...data,par_depart: nueva });
  }

  const AddtoAux = (e) => {
    setAux(e.target.value);
  }

  // const verificar = () => {
  //   var json = this.state.data;
  //   console.log(json.nombre);
  //   var bandera = null;
  //   //axios.get('api/parametros/par', json).then(res=>{bandera=res.data; console.log("RES: ",res.data)});
  //   bandera = axios.get('api/parametros/par', json);
  //   console.log(bandera);
  //   if (bandera != null) {
  //     axios.put('api/parametros/editar', json)
  //   } else {
  //     this.handleUpdate()
  //   }
  // }

  const handleSubmit = () => {
     console.log(data);
     let resp = axios.put('api/parametros/editar',data);               
     console.log(resp);

     if (resp.status === 200){
      Swal.fire({
        title: 'Exito!',
        icon: 'succes',
        timer:6000
      })
     }else{
      Swal.fire({
        title: 'Error!',
        text: 'Fallo actualizando los parametros',
        icon: 'error',
        timer:6000
      })
     }
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  }

  return (
    <main>
      <h1 className="title is-1"><center>Parametros</center></h1>
      <form>
        <div className="field">
          <label className="label">Nombre oficial de la empresa</label>
          <div className="control">
            <input className="input" name="par_nombre" onChange={(event) => handleUpdate(event)} value={data.par_nombre} type="text" placeholder="" />
          </div>
        </div>

        <div className="field">
          <label className="label">Cedula juridica</label>
          <div className="control">
            <input className="input" name="par_ced_juridica" onChange={(event) => handleUpdate(event)} value={data.par_ced_juridica} type="text" placeholder="" />
          </div>
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" type="email" name="par_email" onChange={(event) => handleUpdate(event)} value={data.par_email} placeholder="nombre@dominio.com" />
          </div>
        </div>

        <div className="field" id="depart">
          <label className="label">Departamentos</label>
          <div className="control">
            <div>
              <input className="input" onChange={(event) => AddtoAux(event)} name="depa" type="text" id="nombre_depar" />
              <button className="button is-link" onClick={() => AddtoLista()} type="button">+</button>
            </div>
            <p>
              {OrderedList()}
            </p>

          </div>
        </div>
      </form>
      <br />

      <br />
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-link" onClick={handleSubmit}>Submit</button>
        </div>
        <div className="control">
          <button className="button is-link is-light">Cancel</button>
        </div>
      </div>
    </main>

  );
}

export default Parametros;