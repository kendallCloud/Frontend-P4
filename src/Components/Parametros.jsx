import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/estilo.css';
//import { useState } from 'react';
//import { useEffect } from 'react';
 const Parametros = () => {

    const [data,setData] = useState({});

    const setearParametros = async () => {
      try {
        const { data } = await axios.get('api/parametros/all');
        setData(data[0]);
      }
  
      catch (error) {
        console.error('error!', error);
  
      }
  
      console.log("Component has been rendered");
    }

  useEffect( () => {
    setearParametros();
  },[]);

  // const  AddtoLista =() => {
  //   var nueva = this.state.list;
  //   nueva.push(this.state.aux);
  //   this.setState({ nueva });
  // }

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
  //     this.handleSubmit()
  //   }
  // }

  // handleSubmit() {
  //   var json = this.state.data;

  //   json = { ...json, departamentos: this.state.list };// Actualiza lista de departamentos
  //   this.setState({ json });
  //   console.log(json);
  //   axios.post('api/parametros/agregar', json);                //*********/
  //   var listaD = this.state.list;
  //   console.log(listaD);
  //   InsertarDep(listaD);

  //   // ... submit to API or something

  // };
    return (
      <main>
        <h1 className="title is-1"><center>Parametros</center></h1>
        <form>
          <div className="field">
            <label className="label">Nombre oficial de la empresa</label>
            <div className="control">
              <input className="input" name="nombre" value={data.par_nombre} type="text" placeholder="" />
            </div>
          </div>

          <div className="field">
            <label className="label">Cedula juridica</label>
            <div className="control">
              <input className="input" name="cedJuridica" value={data.par_ced_juridica} type="text" placeholder="" />
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input" type="email" name="email" value={data.par_email} placeholder="nombre@dominio.com" />
            </div>
          </div>

          <div className="field" id="depart">
            <label className="label">Departamentos</label>
            <div className="control">
              <div>
                <input className="input" type="text" id="nombre_depar"/>
                <button className="button is-link" type="button"><strong>+</strong></button>
              </div>
              <p>
                {
                 data.par_depart.map((item) => {
                   console.log(item);
                   return <li key={item}><strong>{item}</strong></li>;
                  })
                  }
              </p>

            </div>
          </div>
        </form>
        <br />

        <br />
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" >Submit</button>
          </div>
          <div className="control">
            <button className="button is-link is-light">Cancel</button>
          </div>
        </div>
      </main>

    );
  }

export default Parametros;