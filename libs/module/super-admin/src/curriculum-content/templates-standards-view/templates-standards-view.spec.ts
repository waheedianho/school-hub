import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TemplatesStandardsViewComponent } from './templates-standards-view';
import { SAMPLE_CURRICULUM_TEMPLATES } from '../../data/super-admin-curriculum.data';

describe('TemplatesStandardsViewComponent', () => {
  let component: TemplatesStandardsViewComponent;
  let fixture: ComponentFixture<TemplatesStandardsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplatesStandardsViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplatesStandardsViewComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('templates', SAMPLE_CURRICULUM_TEMPLATES);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render curriculum framework cards with compliance badges', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Learno Master 9-Year Basic Education Framework');
    expect(text).toContain('98% Compliant');
    expect(text).toContain('Senior Secondary STEM Academic Template');
  });

  it('should emit apply and download outputs', () => {
    const applySpy = vi.spyOn(component.applyTemplate, 'emit');
    const dlSpy = vi.spyOn(component.downloadTemplate, 'emit');

    const tmpl = SAMPLE_CURRICULUM_TEMPLATES[0];
    component.applyTemplate.emit(tmpl);
    component.downloadTemplate.emit(tmpl);

    expect(applySpy).toHaveBeenCalledWith(tmpl);
    expect(dlSpy).toHaveBeenCalledWith(tmpl);
  });
});
