import { ComponentType, lazy, LazyExoticComponent, ReactNode } from 'react';

export interface RouterProps {
  // 路径
  path: string;
  // 预加载页面
  fallback?: ReactNode;
  // 加载组件
  element: LazyExoticComponent<ComponentType<unknown>>;
  //子路由
  children?: RouterProps[];
  // 重定向路由
  redirect?: string;
  // 区分大小写
  caseSensitive?: boolean;
}
export const routers: RouterProps[] = [
  {
    path: '/',
    element: lazy(() => import('../component/Home')),
    fallback: null,
    caseSensitive: true,
    children: [
      {
        path: '/container',
        element: lazy(() => import('../component/Container')),
        caseSensitive: true,
      },
      {
        path: '/case',
        element: lazy(() => import('../component/Home')),
      },
      {
        path: '/footer',
        element: lazy(() => import('../component/Footer')),
        caseSensitive: true,
        children: [
          {
            path: '/footer/a',
            element: lazy(() => import('../component/Home')),
          },
        ],
      },
    ],
  },
];
