import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateFolderModalComponent } from './create-folder-modal';

describe('CreateFolderModalComponent', () => {
  let component: CreateFolderModalComponent;
  let fixture: ComponentFixture<CreateFolderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateFolderModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateFolderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit folderCreated and closeModal on valid submit', () => {
    const createdSpy = vi.spyOn(component.folderCreated, 'emit');
    const closeSpy = vi.spyOn(component.closeModal, 'emit');

    component.folderName.set('Grade 8 Science Practicals');
    component.category.set('Worksheets');
    component.classLevel.set('JSS2');
    component.description.set('Lab experiments and workbook sheets');

    component.onSubmit();

    expect(createdSpy).toHaveBeenCalledWith({
      folderName: 'Grade 8 Science Practicals',
      category: 'Worksheets',
      classLevel: 'JSS2',
      description: 'Lab experiments and workbook sheets',
    });
    expect(closeSpy).toHaveBeenCalled();
  });

  it('should not emit folderCreated when folderName is blank', () => {
    const createdSpy = vi.spyOn(component.folderCreated, 'emit');
    component.folderName.set('   ');
    component.onSubmit();
    expect(createdSpy).not.toHaveBeenCalled();
  });
});
