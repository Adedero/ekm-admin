import { d as defineEventHandler, t as toWebRequest } from '../../../nitro/nitro.mjs';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/libsql';
import { s as sendMail } from '../../../_/email.mjs';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { e as emailAccounts } from '../../../_/email-accounts.mjs';
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
import 'nodemailer';

config({ debug: false });
const db = drizzle(process.env.DB_FILE_NAME);

const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  // PK
  name: text("name").notNull(),
  email: text("email").notNull(),
  emailVerified: integer("emailVerified", { mode: "boolean" }).notNull().default(false),
  image: text("image"),
  // optional
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`)
});
const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: text("userId").notNull().references(() => user.id),
  token: text("token").notNull(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  ipAddress: text("ipAddress"),
  // optional
  userAgent: text("userAgent"),
  // optional
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`)
});
const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  userId: text("userId").notNull().references(() => user.id),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  accessTokenExpiresAt: integer("accessTokenExpiresAt", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refreshTokenExpiresAt", {
    mode: "timestamp"
  }),
  scope: text("scope"),
  idToken: text("idToken"),
  password: text("password"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`)
});
const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull().default(sql`CURRENT_TIMESTAMP`)
});

const schema = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  account: account,
  session: session,
  user: user,
  verification: verification
}, Symbol.toStringTag, { value: 'Module' }));

const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "sqlite", schema }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
    }
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: false,
    sendResetPassword: async ({
      user,
      url
      /* token */
    }) => {
      const emailAccount = emailAccounts.find(
        (account) => account.transportName === "contact"
      );
      if (!emailAccount) {
        throw new Error("Email account not found");
      }
      const { error } = await sendMail(emailAccount.transportName, {
        from: {
          name: emailAccount.name,
          address: emailAccount.address
        },
        to: user.email,
        subject: "Reset your password",
        html: `Hi, ${user.name}!. <br> Click the link to reset your password: ${url}`
      });
      if (error) throw error;
    }
  },
  emailVerification: {
    sendVerificationEmail: async ({
      user,
      url
      /* token */
    }) => {
      const emailAccount = emailAccounts.find(
        (account) => account.transportName === "contact"
      );
      if (!emailAccount) {
        throw new Error("Email account not found");
      }
      const { error } = await sendMail(emailAccount.transportName, {
        from: {
          name: emailAccount.name,
          address: emailAccount.address
        },
        to: user.email,
        subject: "Verify your email address",
        html: `Hi, ${user.name}!. <br> Click the link to verify your email: ${url}`
      });
      if (error) throw error;
    }
  }
});

const ____all_ = defineEventHandler((event) => {
  return auth.handler(toWebRequest(event));
});

export { ____all_ as default };
//# sourceMappingURL=_...all_.mjs.map
