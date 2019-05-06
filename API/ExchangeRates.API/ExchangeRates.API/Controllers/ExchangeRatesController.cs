using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ExchangeRates.Service.Interfaces;
using ExchangeRates.Service.Dtos;
using Microsoft.Extensions.Caching.Memory;

namespace ExchangeRates.API.Controllers
{
    public class ExchangeRatesController : Controller
    {
        private IMemoryCache _cache;
        private readonly IExchangeRatesService _exchangeRatesService;
        
        public ExchangeRatesController(IExchangeRatesService exchangeRatesService, IMemoryCache memoryCache)
        {
            _cache = memoryCache;
            _exchangeRatesService = exchangeRatesService ?? throw new ArgumentNullException(nameof(exchangeRatesService));
        }

        /// <summary>
        /// Gets Exchange Rate Changes for specified date
        /// </summary>
        [Route("exchange-rates")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExchangeRateChangeDto>>> GetExchangeRateChangesAsync(string date)
        {
            DateTime result;

            if(DateTime.TryParse(date, out result))
            {
                if(result.Year > 2014)
                {
                    return BadRequest();
                }
            } else
            {
                return BadRequest();
            }

            var id = $"{result.Year}_{result.Month}_{result.Day}";

            if (_cache.TryGetValue<IEnumerable<ExchangeRateChangeDto>>($"date_{id}", out IEnumerable<ExchangeRateChangeDto> exchangeRates))
            {
                return Ok(exchangeRates);
            }

            var exchangeRateChanges = await _exchangeRatesService.GetExchangeRateChangeAsync(date);

            var cacheOptions = new MemoryCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromMinutes(5));

            _cache.Set<IEnumerable<ExchangeRateChangeDto>>($"date_{id}", exchangeRateChanges, cacheOptions);

            return Ok(exchangeRateChanges);
        }
    }
}