var kafkaClientService = require('../kafka/KafkaClientService');
var TOPIC_PREFIX = "queuing."
module.exports.msg_get_user = function (req, res, next) {

	var result = {};
	var userID = req.query.id;
	
	// var topic = TOPIC_PREFIX + "users";
	var topic = "mytest";
	var content = {
		method: "get",
		serviceAPI: "api_get_user",
		topicRes: "mytest.response",
		params: {
			id: userID
		}
	};
	kafkaClientService.sendMessage(topic, 0, content, function(sendErr, sendRes){
		if(sendErr)
		{
			throw sendErr;
		}
		console.log(sendRes);
		res.send(sendRes);
	});

}