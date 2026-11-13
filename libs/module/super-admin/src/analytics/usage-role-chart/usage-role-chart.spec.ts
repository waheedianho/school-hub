import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsageRoleChartComponent } from './usage-role-chart';
import { ROLE_USAGE_DATA } from '../../data/super-admin-analytics.data';

describe('UsageRoleChartComponent', () => {
  let component: UsageRoleChartComponent;
  let fixture: ComponentFixture<UsageRoleChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsageRoleChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsageRoleChartComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('roles', ROLE_USAGE_DATA);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render role breakdown labels and total users', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Usage by Role');
    expect(text).toContain('18,432');
    expect(text).toContain('Total Users');
    expect(text).toContain('Learners');
    expect(text).toContain('Teachers');
  });

  it('should compute total users correctly', () => {
    expect(component.totalUsers()).toBe(18432);
  });
});
