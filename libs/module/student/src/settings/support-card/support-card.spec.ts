import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SupportCardComponent } from './support-card';

describe('SupportCardComponent', () => {
  let fixture: ComponentFixture<SupportCardComponent>;
  let component: SupportCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SupportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders support actions', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Visit Help Centre');
    expect(text).toContain('Chat with Support');
    expect(text).toContain('Report an Issue');
    expect(text).toContain('Give Feedback');
  });

  it('emits modalRequested when help centre is clicked', () => {
    let requested: string | undefined;
    component.modalRequested.subscribe((m) => (requested = m));

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(requested).toBe('help');
  });
});
