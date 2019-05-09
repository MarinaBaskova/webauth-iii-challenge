import React from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Users from './components/Users';
import './App.css';

function App(props) {
	return (
		<div className="App">
			<header>
				<NavLink to="/login">Login</NavLink>
				&nbsp;|&nbsp;
				<NavLink to="/register">Register</NavLink>
				&nbsp;|&nbsp;
				<NavLink to="/users">Users</NavLink>
			</header>
			<Route path="/login" component={Login} />
			<Route path="/register" component={Register} />
			<Route path="/users" render={(props) => <Users {...props} />} />
		</div>
	);
}

export default withRouter(App);
