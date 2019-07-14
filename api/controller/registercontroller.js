var mongoose= require('mongoose');
var wolfmodel = mongoose.model('nyxwolfmodel');
var blogmodel=mongoose.model('blogmodel');
var registrationsdatajson= require('../database/userdata.json');
var bcrypt=require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var multer= require('multer');
const sendMail =require('./mail.js');
module.exports.addOne= function(req,res){ 
	wolfmodel
	 .find()
	
	 //.skip(offset)
	 //.limit(count)
	 .exec(function(err,doc){
	 	console.log("Found data",doc.length);
	 	res
	 	.json(doc);
	 });
	};
	 module.exports.newAddone=function(req,res){
         var Password= req.body.Password;
         wolfmodel
		.create({
			Firstname: req.body.Firstname,
			Lastname:req.body.Lastname,
			Email:req.body.Email,
			Age:parseInt(req.body.Age),
			Username:req.body.Username,
		    Password:bcrypt.hashSync(Password,bcrypt.genSaltSync(10))
		}, function(err,wolfmodel){
			if(err){
				console.log('Error creating data');
				res
				.status(400)
				.json(err);
			}else{
				console.log("data created",wolfmodel);
				res
				.status(200)
				.json(wolfmodel);
			 }
			})
	};
	module.exports.addOneupdate=function(req,res){
	 wolfmodel
	 .find()
	 .exec(function(err,doc){
	 	var response ={
	 		status:200,
	 		message: doc
	 	};
	 	if(err){
	 		console.log("Error finding data");
	 		response.status=500;
	 		response.message=err;
	 	}else if (!doc) {
	 		response.status=404;
	 		response.message={
	 			"message":"data not found"
	 		};
	 	}
	 	if(response.status!==200){
	 		res
	 		.status(response.status)
	 		.json(response.message);
	 	}else{
	 		doc.name=req.body.name;
	 		doc.status=req.body.status;
	 	}
	 });
	}
	module.exports.postform=function(req,res){
		const {subject, email, text}=req.body;
		console.log(req.body);
		sendMail(email,subject,text, function(err,data){
			if(err){
				res
				.status(500).json({message:'Internal error'});
			}else{
				console.log('this has been sent  by user!');
			}
		});
	};
	module.exports.login=function(req,res){
	console.log('Logging in user');
	var Username= req.body.Username;
	var Password= req.body.Password;

	wolfmodel.findOne({
		Username: Username
	}).exec(function(err,wolfmodel){
		if(err)
		{
			console.log(err);
			res.status(400).json(err);
		}
		else
		{
			if(bcrypt.compareSync(Password,wolfmodel.Password))
			{
				console.log('User found', wolfmodel);
				var token =jwt.sign({ Username: wolfmodel.Username},'s3cr3t',{expiresIn: 3600});
				res.status(200).json({success: true,token : token});
			}
			else
			{
				res.status(401).json('Unauthorized');
			}
		}
	})
};
module.exports.authenticate=function(req,res,next){
var headerExists =req.headers.authorization;
if(headerExists){
	var token= req.headers.authorization.split(' ')[1];
	jwt.verify(token, 's3cr3t', function(error,decoded){
		if(error){
			console.log(error);
			res.status(401).json("Unauthorized");
		}else{
           req.wolfmodel= decode.Username; //decoded
			next();
		}
	});
}else{
	res.status(403).json('No token provided');
}
};
module.exports.blogpost=function(req,res){
         blogmodel
		.create({
			text: req.body.text,
			Username: req.body.Username
		}, function(err,blogmodel){
			if(err){
				console.log('Error creating data');
				res
				.status(400)
				.json(err);
			}else{
				console.log("data created",blogmodel);
				res
				.status(200)
				.json(blogmodel);
			 }
			})
	};
	module.exports.showblog= function(req,res){ 
	blogmodel
	 .find()
	 .exec(function(err,doc){
	 	console.log("Found data",doc.length);
	 	res
	 	.json(doc);
	 });
	};

	/*module.exports.uploadimage=function(req,res){
        multer(multerConf).single('img');
		if(req.file){
		console.log(req.file);
		req.body.img=req.file.filename;
	}else{
		console.log('errorbro');
	}
	const upload= new uploadschema(req.body).save();
	 res
	.status(204)
	.redirect('/#/login');
	};*/