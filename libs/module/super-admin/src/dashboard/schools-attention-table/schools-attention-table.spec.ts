import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SchoolsAttentionTableComponent } from './schools-attention-table';
import { SCHOOLS_ATTENTION_DATA } from '../../data/super-admin-dashboard.data';

describe('SchoolsAttentionTableComponent', () => {
  let component: SchoolsAttentionTableComponent;
  let fixture: ComponentFixture<SchoolsAttentionTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolsAttentionTableComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolsAttentionTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('schools', SCHOOLS_ATTENTION_DATA);
    fixture.componentRef.setInput('count', SCHOOLS_ATTENTION_DATA.length);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all attention schools in table', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(5);
  });

  it('should render school names and issues', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Greenfield International');
    expect(text).toContain('Subscription expiring in 7 days');
    expect(text).toContain('Action Needed');
  });
});
