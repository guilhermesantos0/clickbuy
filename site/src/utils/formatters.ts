const onlyNumbers = (value: string): string => value.replace(/\D/g, '');

export const formatPhoneNumber = (value: string): string => {
    const cleaned = onlyNumbers(value);
  
    if (cleaned.length <= 2) {
      return `(${cleaned}`;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    } else if (cleaned.length <= 10) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
    } else {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
    }
};
  
export const formatCPF = (value: string): string => {
    const cleaned = onlyNumbers(value);
    return cleaned
        .replace(/^(\d{3})(\d)/, '$1.$2')
        .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1-$2');
};

export const formatCEP = (value: string): string => {
    const cleaned = onlyNumbers(value);
    return cleaned.replace(/^(\d{5})(\d)/, '$1-$2');
};

export const formatDate = (value: string): string => {
    const cleaned = onlyNumbers(value);
    if (cleaned.length <= 2) {
      return cleaned;
    } else if (cleaned.length <= 4) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    } else {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
    }
};