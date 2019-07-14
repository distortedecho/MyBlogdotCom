angular.module('users').factory('usersdatafactory', usersdatafactory);
function usersdatafactory($http){
	return{
		userlist : userlist,
		postReview: postReview,
		postBlog : postBlog,
		postimg : postimg,
		blogList : blogList
	};
	function userlist(){
		return $http.get('/csiakgec/show').then(complete).catch(failed);
	}
	function blogList(){
		return $http.get('/csiakgec/getBlog').then(complete).catch(failed);
	}
	function postReview(Signup){
        return $http.post('/csiakgec/add', Signup).then(complete).catch(failed);
	}
	function postBlog(data){
	return $http.post('/csiakgec/postblog', data).then(complete).catch(failed);	
	} 
	function postimg(){
	return $http.post('/csiakgec/uploadimg').then(complete).catch(failed);	
	} 
	function complete(response){
		return response;
	}
	function failed(error){
		console.log(error);
	}
}