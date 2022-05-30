import React from "react";
import '../Styles/estilo.css';
function Tramite ({data}){
    return(
    <div className="tramite">

        <h3 className="title is-3">{"Contrataciones"}</h3>
        <h4 className="title is-4">{"realiza departamento de "}</h4>
        <div className="container">

            <div>
            <ul>
                 <li>Documentos requeridos:</li>
            </ul>

            </div>
            <div>
            <ul>
                <li>Requiere la aprobacion de los departamentos:</li>
            </ul>
            </div>

        </div>

    </div>);

}

export default Tramite;