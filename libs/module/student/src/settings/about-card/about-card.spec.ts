import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutCardComponent } from './about-card';

describe('AboutCardComponent', () => {
  let fixture: ComponentFixture<AboutCardComponent>;
  let component: AboutCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders about information and version', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('About Learno');
    expect(text).toContain('Version 1.0.0');
    expect(text).toContain('SchoolHub Student Platform');
  });

  it('emits detailsRequested when button is clicked', () => {
    let fired = false;
    component.detailsRequested.subscribe(() => (fired = true));

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(fired).toBe(true);
  });
});
