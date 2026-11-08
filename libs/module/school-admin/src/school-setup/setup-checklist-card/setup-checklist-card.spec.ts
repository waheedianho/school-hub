import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetupChecklistCardComponent } from './setup-checklist-card';
import { SETUP_CHECKLIST_DATA } from '../../data/school-admin-setup.data';

describe('SetupChecklistCardComponent', () => {
  let component: SetupChecklistCardComponent;
  let fixture: ComponentFixture<SetupChecklistCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupChecklistCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SetupChecklistCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('checklist', SETUP_CHECKLIST_DATA);
    fixture.detectChanges();
  });

  it('should create and render all checklist items', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.card-title')?.textContent).toContain(
      '6. Quick Setup Checklist',
    );
    const rows = compiled.querySelectorAll('.checklist-row');
    expect(rows.length).toBe(7);
  });

  it('should emit itemToggle when row is clicked', () => {
    const spy = vi.spyOn(component.itemToggle, 'emit');
    component.onItemClick('chk-7');
    expect(spy).toHaveBeenCalledWith('chk-7');
  });
});
