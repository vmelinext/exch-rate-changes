using ExchangeRates.Service.Dtos;
using ExchangeRates.Service.Interfaces;
using ExchangeRates.Service.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Serialization;

namespace ExchangeRates.Service.Services
{
    public class ExchangeRatesService : IExchangeRatesService
    {
        private readonly string _exchangeRateApiUrl;

        public ExchangeRatesService(IConfiguration configuration)
        {
            _exchangeRateApiUrl = configuration.GetSection("ApiUrls:ExchangeRateApiUrl").Value;
        }
        public async Task<IEnumerable<ExchangeRateChangeDto>> GetExchangeRateChangeAsync(string date)
        {
            var selected = await GetExchangeRateAsync(date);

            var previousDay = selected.First().Date.AddDays(-1);

            var previousDateString = $"{previousDay.Year}-{previousDay.Month}-{previousDay.Day}";

            var previous = await GetExchangeRateAsync(previousDateString);

            return selected.Select(curr => new ExchangeRateChangeDto
            {
                Currency = curr.Currency,
                Date = curr.Date,
                Change = (curr.Rate / previous.First(prev => prev.Currency == curr.Currency).Rate - 1) * 100
            }).OrderByDescending(x => x.Change);
        }

        private async Task<IEnumerable<ExchangeRate>> GetExchangeRateAsync(string date)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/x-www-form-urlencoded"));

                var response = await client.GetAsync($"{_exchangeRateApiUrl}/ExchangeRates/ExchangeRates.asmx/getExchangeRatesByDate?Date={date}");

                XDocument doc =  XDocument.Parse(await response.Content.ReadAsStringAsync());

                var exchangeRates = doc.Root.Elements("item")
                    .Select(el => new ExchangeRate
                    {
                        Date = DateTime.Parse(el.Element("date").Value),
                        Currency = el.Element("currency").Value,
                        Quantity = Int32.Parse(el.Element("quantity").Value),
                        Rate = Decimal.Parse(el.Element("rate").Value),
                        Unit = el.Element("unit").Value
                    });

                var check = exchangeRates.FirstOrDefault();

                if (!response.IsSuccessStatusCode)
                {
                    throw new InvalidOperationException($"Unable to get Exchange Rate details for {date}. StatusCode: {response.StatusCode}, reasonPhrase: {response.ReasonPhrase}");
                }

                return exchangeRates;
            }
        }
    }
}
