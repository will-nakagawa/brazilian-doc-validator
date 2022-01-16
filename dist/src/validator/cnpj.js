"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * CNPJ validation
 *
 * @param cnpj string
 *
 * @returns boolean
 *
 */
const cnpjValidate = (cnpj) => {
    const invalidCnpjList = [
        "00000000000000",
        "11111111111111",
        "22222222222222",
        "33333333333333",
        "44444444444444",
        "55555555555555",
        "66666666666666",
        "77777777777777",
        "88888888888888",
        "99999999999999",
    ];
    if (!Boolean(cnpj) || invalidCnpjList.includes(cnpj))
        return false;
    const onlyNumbers = cnpj.replace(/\D/g, "");
    if (onlyNumbers.length < 14)
        return false;
    let length = onlyNumbers.length - 2;
    let numbers = onlyNumbers.substring(0, length);
    let digits = onlyNumbers.substring(length);
    let addition = 0;
    let pos = length - 7;
    for (let i = length; i >= 1; i--) {
        addition += parseInt(numbers.charAt(length - i)) * pos--;
        if (pos < 2)
            pos = 9;
    }
    let result = addition % 11 < 2 ? 0 : 11 - addition % 11;
    if (result !== parseInt(digits.charAt(0)))
        return false;
    length = length + 1;
    numbers = onlyNumbers.substring(0, length);
    addition = 0;
    pos = length - 7;
    for (let i = length; i >= 1; i--) {
        addition += parseInt(numbers.charAt(length - i)) * pos--;
        if (pos < 2)
            pos = 9;
    }
    result = addition % 11 < 2 ? 0 : 11 - addition % 11;
    if (result !== parseInt(digits.charAt(1)))
        return false;
    return true;
};
/**
 * CNPJ Mask
 *
 * @param cnpj string
 *
 * @returns string
 *
 */
const cnpjMask = (cnpj) => {
    if (cnpjValidate(cnpj)) {
        const onlyNumbers = cnpj.replace(/\D/g, "");
        return onlyNumbers.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})*/, '$1.$2.$3/$4-$5');
    }
    return "";
};
/**
 * CNPJ Unmask
 *
 * @param cnpj string
 *
 * @returns string
 *
 */
const cnpjUnmask = (cnpj) => {
    if (cnpjValidate(cnpj)) {
        return cnpj.replace(/\D/g, "");
    }
    return "";
};
/**
 * CNPJ Generation - Generates a valid CNPJ document.
 *
 * @param cnpj string
 *
 * @returns string
 *
 */
const cnpjGenerate = (options = { mask: true }) => {
    const { mask } = options;
    const createCnpjNumber = () => {
        const numbersList = createListNumber();
        numbersList.push(calculateDigitCnpj(numbersList));
        return `${numbersList.join('')}${calculateDigitCnpj(numbersList)}`;
    };
    const createListNumber = () => {
        const numbersList = new Array();
        for (let i = 0; i < 8; i++)
            numbersList.push(randomNumber());
        for (let i = 0; i < 3; i++)
            numbersList.push(0);
        numbersList.push(1);
        return numbersList;
    };
    const randomNumber = () => Math.floor(Math.random() * 9);
    const calculateRestCnpj = (sumDigit) => sumDigit % 11;
    const calculateSumDigit = (numbersList) => {
        let sumDigit = 0;
        let salt = 9;
        for (let i = numbersList.length - 1; i >= 0; i--) {
            sumDigit += numbersList[i] * salt--;
            if (salt < 2)
                salt = 9;
        }
        return sumDigit;
    };
    const calculateDigitCnpj = (numbersList) => {
        const digit = calculateRestCnpj(calculateSumDigit(numbersList));
        return (digit >= 10) ? 0 : digit;
    };
    const newCnpj = createCnpjNumber();
    return (mask) ? cnpjMask(newCnpj) : newCnpj;
};
exports.default = { validate: cnpjValidate, mask: cnpjMask, unmask: cnpjUnmask, generate: cnpjGenerate };
