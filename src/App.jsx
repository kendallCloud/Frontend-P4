import 'bulma/css/bulma.min.css';
import NavBar from './Components/NavBar';
import Parametros from './Components/Parametros';
import Casos from './Components/Casos';
import Departamentos from './Components/Departamentos';
import Tramites from './Components/Tramites';
import Trackings from './Components/Trackings';
import Home from './Components/Home.jsx';
import React from 'react';

function CambiaModulos({ventana}) {
  switch (ventana){
    case "Departamentos" :return <Departamentos/>;
    case "Casos" :return <Casos/>;
    case "Parametros" :return <Parametros/>;
    case "Trámites" :return <Tramites/>;
    case "Trackings" :return <Trackings/>;
    case "X": return <Home sesion={false}/>;
    default :return <Home sesion={true}/>;
  }
}

class App extends React.Component {
  state = {
    modulo: ""
   }

  handleCallback = (childData) =>{
    this.setState({modulo:childData})
  }

render() {
   
      return (
       <div className="App">
        <NavBar pasarDato={this.handleCallback}/>
        <CambiaModulos ventana={this.state.modulo}/>
       </div>
      );
  }
}
export default App;