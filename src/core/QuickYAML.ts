import jsyaml from 'js-yaml';
import fs from 'node:fs';
import { YAMLStructure, YAMLTypes } from '../types';

export class QuickYAML<T extends YAMLTypes> {
    private readonly path: string;
    public readonly cache = new Map<string, T>();

    /**
     * The main constructor to create a non-async database, based on YAML/YML file.
     * @param {QuickYAMLOptions} options The options for the constructor.
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

        if (!this.path.endsWith('.yaml') || !this.path.endsWith('.yml')) throw new Error('The file path is not a YAML file (.yaml and .yml allowed only)')

        const data = this.toJSON();

        for (const key in data) {
            this.cache.set(key, data[key]);
        };
    };

    /**
     * Overwrites the file's content and parses JSON data.
     * @private
     */
    private _write(obj: YAMLStructure<T>): void {
        if (!fs.existsSync(this.path)) throw new Error('The file path was not found or was deleted');

        try {
            const size = Object.keys(obj).length;

            if (size <= 0) {
                fs.writeFileSync(this.path, '', 'utf-8');

                this.cache.clear();
            } else {
                const data = jsyaml.dump(obj);

                fs.writeFileSync(this.path, data, 'utf-8');

                this.cache.clear();

                for (const key in obj) {
                    this.cache.set(key, obj[key]);
                };
            };
        } catch (err) {
            throw new Error('Unable to write the YAML file');
        };
    };

    /**
     * Loads the YAML content and parses it to JSON data.
     * @private
     */
    private _load(): YAMLStructure<T> {
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
     * @returns {number}
     */
    public get size(): number {
        return this.keys().length;
    };

    /**
     * Returns the YAML data in JSON format.
     * @returns {YAMLStructure<T>}
     */
    public toJSON(): YAMLStructure<T> {
        return this._load();
    };

    /**
     * Adds a new variable to the database with a value. If the variable already exist, it will update the variable's value.
     * @param variable The variable name.
     * @param value The variable's value.
     * @returns {this}
     */
    public set(variable: string, value: T): this {
        let obj = this.toJSON();

        obj[variable] = value;

        this._write(obj);

        return this;
    };

    /**
     * Deletes a variable from the database.
     * @param variable The variable name.
     * @returns {this}
     */
    public delete(variable: string): this {
        let obj = this.toJSON();

        if (variable in obj) {
            delete obj[variable];

            this.cache.delete(variable);

            this._write(obj);
        };

        return this;
    };

    /**
     * Gets a variable's value from the database, returns `undefined` if it doesn't exist.
     * @param variable The variable's name.
     * @returns {T | undefined}
     */
    public get(variable: string): T | undefined {
        const obj = this.toJSON();

        return variable in obj ? obj[variable] : undefined;
    };

    /**
     * Checks if a variable exist in the database or not.
     * @param variable The variable name.
     * @returns {boolean}
     */
    public has(variable: string): boolean {
        const obj = this.toJSON();

        return variable in obj;
    };
    
    /**
     * Deletes every variable in the YAML data.
     * @returns {this}
     */
    public clear(): this {
        this._write({});

        return this;
    };

    /**
     * Returns an array of key/values of the enumerable properties of the YAML data.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
     * @returns {[string, T][]}
     */
    public entries(): [string, T][] {
        const obj = this.toJSON();

        return Object.entries(obj);
    };

    /**
     * Returns the names of the enumerable string properties and methods of the YAML data.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
     * @returns {string[]}
     */
    public keys(): string[] {
        const obj = this.toJSON();

        return Object.keys(obj);
    };

    /**
     * Returns an array of values of the enumerable properties of the YAML data.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
     * @returns {T[]}
     */
    public values(): T[] {
        const obj = this.toJSON();

        return Object.values(obj);
    };

    /**
     * Executes a provided function once per each key/value pair in the YAML data, in insertion order.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach
     * @param func The callback function.
     * @returns {this}
     */
    public forEach(func: (value: T, key: string, index: number) => void, thisArg?: unknown): this {
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