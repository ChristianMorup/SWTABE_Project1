using System;
using System.Text;
using System.Threading;
using RabbitMQ.Client;

namespace BookingSender
{
    class Program
    {
        static void Main(string[] args)
        {          
            var messageQueue = new MessageQueue();

            while (true)
            {
                Thread.Sleep(10000);

                var booking = new Booking
                {
                    RoomId = "room1",
                    HotelName = "hotel1",
                    Start = DateTime.Now,
                    End = DateTime.Now.AddDays(7),
                    User = "admin"
                };

                messageQueue.Publish(booking);
            }
        }
    }
}
