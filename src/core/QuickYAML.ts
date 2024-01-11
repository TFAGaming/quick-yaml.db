import jsyaml from 'js-yaml';
import fs from 'node:fs';
import { QuickYAMLModel, QuickYAMLOptions, YAMLStructure, YAMLTypes } from '../types';

export class QuickYAML<Model extends QuickYAMLModel[] = { variable: string, type: YAMLTypes }[]> {
    public readonly path: string;
    private readonly options?: QuickYAMLOptions<Model>;

    /**
     * The main constructor to create a non-async database, based on YAML/YML file.
     * @param path The YAML file path.
     * @param options The constructor options.
     */
    public constructor(path: `${string}.yml` | `${string}.yaml`, options?: QuickYAMLOptions<Model>) {
        this.path = path;
        this.options = options;

        if (!fs.existsSync(this.path)) throw new Error('The file path was not found');

        if (!(this.path.endsWith('.yaml') || this.path.endsWith('.yml'))) throw new Error('The file path is must end with .yaml or .yml');

        if ((this.options?.model?.defaultModelValues.length || 0) > 0 && this.options?.model?.setValuesOnReady) {
            for (const model of this.options.model.defaultModelValues) {
                if (this.has(model.variable)) continue;

                this.set(model.variable, model.value);
            };
        };
    };

    /**
     * Overwrites the file's content and parses JSON data.
     * @private
     */
    private _write<T extends Model[number]['type']>(obj: YAMLStructure<T>): void {
        if (!fs.existsSync(this.path)) throw new Error('The file path was not found or was deleted');

        try {
            const size = Object.keys(obj).length;

            if (size <= 0) {
                fs.writeFileSync(this.path, '', 'utf-8');
            } else {
                const data = jsyaml.dump(obj);

                fs.writeFileSync(this.path, data, 'utf-8');
            };
        } catch (err) {
            throw new Error('Unable to write the YAML file');
        };
    };

    /**
     * Loads the YAML content and parses it to JSON data.
     * @private
     */
    private _load<T extends Model[number]['type']>(): YAMLStructure<T> {
        if (!fs.existsSync(this.path)) throw new Error('The file path was not found or was deleted');

        try {
            const data = jsyaml.load(fs.readFileSync(this.path, 'utf-8')) as YAMLStructure<T>;

            return data || {};
        } catch (err) {
            throw new Error('Unable to parse the YAML file');
        };
    };

    /**
     * Returns the number of keys that exist in the database.
     */
    public get size(): number {
        return this.keys().length;
    };

    /**
     * Returns the YAML data in JSON format.
     */
    public toJSON<T extends Model[number]['type']>(): YAMLStructure<T> {
        return this._load();
    };

    /**
     * Adds a new variable to the database with a value. If the variable already exist, it will update the variable's value.
     * @param variable The variable name.
     * @param value The variable's value.
     */
    public set<K extends Model[number]['variable'], T extends Extract<Model[number], { variable: K }>['type']>(variable: K, value: T): this {
        let obj = this.toJSON();

        obj[variable] = value;

        this._write(obj);

        return this;
    };

    /**
     * Deletes a variable from the database.
     * @param variable The variable name.
     */
    public delete<K extends Model[number]['variable']>(variable: K): this {
        let obj = this.toJSON();

        if (variable in obj) {
            delete obj[variable];

            this._write(obj);
        };

        return this;
    };

    /**
     * Deletes multiple variables from the database.
     */
    public purge<K extends Model[number]['variable']>(...variables: K[]): this {
        let obj = this.toJSON();

        for (const variable of variables) {
            if (variable in obj) delete obj[variable];
        };

        this._write(obj);

        return this;
    };

    /**
     * Gets a variable's value from the database, returns `undefined` if it doesn't exist.
     * @param variable The variable's name.
     */
    public get<K extends Model[number]['variable'], T extends Extract<Model[number], { variable: K }>['type']>(variable: K): T | undefined {
        const obj = this.toJSON();

        return variable in obj ? obj[variable] as T : undefined;
    };

    /**
     * Gets a variable's value from the database, returns a default value instead of `undefined` if it doesn't exist.
     * @param variable The variable's name.
     * @param defaultValue The default value, if the variable doesn't exist.
     */
    public ensure<K extends Model[number]['variable'], D extends YAMLTypes>(variable: K, defaultValue: D): Extract<Model[number], { variable: K }>['type'] | D {
        const obj = this.toJSON();

        return variable in obj ? obj[variable] : defaultValue;
    };

    /**
     * Gets a variable's object data from the database.
     * @param variable The variable's name.
     */
    public find<K extends Model[number]['variable'], T extends Extract<Model[number], { variable: K }>['type']>(variable: K): { variable: K, value: T | undefined } {
        const value = this.get(variable);

        return {
            variable,
            value: value as T
        };
    };

    /**
     * Pick multiple variables' values from the database.
     * @param variables The variables' name.
     */
    public pick<K extends Model[number]['variable'], T extends Model[number]['type']>(...variables: K[]): { variable: K, value: T }[] {
        const arr = [];

        for (const variable of variables) {
            if (!this.has(variable)) continue;

            arr.push({
                variable: variable,
                value: this.get(variable) as T
            });
        };

        return arr;
    };

    /**
     * Checks if a variable exist in the database or not.
     * @param variable The variable name.
     */
    public has<K extends Model[number]['variable']>(variable: K): boolean {
        const obj = this.toJSON();

        return variable in obj;
    };

    /**
     * Deletes every variable in the YAML data.
     */
    public clear(): this {
        this._write({});

        return this;
    };

    /**
     * Returns an array of key/values of the enumerable properties of the YAML data.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
     */
    public entries(): [string, Model[number]['type']][] {
        const obj = this.toJSON();

        return Object.entries(obj);
    };

    /**
     * Returns the names of the enumerable string properties and methods of the YAML data.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
     */
    public keys(): string[] {
        const obj = this.toJSON();

        return Object.keys(obj);
    };

    /**
     * Returns an array of values of the enumerable properties of the YAML data.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
     */
    public values(): Model[number]['type'][] {
        const obj = this.toJSON();

        return Object.values(obj);
    };

    /**
     * Executes a provided function once per each key/value pair in the YAML data, in insertion order.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
     * @param func The callback function.
     */
    public forEach(func: (value: Model[number]['type'], key: Model[number]['variable'], index: number) => void, thisArg?: unknown): this {
        if (thisArg !== undefined) func = func.bind(thisArg);

        const obj = this.toJSON();

        let i = 0;

        for (const variable in obj) {
            func(obj[variable], variable, i);

            i++;
        };

        return this;
    };

    /**
     * The first value in the database.
     */
    public first(): Model[number]['type'] | undefined {
        const data = this.values();

        return data[0] || undefined;
    };

    /**
     * The last value in the database.
     */
    public last(): Model[number]["type"] | undefined {
        const data = this.values();

        return data[this.size - 1] || undefined;
    };

    /**
     * Returns the index of the first occurrence of a variable in the YAML data, or **-1** if it is not present.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
     * @param variable The variable's name.
     */
    public indexOf<K extends Model[number]['variable']>(variable: K): number {
        return this.keys().indexOf(variable);
    };

    /**
     * Calls a defined callback function on each element of the YAML data, and returns an array that contains the results.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
     * @param func The callback function.
     */
    public map<R>(func: (value: Model[number]['type'], key: Model[number]['variable'], index: number) => R, thisArg?: unknown): R[] {
        if (thisArg !== undefined) func = func.bind(thisArg);

        let currentIndex = 0;

        return Array.from({ length: this.size }, () => {
            const keys = this.keys();

            currentIndex++;

            return func(this.get(keys[currentIndex - 1]) as Model[number]['type'], keys[currentIndex], currentIndex - 1);
        });
    };

    /**
     * Appends new elements to the end of a variable's array, returns the new length of the array. If the variable was not found in the database, it will return **-1**.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
     * @param variable The variable's name.
     * @param values The new values to append.
     */
    public push<K extends Model[number]['variable'], T extends Extract<Model[number], { variable: K }>['type']>(variable: K, ...values: (T extends YAMLTypes[] ? T : never)): number {
        const data = this.toJSON();

        if (!this.has(variable)) return -1;

        (data[variable] as any[]).push(...values);

        this._write(data);

        return (data[variable] as any[]).length;
    };

    /**
     * Removes existing elements from a variable's array, returns the new length of the array. If the variable was not found in the database, it will return **-1**.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
     * @param variable The variable's name.
     * @param values The values to remove.
     * @returns 
     */
    public pull<K extends Model[number]['variable'], T extends Extract<Model[number], { variable: K }>['type']>(variable: K, ...values: (T extends YAMLTypes[] ? T : never)): number {
        const data = this.toJSON();

        if (!this.has(variable)) return -1;

        for (const value of values) {
            if ((data[variable] as any[]).includes(value)) data[variable] = (data[variable] as any[]).filter((v) => v !== value);
        };

        this._write(data);

        return (data[variable] as any[]).length;
    };
};
