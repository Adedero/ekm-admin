<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { authClient } from "~/lib/auth";
import { useAuthStore } from "~/stores/auth.store";
import { LoginSchema } from "~~/shared/schemas";
import type { LoginSchemaType } from "~~/shared/schemas";

const authStore = useAuthStore();

const state = reactive<LoginSchemaType>({
  email: "",
  password: "",
  rememberMe: true,
});

function reset() {
  state.email = "";
  state.password = "";
  state.rememberMe = true;
}

const error = ref<Error | null>(null);

async function onSubmit(event: FormSubmitEvent<LoginSchemaType>) {
  error.value = null;

  const encodedEmail = btoa(event.data.email);

  await authClient.signIn.email(event.data, {
    onError(ctx) {
      error.value = new Error(ctx.error.message || ctx.error.statusText);
    },
    async onSuccess() {
      reset();
      const sessionData = await authClient.getSession();

      if (!sessionData.data) {
        throw createError({
          status: 500,
          statusMessage: "Not allowed. Please log in",
          fatal: true,
        });
      }

      authStore.setSession(sessionData.data.session);
      authStore.setUser(sessionData.data.user);

      if (!sessionData.data?.user.emailVerified) {
        await navigateTo({
          name: "email-verification",
          query: { email: encodedEmail },
        });
        return;
      }

      await navigateTo("/");
    },
  });
}
</script>

<template>
  <div>
    <div v-if="error" class="mb-3">
      <FetchErrorAlert :message="error.message" />
    </div>

    <NuxtForm
      :schema="LoginSchema"
      :state="state"
      class="space-y-4"
      @submit.prevent="onSubmit">
      <NuxtFormField label="Email" name="email">
        <NuxtInput v-model="state.email" size="lg" class="w-full" />
      </NuxtFormField>

      <NuxtFormField label="Password" name="password">
        <NuxtPassword v-model="state.password" size="lg" class="w-full" />
      </NuxtFormField>

      <div class="flex items-center gap-2 justify-between">
        <NuxtFormField name="rememberMe">
          <NuxtCheckbox v-model="state.rememberMe" label="Remember me" />
        </NuxtFormField>

        <NuxtLink
          to="/forgot-password"
          class="hover:underline text-sm font-semibold text-primary">
          Forgot password
        </NuxtLink>
      </div>

      <NuxtButton
        type="submit"
        class="mt-2 w-full flex items-center justify-center"
        size="lg"
        icon="i-lucide-log-in"
        loading-auto>
        Submit
      </NuxtButton>
    </NuxtForm>
  </div>
</template>
