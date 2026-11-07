import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LearningCardComponent } from './learning-card';

describe('LearningCardComponent', () => {
  let fixture: ComponentFixture<LearningCardComponent>;
  let component: LearningCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearningCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LearningCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders preference list with learning items', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Preferred Subjects');
    expect(text).toContain('Daily Study Reminder');
    expect(text).toContain('Weekly Progress Summary');
  });

  it('emits settingToggled when a switch is flipped', () => {
    let result: { key: string; value: boolean } | undefined;
    component.settingToggled.subscribe((r) => (result = r));

    component.onToggle({ id: 'dailyStudyReminder', checked: false });
    expect(result).toEqual({ key: 'dailyStudyReminder', value: false });
  });

  it('emits interacted on focusin and pointerdown', () => {
    let fired = false;
    component.interacted.subscribe(() => (fired = true));

    fixture.nativeElement.dispatchEvent(new Event('pointerdown'));
    expect(fired).toBe(true);

    fired = false;
    fixture.nativeElement.dispatchEvent(new Event('focusin'));
    expect(fired).toBe(true);
  });
});
