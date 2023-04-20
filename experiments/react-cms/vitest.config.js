import { defineConfig, mergeConfig } from "vite";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      includeSource: "src/**/*.coil",
      setupFiles: "test_setup.js",
      environment: "jsdom",
    },
  })
);
