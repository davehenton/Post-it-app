import axios from 'axios';
import toastr from 'toastr';
import AppDispatcher from '../dispatcher/AppDispatcher.js';
import {
  SIGN_IN_SUCCESS,
  GOOGLE_SIGN_IN_SUCCESS } from '../constants/ActionConstants.js';

/**
 * @description - An action that makes API call to server
 *  to sign in a user
 * @param {object} user - This contains email and password of a user
 * @returns {function} dispatch - server response is dispatch to SignInStore
 */
export const signInAction = user => axios.post('/api/v1/signin', user)
  .then(({ data }) => {
    AppDispatcher.dispatch({
      type: SIGN_IN_SUCCESS,
      response: data
    });
  }).catch(error => toastr.error(error.response.data.error.message));

/**
 * @description - An action that makes API call to server
 *  to sign in user`s via Google
 * @param {object} user - This contains user credential provided by Google
 * @returns {object} dispatch - server response is dispatch to SignInStore
 */
export const signInWithGoogle = user => axios.post('/api/v1/google', user)
  .then(({ data }) => {
    AppDispatcher.dispatch({
      type: GOOGLE_SIGN_IN_SUCCESS,
      response: data
    });
  }).catch(error => toastr.error(error.response));

