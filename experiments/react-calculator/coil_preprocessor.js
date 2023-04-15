import { compile } from "./coil/compiler";
const fileRegex = /\.(coil)$/;

export default function coil() {
  return {
    name: "coil-lang",
    transform(src, id) {
      if (fileRegex.test(id)) {
        return {
          code: compile(src),
          map: null,
        };
      }
    },
  };
}
