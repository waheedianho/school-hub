/** Browser download only; callers decide the content and when to record history. */
export function downloadBlob(
  document: Document,
  name: string,
  blob: Blob,
): boolean {
  const view = document.defaultView;
  if (!view) return false;
  const url = view.URL.createObjectURL(blob),
    link = document.createElement('a');
  link.href = url;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  link.remove();
  view.setTimeout(() => view.URL.revokeObjectURL(url), 1000);
  return true;
}
export function downloadTextFile(
  document: Document,
  name: string,
  content: string,
  type = 'text/plain',
): boolean {
  return downloadBlob(
    document,
    name,
    new Blob([content], { type: `${type};charset=utf-8` }),
  );
}
