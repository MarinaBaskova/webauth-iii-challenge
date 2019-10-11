import React from 'react';
import axios from 'axios';

axios.interceptors.request.use(
	function(requestConfig) {
		requestConfig.headers.authorization = localStorage.getItem('jwt');

		return requestConfig;
	},
	function(error) {
		return Promise.reject(error);
	}
);

export default function(Component) {
	return class Authenticated extends React.Component {
		render() {
			const token = localStorage.getItem('jwt');
			const notLoggedIn = <h3>Please login to see the users</h3>;

			return <div>{token ? <Component {...this.props} /> : notLoggedIn}</div>;
		}
	};
}

/*// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  We can intercept the request or response at some given point of time
   like while sending a request or while receiving the response object.
    Axios also allows us to add functions called interceptors.
    Like transforms, these interceptor functions can be attached 
    to fire when a request is made, or when a response is received.
    Interceptors receive the full request config or response object.
    When creating interceptors, you can also choose to provide an error handler function
     that allows you to catch any errors and deal with them appropriately.

Request interceptors can be used to do things such as retrieve a token 
from local storage and send with all requests, 
while a response interceptor could be used to catch 401 responses and 
redirect to a login page for authorization.
*/
