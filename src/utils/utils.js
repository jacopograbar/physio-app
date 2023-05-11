
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
    console.log('user removed');
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
    console.log('type reset');
};