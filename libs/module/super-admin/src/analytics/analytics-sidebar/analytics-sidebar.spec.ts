import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnalyticsSidebarComponent } from './analytics-sidebar';
import {
  ADOPTION_INSIGHTS_DATA,
  ATTENTION_SCHOOLS_DATA,
  RECENT_PLATFORM_ACTIVITIES,
} from '../../data/super-admin-analytics.data';

describe('AnalyticsSidebarComponent', () => {
  let component: AnalyticsSidebarComponent;
  let fixture: ComponentFixture<AnalyticsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyticsSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnalyticsSidebarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('attentionSchools', ATTENTION_SCHOOLS_DATA);
    fixture.componentRef.setInput('adoptionInsights', ADOPTION_INSIGHTS_DATA);
    fixture.componentRef.setInput('activities', RECENT_PLATFORM_ACTIVITIES);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render schools needing attention', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Schools Needing Attention');
    expect(text).toContain('Oakwood High School');
    expect(text).toContain('18%');
  });

  it('should render adoption insights', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Adoption Insights');
    expect(text).toContain('Greenfield International School');
    expect(text).toContain('Strong Growth');
  });

  it('should render recent platform activity feed', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Recent Platform Activity');
    expect(text).toContain('Horizon Global School');
  });

  it('should emit viewAllSchools when clicking view all', () => {
    const emitSpy = vi.spyOn(component.viewAllSchools, 'emit');
    const button = fixture.nativeElement.querySelector(
      '[data-testid="view-all-attention-btn"]',
    );
    button.click();
    expect(emitSpy).toHaveBeenCalled();
  });
});
