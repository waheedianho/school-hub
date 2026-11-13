import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessLogsViewComponent } from './access-logs-view';
import { SAMPLE_ACCESS_LOGS } from '../../data/super-admin-users.data';

describe('AccessLogsViewComponent', () => {
  let component: AccessLogsViewComponent;
  let fixture: ComponentFixture<AccessLogsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessLogsViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccessLogsViewComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('logs', SAMPLE_ACCESS_LOGS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render log rows', () => {
    const rows = fixture.nativeElement.querySelectorAll('.log-row');
    expect(rows.length).toBe(SAMPLE_ACCESS_LOGS.length);
  });

  it('should filter logs by search term', () => {
    component.onSearch('Amanda');
    expect(component.filteredLogs().length).toBe(1);
    expect(component.filteredLogs()[0].userName).toBe('Amanda Lees');
  });

  it('should filter logs by status', () => {
    component.onStatusChange('Failed');
    expect(component.filteredLogs().length).toBe(1);
    expect(component.filteredLogs()[0].status).toBe('Failed');
  });

  it('should emit exportLogs when export button is clicked', () => {
    let exported = false;
    component.exportLogs.subscribe(() => {
      exported = true;
    });

    const exportBtn = fixture.nativeElement.querySelector('.btn-export-logs');
    exportBtn.click();
    expect(exported).toBe(true);
  });
});
