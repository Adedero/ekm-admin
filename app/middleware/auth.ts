import { authClient } from "~/lib/auth";
import { useAuthStore } from "~/stores/auth.store";

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) return;

  const session = await authClient.getSession();

  if (!session.data) {
    return navigateTo("/login");
  }

  const authStore = useAuthStore();
  authStore.setUser(session.data.user);
  authStore.setSession(session.data.session);
});
