import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersMetricsComponent } from './users-metrics';
import { USERS_METRICS } from '../../data/super-admin-users.data';

describe('UsersMetricsComponent', () => {
  let component: UsersMetricsComponent;
  let fixture: ComponentFixture<UsersMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersMetricsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('metrics', USERS_METRICS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 7 metric cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.metric-card');
    expect(cards.length).toBe(7);
  });

  it('should display correct metric values', () => {
    const values = fixture.nativeElement.querySelectorAll('.metric-value');
    expect(values[0].textContent.trim()).toBe('12,846');
    expect(values[1].textContent.trim()).toBe('1,248');
  });

  it('should apply appropriate tone backgrounds', () => {
    expect(component.getToneBg('primary')).toContain('text-blue-600');
    expect(component.getToneBg('warning')).toContain('text-amber-600');
    expect(component.getToneBg('success')).toContain('text-emerald-600');
  });
});
