import React, { useState } from 'react';
import axios from 'axios';

function TramiteNuevo({departamentos,setData}){

  const [dato,setDato] = useState({
    trm_nombre:"",
    trm_codigo:"",
    trm_departamentosAprueban:[],              //departamentos que lo aprueban
    trm_departamento_cod:"",               //departamento que lo realiza
    trm_documentos:[] 
 });

 const [aux,setAux] = useState("");

  return(
    <form className="modal-card-body">
    <input type="text" className="input" name="trm_nombre" onChange={(event) =>{ setDato({...dato,trm_nombre:event.target.value});setData({dato});console.log(event.target.value)}} placeholder="Nombre del tramite" /><br/>
     <div className="select">
       <select  name="trm_departamento_cod" onChange={(event) =>{setDato({...dato,trm_departamento_cod:event.target.value});setData({dato});  console.log(event.target.value)}}>
       <option value="default">
          Departamento que lo realiza.
        </option>
         { 
           departamentos.map((item) => {
             console.log(item);
             return <option key={item}>{item}</option>;
           })
         }
       </select>
       </div>
        <br/>
       <div className="is flex">
       <select onChange={(event) =>{setDato({...dato,trm_departamentosAprueban:event.target.value})}} className="select">
       <option value="default">
          Deben aprobar:
        </option>
        { 
           departamentos.map((item) => {
             return <option key={item}>{item}</option>;
           })
         }
       </select>
       <ol>
       { 
           departamentos.map((item) => {
             console.log(item);
             return <li key={item}>{item}</li>;
         })
        }
       </ol>
       </div>
    <div className="is flex">
        <div>
            <label className="label">Documentos requeridos</label>
            <input className="input" type="text" onChange={(event) =>{setAux(event.target.value);console.log(aux)}}/>
            <button className="button" type="button" onClick={()=>{dato.trm_documentos.push(aux); setData({...dato,trm_documentos:dato.trm_documentos}); console.log(dato.trm_documentos)}}><strong>+</strong></button>
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

function Tramite ({active}){

  const [ver,setVer] =  useState(active?"is-active":"");
  const [departamentos,setDepart] =  useState([]);
  const [data,setData] = useState({
    trm_nombre:"",
    trm_codigo:"",
    trm_departamentosAprueban:[],              //departamentos que lo aprueban
    trm_departamento_cod:"",               //departamento que lo realiza
    trm_documentos:[] 
 });

  const PostTramite = async () => {
    console.log("DATA ",data);
    try {
      const resp = await axios.post('api/tramite/agregar',data);
    }
    catch (error) {
      console.error('error!', error);

    }
    console.log("Component has been rendered");
  }

// useEffect( () => {
//   GetDepartamentos();
// },[]);


   const metodo = ()=>{ 
      ver===""?setVer("is-active"):setVer("")
    }
        return(
            <div className={`modal ${ver}`}>
             <div className="modal-background" />
             <div className="modal-card">
            <header className="modal-card-head">
            <p className="modal-card-title">Modificar tramite</p>
            <button className="delete" aria-label="close" />
            </header>
            <TramiteNuevo departamentos={departamentos} setData={setData} />
            <footer className="modal-card-foot">
            <button className="button is-success" onClick={PostTramite}>Guardar cambios</button>
            <button className="button"  onClick={metodo}>Cancelar</button>
            </footer>
        </div>
        </div>
        );   
    
}

export default Tramite;