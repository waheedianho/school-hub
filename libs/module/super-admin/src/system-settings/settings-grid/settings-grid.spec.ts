import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsGridComponent } from './settings-grid';
import { DEFAULT_SYSTEM_SETTINGS } from '../../data/super-admin-settings.data';

describe('SettingsGridComponent', () => {
  let component: SettingsGridComponent;
  let fixture: ComponentFixture<SettingsGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsGridComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput(
      'settings',
      JSON.parse(JSON.stringify(DEFAULT_SYSTEM_SETTINGS)),
    );
    fixture.componentRef.setInput('activeTab', 'general');
    fixture.detectChanges();
  });

  it('should create and render all 8 settings cards', () => {
    expect(component).toBeTruthy();
    const cards = fixture.nativeElement.querySelectorAll('.config-card');
    expect(cards.length).toBe(8);
  });

  it('should emit settingsChange when onSettingChange is called', () => {
    let changed = false;
    component.settingsChange.subscribe(() => (changed = true));
    component.onSettingChange();
    expect(changed).toBe(true);
  });

  it('should emit tabRequested when footer action link is clicked', () => {
    let requestedTab: string | undefined;
    component.tabRequested.subscribe((t) => (requestedTab = t));
    component.onTabRequest('notifications');
    expect(requestedTab).toBe('notifications');
  });

  it('should emit viewHistoryRequested when view history button is clicked', () => {
    let historyRequested = false;
    component.viewHistoryRequested.subscribe(() => (historyRequested = true));
    component.onViewHistory();
    expect(historyRequested).toBe(true);
  });
});
