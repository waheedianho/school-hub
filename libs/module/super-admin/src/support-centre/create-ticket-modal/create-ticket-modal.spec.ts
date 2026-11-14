import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTicketModalComponent } from './create-ticket-modal';

describe('CreateTicketModalComponent', () => {
  let component: CreateTicketModalComponent;
  let fixture: ComponentFixture<CreateTicketModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTicketModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTicketModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and render form inputs', () => {
    expect(component).toBeTruthy();
    const title = fixture.nativeElement.querySelector('#create-ticket-title');
    expect(title.textContent).toContain('Create Support Ticket');
  });

  it('should emit created event on valid submission', () => {
    const spy = vi.spyOn(component.created, 'emit');
    component.title.set('Exam portal loading timeout');
    component.school.set('Greenfield Academy');
    component.issueType.set('Report Generation Bug');
    component.priority.set('High');
    component.description.set(
      'Students get 504 gateway timeout on quiz start.',
    );

    component.onSubmit();

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Exam portal loading timeout',
        school: 'Greenfield Academy',
        priority: 'High',
      }),
    );
  });

  it('should emit closeModal when close button is clicked', () => {
    const spy = vi.spyOn(component.closeModal, 'emit');
    const closeBtn = fixture.nativeElement.querySelector('.close-btn');
    closeBtn.click();
    expect(spy).toHaveBeenCalled();
  });
});
