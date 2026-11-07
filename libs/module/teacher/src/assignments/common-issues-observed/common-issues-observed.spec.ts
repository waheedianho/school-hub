import { ComponentFixture, TestBed } from '@angular/core/testing';
import { COMMON_ISSUES_OBSERVED } from '../../data/teacher-assignments.data';
import { CommonIssuesObservedComponent } from './common-issues-observed';

describe('CommonIssuesObservedComponent', () => {
  let component: CommonIssuesObservedComponent;
  let fixture: ComponentFixture<CommonIssuesObservedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonIssuesObservedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CommonIssuesObservedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all common issue items', () => {
    const items = fixture.nativeElement.querySelectorAll('.issue-item');
    expect(items.length).toBe(COMMON_ISSUES_OBSERVED.length);
  });
});
