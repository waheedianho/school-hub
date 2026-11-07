import { PortfolioDraft } from './portfolio.model';

export const PORTFOLIO_DATABASE = 'school-hub-portfolio';
const STORE = 'drafts';
export function openPortfolioDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(PORTFOLIO_DATABASE, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE))
        request.result.createObjectStore(STORE, { keyPath: 'taskId' });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onblocked = () =>
      reject(new Error('Portfolio storage is busy in another tab.'));
  });
}
export function loadPortfolioDrafts(database: IDBDatabase): Promise<unknown[]> {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE, 'readonly');
    const request = transaction.objectStore(STORE).getAll();
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    transaction.onabort = () => reject(transaction.error);
  });
}
export function savePortfolioDrafts(
  database: IDBDatabase,
  drafts: readonly PortfolioDraft[],
): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE, 'readwrite');
    for (const draft of drafts) transaction.objectStore(STORE).put(draft);
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}
