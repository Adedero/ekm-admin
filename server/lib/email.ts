import { createTransport, SendMailOptions, Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import env from "../utils/env";
import type { TransportName } from "~~/shared/types";

export class EmailService {
  public getTransport: () => ReturnType<typeof createTransport>;
  public config: SMTPTransport.Options;

  constructor(options: SMTPTransport.Options) {
    this.getTransport = () => createTransport(options);
    this.config = options;
  }
}

/* interface TransporterObject {
  config: SMTPTransport.Options;
  getTransport: () => ReturnType<typeof createTransport>;
} */

export const mailTransports: Record<TransportName, EmailService> = {
  finance: new EmailService({
    host: env.get("EMAIL_HOST"),
    port: Number(env.get("EMAIL_PORT")),
    secure: true,
    auth: {
      user: env.get("FINANCE_EMAIL_ADDRESS"),
      pass: env.get("FINANCE_EMAIL_PASSWORD"),
    },
  }),

  contact: new EmailService({
    host: env.get("EMAIL_HOST"),
    port: Number(env.get("EMAIL_PORT")),
    secure: true,
    auth: {
      user: env.get("CONTACT_EMAIL_ADDRESS"),
      pass: env.get("CONTACT_EMAIL_PASSWORD"),
    },
  }),
};

export const sendMail = async (
  transportName: TransportName,
  options: SendMailOptions
): Promise<{
  error: Error | null;
  data: SMTPTransport.SentMessageInfo | null;
}> => {
  const transporter = mailTransports[transportName];

  if (!transporter) {
    return {
      error: new Error(
        `No mail transport was found with the name: '${transportName}'`
      ),
      data: null,
    };
  }

  try {
    const result = await transporter.getTransport().sendMail(options);
    return {
      data: result,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error(String(error)),
    };
  }
};
