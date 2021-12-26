import { readFile, writeFile } from 'fs/promises';

const filePath = process.argv[2];

export const writeHackFile = async (file) => {
  const path = filePath.replace(/^([^.]+)\.asm$/, '$1_js.hack');

  const data = new Uint8Array(Buffer.from(file));

  await writeFile(path, data);
}

export const fileLoad = async () => {
  const file = await readFile(filePath, { encoding: 'utf-8' });

  return file;
}

export const numberToBinary = (num) => (num >> 0).toString(2);

export const compTable = {
  '0': '0101010',
  '1': '0111111',
  '-1': '0111010',
  'D': '0001100',
  'A': '0110000',
  'M': '1110000',
  '!D': '0001101',
  '!A': '0110000',
  '!M': '1110000',
  '-D': '0001111',
  '-A': '0110011',
  '-M': '1110011',
  'D+1': '0011111',
  'A+1': '0110111',
  'M+1': '1110111',
  'D-1': '0001110',
  'A-1': '0110010',
  'M-1': '1110010',
  'D+A': '0000010',
  'D+M': '1000010',
  'D-A': '0010011',
  'D-M': '1010011',
  'A-D': '0000111',
  'M-D': '1000111',
  'D&A': '0000000',
  'D&M': '1000000',
  'D|A': '0010101',
  'D|M': '1010101',
};

export const destTable = {
  'M': '001',
  'D': '010',
  'MD': '011',
  'A': '100',
  'AM': '101',
  'AD': '110',
  'AMD': '111',
};

export const jumpTable = {
  JGT: '001',
  JEQ: '010',
  JGE: '011',
  JLT: '100',
  JNE: '101',
  JLE: '110',
  JMP: '111',
};