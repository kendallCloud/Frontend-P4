import React, { useState }from 'react';
import '../Styles/estilo.css';
import Swal from 'sweetalert2';

function TrackPiece ({estado,documento}){
  let colores = {};
  let estImagen = "";
  let estMsg = "";
  switch(estado){
    case 1:
      colores = {border:'4px solid green'};
      estImagen = "https://cdn-icons-png.flaticon.com/128/3472/3472620.png";
      estMsg = "CORRECTO!"; 
      
    break;
    case 2:
      colores = { border:'4px solid red'};
      estImagen = "https://cdn-icons.flaticon.com/png/128/4201/premium/4201973.png?token=exp=1655607387~hmac=c6578ae5316929d315fcdca54d0d5a7b";
      estMsg = "ERROR!";
      
    break;
    case 3:
      colores = { border:'4px solid yellow'};
      estImagen = "https://cdn-icons-png.flaticon.com/128/5266/5266264.png";
      estMsg = "PENDIENTE";
      
      break;
    default:{}
  }
  const SetFile = async () =>{
    console.log("Clicked");
    const { value: file } =  await Swal.fire({
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
          title: 'Your uploaded picture',
          imageUrl: e.target.result,
          imageAlt: 'The uploaded picture'
        })
      }
      reader.readAsDataURL(file)
    }
  }
  return(
      <div className="TrackNode" style={colores}>
        <button onClick={() =>{SetFile()}}>
          <img src="https://cdn-icons-png.flaticon.com/128/569/569800.png" width={100} height={100} alt="archivo" /> 
        </button>
        <h1 className="title">{documento}</h1> 
        <div>
            <img src={estImagen} width={50} height={50} alt="estado"/>
            <h6 className="title is-6">{estMsg}</h6>
        </div>
      </div>
  );
}
function Trackings(){
      return (
        <div>
          <header className="field is-grouped">
              <p className="control is-expanded">
              <input className="input" type="text" placeholder="Buscar caso" />
              </p>
                  <p className="control">
            <a className="button is-info">
              Buscar
            </a>
          </p>
          </header>
         <h1 className="title is-1"><center>Trackings</center></h1>
         <TrackPiece estado={1} documento={"Cedula"}></TrackPiece>
         <TrackPiece estado={2} documento={"Dictamen"}></TrackPiece>
         <TrackPiece estado={3} documento={"Licencia"}></TrackPiece>
        </div>
      
      );
  }

export default Trackings;