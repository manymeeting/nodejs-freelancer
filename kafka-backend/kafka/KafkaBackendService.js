var kafka = require('kafka-node');
var config = require('config');
var Producer = kafka.Producer;
var Consumer = kafka.Consumer;

// var config = require('config');

// designed to be a singleton
function KafkaBackendService()
{
	if(KafkaBackendService._instance)
	{
		return KafkaBackendService._instance;
	}

	this.initialize();
	KafkaBackendService._instance = this;
}

KafkaBackendService._instance = null;
KafkaBackendService.ADDR = config.kafka.addr;

KafkaBackendService.prototype.initialize = function()
{
    this.consumerPool = {};

    // only keep a producer not a client since we need a new client instance for each consumer
    this.producer = new Producer(this.getClient()); 
    this.producer.on("ready", function() {
    	console.log('Kafka Backend: Producer is ready');
    });

    this.producer.on("error", function(err) {
    	console.log('Kafka Backend: Producer is in error state');
	    console.log(err);
    });
    
}

KafkaBackendService.prototype.getOffset = function()
{
	return new kafka.Offset(this.getClient());;
}

KafkaBackendService.prototype.getConsumer = function(topic, partition = 0, offset = 0)
{
	// reuse existing consumer on this topic
	if(this.consumerPool[topic])
	{
		return this.consumerPool[topic];
	}

	var consumer = new Consumer(this.getClient(), [{ topic: topic, partition: partition, offset: offset }], {fromOffset: true});
	// register this consumer to pool
	this.consumerPool[topic] = consumer;
	return consumer;
}


KafkaBackendService.prototype.sendMessage = function(topic, partition, content )
{	
	var payloads = [
        { 
        	topic: topic,
        	partition: partition,
        	messages: JSON.stringify(content)
        }
    ];
    console.log("KafkaBackendService sending messages:");
    console.log(payloads);
    this.producer.send(payloads, function (err, data) {
    	if(err)
    	{
    		console.log("Kafka Backend: Error sendMessage");
    		throw err;
    	}
    });
}

KafkaBackendService.prototype.getClient = function()
{
    return new kafka.Client(KafkaBackendService.ADDR);
}


module.exports = new KafkaBackendService();