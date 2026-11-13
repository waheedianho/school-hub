import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentLibraryAsset } from '../../data/super-admin-curriculum.models';

@Component({
  selector: 'school-hub-content-library-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './content-library-view.html',
  styleUrls: ['./content-library-view.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentLibraryViewComponent {
  readonly assets = input.required<ContentLibraryAsset[]>();

  readonly previewAsset = output<ContentLibraryAsset>();
  readonly downloadAsset = output<ContentLibraryAsset>();

  readonly typeFilter = signal<string>('All');
  readonly searchQuery = signal<string>('');

  readonly assetTypes = [
    'All',
    'Lesson Notes',
    'Tutor Guide',
    'Video Lesson',
    'Worksheet',
    'Question Bank',
    'Assessment',
  ];

  readonly filteredAssets = computed(() => {
    const list = this.assets();
    const type = this.typeFilter();
    const query = this.searchQuery().toLowerCase().trim();

    return list.filter((a) => {
      if (type !== 'All' && a.type !== type) return false;
      if (query) {
        const matchesTitle = a.title.toLowerCase().includes(query);
        const matchesSubject = a.subject.toLowerCase().includes(query);
        if (!matchesTitle && !matchesSubject) return false;
      }
      return true;
    });
  });
}
