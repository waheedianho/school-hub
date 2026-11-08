import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassListComponent } from './class-list';
import { SCHOOL_CLASSES_DATA } from '../../data/school-admin-classes.data';

describe('ClassListComponent', () => {
  let component: ClassListComponent;
  let fixture: ComponentFixture<ClassListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('classes', SCHOOL_CLASSES_DATA.slice(0, 4));
    fixture.componentRef.setInput('selectedClassId', 'class-jss-1a');
    fixture.detectChanges();
  });

  it('should create and render class cards', () => {
    expect(component).toBeTruthy();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.panel-title')?.textContent).toContain(
      'Classes',
    );
    const cards = compiled.querySelectorAll('.class-item-card');
    expect(cards.length).toBe(4);
    expect(cards[0].classList.contains('selected')).toBe(true);
    expect(cards[0].textContent).toContain('JSS 1A');
  });

  it('should emit classSelected when a card is clicked', () => {
    const spy = vi.spyOn(component.classSelected, 'emit');
    const cards = fixture.nativeElement.querySelectorAll(
      '.class-item-card',
    ) as NodeListOf<HTMLElement>;
    cards[1].click();
    expect(spy).toHaveBeenCalledWith('class-jss-1b');
  });

  it('should emit addClassClicked when add class button is clicked', () => {
    const spy = vi.spyOn(component.addClassClicked, 'emit');
    const addBtn = fixture.nativeElement.querySelector(
      '.btn-add-class',
    ) as HTMLButtonElement;
    addBtn.click();
    expect(spy).toHaveBeenCalled();
  });
});
