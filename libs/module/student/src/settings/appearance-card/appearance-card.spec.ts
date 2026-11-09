import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppearanceCardComponent } from './appearance-card';

describe('AppearanceCardComponent', () => {
  let fixture: ComponentFixture<AppearanceCardComponent>;
  let component: AppearanceCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppearanceCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppearanceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders theme and text size options', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Theme');
    expect(text).toContain('Light');
    expect(text).toContain('Dark');
    expect(text).toContain('System');
    expect(text).toContain('Text Size');
  });

  it('emits themeSelected when a theme button is clicked', () => {
    let selected: string | undefined;
    component.themeSelected.subscribe((t) => (selected = t));

    const buttons = fixture.nativeElement.querySelectorAll('.seg-btn');
    buttons[1].click(); // Dark
    expect(selected).toBe('dark');
  });

  it('emits textSizeSelected when text size is selected', () => {
    let selected: string | undefined;
    component.textSizeSelected.subscribe((s) => (selected = s));

    const buttons = fixture.nativeElement.querySelectorAll('.seg-btn');
    buttons[3].click(); // A- (small)
    expect(selected).toBe('small');
  });
});
