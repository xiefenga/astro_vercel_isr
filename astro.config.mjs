// @ts-check

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
  output: "server",
  adapter: vercel({
    isr: {
      // secret token that will be used later for invalidating routes
      bypassToken: "1234567890123456789012345678901234567890",
      // excluding our API from ever being cached
      exclude: [/^\/api\/.+/],
    },
  }),
});
