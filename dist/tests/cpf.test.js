"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cpf_1 = __importDefault(require("../src/validator/cpf"));
const emptyCpf = "";
const validCpf = "047.145.880-52";
const validOnlyNumbers = "04714588052";
const invalidCpfLength = "047.145.880-5";
const invalidCpf = "047.145.880-54";
const invalidOnlyNumbers = "04714588054";
describe("CPF Validation test", () => {
    it('Correct check if CPF is null or empty', () => {
        const isEmpty = cpf_1.default.validate(emptyCpf);
        expect(isEmpty).toBeFalsy();
    });
    it('Correct check if CPF provided is valid', () => {
        const isValid = cpf_1.default.validate(validCpf);
        expect(isValid).toBeTruthy();
    });
    it('Correct check if CPF provided is invalid', () => {
        const isValid = cpf_1.default.validate(invalidCpf);
        expect(isValid).toBeFalsy();
    });
    it('Correct check if CPF provided has correct length', () => {
        const isValid = cpf_1.default.validate(invalidCpfLength);
        expect(isValid).toBeFalsy();
    });
    it('Correct check if CPF provided is 00000000000 ', () => {
        const isValid = cpf_1.default.validate("00000000000");
        expect(isValid).toBeFalsy();
    });
});
describe("CPF Mask test", () => {
    it('Correct check if CPF is null or empty', () => {
        const isEmpty = cpf_1.default.mask(emptyCpf);
        expect(isEmpty).toBe("");
    });
    it('Correct check if CPF is masked in the right format ', () => {
        const valid = cpf_1.default.mask(validOnlyNumbers);
        expect(valid).toBe(validCpf);
    });
    it('Correct check if invalid CPF returns empty string', () => {
        const invalid = cpf_1.default.mask(invalidOnlyNumbers);
        expect(invalid).toBe("");
    });
});
describe("CPF Unmask test", () => {
    it('Correct check if CPF is null or empty', () => {
        const isEmpty = cpf_1.default.unmask(emptyCpf);
        expect(isEmpty).toBe("");
    });
    it('Correct check if CPF unmasked (only numbers)', () => {
        const valid = cpf_1.default.unmask(validCpf);
        expect(valid).toBe(validOnlyNumbers);
    });
    it('Correct check if invalid CPF returns empty string', () => {
        const invalid = cpf_1.default.unmask(invalidOnlyNumbers);
        expect(invalid).toBe("");
    });
});
describe("CPF Generator test", () => {
    it('Correct check if generated CPF is valid and unmasked', () => {
        const cpfGenerated = cpf_1.default.generate({ mask: true });
        const isValid = cpf_1.default.validate(cpfGenerated);
        expect(isValid).toBeTruthy();
    });
    it('Correct check if generated CPF is valid and masked', () => {
        const cpfGenerated = cpf_1.default.generate({ mask: false });
        const isValid = cpf_1.default.validate(cpfGenerated);
        expect(isValid).toBeTruthy();
    });
});
