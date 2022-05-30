import React, { useState } from 'react';

function CasoNuevo({tramites}){
const [realiza,setRealiza] = useState("");
const [aux,setaux] = useState("");
  return(
    <form action="" className="modal-card-body">
    <input type="text" className="input" placeholder="Nombre del tramite" /><br/>
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

class Caso extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          list:["gerencia","secretaria"],
          aux:"",
          ver: this.props.active?"is-active":""
        };
        this.metodo=this.metodo.bind(this);
    }

    metodo(){ 
      this.state.ver===""?this.setState({ver:"is-active"}):this.setState({ver:""})
      console.log(this.state.ver);
    }
    
    render(){
        return(
            <div className={`modal ${this.state.ver}`}>
             <div className="modal-background" />
            <div className="modal-card">
            <header className="modal-card-head">
            <p className="modal-card-title">Nuevo caso</p>
            <button className="delete" aria-label="close" />
            </header>
            <CasoNuevo tramites={this.props.tramites}  />
            <footer className="modal-card-foot">
            <button className="button is-success" onClick={this.metodo}>Guardar cambios</button>
            <button className="button"  onClick={this.metodo}>Cancelar</button>
            </footer>
        </div>
        </div>
        );
       
    }
}

export default Caso;