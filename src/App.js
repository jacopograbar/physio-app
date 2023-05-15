import { useState, useEffect } from "react";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import Home from "./Home.js";
import Login from "./Login.js";
import Register from "./Register.js";
import Dancer from "./Dancer.js";
import Physio from "./Physio.js";
import Management from "./Management.js";
import PickAppointment from "./PickAppointment.js";
import 'react-tooltip/dist/react-tooltip.css'


function App() {

  const currentUser = JSON.parse(sessionStorage.getItem("user"));

  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    if(currentUser){
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn, setIsLoggedIn, currentUser]);

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
            <Route path="/login" element={<Login setIsLoggedIn = {setIsLoggedIn}/>}/>
            <Route path="/management" element={<Management />}/>
            <Route path="/physio" element={<Physio />}/>
            <Route path="/dancer" element={<Dancer />}/>
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
