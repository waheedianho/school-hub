import { downloadTextFile } from '@school-hub/ui-elements';
export function downloadClassFile(
  document: Document,
  name: string,
  content: string,
  type = 'text/plain',
): void {
  downloadTextFile(document, name, content, type);
}
