import { defineNuxtModule } from "@nuxt/kit";
import dotenv from "dotenv";

export default defineNuxtModule((options, nuxt) => {
  nuxt.hook("nitro:init", () => {
    dotenv.config();
  });
});
