import { spawn } from 'child_process';

export type FontToolsSubsetOptions = {
  /**
   * The input font file path.
   */
  input: string;

  /**
   * The output font file. If not specified, the subsetted font will be saved
   * in as font-file.subset.
   */
  output?: string;

  /**
   * Specify characters to include in the subset, as UTF-8 string.
   */
  text: string;
}

export type FontToolsSubsetResult = {
  code: number;
  errorOutput: string;
  output: string;
}

export function generate(options: FontToolsSubsetOptions) {
  return new Promise<FontToolsSubsetResult>((resolve, reject) => {
    if (!options.input || !options.text) {
      throw new Error('Arguments must include: input, text');
    }

    const args = [
      options.input,
      `--text=${options.text}`,
    ];

    if (options.output) {
      args.push(`--output-file=${options.output}`);
    }

    const pyftsubset = spawn('pyftsubset', args);

    let output = '';
    let errorOutput = '';

    pyftsubset.stderr.on('data', (chunk) => {
      errorOutput += String(chunk);
    });

    pyftsubset.on('data', (chunk) => {
      output += String(chunk);
    });

    pyftsubset.on('close', (code) => {
      resolve({ code, errorOutput, output });
    });

    pyftsubset.on('error', (error) => {
      reject(error);
    });
  });
}
