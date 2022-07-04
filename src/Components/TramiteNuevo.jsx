import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

function TramiteNuevo({ departas, setData }) {

  const [dato, setDato] = useState({
    trm_nombre: "",
    trm_codigo: "",
    trm_departamentosAprueban: [],              //departamentos que lo aprueban
    trm_departamento_cod: "",               //departamento que lo realiza
    trm_documentos: []
  });

  const [aux, setAux] = useState("");

  const ListaDepartament = () => {
    if (departas !== undefined) {
      return departas.map((item) => {
        return <option key={item.dep_nombre}>{item.dep_nombre}</option>;
      })
    }
  }

  return (
    <form className="modal-card-body">
      <input type="text" className="input" name="trm_nombre" onChange={(event) => { setDato({ ...dato, trm_nombre: event.target.value }); setData(dato); console.log(event.target.value) }} placeholder="Nombre del tramite" /><br />
      <div className="select">
        <select name="trm_departamento_cod" onChange={(event) => { setDato({...dato,trm_departamento_cod: event.target.value }); setData(dato); console.log(event.target.value) }}>
          <option value="default">
            Departamento que lo realiza.
          </option>
          {ListaDepartament()}
        </select>
      </div>
      <br />
      <div className="is flex">
        <select onChange={(event) => { setDato({ ...dato,trm_departamentosAprueban:[...dato.trm_departamentosAprueban,event.target.value]}) }} className="select">
          <option value="default">
            Deben aprobar:
          </option>
          {ListaDepartament()}
        </select>
        <ol>
          {
            dato.trm_departamentosAprueban.map((item) => {
              return <li key={item}>{item}</li>;
            })
          }
        </ol>
      </div>
      <div className="is flex">
        <div>
          <label className="label">Documentos requeridos</label>
          <input className="input" type="text" onChange={(event) => { setAux(event.target.value); console.log(aux) }} />
          <button className="button" type="button" onClick={() => { dato.trm_documentos.push(aux); setData({...dato, trm_documentos: dato.trm_documentos }); console.log(dato.trm_documentos) }}><strong>+</strong></button>
        </div>
      </div>
      <p>
        {
          dato.trm_documentos.map((item) => {
            console.log(item);
            return <li key={item}><strong>{item}</strong></li>;
          })
        }
      </p>
    </form>);

}

function Tramite({ active,departamentos}) {

  const [ver, setVer] = useState(active ? "is-active" : "");




  const [data, setData] = useState({
    trm_nombre: "",
    trm_codigo: "",
    trm_departamentosAprueban: [],              //departamentos que lo aprueban
    trm_departamento_cod: "",               //departamento que lo realiza
    trm_documentos: []
  });

  const NameToID = ()=>{
        for(let i=0; i< departamentos.length;i++){
          if(departamentos[i].dep_nombre === data.trm_departamento_cod){data.trm_departamento_cod = departamentos[i]._id}
          console.log(departamentos[i].dep_nombre);
        }
        console.log("DATA2 ", data);
  }

  const PostTramite = async () => {
    cerrar()
    console.log("DATA ", data);
    NameToID();
    try {
      const resp = await axios.post('api/tramite/agregar', data);
     console.log(resp.data);
    }
    catch (error) {
      console.error('error!', error);
    }
  }

  const cerrar = () => {
    ver === "" ? setVer("is-active") : setVer("")
  }
  return (
    <div className={`modal ${ver}`}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Modificar tramite</p>
          <button className="delete" aria-label="close" onClick={cerrar}/>
        </header>
        <TramiteNuevo departas={departamentos} setData={setData}/>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={PostTramite}>Guardar cambios</button>
          <button className="button" onClick={cerrar}>Cancelar</button>
        </footer>
      </div>
    </div>
  );

}

export default Tramite;