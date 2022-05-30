import React, {useState} from "react";
import '../Styles/estilo.css';

function Caso({datos}) {

   const [visible,setVisible] =  useState(false);
   const active = visible ? "is-active" : "";
    const cambiar = ()=>{
        setVisible(!visible);console.log(visible);
    };

    return (
        <div className="Depa">
            <p className="title is-1-small">Caso {}</p>
            <p className="title is-2-small">Fecha de apertura {}</p>
            <p className="subtitle">Fecha de cierre del caso {}</p>  
            <p>Codigo del caso {}</p>  
        <div>

            </div>
        </div> 

    );

}
export default Caso;