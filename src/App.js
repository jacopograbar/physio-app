import { useState, useEffect } from "react";
import { BrowserRouter, NavLink, Routes, Route } from "react-router-dom";
import Home from "./Home.js";
import Login from "./Login.js";
import Register from "./Register.js";
import Dancer from "./Dancer.js";
import Physio from "./Physio.js";
import Management from "./Management.js";
import PickAppointment from "./PickAppointment.js";
import "react-tooltip/dist/react-tooltip.css";

function App() {
  const currentUser = JSON.parse(sessionStorage.getItem("user"));

  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn, setIsLoggedIn, currentUser]);

  function logOut(){
    sessionStorage.clear();
    setIsLoggedIn(false);
  }

  return (
    <div className="App">
      <BrowserRouter>
        {isLoggedIn && (
          <nav>
            <NavLink id="nav-out" to="/" onClick={logOut}>
              Log out
            </NavLink>
          </nav>
        )}
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/management" element={<Management />} />
            <Route path="/physio" element={<Physio />} />
            <Route path="/dancer" element={<Dancer setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/pick-appointment" element={<PickAppointment />} />
          </Routes>
        </div>
        <footer>
          <p>Copyright Jacopo Grabar</p>
          <p>RMIT University - s3876518</p>
          <h3>Physiotherapy management system</h3>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
