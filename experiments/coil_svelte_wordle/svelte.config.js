import coilCompiler from "./dist/compiler.js";
import sveltePreprocess from "svelte-preprocess";

export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: sveltePreprocess({
    coil: ({ content }) => {
      return { code: coilCompiler(content) };
    },
  }),
};
