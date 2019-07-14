var mongoose = require('mongoose');
var UserdataSchema= new mongoose.Schema({
	Firstname: 
	{
		type: String,
		required: true
	},
	Lastname:{
		type: String,
		required: true
	},
	Email:{
		type:String,
		unique:true,
		required:true
	},
	Password:{
		type:String,
		required:true
	},
	Username:{
		type:String,
		required:true,
		unique:true
	},
	Age:{
		type:Number,
		required:true
	}
});
mongoose.model('nyxwolfmodel', UserdataSchema,'users');