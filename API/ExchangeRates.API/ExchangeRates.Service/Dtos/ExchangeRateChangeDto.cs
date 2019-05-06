using System;
using System.Collections.Generic;
using System.Text;

namespace ExchangeRates.Service.Dtos
{
    public class ExchangeRateChangeDto
    {
        public DateTime Date { get; set; }

        public string Currency { get; set; }

        public decimal Change { get; set; }
    }
}
