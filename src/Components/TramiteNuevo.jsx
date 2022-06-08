import React, { useState } from 'react';

function TramiteNuevo({departamentos,setData}){

const [archivos,setarchivos] = useState([]);
const [extension,setExtension] = useState([]);
const [aprueban,setAprueban] = useState([]);
const [realiza,setRealiza] = useState("");
const [aux,setaux] = useState("");
const [tipo,setipo] = useState("");

  return(
    <form className="modal-card-body">
    <input type="text" className="input" name="name" onChange={(event) =>{setData(event.target.name,event.target.value)}} placeholder="Nombre del tramite" /><br/>
     <div className="select">
       <select  name="depart" onChange={(event) =>{setData(event.target.name,event.target.value)}}>
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
</form>);

}

class Tramite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          list:["gerencia","secretaria"],
          aux:"",
          ver: this.props.active?"is-active":"",
          form:{
            aprobar:[],
            name:"X",
            documentos:[],
            TipoArchivos:[],
            depart:"z"
         }
        };
        this.metodo=this.metodo.bind(this);
        this.PuenteDatos=this.PuenteDatos.bind(this)}

    metodo(){ 
      this.state.ver===""?this.setState({ver:"is-active"}):this.setState({ver:""})
      console.log(this.state.ver);
    }

    PuenteDatos(key,value){
      console.log(key+" value "+value);
     var objeto = this.state.form;
     objeto[key] = value;
     this.setState({form:objeto});
     console.log(this.state.form);
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
            <TramiteNuevo departamentos={this.props.departamentos} setData={this.PuenteDatos} />
            <footer className="modal-card-foot">
            <button className="button is-success">Guardar cambios</button>
            <button className="button"  onClick={this.metodo}>Cancelar</button>
            </footer>
        </div>
        </div>
        );
       
    }
}

export default Tramite;