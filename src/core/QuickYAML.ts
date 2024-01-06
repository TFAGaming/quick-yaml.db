import jsyaml from 'js-yaml';
import fs from 'node:fs';
import { QuickYAMLModel, YAMLStructure, YAMLTypes } from '../types';

export class QuickYAML<Model extends QuickYAMLModel[] = []> {
    public readonly path: string;

    /**
     * The main constructor to create a non-async database, based on YAML/YML file.
     */
    public constructor(path: `${string}.yml` | `${string}.yaml`) {
        this.path = path;

        this._init();
    };

    /**
     * Getting everything ready for the database to work.
     * @private
     */
    private _init(): void {
        if (!fs.existsSync(this.path)) throw new Error('The file path was not found');

        if (!(this.path.endsWith('.yaml') || this.path.endsWith('.yml'))) throw new Error('The file path is must end with .yaml or .yml');
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
     * Gets a variable's value from the database, returns `undefined` if it doesn't exist.
     * @param variable The variable's name.
     */
    public get<K extends Model[number]['variable']>(variable: K): Extract<Model[number], { variable: K }>['type'] | undefined {
        const obj = this.toJSON();

        return variable in obj ? obj[variable] : undefined;
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
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach
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
};