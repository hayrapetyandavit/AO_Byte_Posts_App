let value = 0;

export const genId = (prefix = "id_"): string => prefix + ++value;