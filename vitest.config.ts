/// <reference types="vitest" />

import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    exclude: [...configDefaults.exclude, "packages/template/*"],
    watch: false,
    coverage: {
      exclude: ["src/types/**", "src/constant/**"],
    },
  },
});
