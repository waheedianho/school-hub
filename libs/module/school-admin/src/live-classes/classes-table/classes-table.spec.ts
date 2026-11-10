import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LiveClassesTableComponent } from './classes-table';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('LiveClassesTableComponent', () => {
  let component: LiveClassesTableComponent;
  let fixture: ComponentFixture<LiveClassesTableComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveClassesTableComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(LiveClassesTableComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render table rows for live classes', () => {
    const el: HTMLElement = fixture.nativeElement;
    const rows = el.querySelectorAll('tbody tr');
    expect(rows.length).toBe(8);

    const firstRowText = rows[0].textContent;
    expect(firstRowText).toContain('JSS 1A');
    expect(firstRowText).toContain('Mathematics');
    expect(firstRowText).toContain('Whole Numbers');
    expect(firstRowText).toContain('Mr. Tunde Adewale');
    expect(firstRowText).toContain('09:00 AM');
    expect(firstRowText).toContain('Good (88%)');
    expect(firstRowText).toContain('Upcoming');
  });

  it('should toggle action menu and trigger observe modal', () => {
    const sample = store.liveClassRecords()[8]; // SSS 1A Physics Live Now
    component.onObserveClass(sample);
    expect(store.isObserverModalOpen()).toBe(true);
    expect(store.observingLiveClass()?.className).toBe('SSS 1A');
  });

  it('should change page when pagination clicked', () => {
    component.onSelectPage(2);
    expect(store.liveClassCurrentPage()).toBe(2);
  });
});
