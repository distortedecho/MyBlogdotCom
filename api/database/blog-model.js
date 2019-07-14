var mongoose = require('mongoose');
var UserdataSchema= new mongoose.Schema({
	text: 
	{
		type: String,
		required: true
	},
	Username:{
		type: String,
		required: false
	}
});
mongoose.model('blogmodel', UserdataSchema,'blog');