import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TopSubjectsComponent } from './top-subjects';
import { TOP_PERFORMING_SUBJECTS_DATA } from '../../data/school-admin-dashboard.data';

describe('TopSubjectsComponent', () => {
  let component: TopSubjectsComponent;
  let fixture: ComponentFixture<TopSubjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopSubjectsComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TopSubjectsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('subjects', TOP_PERFORMING_SUBJECTS_DATA);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 5 top performing subjects', () => {
    const rows = fixture.nativeElement.querySelectorAll('.subject-row');
    expect(rows.length).toBe(5);
  });

  it('should display Mathematics with 78%', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Mathematics');
    expect(text).toContain('78%');
  });
});
