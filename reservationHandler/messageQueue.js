const amqp = require("amqplib/callback_api");

function sendMessage(payload, queueName) {
  amqp.connect("amqp://rabbitmq", (err0, conn) => {
    if (err0) throw err0;

    conn.createChannel((err1, channel) => {
      if (err1) throw err1;

      const payloadJson = JSON.stringify(payload);

      channel.assertQueue(queueName, { durable: false });
      channel.sendToQueue(queueName, Buffer.from(payloadJson));

      console.log(`Sent message: ${payloadJson}`);
    });
  });
}

function subscribe(queueName, onMessage) {
  amqp.connect("amqp://rabbitmq", (err0, conn) => {
    if (err0) throw err0;

    conn.createChannel((err1, channel) => {
      if (err1) throw err1;

      channel.assertQueue(queueName, { durable: false });

      channel.consume(queueName, (msg) => {
        onMessage(msg);
      });
    });
  });
}

module.exports = {
  sendMessage,
  subscribe,
};
