import cnpj from '../src/validator/cnpj';

const emptyCnpj = "";
const validCnpjMasked = "31.257.435/0001-40";
const validCnpjUnmasked = "31257435000140";
const invalidCnpjMasked = "31.257.435/0001-4";
const invalidCnpjUnmasked = "3125743500014";

describe("CNPJ Validation Test", () => {
    it("Should validate a valid CNPJ number", () => {
        const isValid = cnpj.validate(emptyCnpj);
        expect(isValid).toBeFalsy();
    });

    it("Should validate a valid CNPJ masked number", () => {
        const isValid = cnpj.validate(validCnpjMasked);
        expect(isValid).toBeTruthy();
    });

    it("Should validate a valid CNPJ unmasked number", () => {
        const isValid = cnpj.validate(validCnpjUnmasked);
        expect(isValid).toBeTruthy();
    });

    it("Should validate a invalid CNPJ masked number", () => {
        const isValid = cnpj.validate(invalidCnpjMasked);
        expect(isValid).toBeFalsy();
    });

    it("Should validate a invalid CNPJ unmasked number", () => {
        const isValid = cnpj.validate(invalidCnpjUnmasked);
        expect(isValid).toBeFalsy();
    });
});

describe("CNPJ Mask Test", () => {
    it("Should have a correct mask on a valid cnpj or return empty string", () => {
        const newCnpj = cnpj.mask(validCnpjUnmasked);
        expect(newCnpj).toBe(validCnpjMasked);
    });

    it("Should return empty string on invalid CNPJ", () => {
        const newCnpj = cnpj.mask(invalidCnpjUnmasked);
        expect(newCnpj).toBe("");
    });
});

describe("CNPJ Unmask Test", () => {
    it("Should have a correct unmask on a valid cnpj or return empty string", () => {
        const newCnpj = cnpj.unmask(validCnpjMasked);
        expect(newCnpj).toBe(validCnpjUnmasked);
    });

    it("Should return empty string on invalid CNPJ", () => {
        const newCnpj = cnpj.unmask(invalidCnpjUnmasked);
        expect(newCnpj).toBe("");
    });
});

describe("CNPJ Generator Test", () => {
    
    it("Should generate a valid cnpj", () => {
        const newCnpj = cnpj.generate();
        const isValid = cnpj.validate(newCnpj);
        expect(isValid).toBeTruthy();
    });

    it("Should generate a valid cnpj and formmat", () => {
        const newCnpj = cnpj.generate({format: true});
        const isValid = cnpj.validate(newCnpj);
        expect(isValid).toBeTruthy();
    });

});