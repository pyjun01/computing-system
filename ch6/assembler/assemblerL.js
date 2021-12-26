import {
  fileLoad,
  writeHackFile,
  numberToBinary,
  compTable,
  destTable,
  jumpTable
} from './util.js';

const parseToBinary = (file) => {
  const binaries = [];

  const arr = file.split('\n');
  const sanitize = arr.map(str => str.replace(/\/\/.+/, '').trim()).filter(str => str !== '');

  for (let i = 0; i < sanitize.length; i++) {
    const command = sanitize[i];

    if (command[0] === '@') {
      const address = numberToBinary(command.slice(1));
  
      binaries.push(`0${address.padStart(15, 0)}`);

      continue;
    }

    const [others, jump] = command.split(';');
    const [dest, comp] = others.includes('=') ? others.split('=') : [null, others];

    binaries.push(`111${compTable[comp]}${destTable[dest] ?? '000'}${jumpTable[jump] ?? '000'}`);
  }

  return binaries.join('\n');
}


const run = async () => {
  const file = await fileLoad();

  const binary = await parseToBinary(file);

  await writeHackFile(binary);
}

run();