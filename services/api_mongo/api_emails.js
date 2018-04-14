const nodemailer = require('nodemailer');
const config = require('config');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email.address,
    pass: config.email.password
  }
});

module.exports.sendBidHiredEmail = function(req, res, next) {

	var toAddr = req.body.toAddr;
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
		} else {
			console.log('Email sent: ' + info.response);
			res.status(201).send(info.response);
		}
	});
}


