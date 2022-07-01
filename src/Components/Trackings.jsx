import React, { useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import '../Styles/estilo.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Input, Button } from 'antd';
import 'antd/dist/antd.min.css';

const { Search } = Input;

async function uploadFile(file) {
  console.log("subiendo archivo...");
  let formData = new FormData();
  formData.append("file", file);
  try {
    const response = await axios.post('/api/documento/upload', formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
    console.log(response);
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
  }
}

function TrackPiece({ estado, documento }) {
  let colores = {};
  let estImagen = "";
  let estMsg = "";
  switch (estado) {
    case 1:
      colores = { border: '4px solid green' };
      estImagen = "https://cdn-icons-png.flaticon.com/128/3472/3472620.png";
      estMsg = "CORRECTO!";

      break;
    case 2:
      colores = { border: '4px solid red' };
      estImagen = "https://cdn-icons.flaticon.com/png/128/4201/premium/4201973.png?token=exp=1655607387~hmac=c6578ae5316929d315fcdca54d0d5a7b";
      estMsg = "ERROR!";

      break;
    case 3:
      colores = { border: '4px solid yellow' };
      estImagen = "https://cdn-icons-png.flaticon.com/128/5266/5266264.png";
      estMsg = "PENDIENTE";

      break;
    default: { }
  }

  const SetFile = async () => {
    console.log("Clicked");
    const { value: file } = await Swal.fire({
      title: 'Seleccione documento',
      input: 'file',
      inputAttributes: {
        'accept': 'all/*',
        'aria-label': 'Upload your profile picture'
      }
    })

    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        Swal.fire({
          title: 'Archivo a subir',
          imageUrl: e.target.result,
          imageAlt: 'archivo'
        })
      }
      reader.readAsDataURL(file);
      uploadFile(file);
    }
  }
  return (
    <div className="TrackNode" style={colores}>
      <button onClick={() => { SetFile() }}>
        <img src="https://cdn-icons-png.flaticon.com/128/569/569800.png" width={100} height={100} alt="archivo"/>
      </button>
      <h1 className="title">{documento}</h1>
      <div>
        <img src={estImagen} width={50} height={50} alt="estado" />
        <h6 className="title is-6">{estMsg}</h6>
      </div>
    </div>
  );
}
function Trackings() {
  const [caso, setCaso] = useState({});
  const [tramite,setTramite] = useState({});
  const TramiteDcaso = async (value) =>{
    console.log(value);
    if(value !== undefined) {
    try {
      const { data } = await axios.get('api/tramite/all');
      console.log(data);
      data.forEach(element => {
        if(element._id === value){setTramite(element)}
        else console.log("no");
    });
      if (tramite === undefined || tramite === null || tramite === {}) {
        Swal.fire({
          title: 'Error!',
          text: 'No se encontro el caso',
          icon: 'error',
          confirmButtonText: 'ok'
        })
      }
    }
    catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Fallo del sistema',
        icon: 'error',
        confirmButtonText: 'ok'
      })
      console.error('error!', error);
    }
  }
  }

  const Busqueda = async (value)=>{
    console.log(value);
    try {
      const { data } = await axios.get('api/caso/buscar', {
        headers: {
          'cod':value
        }
      });
      setCaso(data);
      console.log(caso);
      if (caso === [] || caso === undefined || caso === null || caso === {}) {
        Swal.fire({
          title: 'Error!',
          text: 'No se encontro el caso',
          icon: 'error',
          confirmButtonText: 'ok'
        })
      }
      TramiteDcaso(data.cso_tramite_cod[0]);
    }
    catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Fallo del sistema',
        icon: 'error',
        confirmButtonText: 'ok'
      })
      console.error('error!', error);

    }
  }

  const EncabezadoTram = ()=>{
    console.log(tramite);
    return tramite.trm_nombre!==undefined && tramite.trm_nombre!==null?"Tramite que realiza " + tramite.trm_nombre:"";
  }

  const EncabezadoCaso = ()=>{
    return caso.cso_numero_caso!==undefined && caso.cso_numero_caso!==null?"Tracking al caso " + caso.cso_numero_caso:"";
  }

  const Nodes = ()=>{
    let document = [];
    if(tramite!=={} &&  tramite.trm_documentos !== undefined){
      tramite.trm_documentos.forEach(element => {
        document.push(<TrackPiece estado={3} documento={element}/>);
      });
    }
    return document;
  }

  return (
    <div>
      <header className="field is-horizontal">
        <Search placeholder="Buscar caso" size={"large"} enterButton onSearch={Busqueda}/>
        <Button type="primary" icon={<DownloadOutlined/>} size={'large'}>
          Descargar archivos del caso
        </Button>
      </header>
      <h1 className="title is-1"><center>Trackings</center></h1>
      <h2 className="title is-2">{EncabezadoTram()}</h2>
      <h3 className="title is-3">{EncabezadoCaso()}</h3>
      
     {Nodes()}
    </div>

  );
}

export default Trackings;