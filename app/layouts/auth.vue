<template>
  <main>
    <header class="p-4 flex items-center gap-2 justify-between">
      <p class="text-primary font-semibold text-xl">
        Eileen Katherine Murray
        <span class="text-xs text-muted">ADMIN</span>
      </p>

      <div class="flex items-center gap-2">
        <NuxtButton to="login" label="Log in" color="neutral" variant="soft" />
        <NuxtButton to="register" label="Sign up" />
      </div>
    </header>

    <NuxtSeparator />

    <div class="p-4 min-h-[calc(100dvh-5rem)] flex items-center justify-center">
      <div class="w-full max-w-96 my-20">
        <NuxtCard>
          <NuxtPage />
        </NuxtCard>
      </div>
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
