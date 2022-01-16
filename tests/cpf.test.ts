import cpf from '../src/validator/cpf';

const emptyCpf = "";
const validCpf = "047.145.880-52";
const validOnlyNumbers = "04714588052";
const invalidCpfLength = "047.145.880-5";
const invalidCpf = "047.145.880-54";
const invalidOnlyNumbers = "04714588054";

describe("CPF Validation test", () => {
    it('Correct check if CPF is null or empty', () => {
        const isEmpty = cpf.validate(emptyCpf);
        expect(isEmpty).toBeFalsy();
    });
    
    it('Correct check if CPF provided is valid', () => {
        const isValid = cpf.validate(validCpf);
        expect(isValid).toBeTruthy();
    });
    
    it('Correct check if CPF provided is invalid', () => {
        const isValid = cpf.validate(invalidCpf);
        expect(isValid).toBeFalsy();
    });

    it('Correct check if CPF provided has correct length', () => {
        const isValid = cpf.validate(invalidCpfLength);
        expect(isValid).toBeFalsy();
    });

    it('Correct check if CPF provided is 00000000000 ', () => {
        const isValid = cpf.validate("00000000000");
        expect(isValid).toBeFalsy();
    });
    
});

describe("CPF Mask test", () => {
    it('Correct check if CPF is null or empty', () => {
        const isEmpty = cpf.mask(emptyCpf);
        expect(isEmpty).toBe("");
    });

    it('Correct check if CPF is masked in the right format ', () => {
        const valid = cpf.mask(validOnlyNumbers);
        expect(valid).toBe(validCpf);
    });

    it('Correct check if invalid CPF returns empty string', () => {
        const invalid = cpf.mask(invalidOnlyNumbers);
        expect(invalid).toBe("");
    });
});

describe("CPF Unmask test", () => {
    it('Correct check if CPF is null or empty', () => {
        const isEmpty = cpf.unmask(emptyCpf);
        expect(isEmpty).toBe("");
    });

    it('Correct check if CPF unmasked (only numbers)', () => {
        const valid = cpf.unmask(validCpf);
        expect(valid).toBe(validOnlyNumbers);
    });

    it('Correct check if invalid CPF returns empty string', () => {
        const invalid = cpf.unmask(invalidOnlyNumbers);
        expect(invalid).toBe("");
    });
});

describe("CPF Generator test", () => {
    it('Correct check if generated CPF is valid and unmasked', () => {
        const cpfGenerated = cpf.generate({mask: true});
        const isValid = cpf.validate(cpfGenerated);
        expect(isValid).toBeTruthy();
    });

    it('Correct check if generated CPF is valid and masked', () => {
        const cpfGenerated = cpf.generate({mask: false});
        const isValid = cpf.validate(cpfGenerated);
        expect(isValid).toBeTruthy();
    });
});

