# @ginpei/generate-font-subset

Generate subset of a font via [fonttools](https://github.com/fonttools/fonttools).

## Install

1. Make sure `fonttools` is available on your environment (See next section)
2. Run npm install

```console
$ npm install @ginpei/generate-font-subset
```

## usage

### Basic

The following code generates a font file `font.subset.woff` containing only 4 characters `a`, `X`, `!`, and `@` in the same directory as the original `font.ttf`.

```js
const { generate } = require('./lib');

main();

async function main() {
  const result = await generate({
    input: 'path/to/font.ttf',
    text: 'aX!@',
  });

  if (result.code === 0) {
    console.log('OK');
  } else {
    process.stderr.write(`\x1b[31mFailed with code ${result.code}\x1b[0m`);
    process.stderr.write('\n');
    process.stderr.write(`\x1b[2m${result.errorOutput}\x1b[0m`);
  }
}
```
