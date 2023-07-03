import * as coil_lang from "../../compiler/dist/compiler.mjs";
const fileRegex = /\.(coil)$/;

export default function coil() {
  return {
    name: "coil-lang",
    transform(src, id) {
      if (fileRegex.test(id)) {
        return {
          code: coil_lang.compile(src),
          map: null,
        };
      }
    },
  };
}
