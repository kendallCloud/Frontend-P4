import React, {useState,useEffect} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

function CasoNuevo({tramites,setData}) {

  const [dat,setDat] = useState({
    // _id: mongoose.Types.ObjectId,
    cso_numero_caso: "",
    cso_fecha_apertura: "dd-mm-yy",
    cso_fecha_traspaso: "",
    cso_fecha_final: "",
    cso_tramite_cod: "",
  });
  return (
    <form action="" className="modal-card-body">
      <input type="text" className="input" onChange={(event) => {setDat({...dat,cso_numero_caso:event.target.value});setData(dat)}} placeholder="Codigo del caso" />
      <div className="select">
        <select onChange={(event) => {setDat({...dat,cso_tramite_cod:event.target.value});setData(dat)}}>
          <option value="default">
            Tramite a realizar.
          </option>
          {
            tramites.map((item) => {
              return <option key={item.trm_nombre}>{item.trm_nombre}</option>;
            })
          }
        </select>
      </div>
      <br />
      <div className="is flex">
        <div>
          <label htmlFor="Inicio">Abre caso:</label>
          <input type="date" className="input" onChange={(event) => {setDat({...dat,cso_fecha_apertura:event.target.value}); setData(dat)}}/>
        </div>
      </div>
      <div className="is flex">
        <div>

        </div>
      </div>
    </form>);
}
const Caso = () => {
  const [data, setData] = useState({
    // _id: mongoose.Types.ObjectId,
    cso_numero_caso: "String",
    cso_fecha_apertura: "String",
    cso_fecha_traspaso: "",
    cso_fecha_final: "String",
    cso_tramite_cod: "String",
  });
  const [ver, setVer] = useState("is-active");

  const cerrar = () => {
    if(ver === "") setVer("is-active")
    else setVer("")
  }

  const NameToID = ()=>{
    for(let i=0; i< tramites.length;i++){
      if(tramites[i].cso_tramite_cod === data.trm_tramite_cod){data.cso_tramite_cod = tramites[i]._id}
      console.log(tramites[i].cso_tramite_cod);
    }
    console.log("DATA2 ", data);
}

const [tramites, setTramites] = useState([]);

const GetTramites = async () => {
  try {
    const {data} = await axios.get('api/tramite/all');
    setTramites(data);
    if (tramites === []) {
      Swal.fire({
        title: 'Error!',
        text: 'Fallo obteniendo los tramites',
        icon: 'error',
        confirmButtonText: 'ok'
      })
    }
    console.log(data);
  }

  catch (error) {
    Swal.fire({
      title: 'Error!',
      text: 'Fallo obteniendo los tramites',
      icon: 'error',
      confirmButtonText: 'ok'
    })
    console.error('error!', error);

  }
  console.log(tramites);
  console.log("Component has been rendered");
}
useEffect(() => {
  GetTramites();
}, []);

  const PostCasoNuevo = async () => {
    cerrar()
    console.log("DATA ", data);
    NameToID()
    
    try {
        const resp = await axios.post('api/caso/agregar', data);
        console.log(resp);
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
          <p className="modal-card-title">Nuevo caso</p>
          <button className="delete" aria-label="close" onClick={cerrar} />
        </header>
        <CasoNuevo tramites={tramites}  setData={setData} />
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={PostCasoNuevo}>Guardar cambios</button>
          <button className="button" onClick={cerrar}>Cancelar</button>
        </footer>
      </div>
    </div>
  );

}

export default Caso;