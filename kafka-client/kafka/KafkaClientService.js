var kafka = require('kafka-node');
var Producer = kafka.Producer;
var Consumer = kafka.Consumer;

var config = require('config');
var crypto = require('crypto');

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
    this.requests = {}; // requests waiting for response
    this.consumerPool = {};
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
	var _kafkaClientService = this;
	var payloads = [
        { topic: topic, messages: message , partition: partition }
    ];
   
    var reqID = crypto.randomBytes(16).toString('hex');

    // setup timeout handler
    var timeout = setTimeOut(function(reqID){
    	callback(new Error("Kafka Client Service[TIMEOUT]: " + reqID));
    	delete _kafkaClientService.requests[reqID];
    }, TIMEOUT, reqID);

    this.requests[reqID] = {
    	callback: callback,
    	timeout: timeout
    };
    this._setResponseConsumer(topic);
    
    this.producer.send(payloads, function (err, data) {
    	if(err)
    	{
    		console.log("Kafka Client: Error sendMessage");
    		throw err;
    	}
    	callback(err, data);
    });
}

KafkaClientService.prototype._setResponseConsumer = function(topic)
{
	// reuse existing consumer on this topic
	if(this.consumerPool[topic])
	{
		return this.consumerPool[topic];
	}

	var consumer = new Consumer(this.client, [{ topic: topic, partition: 0, time: Date.now() }]);
	// register this consumer to pool
	this.consumerPool[topic] = consumer;
	consumer.on('message', function (message) {
        var result = JSON.parse(message.value);
        //get the reqID
        var reqID = result.reqID;
        //is it a response to a pending request
        if(reqID in self.requests){
            //retrieve the request entry
            var entry = self.requests[reqID];
            clearTimeout(entry.timeout);
            //delete the entry from request pool 
            delete self.requests[reqID];

            entry.callback(null, result.data);
        }
    });
	return consumer;
}


module.exports = new KafkaClientService();