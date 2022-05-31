import React, { useState } from 'react';

function TramiteNuevo({departamentos}){

const [archivos,setarchivos] = useState([]);
const [extension,setExtension] = useState([]);
const [aprueban,setAprueban] = useState([]);
const [realiza,setRealiza] = useState("");
const [aux,setaux] = useState("");
const [tipo,setipo] = useState("");

let json = {"archivo":archivos};
const[datos,setDatos] = useState(json);
console.log(json);

  return(
    <form className="modal-card-body">
    <input type="text" className="input" placeholder="Nombre del tramite" /><br/>
     <div className="select">
       <select   onChange={(event) =>{setRealiza(event.target.value); console.log(realiza);}}>
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
       <select onChange={(event) => {setAprueban(aprueban => [...aprueban,event.target.value])}} className="select">
       <option value="default">
          Deben aprobar:
        </option>
        { 
           departamentos.map((item) => {
             console.log(aprueban);
             return <option key={item}>{item}</option>;
           })
         }
       </select>
       <ol>
       { 
           aprueban.map((item) => {
             console.log(item);
             return <li key={item}>{item}</li>;
         })
        }
       </ol>
       </div>
    <div className="is flex">
        <div>
            <input className="input" type="text" onChange={(event)=>setaux(event.target.value)}  placeholder="Documento requerido"/>
            <select className="select" onChange={(event)=> {setipo(event.target.value)}}>
                <option value="default">tipo de archivo</option>
                <option>PNG</option>
                <option>JPG</option>
                <option>PDF</option>
                <option>DOCX</option>
                <option>GDOC</option>
                <option>XLSX</option>
            </select>
            <button className="button" type="button" onClick={()=>{setarchivos(archivos => [...archivos,aux]); setExtension(extension =>[...extension,tipo])}}><strong>+</strong></button>
        </div>
    </div>
        <p>
        {
         archivos.map((item) => {
              console.log(item);
             return <li key={item}><strong>{item}</strong></li>;
             })
        }
         </p>

         <button className="button is-success">Guardar cambios</button>
</form>);

}

class Tramite extends React.Component {
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
            <p className="modal-card-title">Modificar tramite</p>
            <button className="delete" aria-label="close" />
            </header>
            <TramiteNuevo departamentos={this.props.departamentos}  />
            <footer className="modal-card-foot">
            <button className="button"  onClick={this.metodo}>Cancelar</button>
            </footer>
        </div>
        </div>
        );
       
    }
}

export default Tramite;