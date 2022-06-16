import React from 'react';
import axios from 'axios';
import  FileChooser from './FileChooser';
import '../Styles/estilo.css';
var totalReactPackages=[];
//import { useState } from 'react';
//import { useEffect } from 'react';

function ObtenerDatos(){
  axios.get('api/parametros/all')
      .then(response => {totalReactPackages=response.data
      console.log(totalReactPackages)})
      .catch(error => {
          this.setState({ errorMessage: error.message });
          console.error('There was an error!', error);

      },[]);


}
class Parametros extends React.Component {
    constructor() {
       ObtenerDatos();
        super();
        this.state = {
          list:["gerencia","secretaria","dddd"],
          aux:"",
          data:{}
        };
        this.AddtoLista=this.AddtoLista.bind(this);
        this.CambioDatos=this.CambioDatos.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    

    AddtoLista(){
       var nueva = this.state.list;
        nueva.push(this.state.aux);
        this.setState({nueva});   
    }
    CambioDatos(event){
        this.setState({data:{
            ...this.state.data,
            [event.target.name]:event.target.value
        }});
    }

    handleSubmit(){
      var json = this.state.data;
      json = {...json,departamentos:this.state.list};
      this.setState({json});
      console.log(json);
      axios.post('api/parametros/agregar', json);                //******** */
      
      // ... submit to API or something
      
    };
    render() {
      return(
          <main>
            <h1 className="title is-1"><center>Parametros</center></h1>
            <form>
                <div className="field">
                    <label className="label">Nombre oficial de la empresa</label>
                    <div className="control">
                    <input className="input" name="nombre" onChange={this.CambioDatos} type="text" placeholder="" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Cedula juridica</label>
                    <div className="control">
                    <input className="input" name="cedJuridica" onChange={this.CambioDatos} type="text" placeholder="" />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                    <input className="input" type="email" onChange={this.CambioDatos}  name="email" placeholder="nombre@dominio.com" />
                    </div>
                </div>

                <div className="field" id="depart">
                    <label className="label">Departamentos</label>
                    <div className="control">
                    <div>
                        <input className="input" type="text" id="nombre_depar" onChange={event => this.setState({aux:event.target.value})}/>
                        <button  className="button is-link" type="button" onClick={this.AddtoLista}><strong>+</strong></button>
                    </div>
                    <p>
                    {
                    this.state.list.map((item) => {
                        console.log(this.state.list);
                        return <li key={item}><strong>{item}</strong></li>;
                      })
                    }
                    </p>

                    </div>
                </div>
            </form>
            <br/>
            <FileChooser/>
            <br/>
            <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" onClick={this.handleSubmit}>Submit</button>
            </div>
            <div className="control">
              <button className="button is-link is-light">Cancel</button>
            </div>
          </div>
          </main>

      ) ;
    }
  }

export default Parametros;