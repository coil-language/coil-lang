import coil from "./coil_preprocessor";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [coil()],
  esbuild: {
    supported: {
      "top-level-await": true, //browsers can handle top-level-await features
    },
  },
});
