<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
</script>

<template>
  <div>
    <h1 class="text-lg font-semibold">Sign In</h1>
    <div class="text-sm text-muted">
      Don't have an account?
      <NuxtLink
        class="text-primary font-semibold hover:underline"
        :to="{ name: 'register' }"
      >
        Register
      </NuxtLink>
      instead.
    </div>

    <div class="my-5">
      <LoginForm />
    </div>
  </div>
</template>
