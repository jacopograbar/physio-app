import React, { useState } from "react";
import { getAvailableSlotsArray, getSlotsArray, getUser } from "./utils/utils.js";
import { HalfHourBlock, HalfHourBlockBooked, RenderBlock } from "./Components.js";

const Management = () => {
  const currentUser = getUser();
  let date = new Date().toLocaleDateString();

  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("18:00");

  // retrieve availability and physio schedule from cloud
  // if no availability, display no availability for today

  const availability = [
    {
      date: '13/05/2022',
      start: '10:00',
      end: '12:30',
      location: 'Sydney Dance Company'
    },
    {
      date: '13/05/2022',
      start: '14:00',
      end: '15:30',
      location: 'Sydney Dance Company'
    },
    {
      date: '13/05/2022',
      start: '16:00',
      end: '16:30',
      location: 'Sydney Dance Company'
    }
  ]

  const workDaySlots = getSlotsArray("8.00", "18.00", 30);
  const availabilitySlot = getAvailableSlotsArray(availability, 30);
  

  // const availability = null;

  const addAvailability = async (event) => {
    event.preventDefault();
    console.log("adding availability to the cloud");
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
        <a href="/">Add availability</a>
        <a href="/">Change availability</a>
        <a href="/">Log out</a>
      </div>
      <div className="userpage-wall">
        <div>
          <h1>Current availability</h1>
          <h1>{date}</h1>
        </div>
        {availability && (
          <div className="schedule-container">
            { workDaySlots.map((slot, index) => (
              <RenderBlock slot={slot} availabilitySlot={availabilitySlot} />
            ))}
          </div>
        )}
        {availability === null && (
          <div>
            <h2 className="h2-marginBtm">
              No availability has currently been set for this date.
            </h2>
            <h2>Set company availability for {date}</h2>
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
