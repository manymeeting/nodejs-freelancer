var kafkaClientService = require('../kafka/KafkaClientService');
var TOPIC = "queuing.users";
module.exports.msgGetUser = function (req, res, next) {

	var userID = req.params.id;
	var content = {
		method: "get",
		apiURL: req.path,
		topicRes: TOPIC + ".response"
	};
	kafkaClientService.sendMessage(TOPIC, 0, content, function(sendErr, serviceRes){
		if(sendErr)
		{
			console.log(sendErr);
			return;
		}
		console.log(serviceRes);
		res.send(serviceRes);
	});

}