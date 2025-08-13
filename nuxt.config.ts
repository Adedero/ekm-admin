import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  appConfig: {
    ui: {
      colors: {
        primary: "rose"
      }
    }
  },
  compatibilityDate: "2025-07-15",
  css: ["./app/assets/css/main.css"],
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  nitro: {
    buildDir: "dist"
  },
  pages: true,
  vite: {
    plugins: [tailwindcss()],
  },
  ui: {
    prefix: "Nuxt",
    colorMode: false,
  }
});
