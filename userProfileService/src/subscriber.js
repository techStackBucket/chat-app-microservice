require("rootpath")();
const path = require('path');
require('dotenv').config({path : path.resolve(__dirname , '.env')});
const userService = require('./users/user.service');

module.exports = subscribe

function subscribe(){
    var amqp = require('amqplib/callback_api');
    var rabbitUri = process.env.RABBIT_MQ_URI;
    amqp.connect(rabbitUri, function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
    
            var queue = process.env.QUEUE_NAME;
    
            channel.assertQueue(queue, {
                durable: true
            });
    
            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
    
            channel.consume(queue, async function(msg) {
                console.log(" [x] Received %s", msg.content.toString());
                //var result = await userService.create();
            }, {
                noAck: true
            });
        });
    });
}