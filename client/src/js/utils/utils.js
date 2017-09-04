/**
 * @function validatePassword
 * @param {Object} pass -
 * @returns {bool} validated
 */
export const validatePassword = (pass) => {
  let validated;
  if (pass.length < 6) {
    validated = true;
  } else {
    validated = false;
  }
  return validated;
};


/**
 * @function getMembersOfAGroup
 * @param {Object} data -
 * @returns {Object} title
 */
export const getMembersOfAGroup = (data) => {
  const arrayOfUsers = Object.values((data.response)[0]).filter(i =>
    Object.values((data.response)[0]).indexOf(i) > 0);
  return arrayOfUsers.map(j => Object.values(j));
};


/**
 * @function getAllUsers
 * @param {Object} objectOfUsers -
 * @returns {Object} allUsers
 */
export const getAllUsers = (objectOfUsers) => {
  const arrayOfAllUsers = Object.values((objectOfUsers.response[0]));
  const allUsers = [];
  for (let i = 0; i < arrayOfAllUsers.length; i++) {
    allUsers.push((Object.values(arrayOfAllUsers[i]))[0].user);
  }
  return allUsers;
};


/**
 * @function getUserGroups
 * @param {Object} data -
 * @returns {Object} getGroups
 */
export const getUserGroups = (data) => {
  let getGroups;
  if ((data.response)[0] === null) {
    getGroups = [];
  } else {
    getGroups = Object.keys(((data.response)[0]));
  }
  return getGroups;
};


/**
 * @function getAllGeneralUsers
 * @param {Object} data -
 * @returns {Object} allRegisteredUsers
 */
export const getAllGeneralUsers = (data) => {
  const arrayOfUsers = Object.values((data.response)[0]).map(x =>
    Object.values(x));
  const allRegisteredUsers = arrayOfUsers.map(m => m[0].user);
  return allRegisteredUsers;
};
