import { createAuthClient } from 'better-auth/vue';
import { p as createError } from './server.mjs';

const authClient = createAuthClient({
  fetchOptions: {
    onError: async (context) => {
      const { response } = context;
      if (response.status === 429) {
        const retryAfter = response.headers.get("X-Retry-After");
        createError({
          statusCode: response.status,
          statusMessage: `Too many tries. Retry after ${retryAfter} seconds`,
          fatal: true
        });
      }
    }
  }
});

export { authClient as a };
//# sourceMappingURL=auth-rsizPj0D.mjs.map
