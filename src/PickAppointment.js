import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { Slot } from "./Components.js";
import { getPhysioSlots } from "./utils/appointmentsManager.js";
import { getUser } from "./utils/utils.js";
import { useNavigate } from "react-router-dom";

const PickAppointment = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [physioSlots, setPhysioSlots] = useState([]);
  const currentUser = getUser();

  useEffect(() => {
    setLoading(true);
    async function fetchSlots (){
      const data = await getPhysioSlots(currentDate.toLocaleDateString(), currentUser.company);
      setPhysioSlots(data);
      setLoading(false);
    }
    fetchSlots();
  }, [currentDate]);

  const nextDay = async (event) => {
    event.preventDefault();
    var date = new Date();
    date.setDate(currentDate.getDate() + 1);
    setCurrentDate(date);
  };

  const previousDay = async (event) => {
    event.preventDefault();
    var date = new Date();
    date.setDate(currentDate.getDate() - 1);
    setCurrentDate(date);
  };

  const backToHome = () => {
    navigate("/dancer")
  }

  return (
    <div className="home-container appointments-container">
      <div className="arrow-header">
        <FontAwesomeIcon icon={faCaretLeft} onClick={previousDay} />
        <span>{currentDate.toLocaleDateString()}</span>
        <FontAwesomeIcon icon={faCaretRight} onClick={nextDay} />
      </div>
      {loading && <h2>Loading...</h2>}
      {!loading && physioSlots.length === 0 && <h2>There is currently no availability for this date.</h2>}
      {!loading && physioSlots.length !== 0 && physioSlots.map((slot, index) => (
              <Slot
                key={index}
                time={slot.time}
                physio={slot.physio}
                location={slot.location}
                date={slot.date}
                company={slot.company}
                patient={currentUser.username}
              />
            ))}
      <button onClick={backToHome}>Back to home</button>
    </div>
  );
};

export default PickAppointment;
