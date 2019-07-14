var mongoose = require('mongoose');
var UserdataSchema= new mongoose.Schema({
	img: 
	{
		data: Buffer,
		type: String
	}
});
mongoose.model('uploadmodel', UserdataSchema,'upload');