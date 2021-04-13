using System;

namespace ConfirmationHandler
{
    class Program
    {
        static void Main(string[] args)
        {
            var messageQueue = new MessageQueue();

            messageQueue.Subscribe("confirmation", (confirmation) => 
            {
                Console.WriteLine($"Received confirmation for room: {confirmation.RoomId}");
            });
        }
    }
}
