import axios from 'axios';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {
    GET_GROUP_MESSAGE,
    GET_GENERAL_MESSAGE,
    SEND_GROUP_MESSAGE,
    SEND_GENERAL_MESSAGE
} from '../constants/ActionConstants.js';
import {
    arrayOfGeneralMessage,
    getGroupMessages
} from '../helper/helper.js';

/**
 * @description - Get message of general Group
 * @returns {function} dispatch - dispatch to MessageStore
 */
export const getGeneralMessage = () => axios.post('/getGeneralMessage')
    .then(({ data }) => {
      AppDispatcher.dispatch({
        type: GET_GENERAL_MESSAGE,
        message: arrayOfGeneralMessage(data)
      });
    }, ({ response }) => {
      AppDispatcher.dispatch({
        type: GET_GENERAL_MESSAGE,
        error: response.data.message
      });
    });

/**
 * @description - Send message to general group
 * @param {Object} messageDetails - { message, priority, userName, email }
 * @returns {function} dispatch - dispatch to MessageStore
 */
export const sendGeneralMessage = (messageDetails) =>
  axios.post('/sendGeneralMessage', messageDetails)
    .then(({ data }) => {
      AppDispatcher.dispatch({
        type: SEND_GENERAL_MESSAGE,
        message: (data.response)[1]
      });
    }, ({ response }) => {
      AppDispatcher.dispatch({
        type: SEND_GENERAL_MESSAGE,
        error: response.data.message
      });
    });

/**
 * @description - Get message of a group
 * @param {Object} group - { group }
 * @returns {function} dispatch - dispatch to MessageStore
 */
export const getGroupMessage = (groupId) => axios.get(`getMessage/${groupId}`)
  .then(({ data }) => {
    AppDispatcher.dispatch({
      type: GET_GROUP_MESSAGE,
      message: getGroupMessages(data.response)
    });
  }, ({ response }) => {
    AppDispatcher.dispatch({
      type: GET_GROUP_MESSAGE,
      error: response.data.message
    });
  });
/**
* @description - Send message to a group
* @param {Object} messageDetails - { groupId, message, priority }
* @returns {function} dispatch - dispatch to MessageStore
*/
export const sendGroupMessage = (messageDetails) => {
  const message = messageDetails.message;
  const priority = messageDetails.priority;
  axios.post(`/sendMessage/${messageDetails.groupId}`, { message, priority })
    .then(({ data }) => {
      AppDispatcher.dispatch({
        type: SEND_GROUP_MESSAGE,
        message: data.response[1]
      });
    }, ({ response }) => {
      AppDispatcher.dispatch({
        type: SEND_GROUP_MESSAGE,
        error: response.data.message
      });
    });
};
