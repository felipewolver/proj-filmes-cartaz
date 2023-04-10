
import RoutesApp from "./routes";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (

    // As mensagens exibidas no ToastContainer vai sair automaticamente em 3 segundos(3000) 
    <div className="App">
      <ToastContainer autoClose={3000} /> 
      <RoutesApp></RoutesApp>
  
    </div>
  );
}

export default App;
