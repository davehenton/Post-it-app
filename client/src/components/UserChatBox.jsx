import React from 'react';
import PropTypes from 'prop-types';
import { sendGroupMessage } from '../actions/messageActions';


/**
 * @description - renders ChatBox Component
 * @class ChatBox
 * @extends {React.Component}
 */
export default class UserChatBox extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props -
   */
  constructor(props) {
    super(props);
    this.state = {
      userId: JSON.parse(localStorage.getItem('Id')),
      username: JSON.parse(localStorage.getItem('userName')),
      message: '',
      priority: 'normal',

    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * @description - onChange event
   * @param {event} event - event
   * @returns {null} null
   * @memberOf ChatBox
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * @description - onSubmit event
   * @param {any} event - event
   * @returns {null} null
   * @memberOf ChatBox
   */
  onSubmit(event) {
    event.preventDefault();
    const newMessage = {
      groupId: this.props.groupId,
      message: this.state.message,
      priority: this.state.priority,
    };
    sendGroupMessage(newMessage);
    this.setState({
      message: ''
    });
  }

  /**
   * @description - render method, React lifecycle method
   * @returns {Object} ChatBox component
   * @ChatBox
   */
  render() {
    const chatMessage = this.props.allGeneralMessage.map((Index, i) =>
      <li key={i} className="media">
        <div className="media-body">
          <div className="media">
            <div className="media-body">
              {Index.message}
              <span className="pull-right">{Index.priority}</span>
              <br/>
              <small className="text-muted">
                {Index.date} | {Index.time} | {Index.userName}
              </small>
              <hr/>
            </div>
          </div>
        </div>
      </li>
    );
    return (
      <div className="col-md-9 current-chat">
        <div className="row" style={{ backgroundColor: '#e8e8ee' }}>
          <p className="text-center"
            style={{ padding: '5px', marginTops: '5px' }}>
            {this.props.defaultGroup}</p>
        </div>
        <div className="row current-chat-area">
          <div className="col-md-12">
            <ul className="media-list">
              {chatMessage}
            </ul>
          </div>
        </div>
        <div className="row current-chat-footer">
          <div className="panel-footer">
            <div className="input-group">
            <div className="input-group-addon">
            <select name="priority" onChange={this.onChange}>
                <option value="normal">Normal</option>
                <option value="critical">Critical</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
              <input
                type="text"
                name="message"
                value={this.state.message}
                className="form-control"
                onChange={this.onChange}/>
              <span className="input-group-btn">
                <button
                  className="btn btn-default"
                  type="button"
                  onClick={this.onSubmit}>Send
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// props validation
UserChatBox.propTypes = {
  name: PropTypes.string,
  allGeneralMessage: PropTypes.array,
  defaultGroup: PropTypes.string,
  groupId: PropTypes.string
};