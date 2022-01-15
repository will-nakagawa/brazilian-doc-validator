/**
 * CPF validation
 * 
 * @param cpf string
 *  
 * @returns boolean
 * 
 */

const cpfValidation = (cpf: string): Boolean => {
    
    if (!Boolean(cpf)) return false;

    const onlyNumbers: string = cpf.replace(/\D/g, "");

    if(onlyNumbers.length < 11) return false;

    let adition: number;
    let remainder: number;

    adition = 0;

    if (onlyNumbers === "00000000000") return false;
    
    for (let i=1; i<=9; i++) {
	    adition = adition + parseInt(onlyNumbers.substring(i-1, i)) * (11 - i);
    }
    
    remainder = (adition * 10) % 11;
    
    if ((remainder == 10) || (remainder == 11)) remainder = 0;
    if (remainder != parseInt(onlyNumbers.substring(9, 10)) ) return false;
	
    adition = 0;
    
    for (let i = 1; i <= 10; i++) {
       adition = adition + parseInt(onlyNumbers.substring(i-1, i)) * (12 - i);
    }

    remainder = (adition * 10) % 11;
    
    if ((remainder == 10) || (remainder == 11)) remainder = 0;
    if (remainder != parseInt(onlyNumbers.substring(10, 11) ) ) return false;
    
    return true;
};

/**
 * CPF remove mask
 * 
 * @param cpf string
 *  
 * @returns string
 * 
 */

const cpfAddMask = (cpf: string) => {
    if(cpfValidation(cpf)) {
        const onlyNumbers: string = cpf.replace(/\D/g, "");
        return onlyNumbers.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})*/, '$1.$2.$3-$4');
    }
    return "";
};

/**
 * CPF add mask
 * 
 * @param cpf string
 *  
 * @returns string
 * 
 */

const cpfRemoveMask = (cpf: string):string => {
    if(cpfValidation(cpf)) return cpf.replace(/\D/g, "");
    return "";
};

const cpfGenerate = (isMasked: boolean):string => {

    let create_array = (total:number, numero:number): number[] => Array.from(Array(total), () => number_random(numero));
    let number_random = (number:number) => (Math.round(Math.random() * number));
    let mod = (dividendo:number, divisor:number):number => Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor));

    let array:number[] = create_array(9, 9);
    
    let d1:number = array[8] * 2 + array[7] * 3 + array[6] * 4 + array[5] * 5 + array[4] * 6 + array[3] * 7 + array[2] * 8 + array[1] * 9 + array[0] * 10;

    d1 = 11 - (mod(d1, 11));
    if (d1 >= 10) d1 = 0;
    
    let d2 = d1 * 2 + array[8] * 3 + array[7] * 4 + array[6] * 5 + array[5] * 6 + array[4] * 7 + array[3] * 8 + array[2] * 9 + array[1] * 10 + array[0] * 11;
    d2 = 11 - (mod(d2, 11));
    if (d2 >= 10) d2 = 0;
    
    if (!Boolean(isMasked))
        return `${array[0]}${array[1]}${array[2]}.${array[3]}${array[4]}${array[5]}.${array[6]}${array[7]}${array[8]}-${d1}${d2}`;
    else
        return `${array[0]}${array[1]}${array[2]}${array[3]}${array[4]}${array[5]}${array[6]}${array[7]}${array[8]}${d1}${d2}`;
}

export default { validate: cpfValidation, mask: cpfAddMask, unmask: cpfRemoveMask, generate: cpfGenerate };
