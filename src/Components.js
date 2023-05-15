import React from "react";
import { addThirty } from "./utils/utils.js";
import { Tooltip } from "react-tooltip";

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
  // if the slot is unavailable, make it available
  const makeAvailable = (event) => {
    console.log("making this slot available");
    console.log("time: " + props.start);
    // upload to cloud and make component refresh
  };

  return (
    <div
      className="half-hour-block"
      id={props.start}
      data-tooltip-id={props.start}
      data-tooltip-content="Make this slot available"
      onClick={makeAvailable}
    >
      <h3>
        {props.start} - {props.end}
      </h3>
      <p>{props.location}</p>
      <Tooltip id={props.start} />
    </div>
  );
};

export const HalfHourBlockBooked = (props) => {
  // if the slot is unavailable, make it available
  const removeAvailable = (event) => {
    console.log("making this slot unavailable");
    console.log("time: " + props.start);
    // upload to cloud and make component refresh
  };
  return (
    <div
      className="half-hour-block booked"
      id={props.start}
      data-tooltip-id={props.start}
      data-tooltip-content="Remove availability"
      onClick={removeAvailable}
    >
      <h3>
        {props.start} - {props.end}
      </h3>
      <p>{props.location}</p>
      <Tooltip id={props.start} />
    </div>
  );
};

export const RenderBlock = (props) => {
  let end = addThirty(props.slot);

  if (props.availabilitySlot.includes(props.slot)) {
    return (
      <HalfHourBlockBooked
        start={props.slot}
        end={end}
        location={props.location}
      />
    );
  }
  return (
    <HalfHourBlock start={props.slot} end={end} location={props.location} />
  );
};

export const PhysioUnsetSlot = (props) => {
  // if the slot is unset, make it a physio spot
  const setSlot = (event) => {
    console.log("making this slot a physio slot");
    console.log("time: " + props.start);
    // upload to cloud and make component refresh
  };

  return (
    <div
      className="half-hour-block physio-unset"
      id={props.start}
      data-tooltip-id={props.start}
      data-tooltip-content="Click to open available slot for booking"
      onClick={setSlot}
    >
      <h3>
        {props.start} - {props.end}
      </h3>
      <p>The company is available</p>
      <p>{props.location}</p>
      <Tooltip id={props.start} />
    </div>
  );
};

export const PhysioSetSlot = (props) => {
  // if the slot is set, unset it
  const removeSlot = (event) => {
    console.log("removing this slot as physio slot");
    console.log("time: " + props.start);
    // remove from cloud and make component refresh
  };

  return (
    <div
      className="half-hour-block"
      id={props.start}
      data-tooltip-id={props.start}
      data-tooltip-content="Remove physio slot"
      onClick={removeSlot}
    >
      <h3>
        {props.start} - {props.end}
      </h3>
      <p>Available for booking</p>
      <p>{props.location}</p>
      <Tooltip id={props.start} />
    </div>
  );
};

export const PhysioBookedSlot = (props) => {
  // if the slot is set, unset it
  const cancelBooking = (event) => {
    console.log("removing this booking");
    console.log("time: " + props.start);
    // upload to cloud and make component refresh
  };

  return (
    <div
      className="half-hour-block physio-booked"
      id={props.start}
      data-tooltip-id={props.start}
      data-tooltip-content="Cancel appointment"
      onClick={cancelBooking}
    >
      <h3>
        {props.start} - {props.end}
      </h3>
      <p>{props.patient}</p>
      <p>{props.location}</p>
      <Tooltip id={props.start} />
    </div>
  );
};

export const RenderPhysioBlock = (props) => {
  let end = addThirty(props.slot);

  if (props.bookings[props.slot] !== undefined) {
    return (
      <PhysioBookedSlot
        start={props.slot}
        end={end}
        patient={props.bookings[props.slot]}
        location={props.location}
      />
    );
  } else if (props.physioSlots.includes(props.slot)) {
    return (
      <PhysioSetSlot start={props.slot} end={end} location={props.location} />
    );
  }
  return (
    <PhysioUnsetSlot start={props.slot} end={end} location={props.location} />
  );
};
