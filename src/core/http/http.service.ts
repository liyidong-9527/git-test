import ErrorHandle from './error-handler';
import instance from './axios.config';
import { isArray } from 'lodash';
import SecurityKeCacheStorage from '../util/storage/security-key-cache.storage';
export interface Result {
  code: number;
  message: string;
  data: any;
}

export interface StringKeyObj {
  [key: string]: any;
}

export const AUTH_TOKEN = 'YSJ_AUTH_TOKEN';
// Hack:右上角对日期取JSON全部是保存时间戳秒
// const appToJsonFunc: (key?: string) => string = function (key?: string) {
//   return Math.floor(this.getTime() / 1000) as any;
// };
export type UrlPrefixType = 'default' | 'version3' | 'common';
/**
 * 封装与处理ajax请求
 */
export default class HttpService {
  /**
   * 根据接口类型拼接请求地址 y2、c2、y3
   */
  static fixUrl(url: string, prefixType: UrlPrefixType = 'default') {
    if (url.indexOf('/') !== 0) {
      url = '/' + url;
    }
    if (!url.startsWith('a') && !url.startsWith('') && !url.startsWith('')) {
      const urlPrefix = prefixType === 'version3' ? 'y3' : prefixType === 'common' ? 'c2' : 'y2';
      url = urlPrefix + url;
    }
    return url;
  }
  /**
   * 格式化请求参数，主要是将请求参数中的列表封装为item[]:string
   */
  static getParams(query?: StringKeyObj | null, method?: string) {
    if (!query) {
      return;
    }
    const params: any = {};
    Object.keys(query).forEach(key => {
      const item = query[key];
      if (item) {
        if (isArray(item)) {
          item.forEach(el => {
            if (isArray(el)) {
              params[`${key.toString()}[${el[0]}]`] = el[1];
            } else {
              params[`${key.toString()}[]`] = el;
            }
          });
        } else {
          params[key.toString()] = item;
        }
      } else {
        if (method === 'post') {
          params[key.toString()] = '';
        }
      }
    });
    return params;
  }
  /**
   * 获取请求头信息
   */
  static getHttpHeaders() {
    const token = SecurityKeCacheStorage.getKey();
    if (!token) {
      ErrorHandle.loginOut('WITHOUT_AUTH_TOKEN');
      return;
    }
    return {
      [AUTH_TOKEN]: token,
    };
  }

  static getBlobHttpHeaders(contentType: string) {
    const headers: any = this.getHttpHeaders();
    headers['Content-Type'] = contentType;
    return headers;
  }

  /**
   * 不需要带Token的请求
   */
  static getWithOutToken(url: string, query?: StringKeyObj) {
    const completeUrl = this.fixUrl(url);
    return instance.get(completeUrl, {
      params: this.getParams(query),
      responseType: 'json',
    });
  }

  static get(url: string, query?: StringKeyObj) {
    return instance.get(this.fixUrl(url), {
      params: this.getParams(query),
      headers: this.getHttpHeaders(),
      responseType: 'json',
    });
  }
  static getBlob(
    url: string,
    contentType: string,
    query: StringKeyObj | null = null,
    urlPrefixType: UrlPrefixType = 'default',
  ) {
    return instance.get(this.fixUrl(url, urlPrefixType), {
      params: this.getParams(query),
      headers: this.getBlobHttpHeaders(contentType),
      responseType: 'blob',
    });
  }
  static post(
    url: string,
    body: any,
    query: StringKeyObj | null = null,
    urlprefixType: UrlPrefixType = 'default',
  ) {
    return instance.post(this.fixUrl(url, urlprefixType), body, {
      params: this.getParams(query, 'post'),
      headers: this.getHttpHeaders(),
      responseType: 'json',
    });
  }
  static postBlob(
    url: string,
    contentType: string,
    body: any,
    query: StringKeyObj | null = null,
    urlPtrfixType: UrlPrefixType = 'default',
  ) {
    return instance.post(this.fixUrl(url, urlPtrfixType), body, {
      params: this.getParams(query, 'post'),
      headers: this.getBlobHttpHeaders(contentType),
      responseType: 'blob',
    });
  }
}
