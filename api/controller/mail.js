const nodemailer= require('nodemailer');
const mailGun= require('nodemailer-mailgun-transport');


const auth={
	auth: {
		api_key:'a5f7f54adbf57d3212eb2ed851ab39f5-29b7488f-41495100',
		domain:'sandbox7c51fc555fc3405887b21d48013b83d7.mailgun.org'
	}
};

const transporter =nodemailer.createTransport(mailGun(auth));

const sendMail=(email,subject,text,cb)=>{
const mailOptions={
	from: email,
	to: 'arathi481@gmail.com',
	subject: subject,
	text: text
};
transporter.sendMail(mailOptions,function(err,data){
	if(err){
		cb(err,null);
	}else{
		cb(null,data);
	}
});
}
module.exports=sendMail;