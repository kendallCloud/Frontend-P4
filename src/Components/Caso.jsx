import React, {useState} from "react";
import '../Styles/estilo.css';

function Caso({data}) {

   const [visible,setVisible] =  useState(false);
    return (
        <>
            <p className="title is-1-small">Caso {data.cso_numero_caso}</p>
            <p className="title is-2-small">Fecha de apertura {data.cso_fecha_apertura}</p>
            <p className="subtitle">Fecha de cierre del caso {data.cso_fecha_traspaso}</p>  
            <p>Codigo del caso {}</p>
        <div>

            </div>
        </> 

    );

}
export default Caso;