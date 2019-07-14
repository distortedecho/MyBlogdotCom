angular.module('users', ['ngRoute','angular-jwt']).config(config).run(run);
 function config($routeProvider,$locationProvider,$httpProvider){
$httpProvider.interceptors.push('authinterceptor');	
$locationProvider.hashPrefix('');
 $routeProvider
 	.when('/', {
 		templateUrl: 'angularapp/userslist/users.html',
 		controller: 'usersController',
 		controllerAs:'vm',
 		access:{
 			restricted:false
 		}
 	})
 	.when('/Signup', {
 		templateUrl: 'angularapp/userslist/Signup.html',
 		controller: 'usersdetailController',
 		controllerAs:'vm',
 		access:{
 			restricted:false
 		}
 	})
 	.when('/login', {
 		templateUrl: 'angularapp/login/login.html',
 		controller: 'loginController',
 		controllerAs:'vm',
 		access:{
 			restricted:false
 		}
 	})
 	.when('/Feed', {
 		templateUrl: 'angularapp/feed/feed.html',
 		controller: 'FeedController',
 		controllerAs:'vm',
 		access:{
 			restricted:true
 		}
 	})
 	.when('/profile', {
 		templateUrl: 'angularapp/login/profile.html',
 		controllerAs:'vm',
 		access:{
 			restricted:true
 		}
 	});
}
function run($rootScope, $location, $window,authfactory){
	$rootScope.$on('$routeChangeStart',function(event,nextRoute, currentRoute){
		if(nextRoute.access !==undefined && nextRoute.access.restricted && !window.sessionStorage.token&& !authfactory.isLoggedin){
			event.preventDefault();
			$location.path('/');
		}
	})
}