var kafkaClientService = require('../kafka/KafkaClientService');
var TOPIC_PREFIX = "queuing."
module.exports.msg_get_user = function (req, res, next) {

	var result = {};
	var userID = req.query.id;
	
	// var topic = TOPIC_PREFIX + "users";
	var topic = "mytest";
	var message = JSON.stringify({
		method: "get",
		serviceAPI: "api_get_user",
		params: {
			id: userID
		}
	})
	kafkaClientService.sendMessage(topic, message, 0, function(sendErr, sendRes){
		if(sendErr)
		{
			throw sendErr;
		}
		console.log(sendRes);
		res.send("Messge Sent");
	})

}