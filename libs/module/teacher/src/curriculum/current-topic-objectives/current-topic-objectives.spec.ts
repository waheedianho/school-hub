import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentTopicObjectivesComponent } from './current-topic-objectives';
import { TEACHER_TOPIC_OBJECTIVE } from '../../data/teacher-curriculum.data';

describe('CurrentTopicObjectivesComponent', () => {
  let component: CurrentTopicObjectivesComponent;
  let fixture: ComponentFixture<CurrentTopicObjectivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentTopicObjectivesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentTopicObjectivesComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('objective', TEACHER_TOPIC_OBJECTIVE);
    fixture.detectChanges();
  });

  it('should create and render topic subtitle', () => {
    expect(component).toBeTruthy();
    const subtitle = fixture.nativeElement.querySelector(
      '.topic-header-subtitle',
    );
    expect(subtitle.textContent).toContain(
      'English Language – Parts of Speech',
    );
  });

  it('should display curriculum objective, academic focus, and misconception', () => {
    const titles = fixture.nativeElement.querySelectorAll('.section-title');
    expect(titles[0].textContent).toContain('Curriculum Objective');
    expect(titles[1].textContent).toContain('Academic Focus');
    expect(titles[2].textContent).toContain('Common Misconception to Watch');

    const texts = fixture.nativeElement.querySelectorAll('.section-text');
    expect(texts[0].textContent).toContain('Identify and correctly use nouns');
    expect(texts[1].textContent).toContain('Improving sentence structure');
    expect(texts[2].textContent).toContain('Confusing adjectives with adverbs');
  });

  it('should render linked delivery pack box', () => {
    const packTitle = fixture.nativeElement.querySelector('.pack-title');
    expect(packTitle.textContent).toContain('Parts of Speech – Week 4 Pack');
  });
});
