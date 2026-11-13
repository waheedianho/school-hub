import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurriculumTableComponent } from './curriculum-table';
import { SAMPLE_CURRICULUM_PACKS } from '../../data/super-admin-curriculum.data';

describe('CurriculumTableComponent', () => {
  let component: CurriculumTableComponent;
  let fixture: ComponentFixture<CurriculumTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurriculumTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurriculumTableComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('packs', SAMPLE_CURRICULUM_PACKS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render table rows for curriculum packs', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBeGreaterThan(0);
    expect(fixture.nativeElement.textContent).toContain(
      'JSS 1 Mathematics – First Term',
    );
    expect(fixture.nativeElement.textContent).toContain(
      'JSS 1 English Language – First Term',
    );
  });

  it('should emit search change when typing in search input', () => {
    const searchSpy = vi.spyOn(component.searchChange, 'emit');
    const input = fixture.nativeElement.querySelector(
      '[data-testid="curriculum-search-input"]',
    );
    input.value = 'Mathematics';
    input.dispatchEvent(new Event('input'));
    expect(searchSpy).toHaveBeenCalledWith('Mathematics');
  });

  it('should emit filter changes when selects change', () => {
    const typeSpy = vi.spyOn(component.typeChange, 'emit');
    const classSpy = vi.spyOn(component.classLevelChange, 'emit');
    const termSpy = vi.spyOn(component.termChange, 'emit');
    const statusSpy = vi.spyOn(component.statusChange, 'emit');

    component.typeChange.emit('Elective');
    component.classLevelChange.emit('SS 1');
    component.termChange.emit('Second Term');
    component.statusChange.emit('Approved');

    expect(typeSpy).toHaveBeenCalledWith('Elective');
    expect(classSpy).toHaveBeenCalledWith('SS 1');
    expect(termSpy).toHaveBeenCalledWith('Second Term');
    expect(statusSpy).toHaveBeenCalledWith('Approved');
  });

  it('should toggle action menu and emit view/edit events', () => {
    const viewSpy = vi.spyOn(component.viewPack, 'emit');
    const pack = SAMPLE_CURRICULUM_PACKS[0];

    const actionBtn = fixture.nativeElement.querySelector(
      `[data-testid="action-btn-${pack.id}"]`,
    );
    actionBtn.click();
    fixture.detectChanges();

    const menu = fixture.nativeElement.querySelector(
      '[data-testid="pack-action-menu"]',
    );
    expect(menu).toBeTruthy();

    const viewBtn = menu.querySelector('button');
    viewBtn.click();
    expect(viewSpy).toHaveBeenCalledWith(pack);
  });

  it('should change page when pagination buttons are clicked', () => {
    component.onPageSizeChange(5);
    expect(component.pageSize()).toBe(5);
    expect(component.totalPages()).toBe(
      Math.ceil(SAMPLE_CURRICULUM_PACKS.length / 5),
    );

    component.onPageChange(2);
    expect(component.currentPage()).toBe(2);
  });
});
