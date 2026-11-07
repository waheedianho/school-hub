import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'school-hub-session-whiteboard',
  templateUrl: './session-whiteboard.html',
  styleUrl: './session-whiteboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SessionWhiteboardComponent {
  readonly activeTool = signal<'select' | 'pen' | 'eraser' | 'text' | 'shape'>(
    'pen',
  );
  readonly activeColor = signal<string>('#ef4444');
  readonly zoomLevel = signal<number>(100);
  readonly currentPage = signal<number>(1);
  readonly totalPages = signal<number>(3);

  readonly colorOptions = ['#0f172a', '#ef4444', '#2563eb', '#16a34a'];

  selectTool(tool: 'select' | 'pen' | 'eraser' | 'text' | 'shape'): void {
    this.activeTool.set(tool);
  }

  selectColor(color: string): void {
    this.activeColor.set(color);
  }

  zoomIn(): void {
    if (this.zoomLevel() < 200) {
      this.zoomLevel.update((z) => z + 10);
    }
  }

  zoomOut(): void {
    if (this.zoomLevel() > 50) {
      this.zoomLevel.update((z) => z - 10);
    }
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update((p) => p - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((p) => p + 1);
    }
  }
}
