import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import { sendMail } from "./email";
import * as schema from "../db/schema";
import emailAccounts from "~~/shared/email-accounts";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "sqlite", schema }),

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
    sendResetPassword: async ({ user, url /* token */ } /* request */) => {
      const emailAccount = emailAccounts.find(
        (account) => account.transportName === "contact"
      );
      if (!emailAccount) {
        throw new Error("Email account not found");
      }
      const { error } = await sendMail(emailAccount.transportName, {
        from: {
          name: emailAccount.name,
          address: emailAccount.address,
        },
        to: user.email,
        subject: "Reset your password",
        html: `Hi, ${user.name}!. <br> Click the link to reset your password: ${url}`,
      });

      if (error) throw error;
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url /* token */ } /* request */) => {
      const emailAccount = emailAccounts.find(
        (account) => account.transportName === "contact"
      );
      if (!emailAccount) {
        throw new Error("Email account not found");
      }

      const { error } = await sendMail(emailAccount.transportName, {
        from: {
          name: emailAccount.name,
          address: emailAccount.address,
        },
        to: user.email,
        subject: "Verify your email address",
        html: `Hi, ${user.name}!. <br> Click the link to verify your email: ${url}`,
      });

      if (error) throw error;
    },
  },
});
