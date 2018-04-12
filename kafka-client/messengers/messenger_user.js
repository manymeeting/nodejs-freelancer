var kafkaClientService = require('../kafka/KafkaClientService');
var TOPIC = "queuing.users";
module.exports.msg_get_user = function (req, res, next) {

	var result = {};
	var userID = req.query.id;
	
	var content = {
		method: "get",
		serviceAPI: "api_get_user",
		topicRes: TOPIC + ".response",
		params: {
			id: userID
		}
	};
	kafkaClientService.sendMessage(TOPIC, 0, content, function(sendErr, sendRes){
		if(sendErr)
		{
			console.log(sendErr);
			return;
		}
		console.log(sendRes);
		res.send(sendRes);
	});

}