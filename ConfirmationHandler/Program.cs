using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace ConfirmationHandler
{
    class Program
    {
        static void Main(string[] args)
        {            
            var connectionFactory = new ConnectionFactory() { HostName = "rabbitmq", Port = 5672, UserName = "guest", Password = "guest" };

            using (var connection = connectionFactory.CreateConnection())
            {
                using (var channel = connection.CreateModel())
                {            
                    channel.QueueDeclare(queue: "confirmation", durable: false, exclusive: false, autoDelete: false, arguments: null);

                    var consumer = new EventingBasicConsumer(channel);

                    consumer.Received += (model, eventArgs) => 
                    {
                        var body = eventArgs.Body.ToArray();
                        var bodyString = Encoding.UTF8.GetString(body);

                        var bookingConfirmation = JsonConvert.DeserializeObject<BookingConfirmation>(bodyString);
                        Console.WriteLine($"Received: {bookingConfirmation.RoomId}");
                    };

                    channel.BasicConsume(queue: "confirmation", autoAck: true, consumer: consumer);
                    
                    Console.ReadLine();
                }
            }
        }
    }
}
