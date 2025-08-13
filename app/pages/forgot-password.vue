<script setup lang="ts">
import z from "zod";
import { EmailSchema } from "~~/shared/schemas";
import type { FormSubmitEvent } from "@nuxt/ui";
import { authClient } from "~/lib/auth";

definePageMeta({
  layout: "auth",
});

/**
 * Success modal
 */
const open = ref<boolean>(false);

const Schema = z.object({ email: EmailSchema });
type SchemaType = z.infer<typeof Schema>;

const state = reactive<SchemaType>({ email: "" });

function reset() {
  state.email = "";
}

const error = ref<Error | null>(null);
async function onSubmit(event: FormSubmitEvent<SchemaType>) {
  error.value = null;

  await authClient.requestPasswordReset(
    {
      email: event.data.email,
      redirectTo: "/reset-password",
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
    <h1 class="text-lg font-semibold">Forgot Password</h1>

    <div class="my-5">
      <div v-if="error" class="mb-3">
        <FetchErrorAlert :message="error.message" />
      </div>

      <NuxtForm
        :schema="Schema"
        :state="state"
        class="space-y-4"
        @submit.prevent="onSubmit">
        <NuxtFormField label="Email" name="email">
          <NuxtInput v-model="state.email" size="lg" class="w-full" />
        </NuxtFormField>

        <NuxtButton
          type="submit"
          class="mt-2 w-full flex items-center justify-center"
          size="lg"
          icon="i-lucide-check-circle"
          loading-auto
          label="Submit" />
      </NuxtForm>
    </div>

    <div>
      <NuxtSeparator class="my-5" />
      <p class="text-sm text-muted">
        Go back to
        <NuxtLink class="font-semibold hover:underline text-primary" :to="{ name: 'login' }"> log in. </NuxtLink>
      </p>
    </div>

    <NuxtModal v-model:open="open" title="Password reset request">
      <template #body>
        <div class="space-y-3">
          <p>
            Click the link that has been sent to your email address to complete
            the password recovery process.
          </p>

          <NuxtAlert
            variant="subtle"
            color="info"
            icon="i-lucide-triangle-alert"
            :ui="{
              description: 'text-[0.8rem]',
            }"
            :description="`If you do not see an email, you may not have an account.`" />
        </div>
      </template>
    </NuxtModal>
  </div>
</template>
