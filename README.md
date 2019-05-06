# Exchange Rates Change Dev Exercise


## Running the application

This project consists of 2 parts - API and UI. You can run the whole thing using these simple steps: 

- Open ExchangeRates.API solution and start the service - you should be able to see swagger UI and test out the endpoint.
- Navigate to to ExchangeRates-UI folder and run `npm-install` command.
- After that's finished you can run `ng serve` command and you should be able to access the application at http://localhost:4200 once it loads.
- Select a date from the calendar and you should be presented with exchange rate changes for that day.

## Technologies, Structure

### API

- .NET Core - lightweight, reliable and I'm quite familiar with it.
- Xunit, Moq - great and simple libraries for mocking and testing apis.
- Went with Controller -> Service layer as there was no need for a repository and it looked quite clean and simple that way.

### UI

- Angular used for UI - great framework that I've been working with for a while and I'm really comfortable using it.
- Karma/Jasmine for unit testing - common tools that come with Angular
- AG-Grid - I knew it was quite popular so wanted to try it out and this seemed like a good opportunity
- Material - I've worked with this for quite awhile and it seemed quite a good place to use it's datepicker (although it might be a big heavy for just using one component)
- Went with core/features/shared structure as that makes organising and maintaining code easy and finding anything enjoyable even as the application grows, even though in this case it's quite small.