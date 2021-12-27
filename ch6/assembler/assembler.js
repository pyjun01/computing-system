import {
  fileLoad,
  writeHackFile,
  numberToBinary,
  compTable,
  destTable,
  jumpTable
} from './util.js';

const constantVar = {
  SP: 0,
  LCL: 1,
  ARG: 2,
  THIS: 3,
  THAT: 4,
  R0: 0,
  R1: 1,
  R2: 2,
  R3: 3,
  R4: 4,
  R5: 5,
  R6: 6,
  R7: 7,
  R8: 8,
  R9: 9,
  R10: 10,
  R11: 11,
  R12: 12,
  R13: 13,
  R14: 14,
  R15: 15,
  SCREEN: 16384,
  KBD: 24576,
};

const getSymbolTable = (arr) => {
  const variableSymbol = [];
  const addressSymbol = {};

  for (let i = 0; i < arr.length; i++) {
    const command = arr[i];
    
    if (command[0] === '@') {
      const key = command.slice(1);

      if (constantVar[key] === undefined) {
        variableSymbol.push(key);
      }
    } else if(command.startsWith('(')) {
      const v = /^\(([^(]+)\)$/.exec(command);
  
      if (v) {
        const key = v[1];
  
        addressSymbol[key] = i - Object.keys(addressSymbol).length;
      }
    }
  }

  let addressIdx = 16;

  const table = variableSymbol.reduce((obj, v) => {
    obj[v] = addressSymbol[v] ?? addressIdx++;

    return obj;
  }, {});

  return Object.assign(table, constantVar);
}

const parseToBinary = (file) => {
  const binaries = [];

  const arr = file.split('\n');
  const sanitize = arr.map(str => str.replace(/\/\/.+/, '').trim()).filter(str => str !== '');

  const table = getSymbolTable(sanitize);

  for (let i = 0; i < sanitize.length; i++) {
    const command = sanitize[i];

    if (command[0] === '(') {
      continue;
    }

    if (command[0] === '@') {
      const key = command.slice(1);

      const address = numberToBinary(isNaN(+key) ? table[key] : key);

      console.log(address.padStart(15, 0));
  
      binaries.push(`0${address.padStart(15, 0)}`);

      continue;
    }


    const [others, jump] = command.split(';');
    const [dest, comp] = others.includes('=') ? others.split('=') : [null, others];

    console.log(dest, comp, jump);

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