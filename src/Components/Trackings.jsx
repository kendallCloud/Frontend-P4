import React, { useState,useEffect} from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import '../Styles/estilo.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Input, Button } from 'antd';
import 'antd/dist/antd.min.css';

const { Search } = Input;

function TrackPiece({documento,caso}) {
    const [state,setState] = useState(2);

    const getEstado = async () => {
      try {
        const response = await axios.get('/api/documento/existe',{
          headers: {
            caso:caso._id,
            nombre:documento
          }
        });
        console.log(response);
        setState(response.data.estado);
      }
      catch (err) {}
    }

   useEffect(() => {
    getEstado();
   },[])

  const uploadFile = async (file) => {
    console.log("subiendo archivo...");
    let formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post('/api/documento/upload', formData,{
        headers: {
          "Content-Type": "multipart/form-data",
          caso:caso._id,
          nombre_doc:documento
        }
      });

      if (response.status === 200) {
        setState(1);
        Swal.fire({
          text: 'archivo subido al servidor!',
          icon: 'success',
          timer: 6000
        })
      }
      else{
        setState(2);
        Swal.fire({
          text: 'archivo subido al servidor!',
          icon: 'success',
          timer: 6000
        })
      }
      console.log(response);
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Fallo al subir archivo',
        icon: 'error',
        timer: 6000
      })

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

  let colores = {};
  let estImagen = "";
  let estMsg = "";
  switch (state) {
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
    console.log(file);
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

      <img src="https://cdn-icons-png.flaticon.com/128/569/569800.png" style={{ cursor: "pointer" }} onClick={() => { SetFile(documento) }} width={100} height={100} alt="archivo" />
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
  const [tramite, setTramite] = useState({});
  const TramiteDcaso = async (value) => {
    console.log(value);
    if (value !== undefined) {
      try {
        const { data } = await axios.get('api/tramite/all');
        console.log(data);
        data.forEach(element => {
          if (element._id === value) { setTramite(element) }
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

  const Busqueda = async (value) => {
    console.log(value);
    try {
      const { data } = await axios.get('api/caso/buscar', {
        headers: {
          'cod': value
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

  const EncabezadoTram = () => {
    console.log(tramite);
    return tramite !== undefined && tramite.trm_nombre !== undefined && tramite.trm_nombre !== null ? "Tramite que realiza " + tramite.trm_nombre : "";
  }

  const EncabezadoCaso = () => {
    console.log(caso);
    return caso !== undefined && caso !== null && caso.cso_numero_caso !== undefined && caso.cso_numero_caso !== null ? "Tracking al caso " + caso.cso_numero_caso : "";
  }

  const Nodes = () => {
    let document = [];
    if (tramite !== {} && tramite.trm_documentos !== undefined) {
      tramite.trm_documentos.forEach(element => {
        document.push(<TrackPiece estado={3} documento={element} caso={caso}/>);
      });
    }
    return document;
  }

  return (
    <div>
      <header className="field is-horizontal">
        <Search placeholder="Buscar caso" size={"large"} enterButton onSearch={Busqueda} />
        <Button type="primary" icon={<DownloadOutlined />} size={'large'}>
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