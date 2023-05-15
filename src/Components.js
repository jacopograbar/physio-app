import React, { useState } from "react";
import { addThirty, getAvailableSlotsArray } from "./utils/utils.js";
import { Tooltip } from "react-tooltip";
import Modal from "react-modal";

Modal.setAppElement("#root");

export const Appointment = (props) => {
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

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [currentAvailability, setCurrentAvailability] = useState(availability);
  const [time, setTime] = useState(props.time);

  const availabilitySlot = getAvailableSlotsArray(currentAvailability, 30);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    console.log("HIOIIIII");
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function editTime() {
    console.log("changed to " + time);
    // need to update on backend here...
  }

  async function cancelAppointmet() {
    console.log("canceling appointment..." + time);
    // need to remove appointment from cloud
  }

  return (
    <div className="appointment-box">
      <h3>{props.date}</h3>
      <h3>{props.time}</h3>
      <p>{props.location}</p>
      <p>{props.physio}</p>
      <button className="sml-btn" onClick={openModal}>
        Edit Time
      </button>
      <Modal
        className="edit-modal"
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
      >
        <h1>Edit appointment time</h1>
        <h2>
          You are currently booked with {props.physio} at {props.time} on{" "}
          {props.date}
        </h2>
        <form className="edit-form" onSubmit={editTime}>
          <label htmlFor="bookings">Choose a new time:</label>
          <select
            onChange={(event) => setTime(event.target.value)}
            id="bookings"
            name="bookings"
          >
            {availabilitySlot.map((slot, index) => (
              <option value={slot} key={index}>
                {slot} - {addThirty(slot)}{" "}
              </option>
            ))}
          </select>
          <div className="edit-time-btns">
            <input
              id="edit-time"
              className="input-btn sml-btn"
              type="submit"
              value="Confirm"
            />
            <button className="sml-btn" onClick={closeModal}>
              Back
            </button>
          </div>
        </form>
      </Modal>
      <button className="sml-btn" onClick={cancelAppointmet}>
        Cancel
      </button>
    </div>
  );
};

export const Slot = (props) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    console.log("HIOIIIII");
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="slot-box">
      <h3>
        {props.time} - {addThirty(props.time)}
      </h3>
      <h3>{props.physio}</h3>
      <h3>{props.location}</h3>
      <button onClick={openModal}>Book session</button>
      <Modal
        className="edit-modal"
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
      >
        <div>
          <h1>Appointment details</h1>
          <h2>Session with {props.physio}</h2>
          <h2>
            {props.date} at {props.time}
          </h2>
        </div>
        <div>
          <button>Confirm Booking</button>
          <p>Or</p>
          <a href="/register">Back to appointment selection</a>
        </div>
        <button className="sml-btn" onClick={closeModal}>
          Back
        </button>
      </Modal>
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
