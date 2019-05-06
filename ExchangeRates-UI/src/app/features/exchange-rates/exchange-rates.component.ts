import { Component, OnInit, ViewChild } from '@angular/core';
import { ExchangeRateService } from 'src/app/core/services/exchange-rate/exchange-rate.service';
import { ExchangeRateChange } from 'src/app/shared/models/exchange-rate-change.model';
import { DateSelectionComponent } from './date-selection/date-selection.component';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss']
})
export class ExchangeRatesComponent implements OnInit {
  @ViewChild(DateSelectionComponent) dateComponent: DateSelectionComponent;
  private gridApi: any;
  private gridColumnApi: any;
  public exchangeRateChanges: Array<ExchangeRateChange>;
  public selectedDate: Date;
  public columns = [];

  constructor(public exchangeRateService: ExchangeRateService) {}

  ngOnInit() {}

  public onDateChanged(date: Date): void {
    this.selectedDate = date;
    this.loadGridContents();
  }

  public onGridReady(params: any): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  public loadGridContents(): void {
    const date = `${this.selectedDate.getFullYear()}-${this.selectedDate.getMonth() +
      1}-${this.selectedDate.getDate()}`;

    this.columns = [
      {
        headerName: `Currency rate changes for ${this.selectedDate.toDateString()}`,
        width: 100,
        children: [
          { headerName: 'Currency', field: 'currency', cellRenderer: this.currencyCellRenderer, width: 350 },
          {
            headerName: 'Change',
            field: 'change',
            cellRenderer: this.valueCellRenderer,
            width: 350
          }
        ]
      }
    ];

    this.exchangeRateService.findAll(date).subscribe((rates: Array<ExchangeRateChange>) => {
      this.exchangeRateChanges = rates;
    });

    if (this.gridApi) {
      this.gridApi.redrawRows();
      this.gridColumnApi.resetColumnState();
    }
  }

  private valueCellRenderer(params: any): string {
    const color = params.value === 0 ? 'black' : params.value < 0 ? 'red' : 'green';

    return `<div style="color: ${color}">${params.value.toFixed(4)}%</div>`;
  }

  private currencyCellRenderer(params: any): string {
    return `<div style="margin-top: 5px;" class="currency-flag currency-flag-${params.value.toLowerCase()}"></div>
    <span style="margin-left: 10px;">${params.value}</span>`;
  }
}
