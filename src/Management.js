import React, { useState, useEffect } from "react";
import {
  getAvailableSlotsArray,
  getSlotsArray,
  getArray,
  getUser,
  addThirty,
} from "./utils/utils.js";
import { RenderBlock } from "./Components.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import {
  addAvailabilitySlot,
  getAvailabilitySlots,
} from "./utils/appointmentsManager.js";


const Management = () => {
  const currentUser = getUser();
  // change date to state
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("18:00");
  const [currentAvailability, setCurrentAvailability] = useState([]);
  const [newLocation, setNewLocation] = useState("");
  // retrieve availability and physio schedule from cloud
  // if no availability, display no availability for today

  useEffect(() => {
    async function fetchAvailability() {
      setLoading(true);
      const data = await getAvailabilitySlots(
        currentDate.toLocaleDateString(),
        currentUser.company
      );
      setCurrentAvailability(data);
      setLoading(false);
    }
    setRefresh(false);
    fetchAvailability();
  }, [currentDate, refresh, setCurrentAvailability]);

  const availabilitySlots = getArray(currentAvailability);
  const workDaySlots = getSlotsArray("8.00", "18.00", 30);
  var location = "-";

  if (currentAvailability.length !== 0) {
    location = currentAvailability[0].location;
  }

  const addAvailability = async (event) => {
    event.preventDefault();
    const availabilityTimes = getAvailableSlotsArray(startTime, endTime, 30);

    for (let timeSlot of availabilityTimes) {
      let slotDetails = {
        date: currentDate.toLocaleDateString(),
        time: timeSlot,
        company: currentUser.company,
        endTime: addThirty(timeSlot),
        location: newLocation,
      };
      await addAvailabilitySlot(slotDetails);
      setRefresh(true);
    }
  };

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

  function logOut() {
    sessionStorage.clear();
  }

  return (
    <div id="management-page">
      <div className="userpage-header">
        <div className="profile-pic">
          <img src={currentUser.img_url} alt="profile pic" />
        </div>
        <h2>{currentUser.company} Management</h2>
      </div>
      <div className="userpage-options management-clr">
        <h2>Options</h2>
        <a href="/" onClick={logOut}>Log out</a>
      </div>
      <div className="userpage-wall">
        <h1>Current availability</h1>
        <div className="arrow-header">
          <FontAwesomeIcon icon={faCaretLeft} onClick={previousDay} />
          <span>{currentDate.toLocaleDateString()}</span>
          <FontAwesomeIcon icon={faCaretRight} onClick={nextDay} />
        </div>
        {loading && <h2>Loading...</h2>}
        {!loading && currentAvailability.length !== 0 && (
          <div className="schedule-container">
            {workDaySlots.map((slot, index) => (
              <RenderBlock
                key={index}
                slot={slot}
                availabilitySlot={availabilitySlots}
                location={location}
                date={currentDate.toLocaleDateString()}
                company={currentUser.company}
                setRefresh={setRefresh}
              />
            ))}
          </div>
        )}
        {currentAvailability.length === 0 && (
          <div>
            <h2 className="h2-marginBtm">
              No availability has currently been set for this date.
            </h2>
            <h2>
              Set company availability for {currentDate.toLocaleDateString()}
            </h2>
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
              <label htmlFor="newLocation">Location</label>
              <input
                type="text"
                id="newLocation"
                value={newLocation}
                onChange={(event) => setNewLocation(event.target.value)}
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
