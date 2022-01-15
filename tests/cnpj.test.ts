import cnpj from '../src/validator/cnpj';

const emptyCnpj = "";
const validCnpjMasked = "31.257.435/0001-40";
const validCnpjUnmasked = "31257435000140";
const invalidCnpjMasked = "31.257.435/0001-40";
const invalidCnpjUnmasked = "31257435000140";

describe("Correct check if CNPJ is valid", () => {
    it("Check if empty CNPJ is invalid", () => {
        const isValid = cnpj.validate(emptyCnpj);
        expect(isValid).toBeFalsy();
    });

    it("Check if masked CNPJ is valid", () => {
        const isValid = cnpj.validate(validCnpjMasked);
        expect(isValid).toBeTruthy();
    });

    it("Check if unmasked CNPJ is valid", () => {
        const isValid = cnpj.validate(validCnpjUnmasked);
        expect(isValid).toBeTruthy();
    });
});

describe("Correct check if CNPJ is masked", () => {
    it("Should have a correct mask on a valid cnpj or return '' ", () => {
        const newCnpj = cnpj.mask(validCnpjUnmasked);
        expect(newCnpj).toBe(validCnpjMasked);
    });
});

describe("Correct check if CNPJ is unmasked", () => {
    it("Should have a correct unmask on a valid cnpj or return '' ", () => {
        const newCnpj = cnpj.mask(validCnpjUnmasked);
        expect(newCnpj).toBe(validCnpjMasked);
    });
});