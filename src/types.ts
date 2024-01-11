export type YAMLTypes = string | number | boolean | YAMLTypes[] | { [key: string]: YAMLTypes } | null;

export type YAMLStructure<T> = { [key: string]: T };

export interface QuickYAMLModel {
    variable: string,
    type: YAMLTypes
};

export interface QuickYAMLModelDefValue<Model extends QuickYAMLModel[]> {
    variable: Model[number]['variable'],
    value: Model[number]['type']
};

export interface QuickYAMLOptions<Model extends QuickYAMLModel[]> {
    model?: {
        setValuesOnReady?: boolean,
        defaultModelValues: QuickYAMLModelDefValue<Model>[]
    }
};