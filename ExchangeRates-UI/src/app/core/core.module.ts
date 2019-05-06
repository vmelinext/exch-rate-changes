import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExchangeRateService } from './services/exchange-rate/exchange-rate.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [ExchangeRateService]
})
export class CoreModule {}
