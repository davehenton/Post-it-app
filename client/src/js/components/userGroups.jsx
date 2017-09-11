import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { generalUsers } from '../actions/memberActions.js';
import { getGeneralMessage } from '../actions/messageActions.js';
import MemberStore from '../stores/MemberStore.js';
// import MessageStore from '../stores/MessageStore.js';

/**
 * @description - renders Groups Component
 * @class Groups
 * @extends {React.Component}
 */
export default class Groups extends React.Component {
  /**
   * Create a constructor
   * @constructor
   * @param {object} props -
   */
  constructor(props) {
    super(props);
    this.state = {
      group: []
    };
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    MemberStore.on('GET_MEMBERS_OF_A_GROUP', this.handleOnClick);
    // MessageStore.on('GET_GROUP_MESSAGE', this.handleOnClick);
  }

  componentWillUnmount() {
    MemberStore.removeListener('GET_MEMBERS_OF_A_GROUP',
      this.handleOnClick);
    // MessageStore.removeListener('GET_GROUP_MESSAGE', this.handleOnClick);
  }

  handleOnClick() {
    const clickedGroup = MemberStore.allGroupMembers();
    this.props.getMembers(clickedGroup);
  }

  handleClick() {
    getGeneralMessage();
    generalUsers();
  }

  /**
   * @description - render method, React lifecycle method
   * @returns {Object} Groups component
   * @Groups
   */
  render() {
    return (
      <div>
        <div className="col-md-3">
          <div className="row chats-row">
            <div className="col-md-12">
              <ul className="col-md-10 col-md-offset-1 nav nav-pills
                nav-stacked grouplist">
                <li key="general"
                  value="general" name="general"
                  onClick={this.handleClick}><Link to="#">general</Link>
                </li>
                {this.props.grouplist}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


// props validation
Groups.propTypes = {
  grouplist: PropTypes.array,
  defaultGroup: PropTypes.string,
  getMembers: PropTypes.func.isRequired
};