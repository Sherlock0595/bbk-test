import type { ApiResponse } from '~/types/types';
import { BbkRootValidator, type BbkRootRecordType } from '~~/api/bbk-service/requests/bbk-root-validator';
import { safeParse } from 'valibot';
import { useHttpClient } from '@api/request';

export const useBbkClient = (http = useHttpClient()) => ({
  getRoot() {
    return useFetch('/api/v1/bbk/root', {
      method: 'GET',
      transform: (response) => {
        const parsed = safeParse(BbkRootValidator, response.data);

        if (!parsed.success) {
          return { success: false, issues: parsed.issues };
        }

        return { success: true, data: parsed.output };
      },
    });
  },

  async getChildren(id: BbkRootRecordType[number]['id']): Promise<ApiResponse<BbkRootRecordType>> {
    return http.get(`/api/v1/bbk/${id}/children`).then((response) => {
      const parsed = safeParse(BbkRootValidator, response);

      if (!parsed.success) {
        return { success: false, issues: parsed.issues };
      }

      return { success: true, data: parsed.output };
    });
  },
});
