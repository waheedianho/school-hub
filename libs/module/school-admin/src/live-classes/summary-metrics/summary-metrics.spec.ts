import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LiveClassesSummaryMetricsComponent } from './summary-metrics';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('LiveClassesSummaryMetricsComponent', () => {
  let component: LiveClassesSummaryMetricsComponent;
  let fixture: ComponentFixture<LiveClassesSummaryMetricsComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveClassesSummaryMetricsComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(LiveClassesSummaryMetricsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    expect(store).toBeTruthy();
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the 5 live class summary metric cards', () => {
    const el: HTMLElement = fixture.nativeElement;
    const cards = el.querySelectorAll('.metric-card');
    expect(cards.length).toBe(5);

    const values = el.querySelectorAll('.metric-value');
    expect(values[0].textContent?.trim()).toBe('28');
    expect(values[1].textContent?.trim()).toBe('6');
    expect(values[2].textContent?.trim()).toBe('94');
    expect(values[3].textContent?.trim()).toBe('87%');
    expect(values[4].textContent?.trim()).toBe('5');
  });
});
