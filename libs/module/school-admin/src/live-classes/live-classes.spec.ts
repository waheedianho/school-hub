import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LiveClassesComponent } from './live-classes';
import { SchoolAdminStore } from '../data/school-admin.store';

describe('LiveClassesComponent', () => {
  let component: LiveClassesComponent;
  let fixture: ComponentFixture<LiveClassesComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveClassesComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(LiveClassesComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display page title, subtitle, metrics, and navigation tabs', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.page-title')?.textContent).toContain(
      'Live Classes',
    );
    expect(el.querySelector('.page-subtitle')?.textContent).toContain(
      'Monitor scheduled, ongoing, and completed live classes',
    );
    expect(el.querySelectorAll('.tab-btn').length).toBe(4);
  });

  it('should switch active tabs when tab buttons clicked', () => {
    component.onTabChange('ongoing');
    expect(store.activeLiveClassTab()).toBe('ongoing');

    component.onTabChange('recordings');
    expect(store.activeLiveClassTab()).toBe('recordings');
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('school-hub-attendance-recordings')).toBeTruthy();
  });
});
