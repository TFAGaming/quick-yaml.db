export type YAMLTypes = string | number | boolean | YAMLTypes[] | {
    [key: string]: YAMLTypes;
} | null;
export type YAMLStructure<T> = {
    [key: string]: T;
};
export interface QuickYAMLModel {
    variable: string;
    type: YAMLTypes;
}
