import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LanguageCardComponent } from './language-card';

describe('LanguageCardComponent', () => {
  let fixture: ComponentFixture<LanguageCardComponent>;
  let component: LanguageCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders language selects', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('App Language');
    expect(text).toContain('Content Language');
  });

  it('emits languageChanged when select value changes', () => {
    let result: { key: string; value: string } | undefined;
    component.languageChanged.subscribe((r) => (result = r));

    const select = fixture.nativeElement.querySelector('#app-language');
    select.value = 'yo';
    select.dispatchEvent(new Event('change'));

    expect(result).toEqual({ key: 'appLanguage', value: 'yo' });
  });
});
