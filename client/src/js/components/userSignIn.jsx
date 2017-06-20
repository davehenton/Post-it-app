import React from 'react';
// import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { browserHistory, Link } from 'react-router-dom';

class SignIn extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: ''
		}
		// Bind input field values
		this.onChange = this.onChange.bind(this);

		// Bind Form values
		this.onSubmit = this.onSubmit.bind(this);
	}

	onChange(signIn) {
		this.setState({
			[signIn.target.name]: signIn.target.value
		});
	};

	onSubmit(signIn) {
		signIn.preventDefault();
		const userSignInDetails = {
			email: this.state.email,
			password: this.state.password
		}
		axios.post('/user/signin', userSignInDetails)
		  .then((response) =>{
				// const token = response.data.token;
				// const userToken = jwtDecode(token).userToken;
				// window.localStorage.setItem('token', token);
				console.log(response.data);
				// console.log(token);
				alert(response.data.message);
				browserHistory.push('/user/broadcastboard');
			})
			.catch((error) => {
				if (error.response) {
					console.log(error.response.data);
					alert(`User's Details ${error.response.data.message}.`);
				};
			});
		console.log(userSignInDetails);
	};


	render() {
		return (
			<div>
				<div className="navbar navbar-default" role="navigation">
					<div className="container">
						<div className="navbar-header">
							<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
								<span className="sr-only">Toggle navigation</span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<h1 className="navbar-brand">
                PostIt<small>App</small>
              </h1>
						</div>
						<div className="collapse navbar-collapse">
							<ul className="nav navbar-nav">
							</ul>
							<ul className="nav navbar-nav navbar-right">
								<li><Link to="/">Home</Link></li>
                <li><Link to="/user/broadcastboard">Chat Room</Link></li>
							</ul>
						</div>
					</div>
        </div>
				<div className="container">
					<div className="row">
						<div className="col-md-6 col-md-offset-3">
							<div className="row">
								<form className="col-md-6 col-md-offset-3" onSubmit={this.onSubmit}>
									<div className="form-group">
										<label htmlFor="email">Email</label>
										<input value={this.state.email} onChange={this.onChange}
											id="email" type="email"
											className="form-control" placeholder="johndoe@example.com"
											name="email" required />
									</div>
									<div className="form-group">
										<label htmlFor="password">Password</label>
										<input id="password" type="password"
											value={this.state.password} onChange={this.onChange}
											className="form-control" placeholder="*********"
											name="password" required />
									</div>
									<button type="submit" className="btn btn-success form-control" name="action">
										Sign in
									</button>
								</form>
							</div>
						</div>

					</div>
				</div>
			</div>
		);
	}
};




export default SignIn;