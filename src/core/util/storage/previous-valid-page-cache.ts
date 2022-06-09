const PREVIOUS_VALID_PAGE = 'PREVIOUS_VALID_PAGE';
/**
 * 保存登录失效的页面路由
 */
export default class PreviousPageValidCache {
  static setKey(key: string) {
    localStorage.setItem(PREVIOUS_VALID_PAGE, key);
  }
  static getKey() {
    return localStorage.getItem(PREVIOUS_VALID_PAGE);
  }
  static removeKey() {
    return localStorage.removeItem(PREVIOUS_VALID_PAGE);
  }
}
