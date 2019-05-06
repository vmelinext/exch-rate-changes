import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-selection',
  templateUrl: './date-selection.component.html',
  styleUrls: ['./date-selection.component.scss']
})
export class DateSelectionComponent implements OnInit {
  @Output() public dateChanged = new EventEmitter<Date>();
  public maxDate = new Date('2014-12-31');
  public selectedDate: Date;

  public ngOnInit(): void {}

  public onDateChange(date: Date): void {
    this.dateChanged.emit(date);
  }

  public datepickerFilter(date: Date): boolean {
    return date.getTime() < new Date('2014-12-31').getTime();
  }
}
