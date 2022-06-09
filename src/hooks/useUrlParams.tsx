import { useEffect } from 'react';
import useUrlState from '@ahooksjs/use-url-state';
import { useRequest } from 'ahooks';

const useUrlParams = (
  requestFun: (querys?: { [key: string]: string }) => Promise<any>,
  formatFun?: (data: any) => any,
) => {
  const [query, setQuery] = useUrlState();
  const { data, run } = useRequest(requestFun, { manual: true });
  useEffect(() => {
    if (query) {
      const params = formatFun ? () => formatFun(query) : query;
      run(params);
    }
  }, [query]);
  return [query, setQuery, data];
};

export default useUrlParams;
