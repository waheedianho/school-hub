import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassObserverModalComponent } from './class-observer-modal';
import { SchoolAdminStore } from '../../data/school-admin.store';

describe('ClassObserverModalComponent', () => {
  let component: ClassObserverModalComponent;
  let fixture: ComponentFixture<ClassObserverModalComponent>;
  let store: SchoolAdminStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassObserverModalComponent],
      providers: [SchoolAdminStore],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassObserverModalComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(SchoolAdminStore);

    const ongoing = store.liveClassRecords()[8];
    store.openLiveClassObserver(ongoing);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the observed class title and teacher', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('SSS 1A');
    expect(el.textContent).toContain('Physics');
    expect(el.textContent).toContain('OBSERVING LIVE CLASS');
  });

  it('should switch tabs between session info, participants, and chat', () => {
    component.activeView.set('participants');
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Adewale Johnson');

    component.activeView.set('chat');
    fixture.detectChanges();
    expect(el.textContent).toContain('Welcome everyone!');
  });

  it('should close observation modal when leave button clicked', () => {
    component.onClose();
    expect(store.isObserverModalOpen()).toBe(false);
  });
});
