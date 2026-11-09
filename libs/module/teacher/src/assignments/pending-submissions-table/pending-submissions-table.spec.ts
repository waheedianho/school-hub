import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PENDING_SUBMISSIONS } from '../../data/teacher-assignments.data';
import { PendingSubmissionsTableComponent } from './pending-submissions-table';

describe('PendingSubmissionsTableComponent', () => {
  let component: PendingSubmissionsTableComponent;
  let fixture: ComponentFixture<PendingSubmissionsTableComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingSubmissionsTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PendingSubmissionsTableComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.componentRef.setInput('submissions', PENDING_SUBMISSIONS);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all submission rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('.table-row');
    expect(rows.length).toBe(PENDING_SUBMISSIONS.length);
  });

  it('should navigate to review when action button is clicked', () => {
    let navigatedCommands: unknown[] = [];
    router.navigate = ((commands: unknown[]) => {
      navigatedCommands = commands;
      return Promise.resolve(true);
    }) as unknown as typeof router.navigate;

    const actionBtn = fixture.nativeElement.querySelector('.action-btn');
    actionBtn.click();

    expect(navigatedCommands).toEqual(['/teacher/assignments/review']);
  });
});
