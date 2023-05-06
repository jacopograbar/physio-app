import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons'

const Slot = (props) => {

    return (
      <div className="slot-box">
          <h3>{props.time}</h3>
          <h3>{props.physio}</h3>
          <button>Book session </button>
      </div>
    );
  };

const ConfirmationPopUp = (props) => {

    return (
        <div className="confirmation-popup">
            <div>
                <h1>Appointment details</h1>
                <h2>Session with {props.physio}</h2>
                <h2>{props.date} at {props.time}</h2>
            </div>
            <div>
                <button>Confirm Booking</button>
                <p>Or</p>
                <a href="/register">Back to appointment selection</a>
            </div>
      </div>
    );
  };


const PickAppointment = () => {

    return (
        <div className="home-container appointments-container">
            <div className="arrow-box">
                <FontAwesomeIcon icon={faCaretLeft} />
                <span>Tuesday, July 28</span>
                <FontAwesomeIcon icon={faCaretRight} />
            </div>
            <Slot time="10.15 AM" physio="Ashley Cohen"/>
            <Slot time="10.45 AM" physio="Ashley Cohen"/>
            <Slot time="11.15 AM" physio="Ashley Cohen"/>
            <Slot time="11.45 AM" physio="Ashley Cohen"/>
            {/* <ConfirmationPopUp date="Tuesday, July 28" time="11.45 AM" physio="Ashley Cohen" /> */}
        </div>

    )
}

export default PickAppointment;