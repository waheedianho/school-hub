import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectedPackOverviewComponent } from './selected-pack-overview';
import {
  TEACHER_SELECTED_PACK_OVERVIEW,
  TeacherSelectedPackOverview,
} from '../../data/teacher-lessons.data';

describe('SelectedPackOverviewComponent', () => {
  let component: SelectedPackOverviewComponent;
  let fixture: ComponentFixture<SelectedPackOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedPackOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectedPackOverviewComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('pack', TEACHER_SELECTED_PACK_OVERVIEW);
    fixture.detectChanges();
  });

  it('should create and render pack title and readiness status', () => {
    expect(component).toBeTruthy();
    const title = fixture.nativeElement.querySelector('.pack-title');
    expect(title.textContent).toContain('Parts of Speech – Week 4 Pack');

    const badge = fixture.nativeElement.querySelector(
      'school-hub-status-badge',
    );
    expect(badge).toBeTruthy();
  });

  it('should render all 11 checklist items', () => {
    const items = fixture.nativeElement.querySelectorAll('.checklist-item');
    expect(items.length).toBe(11);
  });

  it('should emit openPack and editPack events when buttons are clicked', () => {
    let opened: TeacherSelectedPackOverview | undefined;
    let edited: TeacherSelectedPackOverview | undefined;

    component.openPack.subscribe((p) => (opened = p));
    component.editPack.subscribe((p) => (edited = p));

    const buttons = fixture.nativeElement.querySelectorAll(
      '.overview-actions button',
    );
    buttons[0].click();
    buttons[1].click();

    expect(opened).toEqual(TEACHER_SELECTED_PACK_OVERVIEW);
    expect(edited).toEqual(TEACHER_SELECTED_PACK_OVERVIEW);
  });
});
