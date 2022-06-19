import React, { useState } from 'react';

function CasoNuevo({tramites}){
const [realiza,setRealiza] = useState("");
const [aux,setaux] = useState("");
  return(
    <form action="" className="modal-card-body">
    <input type="text" className="input" placeholder="Codigo del caso" /><br/>
     <div className="select">
       <select   onChange={(event) =>{setRealiza(event.target.value); console.log(realiza);}}>
       <option value="default">
          Tramite a realizar.
        </option>
         { 
           tramites.map((item) => {
             console.log(item);
             return <option key={item}>{item}</option>;
           })
         }
       </select>
       </div>
        <br/>
       <div className="is flex">
       <div>
  <label htmlFor="Inicio">Abre caso:</label>
  <input type="date" id="Inicio" name="trip-start" className="input"  />
    </div>


    </div>
    <div className="is flex">
        <div>
          
        </div>
    </div>
</form>);

}

const Caso = () =>{
  const [data,setData] = useState({tramites:[""]});
  const [ver,setVer] = useState("is-active");

const metodo = ()=>{ 
      ver===""?setVer("is-active"):setVer("")
      console.log(ver);
    }
        return(
            <div className={`modal ${ver}`}>
             <div className="modal-background" />
            <div className="modal-card">
            <header className="modal-card-head">
            <p className="modal-card-title">Nuevo caso</p>
            <button className="delete" aria-label="close" onClick={metodo}/>
            </header>
            <CasoNuevo tramites={data.tramites}  />
            <footer className="modal-card-foot">
            <button className="button is-success" onClick={metodo}>Guardar cambios</button>
            <button className="button"  onClick={metodo}>Cancelar</button>
            </footer>
        </div>
        </div>
        );
       
}

export default Caso;