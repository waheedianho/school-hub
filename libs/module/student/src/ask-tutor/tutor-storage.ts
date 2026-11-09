export const TUTOR_DATABASE = 'school-hub-tutor';
export function openTutorDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(TUTOR_DATABASE, 1);
    let failed = false;
    request.onupgradeneeded = () => request.result.createObjectStore('state');
    request.onsuccess = () => {
      if (failed) request.result.close();
      else resolve(request.result);
    };
    request.onerror = () => {
      failed = true;
      reject(request.error);
    };
    request.onblocked = () => {
      failed = true;
      reject(new Error('Tutor storage is busy in another tab.'));
    };
  });
}
export function loadTutorState(database: IDBDatabase): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction('state', 'readonly');
    const request = transaction.objectStore('state').get('learner');
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    transaction.onabort = () => reject(transaction.error);
  });
}
export function saveTutorState(
  database: IDBDatabase,
  value: unknown,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const transaction = database.transaction('state', 'readwrite');
    transaction.objectStore('state').put(value, 'learner');
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
    transaction.onabort = () => reject(transaction.error);
  });
}
