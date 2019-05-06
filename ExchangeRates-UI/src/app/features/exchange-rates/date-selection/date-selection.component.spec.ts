import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';
import { DateSelectionComponent } from './date-selection.component';

describe('DateSelectionComponent', () => {
  let component: DateSelectionComponent;
  let fixture: ComponentFixture<DateSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateSelectionComponent],
      imports: [SharedModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event with correct value when date changes', () => {
    const spy = spyOn(component.dateChanged, 'emit');

    const dateInput = fixture.debugElement.query(By.css('#date-input'));
    const el = dateInput.nativeElement;
    const date = new Date('2012-01-01');

    el.value = date;

    const event = new Event('input', {
      bubbles: true,
      cancelable: true
    });
    el.dispatchEvent(event);

    fixture.detectChanges();

    expect(spy).toHaveBeenCalledWith(date);
  });
});
