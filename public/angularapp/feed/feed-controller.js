angular.module('users').controller('FeedController',FeedController);
function FeedController(usersdatafactory) {
	var vm=this;
	usersdatafactory.blogList().then(function(response) {
    vm.blogs = response.data;})
}