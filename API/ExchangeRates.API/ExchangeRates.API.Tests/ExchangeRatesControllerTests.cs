using ExchangeRates.API.Controllers;
using ExchangeRates.Service.Dtos;
using ExchangeRates.Service.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Moq;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Xunit;

namespace ExchangeRates.API.Tests
{
    public class ExchangeRatesControllerTests
    {
        private readonly Mock<IExchangeRatesService> _exchangeRatesServiceMock;
        private readonly Mock<IMemoryCache> _cacheMock;
        private readonly ExchangeRatesController _controller;
        public ExchangeRatesControllerTests()
        {
            _cacheMock = new Mock<IMemoryCache>();
            _exchangeRatesServiceMock = new Mock<IExchangeRatesService>();
            _controller = new ExchangeRatesController(_exchangeRatesServiceMock.Object, _cacheMock.Object);
        }
        [Fact]
        public void CreateController_GivenNullService_ThrowsArgumentNullException()
        {
            Assert.Throws<ArgumentNullException>(() => new ExchangeRatesController(null, null));
        }

        [Fact]
        public async Task GetExchangeRateChangesAsync_GivenInvalidString_ReturnsBadRequest()
        {
            var response = await _controller.GetExchangeRateChangesAsync("not a date");

            Assert.IsType<BadRequestResult>(response.Result);
        }

        [Fact]
        public async Task GetExchangeRateChangesAsync_GivenValidString_ReturnsExchangeRates()
        {
            var exchangeRateChanges = new List<ExchangeRateChangeDto>
            {
                new ExchangeRateChangeDto
                {
                    Date = DateTime.Parse("2014-01-01"),
                    Currency = "USD",
                    Change = 1
                }
            };

            object expectedValue;
            var cacheEntry = Mock.Of<ICacheEntry>();
            _cacheMock.Setup(m => m.CreateEntry(It.IsAny<object>())).Returns(cacheEntry);
            _cacheMock.Setup(x => x.TryGetValue(It.IsAny<object>(), out expectedValue)).Returns(false);
            _exchangeRatesServiceMock.Setup(x => x.GetExchangeRateChangeAsync(It.IsAny<string>())).ReturnsAsync(exchangeRateChanges);

            var response = await _controller.GetExchangeRateChangesAsync("2014-01-01");
            var result = response.Result as OkObjectResult;

            Assert.Single(result.Value as IEnumerable<ExchangeRateChangeDto>);
            Assert.IsType<OkObjectResult>(result);
        }
    }
}
