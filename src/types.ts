export type YAMLTypes = string | number | YAMLTypes[] | { [key: string]: YAMLTypes } | null;

export type YAMLStructure<T extends YAMLTypes> = { [key: string]: T };
