import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcademicStructureCardComponent } from './academic-structure-card';
import { ACADEMIC_STRUCTURE_DATA } from '../../data/school-admin-setup.data';

describe('AcademicStructureCardComponent', () => {
  let component: AcademicStructureCardComponent;
  let fixture: ComponentFixture<AcademicStructureCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicStructureCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AcademicStructureCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('structure', ACADEMIC_STRUCTURE_DATA);
    fixture.detectChanges();
  });

  it('should create and display structure data', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.card-title')?.textContent).toContain(
      '2. Academic Structure',
    );
    const armsInput = compiled.querySelector('#class-arms') as HTMLInputElement;
    expect(armsInput.value).toBe('2');
  });

  it('should increment class arms', () => {
    const spy = vi.spyOn(component.structureChange, 'emit');
    component.incrementArms();
    expect(spy).toHaveBeenCalledWith({ classArms: 3 });
  });

  it('should decrement class arms when greater than 1', () => {
    const spy = vi.spyOn(component.structureChange, 'emit');
    component.decrementArms();
    expect(spy).toHaveBeenCalledWith({ classArms: 1 });
  });

  it('should emit structureChange on field edit', () => {
    const spy = vi.spyOn(component.structureChange, 'emit');
    component.onFieldChange('term', 'First Term');
    expect(spy).toHaveBeenCalledWith({ term: 'First Term' });
  });
});
