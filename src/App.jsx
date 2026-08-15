import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../src/assets/css/Style.css';
import '../src/assets/css/responsive.css';
import Routing from "./routing/Routing";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <>  
    <HelmetProvider>
      <Routing />
    </HelmetProvider>
    </>
  )
}

export default App
