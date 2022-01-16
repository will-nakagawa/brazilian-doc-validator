/**
 * CPF validation
 *
 * @param {string} cpf
 *
 * @returns {boolean}
 *
 */

const cpfValidation = (cpf: string): Boolean => {
  if (!Boolean(cpf)) return false;

  const onlyNumbers: string = cpf.replace(/\D/g, '');

  if (onlyNumbers.length < 11) return false;

  let adition: number;
  let remainder: number;

  adition = 0;

  if (onlyNumbers === '00000000000') return false;

  for (let i = 1; i <= 9; i++) {
    adition = adition + parseInt(onlyNumbers.substring(i - 1, i)) * (11 - i);
  }

  remainder = (adition * 10) % 11;

  if ((remainder == 10) || (remainder == 11)) remainder = 0;
  if (remainder != parseInt(onlyNumbers.substring(9, 10))) return false;

  adition = 0;

  for (let i = 1; i <= 10; i++) {
    adition = adition + parseInt(onlyNumbers.substring(i - 1, i)) * (12 - i);
  }

  remainder = (adition * 10) % 11;

  if ((remainder == 10) || (remainder == 11)) remainder = 0;
  if (remainder != parseInt(onlyNumbers.substring(10, 11))) return false;

  return true;
};

/**
 * CPF remove mask
 *
 * @param {string} cpf
 *
 * @returns {string}
 *
 */

const cpfAddMask = (cpf: string) => {
  if (cpfValidation(cpf)) {
    const onlyNumbers: string = cpf.replace(/\D/g, '');
    return onlyNumbers.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})*/, '$1.$2.$3-$4');
  }
  return '';
};

/**
 * CPF add mask
 *
 * @param {string} cpf
 *
 * @returns {string}
 *
 */

const cpfRemoveMask = (cpf: string): string => {
  if (cpfValidation(cpf)) return cpf.replace(/\D/g, '');
  return '';
};

/**
 * CPF Generator
 *
 * @param {Record<string, any>} options
 *
 * @return {string}
 *
 */
const cpfGenerate = (options: Record<string, any> = {mask: true}): string => {
  const {mask} = options;

  const createArray =
    (total: number, numero: number): number[] => Array.from(
        Array(total),
        () => numberRandom(numero),
    );

  const numberRandom = (number: number) => (Math.round(Math.random() * number));
  const mod = (dividendo: number, divisor: number): number =>
    Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor));

  const array: number[] = createArray(9, 9);

  const formulaReducer = (number: number, array: number[]): number => {
    return array.reduce((prevVal, elem, index) => {
      return prevVal + elem * (number - index);
    }, 0);
  };

  let d1: number = formulaReducer(10, array);

  d1 = 11 - (mod(d1, 11));
  if (d1 >= 10) d1 = 0;

  let d2: number = (d1 * 2) + formulaReducer(11, array);

  d2 = 11 - (mod(d2, 11));

  if (d2 >= 10) d2 = 0;

  const newCpf: string = `${array.join('')}${d1}${d2}`;

  return (mask) ? cpfAddMask(newCpf) : newCpf;
};

export default {
  validate: cpfValidation,
  mask: cpfAddMask,
  unmask: cpfRemoveMask,
  generate: cpfGenerate,
};
