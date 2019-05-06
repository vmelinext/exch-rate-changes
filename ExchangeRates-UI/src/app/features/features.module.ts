import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DateSelectionComponent } from './exchange-rates/date-selection/date-selection.component';
import { ExchangeRatesComponent } from './exchange-rates/exchange-rates.component';

@NgModule({
  declarations: [ExchangeRatesComponent, DateSelectionComponent],
  exports: [ExchangeRatesComponent],
  imports: [CommonModule, SharedModule]
})
export class FeaturesModule {}
