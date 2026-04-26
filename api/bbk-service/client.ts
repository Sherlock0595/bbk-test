import { BbkRootValidator } from '@api/bbk-service/requests/bbk-root';
import { useHttpClient } from '@api/request';
import { safeParse } from 'valibot';

export const useBbkClient = (http = useHttpClient()) => ({
  getRoot() {
    return http.get('/api/v1/bbk/root').then((response) => {
      return safeParse(BbkRootValidator, response.data);
    });
  },
});
