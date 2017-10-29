import firebase from 'firebase';
import dotenv from 'dotenv';
const env = process.env.NODE_ENV;
let checkProcess = '';

if (env === 'test') {
  checkProcess = 'TEST';
}
dotenv.config();

  /**
   * @description This contains App configuration generated by Google Firebase
  */
export const config = {
  apiKey: process.env[`${checkProcess}apiKey`],
  authDomain: process.env[`${checkProcess}authDomain`],
  databaseURL: process.env[`${checkProcess}databaseURL`],
  projectId: process.env[`${checkProcess}projectId`],
  storageBucket: process.env[`${checkProcess}storageBucket`],
  messagingSenderId: process.env[`${checkProcess}messagingSenderId`]
};
// firebase initialization
const dbConfig = firebase.initializeApp(config);

export default dbConfig;

