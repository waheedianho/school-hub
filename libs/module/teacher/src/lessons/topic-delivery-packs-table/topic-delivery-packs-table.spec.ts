import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopicDeliveryPacksTableComponent } from './topic-delivery-packs-table';
import {
  TEACHER_TOPIC_DELIVERY_PACKS,
  TeacherTopicDeliveryPack,
} from '../../data/teacher-lessons.data';

describe('TopicDeliveryPacksTableComponent', () => {
  let component: TopicDeliveryPacksTableComponent;
  let fixture: ComponentFixture<TopicDeliveryPacksTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicDeliveryPacksTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopicDeliveryPacksTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('packs', TEACHER_TOPIC_DELIVERY_PACKS);
    fixture.detectChanges();
  });

  it('should create and render 4 rows', () => {
    expect(component).toBeTruthy();
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(4);
  });

  it('should render topics and status pills', () => {
    const topics = fixture.nativeElement.querySelectorAll('.topic-link');
    expect(topics[0].textContent).toContain('Parts of Speech');
    expect(topics[1].textContent).toContain('Sentence Structure');

    const pills = fixture.nativeElement.querySelectorAll('.status-pill');
    expect(pills[0].textContent).toContain('Ready');
    expect(pills[1].textContent).toContain('In Progress');
  });

  it('should emit selectPack when row or action button is clicked', () => {
    let selected: TeacherTopicDeliveryPack | undefined;
    component.selectPack.subscribe((p) => (selected = p));

    const row = fixture.nativeElement.querySelector('tbody tr');
    row.click();

    expect(selected).toEqual(TEACHER_TOPIC_DELIVERY_PACKS[0]);
  });
});
