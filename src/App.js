import './index.scss'
import {BrowserRouter as Router} from "react-router-dom";
import 'lazysizes'
import AnimatedRoutes from "./AnimatedRoutes";

function App() {
  return (
    <>
      <Router>
            <AnimatedRoutes />
      </Router>
    </>
  );
}

export default App;
