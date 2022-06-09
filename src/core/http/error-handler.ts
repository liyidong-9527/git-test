import { message, Modal } from 'antd';
import SecurityKeCacheStorage from '../util/storage/security-key-cache.storage';
import { useNavigate } from 'react-router';
const navigate = useNavigate();
export default class ErrorHandle {
  static loginOut(code: number | string = '未知') {
    SecurityKeCacheStorage.removeKey();
    Modal.warning({
      closeIcon: false,
      onOk: () => {
        ErrorHandle.toLogin();
      },
      content: `登录已失效（${code}），请重新登录！`,
    });
  }

  static serverError(code: number | string = '未知'): void {
    message.error(`系统错误（错误码${code}），尝试刷新或联系技术人员。`);
  }

  static goDashboard() {
    Modal.warning({
      onOk: () => {
        navigate('/dashboard', { replace: true });
      },
      content: '您的权限发生改变，将为您导航至首页！',
    });
  }
  static toLogin() {
    SecurityKeCacheStorage.removeKey();
    window.location.href = 'projectConfig.userSystemURL';
    return false;
  }
}
