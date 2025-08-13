import { d as defineEventHandler, r as readValidatedBody, c as createError } from '../../nitro/nitro.mjs';
import { E as EmailDataSchema } from '../../_/schemas.mjs';
import { s as sendMail } from '../../_/email.mjs';
import { e as emailAccounts } from '../../_/email-accounts.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'zod';
import 'nodemailer';

const sendMail_post = defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, EmailDataSchema.safeParse);
  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0].message
    });
  }
  const { data } = body;
  const emailAccount = emailAccounts.find(
    (account) => account.address === data.from.address
  );
  if (!emailAccount) {
    throw createError({
      statusCode: 400,
      statusMessage: `Cannot send email from account: "${data.from.address} because the account has not been registered."`
    });
  }
  const { error } = await sendMail(emailAccount.transportName, data);
  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: `Failed to send email. Server returned the response: ${error.message}.`
    });
  }
  return {
    success: true,
    message: "Email sent successfully"
  };
});

export { sendMail_post as default };
//# sourceMappingURL=send-mail.post.mjs.map
