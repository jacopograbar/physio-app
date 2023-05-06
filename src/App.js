import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import Home from "./Home.js";
import Register from "./Register.js";
import PickAppointment from "./PickAppointment.js";




function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <nav>
          <NavLink id="nav-home" to="/">Home</NavLink>
          <NavLink id="nav-register" to="/register">Register</NavLink>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/pick-appointment" element={<PickAppointment />}/>
          </Routes>
        </div>
        <footer>
        </footer>
        </BrowserRouter>
    </div>
  );
}

export default App;
