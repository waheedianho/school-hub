import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchoolDetailModalComponent } from './school-detail-modal';
import { SAMPLE_SCHOOLS_DIRECTORY } from '../../../data/super-admin-schools.data';

describe('SchoolDetailModalComponent', () => {
  let component: SchoolDetailModalComponent;
  let fixture: ComponentFixture<SchoolDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolDetailModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SchoolDetailModalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('school', SAMPLE_SCHOOLS_DIRECTORY[0]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display school title and code', () => {
    const title = fixture.nativeElement.querySelector('.school-title');
    const code = fixture.nativeElement.querySelector('.school-code');
    expect(title.textContent).toBe('Greenfield International');
    expect(code.textContent).toBe('SCH-2025-001');
  });

  it('should emit closeModal when close button or backdrop is clicked', () => {
    let closed = false;
    component.closeModal.subscribe(() => {
      closed = true;
    });

    const closeBtn = fixture.nativeElement.querySelector('.btn-close');
    closeBtn.click();
    expect(closed).toBe(true);
  });

  it('should emit editSchool when edit button is clicked', () => {
    let editedSchoolId = '';
    component.editSchool.subscribe((sch) => {
      editedSchoolId = sch.id;
    });

    const editBtn = fixture.nativeElement.querySelector('.btn-primary');
    editBtn.click();
    expect(editedSchoolId).toBe(SAMPLE_SCHOOLS_DIRECTORY[0].id);
  });
});
