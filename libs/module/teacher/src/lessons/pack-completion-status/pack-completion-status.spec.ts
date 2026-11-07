import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PackCompletionStatusComponent } from './pack-completion-status';
import { TEACHER_PACK_COMPLETION_TIERS } from '../../data/teacher-lessons.data';

describe('PackCompletionStatusComponent', () => {
  let component: PackCompletionStatusComponent;
  let fixture: ComponentFixture<PackCompletionStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackCompletionStatusComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PackCompletionStatusComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tiers', TEACHER_PACK_COMPLETION_TIERS);
    fixture.detectChanges();
  });

  it('should create and calculate donut slices for 3 tiers', () => {
    expect(component).toBeTruthy();
    expect(component.slices().length).toBe(3);
    const legendRows = fixture.nativeElement.querySelectorAll('.legend-row');
    expect(legendRows.length).toBe(3);
  });

  it('should display total packs count', () => {
    const footerCount = fixture.nativeElement.querySelector('.footer-count');
    expect(footerCount.textContent.trim()).toBe('128');
  });

  it('should display tier counts and percentages', () => {
    const counts = fixture.nativeElement.querySelectorAll('.legend-count');
    expect(counts[0].textContent).toContain('86 (67%)');
    expect(counts[1].textContent).toContain('28 (22%)');
    expect(counts[2].textContent).toContain('14 (11%)');
  });
});
