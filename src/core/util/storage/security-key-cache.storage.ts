import { trim } from 'lodash';

export const SEC_STORAGE_KEY = 'SEC_STORAGE_KEY';

/**
 * 对csrf_token的操作
 */
export default class SecurityKeCacheStorage {
  static setKey(key: string): void {
    localStorage.setItem(SEC_STORAGE_KEY, key);
  }
  static getKey(): string | null {
    const token = localStorage.getItem(SEC_STORAGE_KEY);
    return token && trim(token) ? trim(token) : null;
  }
  static removeKey(): void {
    localStorage.removeItem(SEC_STORAGE_KEY);
  }
}
