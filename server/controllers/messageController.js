import moment from 'moment';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import values from 'object.values';
import dbConfig from '../config/dbConfig';
import Helper from '../helper/Helper.js';
import sendGroupSMS from '../utils/utils.js';

dotenv.config();

/**
 * @description This class create and read functions for Messages
 * @class MessageController
 */
export default class MessageController {
  /**
   * @description This method send message to group
   * route POST: api/v1/sendMessage/:groupId
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} json response contains message sent details
   */
  static sendMessageToGroup(req, res) {
    const message = req.body.message;
    const priority = req.body.priority;
    const groupId = req.params.groupId;
    const userId = req.user.uid;
    const time = moment().format('llll');
    if (userId === undefined) {
      res.status(401).send({ error: {
        code: 'PERMISSION_DENIED',
        message: 'User is not signed in' }
      });
    } else if (message.length < 1) {
      res.status(403).send({ error: 'No message sent' });
    } else {
      Helper.getUserEmailAndPhoneNumber(userId)
        .then(senderDetails => {
          const sender = values(senderDetails)[0];
          const userName = sender.userName;
          const email = sender.userEmail;
          Helper.getGroupPhoneNumbers(groupId).then(groupPhoneAndEmail => {
            if (priority === 'urgent') {
              const groupEmails = Helper.getGroupEmails(groupPhoneAndEmail);
              const transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 25,
                secure: false,
                auth: {
                  user: process.env.APP_EMAIL,
                  pass: process.env.APP_PASSWORD },
                tls: { rejectUnauthorized: false }
              });
              const mailOptions = {
                from: '"PostIt-App" <postitmail@gmail.com>',
                to: groupEmails,
                subject: 'New Message Received',
                text: 'PostIt-App',
                html: '<b>Hello, </b> this is to notify you ' +
                  'that you have an important new message'
              };
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  return (error, info);
                }
              });
            } else if (priority === 'critical') {
              const groupEmails = Helper.getGroupEmails(groupPhoneAndEmail);
              const groupPhoneNumbers = Helper.getPhoneNumbers(
                groupPhoneAndEmail);
              sendGroupSMS(groupPhoneNumbers).then(res => {
                if (res) {
                  const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    port: 25,
                    secure: false,
                    auth: {
                      user: process.env.APP_EMAIL,
                      pass: process.env.APP_PASSWORD },
                    tls: { rejectUnauthorized: false }
                  });
                  const mailOptions = {
                    from: '"PostIt-App" <postitmail@gmail.com>',
                    to: groupEmails,
                    subject: 'New Message Received',
                    text: 'PostIt-App',
                    html: '<b>Hello, </b> this is to notify you ' +
                      'that you have an important new message'
                  };
                  transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                      return (error, info);
                    }
                  });
                }
              });
            }
          });
          return Promise.all([
            dbConfig.database().ref('Messages')
              .child(groupId).push({
                message, priority, userName, email, time }),
                { message, priority, userName, email, time }
          ])
            .then(response => res.status(200).send({
              message: 'Broadcast Message sent successfully', response }))
            .catch(error => res.status(500).send({ error }));
        })
        .catch(error => res.status(403).send({ error }));
    }
  }

  /**
   * @description This method retrieves all message in a group
   * route GET: api/v1/getMessage/:groupId
   * @param {Object} req request object
   * @param {Object} res response object
   * @return {Object} json response contains all message in a group
   */
  static getMessage(req, res) {
    const groupId = req.params.groupId;
    const userId = req.user.uid;
    if (userId === undefined) {
      res.status(401).send({ error: 'User not signed in' });
    } else {
      return Promise.all(
        [
          dbConfig.database().ref('Messages').child(groupId)
            .once('value', snapshot => snapshot.val())
        ])
        .then(response => res.status(200).send({ response }))
        .catch(error => res.status(403).send({ error }));
    }
  }
}
