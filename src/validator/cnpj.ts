/**
 * CNPJ validation
 * 
 * @param cnpj string
 *  
 * @returns boolean
 * 
 */

const cnpjValidate = (cnpj: string): boolean => {
    // todo

    if(!Boolean(cnpj)) return false;

    const onlyNumbers = cnpj.replace(/\D/g, "");

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

 const cnpjMask = (cnpj: string): string => {
    if(cnpjValidate(cnpj)) {
        const onlyNumbers: string = cnpj.replace(/\D/g, "");
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
const cnpjUnmask = (cnpj: string): string => {
    if(cnpjValidate(cnpj)) {
        return cnpj.replace(/\D/g, "");
    }
    return "";
};

/**
 * CNPJ Generation
 * 
 * @param cnpj string
 *  
 * @returns string
 * 
 */
 const cnpjGenerate = (isMaked: boolean): string => {
     // todo
    return "";
};

export default { validate: cnpjValidate, mask: cnpjMask, unmask: cnpjUnmask, generate: cnpjGenerate };