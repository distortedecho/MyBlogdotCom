angular.module('users').controller('usersdetailController', usersdetailController);
 function usersdetailController($route, $routeParams,usersdatafactory){
 	var vm=this;
 	vm.title='NYXWOLF BASIC USER PORTAL';
 	//vm.isSubmitted=false;
      vm.addReview= function(){
    	var postData= {
    		Firstname: vm.Firstname,
    		Lastname: vm.Lastname,
    		Email: vm.Email,
    		Password:vm.Password,
    		Age:vm.Age,
    		Username:vm.Username
    	};
    	 if(vm.myform.$valid){
    		usersdatafactory.postReview(postData).then(function(response){
                 if(response.status==200){
                 	vm.message="Registration successful, please login!";
                  /*$route.reload();*/
                 	
                 }
    		}).catch(function(error){
    			console.log(error);
    		});
    	   }
    	   else{
    			//vm.isSubmitted=true;
    			console.log('isSubmitted is true');
    		}
    	};
 }