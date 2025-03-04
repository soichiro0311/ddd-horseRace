import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: [],
    env: {
      NODE_ENV: "test",
    },
  },
});
