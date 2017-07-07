import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import BroadCastNav from './userBroadCastBoardNav.jsx';
import BroadCastGroupList from './userBroadCastBoardGroupList.jsx';
import BroadCastChatBoard from './userBroadCastChatBoard.jsx';
import BroadCastMemberList from './userBroadCastMemberList.jsx';
import '../../css/icon.css';

/**
 * Represents BroadCastBoard Component.
 */
class BroadCastBoard extends React.Component {
	// BroadCastBoard constructor
  /**
     * @param {string} props inbuilt props.
     */
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
		// Bind signOut tab to onClick event
    this.onClick = this.onClick.bind(this);
  }

	/**
 * onChange event.
 * @param {object} message The first number.
 * @returns {void} bind input values to name.
 */
  onChange(message) {
    this.setState({
      [message.target.name]: message.target.value
    });
  }

	/**
 * onSubmit event.
 * @param {object} message .
 * @returns {void} .
 */
  onSubmit(message) {
    message.preventDefault();
    const broadcastmessage = {
      message: this.state.message
    };
    axios.post('/groupName/message', broadcastmessage).then(() => {
      alert('message sent');
    });
  }
	/**
 * onClick event.
 * @param {void} nill no parameter.
 * @returns {object} response from server.
 */
  onClick() {
    axios.post('/signout').then((response) => {
      alert(response.data.message);
      this.props.history.push('/');
    }).catch((error) => {
      if (error.response) {
			// console.log(error.response.data);
      }
    });
  }
	/**
     * @override
     */
  render() {
    return (
			<div>
        <nav className="navbar navbar-inverse navabar-fixed-top"
					role="navigation">
					<div className="container">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle"
								data-toggle="collapse" data-target=".navbar-collapse">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<Link className="navbar-brand" to="/">
                PostIt<small>App</small>
              </Link>
						</div>
						<div className="collapse navbar-collapse">
							<ul className="nav navbar-nav">
							</ul>
							<ul className="nav navbar-nav navbar-right">
								<li><Link to="/">Home</Link></li>
								<li className="active">
									<Link to="/broadcastboard">ChatRoom</Link>
								</li>
								<li onClick={this.onClick}><Link to="#">Sign out</Link></li>
							</ul>
						</div>
					</div>
        </nav>
				<BroadCastNav />
				<div className="container">
					<div className="col-md-12">
						<div className="row board">
							<div className="col-md-3"
								style={{ backgroundColor: '#756d6d' }}>
								<h5 className="text-center para">Groups</h5>
								<hr />
								<br />
								<BroadCastGroupList />
							</div>
							<BroadCastChatBoard />
							<BroadCastMemberList />
							<hr />
						</div>
					</div>
				</div>
			</div>
    );
  }
}

// Export BroadCastBoard Component
export default BroadCastBoard;