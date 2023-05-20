import moment from "moment";

// user session functions
export const getUser = function () {
  const user = sessionStorage.getItem("user");
  if (user === "undefined" || !user) {
    return null;
  } else {
    return JSON.parse(user);
  }
};

export const setUserSession = function (user) {
  sessionStorage.setItem("user", JSON.stringify(user));
};

export const resetUserSession = async function () {
  sessionStorage.setItem("user", null);
  sessionStorage.removeItem("user");
  console.log("user removed");
};

// sets user type in session variable

export const setUserType = function (type) {
  sessionStorage.setItem("userType", type);
};

export const getUserType = function () {
  const type = sessionStorage.getItem("userType");
  if (type === "undefined" || !type) {
    return null;
  } else {
    return type;
  }
};

export const resetUserType = function () {
  sessionStorage.setItem("userType", null);
  sessionStorage.removeItem("userType");
  console.log("type reset");
};

// slots functions

export const getSlotsArray = function (start, end, interval) {
  let startTime = moment(start, "HH:mm");
  let endTime = moment(end, "HH:mm");

  let allTimes = [];

  while (startTime < endTime) {
    //Push times
    allTimes.push(startTime.format("HH:mm"));
    //Add interval of 30 minutes
    startTime.add(interval, "minutes");
  }

  return allTimes;
};

export const getAvailableSlotsArray = function (start, end, interval) {
  let allTimes = [];

  let startTime = moment(start, "HH:mm");
  let endTime = moment(end, "HH:mm");
  while (startTime < endTime) {
    //Push times
    allTimes.push(startTime.format("HH:mm"));
    //Add interval of 30 minutes
    startTime.add(interval, "minutes");
  }

  return allTimes;
};

export const getBookingsArray = function (bookings) {
  var temp = [];

  for (let slot of bookings) {
    temp[slot.time] = slot.patient;
  }

  console.log("HEY", temp);
  return temp;
};

export const getArray = function (slots) {
  var temp = [];

  for (let slot of slots) {
    temp.push(slot.time);
  }

  console.log(temp);

  return temp;
};

export const addThirty = function (start) {
  let startTime = moment(start, "HH:mm");
  startTime.add(30, "minutes");

  return startTime.format("HH:mm");
};

// retrieves img from bucket given a username
export function retrieveImgFromS3(username){
  var imgName = username.replace(/\s/g, "") + ".jpg";
  
  var objectURL = "https://s3876518-a2.s3.amazonaws.com/" + imgName;
  console.log(objectURL);

  return objectURL;
}
