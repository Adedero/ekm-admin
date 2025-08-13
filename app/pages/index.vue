<script setup lang="ts">
import type { Address, EmailData } from "~~/shared/schemas";
import { EmailDataSchema } from "~~/shared/schemas";
import emailAccounts from "~~/shared/email-accounts";
import type { IFile } from "~/components/attachment-input.vue";
import template from "~~/shared/email-template";

definePageMeta({
  layout: "main",
  middleware: "auth",
});

const toast = useToast();
const { editor, reset: resetEditor } = useSunEditor("editor");

const emails = ref<Address[]>(
  emailAccounts.map((account) => ({
    name: account.name,
    address: account.address,
  }))
);

const selectedFrom = ref<string>(emails.value[0]!.address);

const emailData = ref<EmailData>({
  from: { name: "", address: "" },
  to: [],
  cc: [],
  bcc: [],
  attachments: [],
  html: "",
  subject: "",
});

const reset = () => {
  emailData.value = {
    from: (emailData.value.from = emails.value.find(
      (email) => email.address === selectedFrom.value
    ) ?? { name: "", address: "" }),
    to: [],
    cc: [],
    bcc: [],
    attachments: [],
    html: "",
    subject: "",
  };
  resetEditor();
};

watch(
  selectedFrom,
  (value) => {
    emailData.value.from = emails.value.find(
      (email) => email.address === value
    ) ?? { name: "", address: "" };
  },
  { immediate: true }
);

const handleSelect = (files: IFile[]) => {
  const attachments = files.map(({ id, fileData, dataUrl }) => ({
    id,
    filename: fileData.name,
    path: dataUrl,
  }));
  emailData.value.attachments = [
    ...attachments,
    ...emailData.value.attachments,
  ].filter(
    (attach): attach is typeof attach & { path: string } =>
      typeof attach.path === "string"
  );
};

const removeAttachment = (id: string) => {
  emailData.value.attachments = emailData.value.attachments.filter(
    (att) => att.id !== id
  );
};

const sendMail = async () => {
  if (!confirm("Send email?")) return;

  emailData.value.html = template({
    subject: emailData.value.subject,
    html: editor.value.getContents(true) || "",
  });

  const { success, error, data } = EmailDataSchema.safeParse(emailData.value);
  if (!success) {
    toast.add({
      color: "error",
      title: "Error",
      description: error.issues[0]?.message,
    });
    return;
  }

  try {
    const res = await $fetch("/api/send-mail", {
      method: "post",
      body: data,
    });
    reset();
    toast.add({
      color: "success",
      title: "Successful",
      description: res.message,
    });
  } catch (err) {
    toast.add({
      color: "error",
      title: "Error",
      description: normalizeException(err).message,
    });
  }
};
</script>

<template>
  <div>
    <header>
      <div class="space-y-2">
        <div class="grid items-center md:grid-cols-12">
          <span class="text-sm font-semibold text-muted">To: </span>
          <AddressField class="col-span-11" v-model:addresses="emailData.to" />
        </div>

        <div class="grid items-center md:grid-cols-12">
          <span class="text-sm font-semibold text-mute">Cc: </span>
          <AddressField class="col-span-11" v-model:addresses="emailData.cc" />
        </div>

        <div class="grid items-center md:grid-cols-12">
          <span class="text-sm font-semibold text-mute">Bcc: </span>
          <AddressField class="col-span-11" v-model:addresses="emailData.bcc" />
        </div>

        <div class="grid items-center md:grid-cols-12">
          <span class="text-sm font-semibold text-mute">Subject: </span>
          <NuxtInput
            v-model="emailData.subject"
            size="lg"
            class="col-span-11 w-full"
            placeholder="Enter your subject..." />
        </div>

        <div class="grid items-center md:grid-cols-12">
          <span class="text-sm font-semibold text-mute">Send From: </span>
          <div class="col-span-11 flex items-center gap-2 flex-wrap">
            <NuxtSelect
              v-model="selectedFrom"
              :items="emails"
              label-key="name"
              value-key="address"
              size="lg" />

            <p class="text-muted text-sm">{{ emailData.from.address }}</p>
          </div>
        </div>
      </div>
    </header>

    <div class="mt-8">
      <textarea id="editor"></textarea>

      <div class="mt-2 flex items-start gap-1 flex-wrap justify-between">
        <div class="grid gap-1">
          <div v-for="att in emailData.attachments">
            <div
              class="w-60 bg-elevated border px-2 py-1 flex gap-1 items-center justify-between">
              <p class="text-xs font-medium truncate w-[90%]">
                {{ att.filename }}
              </p>
              <NuxtButton
                size="xs"
                icon="lucide:circle-x"
                color="neutral"
                variant="soft"
                @click="removeAttachment(att.id)">
              </NuxtButton>
            </div>
          </div>
        </div>

        <div class="mt-2 flex items-center gap-2">
          <AttachmentInput @select="handleSelect" />
          <NuxtButton
            trailing-icon="lucide:send"
            loading-auto
            @click="sendMail">
            Send
          </NuxtButton>
        </div>
      </div>
    </div>
  </div>
</template>
