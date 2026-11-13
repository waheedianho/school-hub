import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveInstitutionsChartComponent } from './active-institutions-chart';
import { TOP_ACTIVE_INSTITUTIONS } from '../../data/super-admin-analytics.data';

describe('ActiveInstitutionsChartComponent', () => {
  let component: ActiveInstitutionsChartComponent;
  let fixture: ComponentFixture<ActiveInstitutionsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveInstitutionsChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActiveInstitutionsChartComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('institutions', TOP_ACTIVE_INSTITUTIONS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all 5 active institutions', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Greenfield International School');
    expect(text).toContain('2,154');
    expect(text).toContain('Sunrise Public School');
    expect(text).toContain('1,896');
  });

  it('should emit periodChange when selecting period', () => {
    const emitSpy = vi.spyOn(component.periodChange, 'emit');
    component.onPeriodChange('This Term');
    expect(emitSpy).toHaveBeenCalledWith('This Term');
  });
});
