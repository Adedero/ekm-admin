<script setup lang="ts">
import { authClient } from "~/lib/auth";

const toast = useToast();

const signOut = async () => {
  await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        navigateTo("/login");
      },
      onError: (ctx) => {
        toast.add({
          color: "success",
          title: "Error",
          description: ctx.error.message || ctx.error.statusText,
        });
      },
    },
  });
};
</script>

<template>
  <main>
    <header class="p-4 flex items-center gap-2 justify-between">
      <p class="text-primary font-semibold text-xl">
        Eileen Katherine Murray
        <span class="text-xs text-muted">ADMIN</span>
      </p>

      <NuxtButton label="Log out" loading-auto @click="signOut" />
    </header>

    <NuxtSeparator />

    <div class="p-4">
      <NuxtPage />
    </div>

    <NuxtSeparator />

    <footer class="p-4">
      <div class="flex items-center gap-2 justify-between text-xs">
        <p>&copy; 2025 Eileen Katherine Murray</p>

        <p class="text-muted">Made by <b>Unix</b></p>
      </div>
    </footer>
  </main>
</template>
