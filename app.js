require('./api/database/db.js');
var express = require('express');
var app= express();
var path= require('path');
var bodyParser =require('body-parser');
var routes= require('./api/route');

app.set('port',3000);
app.use(function(req,res,next){
	console.log(req.method,req.url);
	next();
});
    app.use(express.static(path.join(__dirname,'public')));
	app.use('/node_modules', express.static(__dirname +'/node_modules'));
	app.use(bodyParser.urlencoded({extended: false,limit:'50mb', parameterLimit:100000}));
	app.use(bodyParser.json({limit:'50mb',Type:'application/json'}));
	app.use('/csiakgec',routes);

var server = app.listen(app.get('port'), function(){
	var port= server.address().port;
	console.log("Magic happens on port"+ port);
});