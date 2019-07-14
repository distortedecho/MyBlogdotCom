angular.module('users').controller('loginController',loginController);
function loginController($http,$location,$window,authfactory,jwtHelper,$scope, usersdatafactory,$route,multipartForm) {
	 var vm=this;
	vm.isLoggedin=function(){
		if (authfactory.isLoggedin){
			return true;
		}else{
			return false;
		}
	};
	vm.login=function(){
		if(vm.Username && vm.Password){
			var user={
				Username:vm.Username,
				Password:vm.Password
			};
		$http.post('/csiakgec/login',user).then(function(response){
			if(response.data.success){
				$window.sessionStorage.token=response.data.token;
				authfactory.isLoggedin=true;
				var token=$window.sessionStorage.token;
				var decodedToken=jwtHelper.decodeToken(token);
				vm.loggedInUser= decodedToken.Username;
			}
		}).catch(function(error){
			console.log(error);
		})
		}
	}
vm.logout=function(){
	authfactory.isLoggedin=false;
	delete $window.sessionStorage.token;
	$location.path('/');
}
vm.addBlog= function(){
	var token=$window.sessionStorage.token;
	var decodedToken=jwtHelper.decodeToken(token);
	var loggedInUser= decodedToken.Username;
    	var postData= {
    		text: vm.text,
    		Username: loggedInUser
    	};
    	 if(vm.blogForm.$valid){
    		usersdatafactory.postBlog(postData).then(function(response){
                 if(response.status===200){
                 	$route.reload();
                 }
    		}).catch(function(error){
    			console.log(error);
    		});
    	   }
    	   else{
    			vm.isSubmitted=true;
    			console.log('isSubmitted is true');
    		}
    	};
    function showImage()
    {
    	if(this.files && this.files[0])
    	{
    		var obj = new FileReader();
    		obj.onload=function(data){
    			var image =document.getElementById('image');
    			image.src=data.target.result;
    			image.style.display="block";
    		}
    	}obj.readAsDataURL(this.files[0]);
    }
}