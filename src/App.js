import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import Home from "./Home.js";
import Login from "./Login.js";
import Register from "./Register.js";
import DancerPage from "./DancerPage.js";
import PhysioPage from "./PhysioPage.js";
import ManagementPage from "./ManagementPage.js";
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
            <Route path="/login" element={<Login />}/>
            <Route path="/management-page" element={<ManagementPage />}/>
            <Route path="/physio-page" element={<PhysioPage />}/>
            <Route path="/dancer-page" element={<DancerPage />}/>
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
