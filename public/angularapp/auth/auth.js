angular.module('users').factory('authinterceptor', authinterceptor);
function authinterceptor($q,$location,$window,authfactory) {
	return{
		request:request,
		response:response,
		responseError:responseError
	};
	function request(config){
     config.headers= config.headers || {};
     if ($window.sessionStorage.token) {
       config.headers.Authorization='Bearer'+$window.sessionStorage.token;
     }
     return config;
	}
	function response(response){
      if(response.status===200 && $window.sessionStorage.token && !authfactory.isLoggedin){
      	authfactory.isLoggedin=true;
      }if(response.status===401){
      	authfactory.isLoggedin=false;
      }return response||$q.when(response);
	}
	function responseError(rejection){
     if(rejection.status===401 || rejection.status===403){
     	delete $window.sessionStorage.token;
     	authfactory.isLoggedin=false;
     	$location.path('/');
     }
	return $q.reject(rejection);
	}
}