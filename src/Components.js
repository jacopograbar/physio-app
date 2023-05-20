import React, { useState } from "react";
import { addThirty } from "./utils/utils.js";
import {
  addBooking,
  removeBooking,
  addPhysioSlot,
  removePhysioSlot,
  addAvailabilitySlot,
  removeAvailabilitySlot,
} from "./utils/appointmentsManager.js";
import { Tooltip } from "react-tooltip";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

export const Appointment = (props) => {

  async function cancelAppointment() {
    // get details for reinstated physio slot
    const newSlotDetails = {
      date: props.date,
      time: props.time,
      company: props.company,
      endTime: addThirty(props.time),
      location: props.location,
      physio: props.physio,
    };
    //FIRST, cancel booking
    const removeOp = await removeBooking(props.date, props.time);
    if (removeOp === "") {
      //THEN, reinstate physio slot
      await addPhysioSlot(newSlotDetails);
    } 
    props.setUpdate(true);
  }

  return (
    <div className="appointment-box">
      <h3>{props.date}</h3>
      <h3>
        {props.time} - {props.endTime}
      </h3>
      <p>{props.location}</p>
      <p>{props.physio}</p>
      <button className="sml-btn" onClick={cancelAppointment}>
        Cancel
      </button>
    </div>
  );
};

export const Slot = (props) => {
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function bookSession() {
    const bookingDetails = {
      date: props.date,
      time: props.time,
      company: props.company,
      endTime: addThirty(props.time),
      location: props.location,
      physio: props.physio,
      patient: props.patient,
    };

    // 1- add booking
    await addBooking(bookingDetails);

    // 2 - remove physio slot
    await removePhysioSlot(props.date, props.time);

    // 3 - navigate back to dancer page
    navigate("/dancer");
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
          <button onClick={bookSession}>Confirm Booking</button>
          <h3> Or</h3>
          <a href="#" onClick={closeModal}>Back to appointment selection</a>
        </div>
      </Modal>
    </div>
  );
};

export const HalfHourBlock = (props) => {
  // if the slot is unavailable, make it available
  const makeAvailable = async (event) => {
    let slotDetails = {
      date: props.date,
      time: props.start,
      company: props.company,
      endTime: props.end,
      location: props.location,
    };
    await addAvailabilitySlot(slotDetails);
    props.setRefresh(true);
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
  const removeAvailable = async (event) => {
    await removeAvailabilitySlot(props.date, props.start);
    props.setRefresh(true);
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
        date={props.date}
        company={props.company}
        setRefresh = {props.setRefresh}
      />
    );
  }
  return (
    <HalfHourBlock
      start={props.slot}
      end={end}
      location={props.location}
      date={props.date}
      company={props.company}
      setRefresh = {props.setRefresh}
    />
  );
};

export const PhysioUnsetSlot = (props) => {

  const setSlot = async (event) => {
    // get details for reinstated physio slot
    const newSlotDetails = {
      date: props.date,
      time: props.start,
      company: props.company,
      endTime: props.end,
      location: props.location,
      physio: props.physio,
    };
    // 1 - add new physio slot
    await addPhysioSlot(newSlotDetails);
    // 2 - remove availability slot
    await removeAvailabilitySlot(props.date, props.start);
    props.setRefresh(true);
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

  const removeSlot = async (event) => {
    const slotDetails = {
      date: props.date,
      time: props.start,
      company: props.company,
      endTime: props.end,
      location: props.location,
    }
    // 1 - remove physio slot
    await removePhysioSlot(props.date, props.start);
    // 2 - add availability
    await addAvailabilitySlot(slotDetails);
    props.setRefresh(true);
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
  const cancelBooking = async (event) => {
    // get details for reinstated physio slot
    const newSlotDetails = {
      date: props.date,
      time: props.start,
      company: props.company,
      endTime: props.end,
      location: props.location,
      physio: props.physio,
    };
    // 1 - remove booking from cloud
    await removeBooking(props.date, props.start);
    // 2 - add physio slot back to cloud
    await addPhysioSlot(newSlotDetails);
    props.setRefresh(true);
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
  const end = addThirty(props.slot);

  if (props.bookings[props.slot] !== undefined) {
    return (
      <PhysioBookedSlot
        start={props.slot}
        end={end}
        patient={props.bookings[props.slot]}
        location={props.location}
        physio={props.physio}
        company={props.company}
        date={props.date}
        setRefresh = {props.setRefresh}
      />
    );
  } else if (props.physioSlots.includes(props.slot)) {
    return (
      <PhysioSetSlot
        start={props.slot}
        end={end}
        patient={props.bookings[props.slot]}
        location={props.location}
        physio={props.physio}
        company={props.company}
        date={props.date}
        setRefresh = {props.setRefresh}
      />
    );
  }
  return (
    <PhysioUnsetSlot
      start={props.slot}
      end={end}
      patient={props.bookings[props.slot]}
      location={props.location}
      physio={props.physio}
      company={props.company}
      date={props.date}
      setRefresh = {props.setRefresh}
    />
  );
};
