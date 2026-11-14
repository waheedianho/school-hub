import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubjectConsumptionChartComponent } from './subject-consumption-chart';
import { SUBJECT_CONSUMPTION_DATA } from '../../data/super-admin-analytics.data';

describe('SubjectConsumptionChartComponent', () => {
  let component: SubjectConsumptionChartComponent;
  let fixture: ComponentFixture<SubjectConsumptionChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectConsumptionChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubjectConsumptionChartComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('items', SUBJECT_CONSUMPTION_DATA);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all subjects with values', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Content Consumption by Subject');
    expect(text).toContain('Mathematics');
    expect(text).toContain('12,842');
    expect(text).toContain('Science');
    expect(text).toContain('10,763');
  });

  it('should emit periodChange on dropdown select', () => {
    const emitSpy = vi.spyOn(component.periodChange, 'emit');
    component.onPeriodChange('This Academic Year');
    expect(emitSpy).toHaveBeenCalledWith('This Academic Year');
  });
});
