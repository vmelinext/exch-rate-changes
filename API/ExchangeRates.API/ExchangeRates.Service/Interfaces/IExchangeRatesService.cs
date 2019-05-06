using ExchangeRates.Service.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ExchangeRates.Service.Interfaces
{
    public interface IExchangeRatesService
    {
        Task<IEnumerable<ExchangeRateChangeDto>> GetExchangeRateChangeAsync(string date);
    }
}
