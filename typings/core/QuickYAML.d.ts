import { QuickYAMLModel, YAMLStructure } from '../types';
export declare class QuickYAML<Model extends QuickYAMLModel[] = []> {
    readonly path: string;
    /**
     * The main constructor to create a non-async database, based on YAML/YML file.
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
     */
    get size(): number;
    /**
     * Returns the YAML data in JSON format.
     */
    toJSON<T extends Model[number]['type']>(): YAMLStructure<T>;
    /**
     * Adds a new variable to the database with a value. If the variable already exist, it will update the variable's value.
     * @param variable The variable name.
     * @param value The variable's value.
     */
    set<K extends Model[number]['variable'], T extends Extract<Model[number], {
        variable: K;
    }>['type']>(variable: K, value: T): this;
    /**
     * Deletes a variable from the database.
     * @param variable The variable name.
     */
    delete<K extends Model[number]['variable']>(variable: K): this;
    /**
     * Gets a variable's value from the database, returns `undefined` if it doesn't exist.
     * @param variable The variable's name.
     */
    get<K extends Model[number]['variable']>(variable: K): Extract<Model[number], {
        variable: K;
    }>['type'] | undefined;
    /**
     * Checks if a variable exist in the database or not.
     * @param variable The variable name.
     */
    has<K extends Model[number]['variable']>(variable: K): boolean;
    /**
     * Deletes every variable in the YAML data.
     */
    clear(): this;
    /**
     * Returns an array of key/values of the enumerable properties of the YAML data.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
     */
    entries(): [string, Model[number]['type']][];
    /**
     * Returns the names of the enumerable string properties and methods of the YAML data.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
     */
    keys(): string[];
    /**
     * Returns an array of values of the enumerable properties of the YAML data.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
     */
    values(): Model[number]['type'][];
    /**
     * Executes a provided function once per each key/value pair in the YAML data, in insertion order.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach
     * @param func The callback function.
     */
    forEach(func: (value: Model[number]['type'], key: Model[number]['variable'], index: number) => void, thisArg?: unknown): this;
}
