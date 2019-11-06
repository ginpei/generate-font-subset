# @ginpei/generate-font-subset

Generate subset of a font via [fonttools](https://github.com/fonttools/fonttools).

## Install

1. Make sure `fonttools` is available on your environment (See below)
2. Run npm install

```console
$ npm install @ginpei/generate-font-subset
```

### Install `fonttools`

1. Install Python (v2 or v3): https://www.python.org/
2. Install pip: https://pip.pypa.io/en/stable/installing/
3. Then install `fonttools`

```console
$ sudo pip install fonttools
$ pyftsubset --help
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

## License

- MIT

## Author

- Ginpei Takanashi
- GitHub [@ginpei](https://github.com/ginpei/)
- Twitter [@ginpei_en](https://twitter.com/ginpei_en/)
