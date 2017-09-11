import axios from 'axios';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import { getUserGroups } from '../utils/utils.js';

import {
  GET_GROUPS,
  CREATE_NEW_GROUP } from '../constants/ActionConstants.js';


/**
  * @description - Get groups of a user
  * @param {null} null -
  * @returns {function} dispatch - dispatch to GroupStore
*/
export const getGroups = () => axios.post('/getgroups')
  .then(({ data }) => {
    // console.log(data, 'is this the data', getUserGroups(data));
    AppDispatcher.dispatch({
      type: GET_GROUPS,
      groups: getUserGroups(data)
    });
  }, ({ response }) => {
    AppDispatcher.dispatch({
      type: GET_GROUPS,
      error: response.data.message
    });
  });


/**
  * @description - Get groups of a user
  * @param {Object} userDetails -
  * @returns {function} dispatch - dispatch to GroupStore
*/
export const createGroup = (userDetails) => axios.post('/creategroup',
  userDetails)
  .the(({ data }) => {
    AppDispatcher.dispatch({
      type: CREATE_NEW_GROUP,
      group: data.message
    });
  }, ({ response }) => {
    AppDispatcher.dispatch({
      type: CREATE_NEW_GROUP,
      error: response.data.message
    });
  });