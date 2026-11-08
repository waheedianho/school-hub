import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommunicationSafeguardingCardComponent } from './communication-safeguarding-card';
import { COMMUNICATION_SAFEGUARDING_DATA } from '../../data/school-admin-setup.data';

describe('CommunicationSafeguardingCardComponent', () => {
  let component: CommunicationSafeguardingCardComponent;
  let fixture: ComponentFixture<CommunicationSafeguardingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommunicationSafeguardingCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommunicationSafeguardingCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('settings', COMMUNICATION_SAFEGUARDING_DATA);
    fixture.detectChanges();
  });

  it('should create and render safeguarding settings', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.card-title')?.textContent).toContain(
      '5. Communication & Safeguarding',
    );
    const emailInput = compiled.querySelector(
      '#safeguarding-contact',
    ) as HTMLInputElement;
    expect(emailInput.value).toBe('safeguarding@greenfield.edu.ng');
  });

  it('should emit toggle field changes', () => {
    const spy = vi.spyOn(component.settingsChange, 'emit');
    component.toggleField('announcementEmail');
    expect(spy).toHaveBeenCalledWith({ announcementEmail: false });
  });

  it('should emit field change on input edit', () => {
    const spy = vi.spyOn(component.settingsChange, 'emit');
    component.onFieldChange('safeguardingContact', 'lead@school.edu.ng');
    expect(spy).toHaveBeenCalledWith({
      safeguardingContact: 'lead@school.edu.ng',
    });
  });
});
