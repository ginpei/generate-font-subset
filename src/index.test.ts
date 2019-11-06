import cp from 'child_process';
import { FontToolsSubsetOptions, FontToolsSubsetResult, generate } from './index';

jest.mock('child_process');

describe('@ginpei/font-subset-builder', () => {
  const spawnMock = cp.spawn as jest.Mock;

  let onMock: jest.Mock;
  let result: FontToolsSubsetResult;

  beforeEach(() => {
    onMock = jest.fn();

    spawnMock.mockReset();
    spawnMock.mockReturnValue({
      stdout: {
        on: jest.fn(),
      },

      stderr: {
        on: jest.fn(),
      },

      on: onMock,
    });
  });

  describe('basic', () => {
    beforeEach(async () => {
      onMock.mockImplementation((type, callback) => {
        if (type === 'close') {
          callback(0);
        }
      });

      result = await generate({
        input: './font.ttf',
        text: 'abc',
      });
    });

    it('passes parameters', () => {
      expect(spawnMock).toBeCalledWith('pyftsubset', ['./font.ttf', '--text=abc']);
    });

    it('returns with the code on close event', () => {
      expect(result.code).toBe(0);
    });
  });

  describe('specified output', () => {
    beforeEach(async () => {
      onMock.mockImplementation((type, callback) => {
        if (type === 'close') {
          callback(0);
        }
      });

      result = await generate({
        input: './font.ttf',
        output: './output.woff',
        text: 'abc',
      });
    });

    it('passes parameters', () => {
      expect(spawnMock).toBeCalledWith(
        'pyftsubset',
        ['./font.ttf', '--text=abc', '--output-file=./output.woff'],
      );
    });
  });

  describe('specified error code', () => {
    beforeEach(async () => {
      onMock.mockImplementation((type, callback) => {
        if (type === 'close') {
          callback(255);
        }
      });

      result = await generate({
        input: './font.ttf',
        text: 'abc',
      });
    });

    it('returns with the code on close event', () => {
      expect(result.code).toBe(255);
    });
  });

  describe('with lack of required parameters', () => {
    it('throws if no input specified', async () => {
      expect.assertions(1);

      try {
        result = await generate({
          // input: './font.ttf',
          text: 'abc',
        } as FontToolsSubsetOptions);
      } catch (error) {
        expect(error).not.toBeUndefined();
      }
    });

    it('throws if no text specified', async () => {
      expect.assertions(1);

      try {
        result = await generate({
          input: './font.ttf',
          // text: 'abc',
        } as FontToolsSubsetOptions);
      } catch (error) {
        expect(error).not.toBeUndefined();
      }
    });
  });

  describe('with error', () => {
    it('rejects if error occurred somehow', async () => {
      expect.assertions(1);

      onMock.mockImplementation((type, callback) => {
        if (type === 'error') {
          callback(new Error('Test'));
        }
      });

      try {
        result = await generate({
          input: './font.ttf',
          text: 'abc',
        });
      } catch (error) {
        expect(error).not.toBeUndefined();
      }
    });
  });
});
