import type { ApiResponse } from '~/types/types';
import type { BbkRootRecordType } from '@api/bbk-service/requests/bbk-root-validator';

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
