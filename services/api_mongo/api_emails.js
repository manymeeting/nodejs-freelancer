const nodemailer = require('nodemailer');
const config = require('config');
var mongoUtil = require("../utils/mongoDBUtil");
var ObjectId = require('mongodb').ObjectId; 

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email.address,
    pass: config.email.password
  }
});

module.exports.sendBidHiredEmail = function(req, res, next) {
	var userID = req.body.bidderID;
	mongoUtil.getMongoConn(function(db) {
		var coll = db.collection('users');
		coll.findOne({"_id": ObjectId(userID)}, function(err, user) {
			if(err)
			{
				throw err;
			}
			console.log(user);

			var toAddr = user.user_email;
			var projectName = req.body.projectName;
			var mailOptions = {
				from: config.email.address,
				to: toAddr,
				subject: 'Congrats! Your Have Been Hired',
				text: 'We look forward to seeing your product!'
			};

			transporter.sendMail(mailOptions, function(error, info){
				if (error) {
					console.log(error);
					res.type('json');
					res.status(400).send({error: "Error Sending Email"});
				} else {
					console.log('Email sent: ' + info.response);
					res.type('json');
					res.status(201).send({msg: info.response});
				}
			});
		});
	});

	
}


