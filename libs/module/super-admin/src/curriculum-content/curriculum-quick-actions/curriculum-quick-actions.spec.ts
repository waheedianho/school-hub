import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurriculumQuickActionsComponent } from './curriculum-quick-actions';

describe('CurriculumQuickActionsComponent', () => {
  let component: CurriculumQuickActionsComponent;
  let fixture: ComponentFixture<CurriculumQuickActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumQuickActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurriculumQuickActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 4 quick action buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(4);
    expect(fixture.nativeElement.textContent).toContain('Create Pack');
    expect(fixture.nativeElement.textContent).toContain('Assign Template');
    expect(fixture.nativeElement.textContent).toContain('Review Queue');
    expect(fixture.nativeElement.textContent).toContain('Missing Assets');
  });

  it('should display correct counts for Review Queue and Missing Assets', () => {
    fixture.componentRef.setInput('pendingReviewCount', 214);
    fixture.componentRef.setInput('missingAssetsCount', 96);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('214');
    expect(text).toContain('96');
  });

  it('should emit outputs when buttons are clicked', () => {
    const createSpy = vi.spyOn(component.createPack, 'emit');
    const assignSpy = vi.spyOn(component.assignTemplate, 'emit');
    const reviewSpy = vi.spyOn(component.reviewQueue, 'emit');
    const missingSpy = vi.spyOn(component.missingAssets, 'emit');

    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[0].click();
    buttons[1].click();
    buttons[2].click();
    buttons[3].click();

    expect(createSpy).toHaveBeenCalled();
    expect(assignSpy).toHaveBeenCalled();
    expect(reviewSpy).toHaveBeenCalled();
    expect(missingSpy).toHaveBeenCalled();
  });
});
