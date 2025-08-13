<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
</script>

<template>
  <div>
    <h1 class="text-lg font-semibold">Register</h1>
    <div class="text-sm text-muted">
      Already got an account?
      <NuxtLink
        class="text-primary font-semibold hover:underline"
        :to="{ name: 'login' }">
        Log in
      </NuxtLink>
      instead.
    </div>

    <div class="my-5">
      <RegisterForm />
    </div>
  </div>
</template>
