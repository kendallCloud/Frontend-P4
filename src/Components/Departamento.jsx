import React, { useState } from "react";
import '../Styles/estilo.css';
import  ModalForm from './ConfigDepartamentos.jsx';

function Departamento({ datos }) {

  const [visible, setVisible] = useState(false);
  const active = visible ? "is-active" : "";
  const cambiar = () => {
    setVisible(!visible); console.log(visible);
  };

  return (
    <>
      <p className="title is-1-small">Departamento {datos.dep_nombre}</p>
      <p className="subtitle">email:{datos.dep_email}</p>
      <p className="subtitle">tel:{datos.dep_telefono}</p>
      <p className="subtitle">Jefe {datos.dep_jefe}</p>
      <button className="button is-link" onClick={cambiar} >Modificar</button>
      {
        visible ? (<ModalForm active={active} datos={datos}/>) : (console.log("false"))
      }
      <div>

      </div>
    </>

  );

}
export default Departamento;