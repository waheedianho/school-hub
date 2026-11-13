import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContentLibraryViewComponent } from './content-library-view';
import { SAMPLE_CONTENT_LIBRARY_ASSETS } from '../../data/super-admin-curriculum.data';

describe('ContentLibraryViewComponent', () => {
  let component: ContentLibraryViewComponent;
  let fixture: ComponentFixture<ContentLibraryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentLibraryViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentLibraryViewComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('assets', SAMPLE_CONTENT_LIBRARY_ASSETS);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render content assets in cards', () => {
    const text = fixture.nativeElement.textContent;
    expect(text).toContain('Whole Numbers & Place Value Interactive Video');
    expect(text).toContain('Algebraic Equations Mastery Worksheet Pack');
  });

  it('should filter assets by type', () => {
    component.typeFilter.set('Video Lesson');
    expect(
      component.filteredAssets().every((a) => a.type === 'Video Lesson'),
    ).toBe(true);
  });

  it('should emit preview and download events', () => {
    const prevSpy = vi.spyOn(component.previewAsset, 'emit');
    const dlSpy = vi.spyOn(component.downloadAsset, 'emit');

    const asset = SAMPLE_CONTENT_LIBRARY_ASSETS[0];
    component.previewAsset.emit(asset);
    component.downloadAsset.emit(asset);

    expect(prevSpy).toHaveBeenCalledWith(asset);
    expect(dlSpy).toHaveBeenCalledWith(asset);
  });
});
