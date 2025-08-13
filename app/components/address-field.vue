<script setup lang="ts">
import type { FormSubmitEvent } from "@nuxt/ui";
import { z } from "zod";
import type { Address } from "~~/shared/schema";

const addresses = defineModel<Address[]>("addresses", { default: () => [] });
const open = ref<boolean>(false);

const removeAddress = (email: string) => {
  addresses.value = addresses.value.filter((value) => value.address !== email);
};

const state = ref<Address>({
  name: "",
  address: "",
});

const reset = () => {
  state.value = { name: "", address: "" };
};

const schema = z.object({
  name: z.string().min(1, { message: "Name is too short" }).optional(),
  address: z
    .string()
    .email({ message: "Enter a valid email" })
    .refine(
      (val) => !addresses.value.some((address) => val === address.address),
      {
        message: "Email already exists",
      }
    ),
});

const handleSubmit = (event: FormSubmitEvent<Address>) => {
  addresses.value = [...addresses.value, event.data];
  open.value = false;
  reset();
};
</script>

<template>
  <div>
    <div
      class="border border-muted px-1 py-1.5 rounded-lg w-full flex items-center gap-1 flex-wrap">
      <div class="flex items-center flex-wrap gap-1">
        <div
          v-for="address in addresses"
          class="flex items-center text-sm font-medium py-1 px-2 w-fit bg-elevated rounded-full">
          <div>
            <span v-if="address.name">{{ address.name.split(" ")[0] }}: </span>
            <span>{{ address.address }}</span>
          </div>
          <NuxtButton
            icon="lucide-circle-x"
            variant="ghost"
            size="xs"
            class="rounded-full ml-1"
            @click="removeAddress(address.address)" />
        </div>

        <NuxtButton
          class="float-left ml-1 rounded-full"
          style="width: 1.85rem; height: 1.85rem"
          icon="lucide-plus"
          size="sm"
          variant="outline"
          @click="open = true" />
      </div>
    </div>

    <NuxtModal v-model:open="open" title="Address Editor" :dismissible="false">
      <template #body>
        <NuxtForm
          :state
          :schema
          @submit.prevent="handleSubmit"
          class="space-y-4">
          <NuxtFormField name="name" label="Name" class="w-full">
            <NuxtInput v-model="state.name" size="lg" class="w-full" />
          </NuxtFormField>

          <NuxtFormField name="address" label="Address" class="w-full">
            <NuxtInput v-model="state.address" size="lg" class="w-full" />
          </NuxtFormField>

          <div class="w-full flex items-center justify-end gap-2">
            <NuxtButton
              label="Cancel"
              color="neutral"
              variant="soft"
              @click="open = false" />
            <NuxtButton type="submit" label="Submit" />
          </div>
        </NuxtForm>
      </template>
    </NuxtModal>
  </div>
</template>