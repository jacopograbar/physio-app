import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { Slot } from "./Components.js";

const PickAppointment = () => {
  const physio = [
    {
      date: "13/05/2022",
      start: "10:00",
      end: "10:30",
      physio: "Ashley Cohen",
      location: "Sydney Dance Company",
    },
    {
      date: "13/05/2022",
      start: "10:30",
      end: "11:00",
      physio: "Ashley Cohen",
      location: "Sydney Dance Company",
    },
    {
      date: "13/05/2022",
      start: "11:00",
      end: "11:30",
      physio: "Ashley Cohen",
      location: "Sydney Dance Company",
    },
    {
      date: "13/05/2022",
      start: "11:30",
      end: "12:00",
      physio: "Ashley Cohen",
      location: "Sydney Dance Company",
    },
    {
      date: "13/05/2022",
      start: "12:00",
      end: "12:30",
      physio: "Ashley Cohen",
      location: "Sydney Dance Company",
    },
  ];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [physioSlots, setPhysioSlots] = useState(physio);

  const nextDay = async (event) => {
    event.preventDefault();
    var date = new Date();
    date.setDate(currentDate.getDate() + 1);
    setCurrentDate(date);
    // load new physio slots accordingly
  };

  const previousDay = async (event) => {
    event.preventDefault();
    var date = new Date();
    date.setDate(currentDate.getDate() - 1);
    setCurrentDate(date);
    // load new physio slots accordingly
  };

  return (
    <div className="home-container appointments-container">
      <div className="arrow-header">
        <FontAwesomeIcon icon={faCaretLeft} onClick={previousDay} />
        <span>{currentDate.toLocaleDateString()}</span>
        <FontAwesomeIcon icon={faCaretRight} onClick={nextDay} />
      </div>
      {physioSlots.map((slot, index) => (
              <Slot
                key={index}
                time={slot.start}
                physio={slot.physio}
                location={slot.location}
                date={slot.date}
              />
            ))}
      {/* <ConfirmationPopUp date="Tuesday, July 28" time="11.45 AM" physio="Ashley Cohen" /> */}
    </div>
  );
};

export default PickAppointment;
