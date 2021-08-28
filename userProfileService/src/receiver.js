var amqp = require('amqplib/callback_api');

amqp.connect('amqps://ufjdhmvw:p_Y145oYRyVTfWwEDImJhPfN0cuO1sXT@cow.rmq2.cloudamqp.com/ufjdhmvw', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'userProfileService-register';

        channel.assertQueue(queue, {
            durable: true
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});