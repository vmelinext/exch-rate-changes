using System;
using System.Collections.Generic;
using System.Text;

namespace ExchangeRates.Service.Models
{
    public class ExchangeRate
    {
        public DateTime Date { get; set; }

        public string Currency { get; set; }

        public int Quantity { get; set; }

        public decimal Rate { get; set; }

        public string Unit { get; set; }
    }
}
