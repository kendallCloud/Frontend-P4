import React, { useState } from "react";
import '../Styles/estilo.css';
import axios from 'axios';
import Swal from 'sweetalert2';

function ConfigDepartamentos({ sendData, datos }) {
    console.log(datos);
    const masPuente = (event) => {
        sendData(event.target.name, event.target.value);
    }

    return (
        <form className="modal-card-body">

            <div>
                <label htmlFor="nombre">nombre del departamento</label>
                <input type="text" className="input" id="nombre" value={datos.dep_nombre} onChange={(event) => { masPuente(event) }} name="dep_nombre" placeholder="Nombre" />
            </div>

            <div>
                <label htmlFor="jefe">Jefe del departamento</label>
                <input type="text" className="input" id="jefe" value={datos.dep_jefe} onChange={(event) => { masPuente(event) }} name="dep_jefe" placeholder="jefe" />
            </div>

            <div>
                <label htmlFor="jefe">Gerencia a la que peretenece (opcional)</label>
                <input type="text" className="input" id="jefe" value={datos.dep_gerencia} onChange={(event) => { masPuente(event) }} name="dep_gerencia" placeholder="Gerencia" />
            </div>
            <div>
                <label htmlFor="phone">Telefono</label>
                <input type="number" className="input" id="phone" value={datos.dep_telefono} onChange={(event) => { masPuente(event) }} name="dep_telefono" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="Numero de telefono" />
            </div>

            <div className="field">
                <div className="control has-icons-left has-icons-right">
                    <label htmlFor="jefe">Email del departamento</label>
                    <input className="input" name="dep_email" value={datos.dep_email} type="email" onChange={(event) => { masPuente(event) }} placeholder="Email" />
                    <span className="icon is-left">
                        <i className="fas fa-envelope fa-sm" />
                    </span>
                    <span className="icon is-right">
                        <i className="fas fa-check fa-sm" />
                    </span>
                </div>
            </div>
        </form>
    );
}

function ModalForm({ active, datos }) {
    var [ver, setVer] = useState(active);
    const cerrar = () => {
        ver === "" ? setVer("is-active") : setVer("")
    };

    const [json, SetJson] = useState({
        dep_nombre: "",
        dep_cantidadEmpleados: 0,
        dep_telefono: "",
        dep_email: "",
        dep_jefe: "",
        dep_gerencia: ""
    });

    const PuenteDatos = (key, value) => {
        var objeto = json;
        objeto[key] = value;
        SetJson(objeto);
    }

    const PostDepart = async () => {
        cerrar()
        console.log("DATA ", json);
        try {
            const resp = await axios.post('api/departamento/agregar', json);
            console.log(resp.data);
            Swal.fire({
                title:"Nuevo departamento insertado",
                timer:4000,
                icon:'success'
            })
        }
        catch (error) {
            console.error('error!', error);
        }
    }

    return (
        <div className={`modal ${ver}`}>
            <div className="modal-background" />
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Modificar departamento</p>
                    <button className="delete" aria-label="close" onClick={cerrar} />
                </header>
                <ConfigDepartamentos sendData={PuenteDatos} datos={datos} />
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={PostDepart}>Guardar cambios</button>
                    <button className="button" onClick={cerrar}>Cancelar</button>
                </footer>
            </div>
        </div>

    );
}

export default ModalForm;














