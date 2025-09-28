// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import node from "@astrojs/node";

import compressor from "astro-compressor";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    site: "https://example.com",
    integrations: [mdx(), sitemap(), compressor(), react()],
    output: "server",
    adapter: node({
        mode: "standalone",
    }),
});
