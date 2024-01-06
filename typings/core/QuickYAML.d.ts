import { YAMLStructure, YAMLTypes } from '../types';
export declare class QuickYAML<T extends YAMLTypes> {
    private readonly path;
    readonly cache: Map<string, T>;
    /**
     * The main constructor to create a non-async database, based on YAML/YML file.
     * @param {QuickYAMLOptions} options The options for the constructor.
     */
    constructor(path: `${string}.yml` | `${string}.yaml`);
    /**
     * Getting everything ready for the database to work.
     * @private
     */
    private _init;
    /**
     * Overwrites the file's content and parses JSON data.
     * @private
     */
    private _write;
    /**
     * Loads the YAML content and parses it to JSON data.
     * @private
     */
    private _load;
    /**
     * Returns the number of keys that exist in the database.
     * @returns {number}
     */
    get size(): number;
    /**
     * Returns the YAML data in JSON format.
     * @returns {YAMLStructure<T>}
     */
    toJSON(): YAMLStructure<T>;
    /**
     * Adds a new variable to the database with a value. If the variable already exist, it will update the variable's value.
     * @param variable The variable name.
     * @param value The variable's value.
     * @returns {this}
     */
    set(variable: string, value: T): this;
    /**
     * Deletes a variable from the database.
     * @param variable The variable name.
     * @returns {this}
     */
    delete(variable: string): this;
    /**
     * Gets a variable's value from the database, returns `undefined` if it doesn't exist.
     * @param variable The variable's name.
     * @returns {T | undefined}
     */
    get(variable: string): T | undefined;
    /**
     * Checks if a variable exist in the database or not.
     * @param variable The variable name.
     * @returns {boolean}
     */
    has(variable: string): boolean;
    /**
     * Deletes every variable in the YAML data.
     * @returns {this}
     */
    clear(): this;
    /**
     * Returns an array of key/values of the enumerable properties of the YAML data.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
     * @returns {[string, T][]}
     */
    entries(): [string, T][];
    /**
     * Returns the names of the enumerable string properties and methods of the YAML data.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
     * @returns {string[]}
     */
    keys(): string[];
    /**
     * Returns an array of values of the enumerable properties of the YAML data.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
     * @returns {T[]}
     */
    values(): T[];
    /**
     * Executes a provided function once per each key/value pair in the YAML data, in insertion order.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach
     * @param func The callback function.
     * @returns {this}
     */
    forEach(func: (value: T, key: string, index: number) => void, thisArg?: unknown): this;
}
