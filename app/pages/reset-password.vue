<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { authClient } from "~/lib/auth";
import { ResetPasswordSchema } from "~~/shared/schemas";
import type { ResetPasswordSchemaType } from "~~/shared/schemas";

definePageMeta({
  layout: "auth",
});

const route = useRoute();

const token = route.query.token?.toString();

const state = reactive<ResetPasswordSchemaType>({
  password: "",
  confirmPassword: "",
});


function reset() {
  state.password = "";
  state.confirmPassword = "";
}

const error = ref<Error | null>(null);
const open = ref<boolean>(false);

async function onSubmit(event: FormSubmitEvent<ResetPasswordSchemaType>) {
  error.value = null;

  if (!token) {
    error.value = new Error("Invalid or expired token. Try again later.");
    return;
  }
  const { password } = event.data;

  await authClient.resetPassword(
    {
      newPassword: password,
      token,
    },
    {
      onError(ctx) {
        error.value = new Error(ctx.error.message);
      },
      onSuccess() {
        reset();
        open.value = true;
      },
    }
  );
}
</script>

<template>
  <div>
    <h1 class="text-lg font-semibold">Reset Password</h1>

    <div class="my-5">
      <div>
        <div v-if="error" class="mb-3">
          <FetchErrorAlert :message="error.message" />
        </div>

        <NuxtForm
          :schema="ResetPasswordSchema"
          :state="state"
          class="space-y-4"
          @submit.prevent="onSubmit">
          <NuxtFormField label="New Password" name="password">
            <NuxtPassword v-model="state.password" size="lg" class="w-full" />
          </NuxtFormField>

          <NuxtFormField label="Confirm New Password" name="confirmPassword">
            <NuxtPassword
              v-model="state.confirmPassword"
              size="lg"
              class="w-full" />
          </NuxtFormField>

          <NuxtButton
            type="submit"
            class="mt-2 w-full flex items-center justify-center"
            size="lg"
            icon="i-lucide-check-circle"
            loading-auto>
            Submit
          </NuxtButton>
        </NuxtForm>

        <NuxtModal
          v-model:open="open"
          title="Success"
          :close="false"
          :dismissible="false"
          :ui="{ footer: 'justify-end' }">
          <template #body>
            <div class="space-y-3">
              <p>
                Your password has been reset successfully! Sign in now to
                continue.
              </p>
            </div>
          </template>

          <template #footer>
            <NuxtButton
              :to="{ name: 'login' }"
              label="Sign in"
              trailing-icon="lucide-circle-arrow-right" />
          </template>
        </NuxtModal>
      </div>
    </div>
  </div>
</template>
