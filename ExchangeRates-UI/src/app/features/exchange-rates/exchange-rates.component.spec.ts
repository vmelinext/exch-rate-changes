import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExchangeRateServiceMock } from 'src/app/core/mocks/exchange-rate-service.mock';
import { ExchangeRateService } from 'src/app/core/services/exchange-rate/exchange-rate.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { DateSelectionComponent } from './date-selection/date-selection.component';
import { ExchangeRatesComponent } from './exchange-rates.component';

describe('ExchangeRatesComponent', () => {
  let component: ExchangeRatesComponent;
  let fixture: ComponentFixture<ExchangeRatesComponent>;
  const exchangeRateServiceMock = new ExchangeRateServiceMock();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExchangeRatesComponent, DateSelectionComponent],
      imports: [SharedModule],
      providers: [{ provide: ExchangeRateService, useValue: exchangeRateServiceMock }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service to reload grid once date has been changed', () => {
    const spy = spyOn(component, 'loadGridContents');
    const date = new Date('2012-01-1');
    fixture.detectChanges();

    component.dateComponent.dateChanged.emit(date);

    fixture.detectChanges();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
