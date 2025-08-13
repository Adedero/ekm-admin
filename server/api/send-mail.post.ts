import { EmailDataSchema } from "~~/shared/schemas";
import { sendMail } from "../lib/email";
import emailAccounts from "~~/shared/email-accounts";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, EmailDataSchema.safeParse);

  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: body.error.issues[0]!.message,
    });
  }

  const { data } = body;

  const emailAccount = emailAccounts.find(
    (account) => account.address === data.from.address
  );

  if (!emailAccount) {
    throw createError({
      statusCode: 400,
      statusMessage: `Cannot send email from account: "${data.from.address} because the account has not been registered."`,
    });
  }
  const { error } = await sendMail(emailAccount.transportName, data);

  if (error) {
    throw createError({
      statusCode: 400,
      statusMessage: `Failed to send email. Server returned the response: ${error.message}.`,
    });
  }

  return {
    success: true,
    message: "Email sent successfully",
  };
});
