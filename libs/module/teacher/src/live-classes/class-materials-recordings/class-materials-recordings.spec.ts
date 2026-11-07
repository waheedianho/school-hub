import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassMaterialsRecordingsComponent } from './class-materials-recordings';

describe('ClassMaterialsRecordingsComponent', () => {
  let component: ClassMaterialsRecordingsComponent;
  let fixture: ComponentFixture<ClassMaterialsRecordingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassMaterialsRecordingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassMaterialsRecordingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all material items', () => {
    const items = fixture.nativeElement.querySelectorAll('.material-item');
    expect(items.length).toBe(4);
  });
});
