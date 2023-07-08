import coil from "./coil_preprocessor";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [coil()],
  build: {
    target: "esnext",
  },
});
