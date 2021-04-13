using System;
using System.Text;
using Newtonsoft.Json;
using RabbitMQ.Client;

namespace BookingSender
{
    public class MessageQueue
    {
        private ConnectionFactory _connectionFactory = new ConnectionFactory() { HostName = "rabbitmq", Port = 5672, UserName = "guest", Password = "guest" };
        private IConnection _connection;
        public void Publish(Booking booking) 
        {
            using var connection = _connectionFactory.CreateConnection();

            using var channel = connection.CreateModel();

            channel.QueueDeclare(queue: "bookings", durable: false, exclusive: false, autoDelete: false, arguments: null);

            var bookingSerialized = JsonConvert.SerializeObject(booking);

            var message = Encoding.UTF8.GetBytes(bookingSerialized);

            channel.BasicPublish(exchange: "", routingKey: "bookings", basicProperties: null, body: message);

            Console.WriteLine($"Sent booking for room: {booking.RoomId}");
        }
    }

    public class Booking 
    {
        public string HotelName { get; set; }
        public string RoomId { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string User { get; set; }
    }
}