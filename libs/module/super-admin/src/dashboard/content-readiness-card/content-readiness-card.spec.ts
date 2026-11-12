import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentReadinessCardComponent } from './content-readiness-card';
import { CONTENT_READINESS_DATA } from '../../data/super-admin-dashboard.data';

describe('ContentReadinessCardComponent', () => {
  let component: ContentReadinessCardComponent;
  let fixture: ComponentFixture<ContentReadinessCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentReadinessCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentReadinessCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('data', CONTENT_READINESS_DATA);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render content readiness metrics', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Approved Packs');
    expect(text).toContain('2,341');
    expect(text).toContain('Pending Review');
    expect(text).toContain('217');
    expect(text).toContain('Missing Assets');
    expect(text).toContain('98');
  });
});
