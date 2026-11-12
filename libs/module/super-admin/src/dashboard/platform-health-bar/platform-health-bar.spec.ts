import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PlatformHealthBarComponent } from './platform-health-bar';
import { PLATFORM_HEALTH_DATA } from '../../data/super-admin-dashboard.data';

describe('PlatformHealthBarComponent', () => {
  let component: PlatformHealthBarComponent;
  let fixture: ComponentFixture<PlatformHealthBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlatformHealthBarComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PlatformHealthBarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('health', PLATFORM_HEALTH_DATA);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render platform health details', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Platform Health');
    expect(text).toContain('All systems operational');
    expect(text).toContain('Operational');
    expect(text).toContain('All Running');
    expect(text).toContain('74% Used');
    expect(text).toContain('Successful');
    expect(text).toContain('No Issues');
  });
});
