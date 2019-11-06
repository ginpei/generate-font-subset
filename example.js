const { generate } = require('./lib');

main();

async function main() {
  const input = process.argv[2];
  if (!input) {
    console.log('Usage: node example <path/to/font.ttf>');
    return;
  }

  const result = await generate({
    input,
    text: 'Hello',
  });

  if (result.code === 0) {
    console.log('OK');
  } else {
    process.stderr.write(`\x1b[31mFailed with code ${result.code}\x1b[0m`);
    process.stderr.write('\n');
    process.stderr.write(`\x1b[2m${result.errorOutput}\x1b[0m`);
  }
}
