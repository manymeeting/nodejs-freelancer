var kafkaClientService = require('../kafka/KafkaClientService');
var TOPIC_PREFIX = "queuing.";

function _send(req, res, next, additionalData)
{
	// e.g. "/users/profile/:id" -> users
	var serviceClass = req.path.substring(1).split("/")[0];
	var topic = TOPIC_PREFIX + serviceClass;

	var content = {
		method: "post",
		apiURL: req.originalUrl,
		topicRes: topic + ".response",
		params: Object.assign({}, req.body, additionalData)
	};
	console.log("kafkaClientService sending message:");
	console.log(content);
	kafkaClientService.sendMessage(topic, 0, content, function(sendErr, serviceRes){
		if(sendErr)
		{
			console.log(sendErr);
			res.status(404).send();
			return;
		}
		console.log(serviceRes);
		res.send(serviceRes);
	});
}
module.exports.sendPOST = function (req, res, next) {
	_send(req, res, next);
}
module.exports.sendPOSTWithFiles = function(fileParser) {
	return function(req, res, next){
		var files = fileParser(req);
		_send(req, res, next, files);
	};
}