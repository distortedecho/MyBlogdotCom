var express= require('express');
var router= express.Router();
var multer= require('multer');
var mongoose= require('mongoose');
var crypto=require('crypto');
var mime=require('mime');
var ctrlregister= require('../controller/registercontroller.js');
var uploadschema=mongoose.model('uploadmodel');
router
 .route('/show')
 .get(ctrlregister.authenticate, ctrlregister.addOne)
 .put(ctrlregister.addOneupdate);

 router
 .route('/add')
 .post(ctrlregister.newAddone);
 router
 .route('/post')
 .post(ctrlregister.postform);
router
.route('/login')
.post(ctrlregister.login);
router
.route('/postblog')
.post(ctrlregister.blogpost);
router
.route('/getBlog')
.get(ctrlregister.showblog);
module.exports=router;
