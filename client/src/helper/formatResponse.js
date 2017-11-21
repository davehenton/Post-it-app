
/**
 * @function helpGetGroupMessages
 * @param {object} message - Array of Object from Firebase Database
 * @returns {object} object Array of Object of GroupMessage
 */
export const helpGetGroupMessages = (message) => {
  let GroupMessage;
  if (message[0] === null) {
    GroupMessage = [];
  } else {
    GroupMessage = Object.values(message[0]);
  }
  return GroupMessage;
};


/**
 * @function helpGetGroups
 * @param {object} group -
 * @returns {object} Array of object of user`s groups
 */
export const helpGetGroups = (group) => {
  const groupNames = Object.keys(group[0]);
  const groupKeys = Object.values(group[0]);
  let index = 0;
  const groups = [];
  while (index < groupNames.length) {
    groups.push({ [groupNames[index]]: groupKeys[index] });
    index += 1;
  }
  return groups;
};

/**
 * @function helpGetGroupMembers
 * @param {object} member -
 * @returns {object} array of object of members of a group
 */
export const getGroupMembers = (member) => {
  let groupMembers = [];
  if (member.length === 0) {
    groupMembers = [];
  } else {
    const memberId = Object.keys(member[0]);
    const memberName = Object.values(member[0]);
    let index = 0;
    while (index < memberId.length) {
      groupMembers.push({ [memberId[index]]: memberName[index] });
      index += 1;
    }
  }
  return groupMembers;
};
