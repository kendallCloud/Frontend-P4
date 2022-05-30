import React, {useState} from "react";
import '../Styles/estilo.css';

function ConfigDepartamentos({jefes,gerencias,empleados}){
    return(
         <form action="" className="modal-card-body">
 
         <div className="select">
           <select>
           <option value="default">
              jefe de departamento
            </option>
             { /*
               jefes.map((item) => {
                 console.log(jefes);
                 return <option value={item}>item</option>;
               })*/
             }
           </select>
           </div>

           <div className="select">
           <select>
           <option value="default">
              Gerencia a la que pertenece
            </option>

             { /*
               jefes.map((item) => {
                 console.log(jefes);
                 return <option value={item}>item</option>;
               })*/
             }
           </select>
           </div>
         <div>
         <label htmlFor="phone"></label>
         <input type="number" className="input" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="Numero de telefono" />
         </div>

         <div className="field">
        <div className="control has-icons-left has-icons-right">
          <input className="input is-large" type="email" placeholder="Email" />
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

function ModalForm({active}){
    var [ver,setVer] = useState(active); 
    const metodo = ()=>{ ver===""? setVer("is-active"):setVer("")};
    return(
        <div className={`modal ${ver}`}>
         <div className="modal-background" />
        <div className="modal-card">
        <header className="modal-card-head">
        <p className="modal-card-title">Modificar departamento</p>
        <button className="delete" aria-label="close" />
        </header>
        <ConfigDepartamentos/>
        <footer className="modal-card-foot">
        <button className="button is-success" onClick={metodo}>Guardar cambios</button>
        <button className="button" onClick={metodo}>Cancelar</button>
        </footer>
    </div>
    </div>

    );
}

function Departamento({datos}) {

   const [visible,setVisible] =  useState(false);
   const active = visible ? "is-active" : "";
    const cambiar = ()=>{
        setVisible(!visible);console.log(visible);
    };

    return (
        <div className="Depa">
            <p className="title is-1-small">Departamento {} informatica</p>
            <p className="title is-2-small">Jefe {}</p>
            <p className="subtitle">Cantidad de empleados {}</p>
            <button className="button is-danger" onClick={cambiar} >Modificar</button> 
            {
              visible ? (<ModalForm active={active}/>):(console.log("false"))
            }          
        <div>

            </div>
        </div> 

    );

}
export default Departamento;