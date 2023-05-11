import React from 'react';

export const Appointment = (props) => {

    return (
      <div className="appointment-box">
            <h3>{props.date}</h3>
            <h3>{props.time}</h3>
            <h3>{props.physio}</h3>
            <button className='sml-btn'>Edit</button>
            <button className='sml-btn'>Cancel</button>
      </div>
    );
};
