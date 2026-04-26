import type { ApiResponse } from '@/types';
import type { BbkRootRecordType } from '@api/bbk-service/requests/bbk-root';

export const useHttpClient = () => {
  return {
    get(path: string): Promise<ApiResponse<BbkRootRecordType>> {
      return $fetch(path, { method: 'GET' });
    },
    post() {},
    put() {},
    delete() {},
  };
};
