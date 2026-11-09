import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { SupportHelpCardComponent } from './support-help-card';
import {
  SUPPORT_HELP_ITEMS,
  SupportHelpItem,
} from '../../data/teacher-settings.data';

describe('SupportHelpCardComponent', () => {
  let component: SupportHelpCardComponent;
  let fixture: ComponentFixture<SupportHelpCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportHelpCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SupportHelpCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', SUPPORT_HELP_ITEMS);
    fixture.detectChanges();
  });

  it('should render all support help items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.step-title')?.textContent).toContain(
      'Support & Help',
    );
    const buttons = compiled.querySelectorAll('.support-row-btn');
    expect(buttons.length).toBe(4);

    expect(compiled.textContent).toContain('Teacher Guide');
    expect(compiled.textContent).toContain('Help Center');
    expect(compiled.textContent).toContain('Contact Support');
    expect(compiled.textContent).toContain('Report an Issue');
  });

  it('should open modal and emit itemSelected on click', () => {
    let emitted: SupportHelpItem | undefined;
    component.itemSelected.subscribe((i) => (emitted = i));

    component.onItemClick(SUPPORT_HELP_ITEMS[0]);
    fixture.detectChanges();

    expect(component.activeModal()).toBe('teacher-guide');
    expect(emitted?.id).toBe('teacher-guide');

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.modal-dialog')).toBeTruthy();

    component.closeModal();
    fixture.detectChanges();
    expect(component.activeModal()).toBeNull();
  });
});
