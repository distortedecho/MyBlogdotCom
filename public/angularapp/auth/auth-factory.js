angular.module('users').factory('authfactory', authfactory);
function authfactory() {
	return{
		auth:auth
	};
	var auth={
		isLoggedin: false
	};
}