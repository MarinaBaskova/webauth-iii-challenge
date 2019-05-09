import React from 'react';
import axios from 'axios';

import checkAuth from '../components/auth/CheckAuth';

class Users extends React.Component {
	state = {
		users: [],
		loggedIn: false
	};

	componentDidMount() {
		const endpoint = 'http://localhost:8000/api/users';
		axios
			.get(endpoint)
			.then((res) => {
				this.setState({ users: res.data, loggedIn: true });
			})
			.catch((err) => console.error(err));
	}

	logOut = (e) => {
		e.preventDefault();
		localStorage.removeItem('jwt');
		this.setState({ loggedIn: false });
		this.props.history.push('/login');
		// window.location.pathname = '/login';
	};

	render() {
		return (
			<div className="users">
				<button onClick={this.logOut}>Log out</button>
				<h2>Our Users</h2>
				<ul>{this.state.users.map((u) => <li key={u.id}>{u.username}</li>)}</ul>
			</div>
		);
	}
}

export default checkAuth(Users);
