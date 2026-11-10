import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LiveClassesSidebarComponent } from './live-classes-sidebar';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('LiveClassesSidebarComponent', () => {
  let component: LiveClassesSidebarComponent;
  let fixture: ComponentFixture<LiveClassesSidebarComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveClassesSidebarComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(LiveClassesSidebarComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the summary items and attention cards', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Live Class Summary');
    expect(el.textContent).toContain('Attention Needed');
    expect(el.textContent).toContain('Quick Actions');
    expect(el.textContent).toContain('Scheduled Today');
    expect(el.textContent).toContain('28');
    expect(el.textContent).toContain('Ongoing Classes');
    expect(el.textContent).toContain('6');
  });

  it('should trigger schedule modal when schedule button is clicked', () => {
    component.onScheduleClass();
    expect(store.isScheduleModalOpen()).toBe(true);
  });

  it('should filter when attention item is clicked', () => {
    const item = store.liveClassAttentionItems()[0];
    component.onAttentionClick(item);
    expect(store.activeAttentionFilterKey()).toBe(item.filterKey);
  });
});
