import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SafeguardingBannerComponent } from './safeguarding-banner';
import { SAFEGUARDING_NOTICE_DATA } from '../../data/school-admin-dashboard.data';

describe('SafeguardingBannerComponent', () => {
  let component: SafeguardingBannerComponent;
  let fixture: ComponentFixture<SafeguardingBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SafeguardingBannerComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SafeguardingBannerComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('notice', SAFEGUARDING_NOTICE_DATA);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render safeguarding message', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Safeguarding is our priority');
  });

  it('should have link to safeguarding reports', () => {
    const link = fixture.nativeElement.querySelector('.banner-link');
    expect(link).toBeTruthy();
    expect(link.textContent).toContain('View Safeguarding Reports');
  });
});
