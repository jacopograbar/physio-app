import React, { useState } from "react";
import {
  getAvailableSlotsArray,
  getSlotsArray,
  getUser,
} from "./utils/utils.js";
import { RenderBlock } from "./Components.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";

const Management = () => {

  const availability = [
    {
      date: "13/05/2022",
      start: "10:00",
      end: "12:30",
      location: "Sydney Dance Company",
    },
    {
      date: "13/05/2022",
      start: "14:00",
      end: "15:30",
      location: "Sydney Dance Company",
    },
    {
      date: "13/05/2022",
      start: "16:00",
      end: "16:30",
      location: "Sydney Dance Company",
    },
  ];

  const availability2 = [
    {
      date: "13/05/2022",
      start: "08:00",
      end: "10:30",
      location: "Bendigo",
    }
  ];


  const currentUser = getUser();
  // change date to state
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("18:00");
  const [currentAvailability, setCurrentAvailability] = useState(availability);

  // retrieve availability and physio schedule from cloud
  // if no availability, display no availability for today

  const workDaySlots = getSlotsArray("8.00", "18.00", 30);
  const availabilitySlot = getAvailableSlotsArray(currentAvailability, 30);
  var location = "-";

  if (currentAvailability.length !== 0){
    location = currentAvailability[0].location;
  }

  // const availability = null;

  const addAvailability = async (event) => {
    event.preventDefault();
    console.log("adding availability to the cloud");
  };

  const nextDay = async (event) => {
    event.preventDefault();
    var date = new Date();
    date.setDate(currentDate.getDate() + 1);
    setCurrentDate(date);
    setCurrentAvailability(availability2);
  };

  const previousDay = async (event) => {
    event.preventDefault();
    var date = new Date();
    date.setDate(currentDate.getDate() - 1);
    setCurrentDate(date);
    setCurrentAvailability(availability);
  };

  return (
    <div id="management-page">
      <div className="userpage-header">
        <div className="profile-pic">
          <img src="../pic1.png" alt="profile pic" />
        </div>
        <h2>{currentUser.company} Management</h2>
      </div>
      <div className="userpage-options management-clr">
        <h2>Options</h2>
        <a href="/">Change Date</a>
        <a href="/">Log out</a>
      </div>
      <div className="userpage-wall">
        <h1>Current availability</h1>
        <div className="arrow-header">
          <FontAwesomeIcon icon={faCaretLeft} onClick={previousDay} />
          <span>{currentDate.toLocaleDateString()}</span>
          <FontAwesomeIcon icon={faCaretRight} onClick={nextDay} />
        </div>
        {currentAvailability.length !== 0 && (
          <div className="schedule-container">
            {workDaySlots.map((slot, index) => (
              <RenderBlock
                slot={slot}
                availabilitySlot={availabilitySlot}
                location={location}
              />
            ))}
          </div>
        )}
        {currentAvailability.length === 0 && (
          <div>
            <h2 className="h2-marginBtm">
              No availability has currently been set for this date.
            </h2>
            <h2>Set company availability for {currentDate.toLocaleDateString()}</h2>
            <form className="registration-form" onSubmit={addAvailability}>
              <label htmlFor="start">From</label>
              <input
                type="time"
                id="start"
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
              ></input>
              <label htmlFor="end">To</label>
              <input
                type="time"
                id="end"
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
              ></input>
              <input
                id="availability-btn"
                className="input-btn"
                type="submit"
                value="Add availability"
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Management;
