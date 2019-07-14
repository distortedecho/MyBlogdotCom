angular.module('users').controller('usersController', usersController);
 function usersController(usersdatafactory){
 	var vm=this;
 	vm.title='NYXWOLF BASIC USER PORTAL';
 	/*vm.isSubmitted=false;
    usersdatafactory.userlist().then(function(response) {
    	vm.users = response.data;})*/ 
   var myIndex=0;
   carousel();
   function carousel(){
   console.log("working");
    var i;
    var x= document.getElementsByClassName("display");
    
    for (i = 0; i < x.length; i++)
    {
        x[i].style.display="none";
    }
    myIndex++;
    if (myIndex > x.length)
    {
        myIndex = 1
    }
      x[myIndex-1].style.display= "block";
    setTimeout(carousel, 3000);
  };

 queryfunction= function(){
$('form').on('submit', (e)=>{
		e.preventDefault();
		const email=$('#email').val().trim();
		const subject=$('#subject').val().trim();
		const text=$('#text').val().trim();
		const data={
			email,
			subject,
			text
		};
		$.post('/csiakgec/post', data,function(){
			console.log('server recieved our data');
		});
	});;
}
jsfun=function(){
	document.getElementsById('buttonid').disbaled=true;
};
usersdatafactory.blogList().then(function(response) {
    vm.blogs = response.data;})
}