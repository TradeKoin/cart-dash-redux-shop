
// Type definitions for Service Worker APIs
declare global {
  interface ServiceWorkerRegistration {
    sync?: SyncManager;
  }

  interface SyncManager {
    register(tag: string): Promise<void>;
    getTags(): Promise<string[]>;
  }

  interface ServiceWorkerGlobalScope {
    addEventListener(type: 'sync', listener: (event: SyncEvent) => void): void;
  }

  interface SyncEvent extends Event {
    tag: string;
    waitUntil(promise: Promise<any>): void;
  }
}

export {};
