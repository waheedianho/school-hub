import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsNavComponent } from './settings-nav';
import { SETTINGS_SECTIONS } from '../settings-engine';

describe('SettingsNavComponent', () => {
  let fixture: ComponentFixture<SettingsNavComponent>;
  let component: SettingsNavComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsNavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsNavComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('sections', SETTINGS_SECTIONS);
    fixture.componentRef.setInput('activeSection', 'account');
    fixture.detectChanges();
  });

  it('renders all section navigation buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.menu-item');
    expect(buttons.length).toBe(9);
    expect(buttons[0].textContent).toContain('Account Settings');
  });

  it('marks active section with active class and aria-current="page"', () => {
    const activeButton =
      fixture.nativeElement.querySelector('.menu-item.active');
    expect(activeButton).toBeTruthy();
    expect(activeButton.getAttribute('aria-current')).toBe('page');
    expect(activeButton.textContent).toContain('Account Settings');
  });

  it('emits sectionSelected when a navigation button is clicked', () => {
    let selected: string | undefined;
    component.sectionSelected.subscribe((s) => (selected = s));

    const buttons = fixture.nativeElement.querySelectorAll('.menu-item');
    buttons[1].click(); // 'learning'

    expect(selected).toBe('learning');
  });
});
