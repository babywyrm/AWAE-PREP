using System;

namespace dotnetapp
{
	class Program
	{
		static void Main(string[] args)
		{
			Console.WriteLine("What is your favourite web app language?");
			String answer = Console.ReadLine();
			Console.WriteLine("Your answer was: " + answer + "\r\n");
		}
	}
}
