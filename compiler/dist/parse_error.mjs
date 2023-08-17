export class ParseError extends Error {
  constructor(expected_token_type, { type, line, col }) {
    super(`Expected: ${expected_token_type} got ${type} @ ${line}:${col}`);
    this.stack = new Error().stack;
  }
}
