import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsTabsComponent } from './settings-tabs';
import { SYSTEM_SETTINGS_TABS } from '../../data/super-admin-settings.data';

describe('SettingsTabsComponent', () => {
  let component: SettingsTabsComponent;
  let fixture: ComponentFixture<SettingsTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsTabsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tabs', SYSTEM_SETTINGS_TABS);
    fixture.componentRef.setInput('activeTab', 'general');
    fixture.detectChanges();
  });

  it('should create and render all 10 tabs', () => {
    expect(component).toBeTruthy();
    const tabButtons = fixture.nativeElement.querySelectorAll('.tab-btn');
    expect(tabButtons.length).toBe(10);
  });

  it('should emit tabChange when a tab is clicked', () => {
    let selected: string | undefined;
    component.tabChange.subscribe((id) => (selected = id));

    const tabButtons = fixture.nativeElement.querySelectorAll('.tab-btn');
    tabButtons[1].click(); // Academic Defaults
    expect(selected).toBe('academic');
  });
});
