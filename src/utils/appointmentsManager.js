import axios from "axios";

// TO-DO Change URL and x-api-key once API is set up
// API config and URL
const availabilityManagerURL =
  "https://casenwvhil.execute-api.us-east-1.amazonaws.com/prod/availability";
const physioSlotsManagerURL =
  "https://casenwvhil.execute-api.us-east-1.amazonaws.com/prod/physio-slots";
const bookingsManagerURL =
  "https://casenwvhil.execute-api.us-east-1.amazonaws.com/prod/bookings";

const requestConfig = {
  headers: {
    "x-api-key": "rYiGH9iLiB4ZXRg41B1QX69Ka5uAiRIX8RHjFwN2"
  }
};

// Remove booking given a date and time.
// It returns an empty string if the operation was successful
export const removeBooking = async function (date, time) {
  let message = null;
  const requestBody = {
    action: "remove",
    date: date,
    time: time,
  };
  console.log(requestBody);

  await axios
    .post(bookingsManagerURL, requestBody, requestConfig)
    .then((response) => {
      message = "";
      console.log("removed");
    })
    .catch((error) => {
      message = error.response.data.message;
    });

  return message;
};

// Add physio slot
// It returns an empty string if the operation was successful
export const addPhysioSlot = async function (slotDetails) {
  let message = null;
  const requestBody = {
    action: "add",
    date: slotDetails.date,
    time: slotDetails.time,
    company: slotDetails.company,
    endTime: slotDetails.endTime,
    location: slotDetails.location,
    physio: slotDetails.physio,
  };

  await axios
    .post(physioSlotsManagerURL, requestBody, requestConfig)
    .then((response) => {
      message = "";
    })
    .catch((error) => {
      message = error.response.data.message;
    });

  return message;
};

// add new booking for a patient
// It returns an empty string if the operation was successful
export const addBooking = async function (bookingDetails) {
  let message = null;
  const requestBody = {
    action: "add",
    date: bookingDetails.date,
    time: bookingDetails.time,
    company: bookingDetails.company,
    endTime: bookingDetails.endTime,
    location: bookingDetails.location,
    physio: bookingDetails.physio,
    patient: bookingDetails.patient,
  };

  await axios
    .post(bookingsManagerURL, requestBody, requestConfig)
    .then((response) => {
      message = "";
    })
    .catch((error) => {
      message = error.response.data.message;
    });

  return message;
};

// add new availability slot
// It returns an empty string if the operation was successful
export const addAvailabilitySlot = async function (slotDetails) {
  let message = null;
  const requestBody = {
    action: "add",
    date: slotDetails.date,
    time: slotDetails.time,
    company: slotDetails.company,
    endTime: slotDetails.endTime,
    location: slotDetails.location,
  };

  await axios
    .post(availabilityManagerURL, requestBody, requestConfig)
    .then((response) => {
      message = "";
    })
    .catch((error) => {
      message = error.response.data.message;
    });

  return message;
};

export const getAvailabilitySlots = async function (date, company) {
  let slots = [];

  const requestBody = {
    action: "get",
    date: date,
    company: company,
  };

  await axios
    .post(availabilityManagerURL, requestBody, requestConfig)
    .then((response) => {
      slots = response.data;
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });

  return slots;
};

export const getBookings = async function (company, patient) {
    let slots = [];
  
    const requestBody = {
      action: "get",
      company: company,
      patient: patient
    };
  
    await axios
      .post(bookingsManagerURL, requestBody, requestConfig)
      .then((response) => {
        slots = response.data;
      })
      .catch((error) => {
        console.log(error.response);
      });
    return slots;
  };

  export const getPhysioSlots = async function (date, company) {
    let slots = [];
  
    const requestBody = {
      action: "get",
      date: date,
      company: company
    };
    console.log(requestBody);
  
    await axios
      .post(physioSlotsManagerURL, requestBody, requestConfig)
      .then((response) => {
        slots = response.data;
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  
    return slots;
  };

// Remove physio slot given a date and time.
// It returns an empty string if the operation was successful
export const removePhysioSlot = async function (date, time) {
  let message = null;
  const requestBody = {
    action: "remove",
    date: date,
    time: time
  };
  console.log(requestBody);

  await axios
    .post(physioSlotsManagerURL, requestBody, requestConfig)
    .then((response) => {
      message = "";
      console.log("removed");
    })
    .catch((error) => {
      message = error.response.data.message;
    });

  return message;
};

// Remove physio slot given a date and time.
// It returns an empty string if the operation was successful
export const removeAvailabilitySlot = async function (date, time) {
  let message = null;
  const requestBody = {
    action: "remove",
    date: date,
    time: time
  };
  console.log(requestBody);

  await axios
    .post(availabilityManagerURL, requestBody, requestConfig)
    .then((response) => {
      message = "";
      console.log("removed");
    })
    .catch((error) => {
      message = error.response.data.message;
    });

  return message;
};

export const getBookingsByDate = async function (company, date) {
  let slots = [];

  const requestBody = {
    action: "get_by_date",
    company: company,
    date: date
  };

  await axios
    .post(bookingsManagerURL, requestBody, requestConfig)
    .then((response) => {
      slots = response.data;
    })
    .catch((error) => {
      console.log(error.response);
    });
  return slots;
};

  
