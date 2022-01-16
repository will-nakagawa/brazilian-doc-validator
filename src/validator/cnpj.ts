/**
 * CNPJ validation
 *
 * @param {string} cnpj
 *
 * @return {boolean}
 *
 */
const cnpjValidate = (cnpj: string): boolean => {
  const invalidCnpjList = [
    '00000000000000',
    '11111111111111',
    '22222222222222',
    '33333333333333',
    '44444444444444',
    '55555555555555',
    '66666666666666',
    '77777777777777',
    '88888888888888',
    '99999999999999',
  ];

  if (!Boolean(cnpj) || invalidCnpjList.includes(cnpj)) return false;

  const onlyNumbers = cnpj.replace(/\D/g, '');

  if (onlyNumbers.length < 14) return false;

  let length: number = onlyNumbers.length - 2;
  let numbers: string = onlyNumbers.substring(0, length);
  const digits: string = onlyNumbers.substring(length);
  let addition: number = 0;
  let pos: number = length - 7;

  for (let i = length; i >= 1; i--) {
    addition += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let result: number = addition % 11 < 2 ? 0 : 11 - addition % 11;

  if (result !== parseInt(digits.charAt(0))) return false;

  length = length + 1;
  numbers = onlyNumbers.substring(0, length);
  addition = 0;
  pos = length - 7;

  for (let i = length; i >= 1; i--) {
    addition += parseInt(numbers.charAt(length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  result = addition % 11 < 2 ? 0 : 11 - addition % 11;

  if (result !== parseInt(digits.charAt(1))) return false;

  return true;
};

/**
 * CNPJ Mask
 *
 * @param {string} cnpj
 *
 * @return {string}
 *
 */
const cnpjMask = (cnpj: string): string => {
  if (cnpjValidate(cnpj)) {
    const onlyNumbers: string = cnpj.replace(/\D/g, '');
    return onlyNumbers
        .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})*/, '$1.$2.$3/$4-$5');
  }
  return '';
};

/**
 * CNPJ Unmask
 *
 * @param {string} cnpj
 *
 * @return {string}
 *
 */
const cnpjUnmask = (cnpj: string): string => {
  if (cnpjValidate(cnpj)) {
    return cnpj.replace(/\D/g, '');
  }
  return '';
};

/**
 * CNPJ Generation - Generates a valid CNPJ document.
 *
 * @param {Record<string, any>} options
 *
 * @return {string}
 *
 */
const cnpjGenerate = (options: Record<string, any> = {mask: true}): string => {
  const {mask} = options;

  const createCnpjNumber = (): string => {
    const numbersList: number[] = createListNumber();

    numbersList.push(calculateDigitCnpj(numbersList));
    return `${numbersList.join('')}${calculateDigitCnpj(numbersList)}`;
  };

  const createListNumber = () => {
    const numbersList = [];

    for (let i = 0; i < 8; i++) {
      numbersList.push(randomNumber());
    }

    for (let i = 0; i < 3; i++) {
      numbersList.push(0);
    }

    numbersList.push(1);

    return numbersList;
  };

  const randomNumber = () => Math.floor(Math.random() * 9);

  const calculateRestCnpj = (sumDigit: number) => sumDigit % 11;

  const calculateSumDigit = (numbersList: number[]) => {
    let sumDigit: number = 0;
    let salt: number = 9;

    for (let i = numbersList.length - 1; i >= 0; i--) {
      sumDigit += numbersList[i] * salt--;
      if (salt < 2) salt = 9;
    }

    return sumDigit;
  };

  const calculateDigitCnpj = (numbersList:number[]) => {
    const digit = calculateRestCnpj(calculateSumDigit(numbersList));
    return (digit >= 10) ? 0 : digit;
  };

  const newCnpj: string = createCnpjNumber();

  return (mask) ? cnpjMask(newCnpj) : newCnpj;
};

export default {
  validate: cnpjValidate,
  mask: cnpjMask,
  unmask: cnpjUnmask,
  generate: cnpjGenerate,
};
