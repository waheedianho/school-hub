import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StorageCardComponent } from './storage-card';

describe('StorageCardComponent', () => {
  let fixture: ComponentFixture<StorageCardComponent>;
  let component: StorageCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorageCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StorageCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('storageUsedBytes', 1.5 * 1024 * 1024 * 1024);
    fixture.componentRef.setInput(
      'storageTotalBytes',
      5.0 * 1024 * 1024 * 1024,
    );
    fixture.detectChanges();
  });

  it('calculates and renders storage percentage and format', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('1.5 GB of 5.0 GB');
    expect(text).toContain('30%');
  });

  it('emits manageRequested when button is clicked', () => {
    let fired = false;
    component.manageRequested.subscribe(() => (fired = true));

    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(fired).toBe(true);
  });
});
