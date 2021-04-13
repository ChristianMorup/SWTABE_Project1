using System;
using System.Text;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace ConfirmationHandler
{
    public class MessageQueue
    {
        private ConnectionFactory _connectionFactory = new ConnectionFactory() { HostName = "rabbitmq", Port = 5672, UserName = "guest", Password = "guest" };
        private IConnection _connection;

        public void Subscribe(string queueName, Action<BookingConfirmation> onMessage)
        {
            using var connection = _connectionFactory.CreateConnection();

            using var channel = connection.CreateModel();

            channel.QueueDeclare(queue: queueName, durable: false, exclusive: false, autoDelete: false, arguments: null);

            var consumer = new EventingBasicConsumer(channel);

            consumer.Received += (model, eventArgs) => 
            {
                var body = eventArgs.Body.ToArray();
                var bodyString = Encoding.UTF8.GetString(body);

                var bookingConfirmation = JsonConvert.DeserializeObject<BookingConfirmation>(bodyString);
                Console.WriteLine($"Received: {bookingConfirmation.RoomId}");
                onMessage(bookingConfirmation);
            };

            channel.BasicConsume(queue: queueName, autoAck: true, consumer: consumer);
        }
    }

    public class BookingConfirmation
    {
        public string HotelName { get; set; }
        public string RoomId { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string User { get; set; }
    }
}