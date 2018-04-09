var kafka = require('kafka-node');
var Producer = kafka.Producer;
var Consumer = kafka.Consumer;

var config = require('config');

// designed to be a singleton
function KafkaClientService()
{
	if(KafkaClientService._instance)
	{
		return KafkaClientService._instance;
	}

	this.initialize();
	KafkaClientService._instance = this;
}

KafkaClientService._instance = null;


KafkaClientService.prototype.initialize = function()
{
    this.client = new kafka.Client("138.68.20.94:2181"),
    this.producer = new Producer(this.client);
    this.bindProducerListeners();
    
}

KafkaClientService.prototype.bindProducerListeners = function()
{
	this.producer.on('ready', function () {
	    console.log('Kafka Client: Producer is ready');
	});

	this.producer.on('error', function (err) {
	    console.log('Kafka Client: Producer is in error state');
	    console.log(err);
	});
}


KafkaClientService.prototype.sendMessage = function(topic, message, partition, callback)
{
	var payloads = [
        { topic: topic, messages: message , partition: partition }
    ];

    this.producer.send(payloads, function (err, data) {
    	if(err)
    	{
    		console.log("Kafka Client: Error sendMessage");
    		throw err;
    	}
    	callback(err, data);
    });
}

module.exports = new KafkaClientService();