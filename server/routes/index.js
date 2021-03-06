import express from 'express';
import UserController from '../controller/UserController';
import GroupController from '../controller/GroupController';
import MessageController from '../controller/MessageController';

/**
 * Creates express Router
 */
const Router = express.Router();

/**
 * Route for signup users to the application
 */
Router.post('/api/v1/signup', UserController.signUp);

/**
 * Route for signin user to the application
 * Both { email and password }
 */
Router.post('/api/v1/signin', UserController.signIn);

/**
 * Route for signin user to the application via Google account
 * Both { email and password }
 */
Router.post('/api/v1/google', UserController.googleSignIn);

/**
 * Route for reset user password
 * Both { email }
 */
Router.post('/api/v1/passwordReset', UserController.passwordReset);

/**
 * Route for sign out user from the application
 */
Router.post('/api/v1/signout', UserController.signOut);

/**
 * Route for a signed in user to create groups in the application
 */
Router.post('/api/v1/createGroup', GroupController.createGroup);

/**
 * Route to get a user groups
 */
Router.get('/api/v1/getgroups/:userId', GroupController.getUsersGroups);

/**
 * Route for a registered user to add registered member to a group
 */
Router.post('/api/v1/addmember/:groupId', GroupController.addMemberToGroup);

/**
 * Route for a signed user to get members of a group
 */
Router.get('/api/v1/getMembers/:groupId', GroupController.getMembersOfGroup);

/**
 * Route for a signed user to send message to a group
 */
Router.post('/api/v1/sendMessage/:groupId',
  MessageController.sendMessageToGroup);

/**
 * Route for signed user to vew message in a group
 */
Router.get('/api/v1/getMessage/:groupId', MessageController.getMessage);

/**
 * Route for a signed in user to add members to a group
 */
Router.get('/api/v1/getAllRegisteredUsers',
  GroupController.getAllRegisteredUsers);

// export Router
export default Router;
