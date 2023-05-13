import React from "react";
import { addThirty } from "./utils/utils.js";

export const Appointment = (props) => {
  return (
    <div className="appointment-box">
      <h3>{props.date}</h3>
      <h3>{props.time}</h3>
      <h3>{props.physio}</h3>
      <button className="sml-btn">Edit</button>
      <button className="sml-btn">Cancel</button>
    </div>
  );
};

export const HalfHourBlock = (props) => {
  return (
    <div className="half-hour-block">
      <h3>{props.start}</h3>
      <h3>{props.end}</h3>
    </div>
  );
};

export const HalfHourBlockBooked = (props) => {
  return (
    <div className="half-hour-block booked">
      <h3>{props.start}</h3>
      <h3>{props.end}</h3>
    </div>
  );
};

export const RenderBlock = (props) => {

  let end = addThirty(props.slot);

  if (props.availabilitySlot.includes(props.slot)) {
    return <HalfHourBlockBooked start={props.slot} end={end} />;
  }
  return <HalfHourBlock start={props.slot} end={end} />;
}
