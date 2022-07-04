import React from "react";
import '../Styles/estilo.css';
function Tramite ({data,departa}){

    return(
    <>

        <h3 className="title is-3">{data.trm_nombre}</h3>
        <h4 className="title is-4">{"realiza departamento de " + departa}</h4>
        <div className="container">

            <div>
            <ul>
                 <li>Documentos requeridos:</li>
                 {data.trm_documentos.map(function(d) {return <li key={d}>{d}</li>})}
            </ul>

            </div>
            <div>
            <ul>
                <li className="subtitle">Requiere la aprobacion de los departamentos:</li>
                {data.trm_departamentosAprueban.map(function(d) {return <li key={d}>{d}</li>})}
            </ul>
            </div>

        </div>

    </>);

}

export default Tramite;