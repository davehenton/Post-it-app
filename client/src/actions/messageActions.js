import axios from 'axios';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {
  GET_GROUP_MESSAGE, GET_GROUP_MESSAGE_ERROR,
  SEND_GROUP_MESSAGE, SEND_GROUP_MESSAGE_ERROR
} from '../constants/ActionConstants.js';
import {
    helpGetGroupMessages
} from '../helper/helper.js';

/**
 * @description - Get message of a group
 * @param {Object} groupId - { groupId }
 * @returns {function} dispatch - dispatch to MessageStore
 */
export const getGroupMessage = (groupId) => axios.get(
  `/api/v1/getMessage/${groupId}`)
  .then(({ data }) => {
    const messageResponse = helpGetGroupMessages(data.response);
    AppDispatcher.dispatch({
      type: GET_GROUP_MESSAGE,
      message: messageResponse
    });
  }).catch((error) => {
    if (error.response) {
      AppDispatcher.dispatch({
        type: GET_GROUP_MESSAGE_ERROR,
        error: error.response.data.message
      });
    }
  });

/**
* @description - Send message to a group
* @param {Object} messageDetails - { groupId, message, priority }
* @returns {function} dispatch - dispatch to MessageStore
*/
export const sendGroupMessage = (messageDetails) => {
  axios.post(`/api/v1/sendMessage/${messageDetails.groupId}`,
    messageDetails).then(({ data }) => {
      AppDispatcher.dispatch({
        type: SEND_GROUP_MESSAGE,
        message: data.response[1]
      });
    }).catch((error) => {
      if (error.response) {
        AppDispatcher.dispatch({
          type: SEND_GROUP_MESSAGE_ERROR,
          error: error.response.data.message
        });
      }
    });
};
