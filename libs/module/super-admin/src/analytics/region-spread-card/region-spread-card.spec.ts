import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegionSpreadCardComponent } from './region-spread-card';
import { REGION_SPREAD_DATA } from '../../data/super-admin-analytics.data';

describe('RegionSpreadCardComponent', () => {
  let component: RegionSpreadCardComponent;
  let fixture: ComponentFixture<RegionSpreadCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionSpreadCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegionSpreadCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('regions', REGION_SPREAD_DATA);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all regions and totals', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Institution Spread by Region');
    expect(text).toContain('North');
    expect(text).toContain('South');
    expect(text).toContain('East');
    expect(text).toContain('West');
    expect(text).toContain('Total');
    expect(text).toContain('248');
    expect(text).toContain('13,104');
  });
});
