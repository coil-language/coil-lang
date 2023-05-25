# Setting up

## Macos/Linux

Install [node, npm](https://github.com/nvm-sh/nvm) and [deno](https://deno.com/manual@v1.34.0/getting_started/installation).

There shouldn't be a requirement for a specific node version, but I am on node v20.

## Test your setup

Lets try to compile example.coil (which will also compile the prelude)

```
$> echo 'console.log("hello friends")' > hello.coil
$> npm run compile hello.coil hello.js
$> deno run hello.js
```

## Working on the language

The language is essentially 2 files.

Compiler lives at `src/compiler.coil`
Standard library lives at `/std/prelude.coil`

Each time you compile a file for testing convenience, it also compiles the prelude.

As for working on the compiler, all you have to do is `npm run rebuild` and you'll get "dist/compiler.mjs". We track the dist file in git.

## Tips

It is easy to break the compiler, so commit often, and just revert your 'dist/compiler.mjs' file often.
The parser error messages are very bad at the moment often without line numbers, and when they are there they can be wrong.
Write small code samples at a time and re compile often.

These things will get better, but its not a priority right now.
