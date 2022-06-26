import React, { useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import '../Styles/estilo.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Input, Button } from 'antd';
import "antd/dist/antd.css";

const { Search } = Input;

async function uploadFile(file) {
  console.log("subiendo archivo");
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
      title: 'Select image',
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
        <img src="https://cdn-icons-png.flaticon.com/128/569/569800.png" width={100} height={100} alt="archivo" />
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
  const [caso,setCaso] = useState({})
  const Busqueda = async (value) => {
    console.log(value);
    try {
      const {data} = await axios.get('api/caso/buscar',{
        headers: {
          'cod':value
        }
      });
      console.log(data);
      if (data === [] || data === undefined || data === null || data === {}){
        Swal.fire({
          title: 'Error!',
          text: 'No se encontro el caso',
          icon: 'error',
          confirmButtonText: 'ok'
        })
      }
      else setCaso(data);
      console.log(caso);
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
  return (
    <div>
      <header className="field is-horizontal">
        <Search placeholder="Buscar caso" size={"large"} enterButton onSearch={Busqueda}/>
        <Button type="primary" icon={<DownloadOutlined/>} size={'large'}>
          Descargar archivos del caso
        </Button>
      </header>
      <h1 className="title is-1"><center>Trackings</center></h1>
      <TrackPiece estado={1} documento={"Cedula"}></TrackPiece>
      <TrackPiece estado={2} documento={"Dictamen"}></TrackPiece>
      <TrackPiece estado={3} documento={"Licencia"}></TrackPiece>
    </div>

  );
}

export default Trackings;