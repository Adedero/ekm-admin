import { createTransport } from 'nodemailer';
import { e as env } from '../nitro/nitro.mjs';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
class EmailService {
  constructor(options) {
    __publicField(this, "getTransport");
    __publicField(this, "config");
    this.getTransport = () => createTransport(options);
    this.config = options;
  }
}
const mailTransports = {
  finance: new EmailService({
    host: env.get("EMAIL_HOST"),
    port: Number(env.get("EMAIL_PORT")),
    secure: true,
    auth: {
      user: env.get("FINANCE_EMAIL_ADDRESS"),
      pass: env.get("FINANCE_EMAIL_PASSWORD")
    }
  }),
  contact: new EmailService({
    host: env.get("EMAIL_HOST"),
    port: Number(env.get("EMAIL_PORT")),
    secure: true,
    auth: {
      user: env.get("CONTACT_EMAIL_ADDRESS"),
      pass: env.get("CONTACT_EMAIL_PASSWORD")
    }
  })
};
const sendMail = async (transportName, options) => {
  const transporter = mailTransports[transportName];
  if (!transporter) {
    return {
      error: new Error(
        `No mail transport was found with the name: '${transportName}'`
      ),
      data: null
    };
  }
  try {
    const result = await transporter.getTransport().sendMail(options);
    return {
      data: result,
      error: null
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error : new Error(String(error))
    };
  }
};

export { sendMail as s };
//# sourceMappingURL=email.mjs.map
