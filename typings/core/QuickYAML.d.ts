import { QuickYAMLModel, QuickYAMLOptions, YAMLStructure, YAMLTypes } from '../types';
export declare class QuickYAML<Model extends QuickYAMLModel[] = {
    variable: string;
    type: YAMLTypes;
}[]> {
    readonly path: string;
    private readonly options?;
    /**
     * The main constructor to create a non-async database, based on YAML/YML file.
     * @param path The YAML file path.
     * @param options The constructor options.
     */
    constructor(path: `${string}.yml` | `${string}.yaml`, options?: QuickYAMLOptions<Model>);
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
     * Deletes multiple variables from the database.
     */
    purge<K extends Model[number]['variable']>(...variables: K[]): this;
    /**
     * Gets a variable's value from the database, returns `undefined` if it doesn't exist.
     * @param variable The variable's name.
     */
    get<K extends Model[number]['variable'], T extends Extract<Model[number], {
        variable: K;
    }>['type']>(variable: K): T | undefined;
    /**
     * Gets a variable's value from the database, returns a default value instead of `undefined` if it doesn't exist.
     * @param variable The variable's name.
     * @param defaultValue The default value, if the variable doesn't exist.
     */
    ensure<K extends Model[number]['variable'], D extends YAMLTypes>(variable: K, defaultValue: D): Extract<Model[number], {
        variable: K;
    }>['type'] | D;
    /**
     * Gets a variable's object data from the database.
     * @param variable The variable's name.
     */
    find<K extends Model[number]['variable'], T extends Extract<Model[number], {
        variable: K;
    }>['type']>(variable: K): {
        variable: K;
        value: T | undefined;
    };
    /**
     * Pick multiple variables' values from the database.
     * @param variables The variables' name.
     */
    pick<K extends Model[number]['variable'], T extends Model[number]['type']>(...variables: K[]): {
        variable: K;
        value: T;
    }[];
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
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
     * @param func The callback function.
     */
    forEach(func: (value: Model[number]['type'], key: Model[number]['variable'], index: number) => void, thisArg?: unknown): this;
    /**
     * The first value in the database.
     */
    first(): Model[number]['type'] | undefined;
    /**
     * The last value in the database.
     */
    last(): Model[number]["type"] | undefined;
    /**
     * Returns the index of the first occurrence of a variable in the YAML data, or **-1** if it is not present.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
     * @param variable The variable's name.
     */
    indexOf<K extends Model[number]['variable']>(variable: K): number;
    /**
     * Calls a defined callback function on each element of the YAML data, and returns an array that contains the results.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
     * @param func The callback function.
     */
    map<R>(func: (value: Model[number]['type'], key: Model[number]['variable'], index: number) => R, thisArg?: unknown): R[];
    /**
     * Appends new elements to the end of a variable's array, returns the new length of the array. If the variable was not found in the database, it will return **-1**.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
     * @param variable The variable's name.
     * @param values The new values to append.
     */
    push<K extends Model[number]['variable'], T extends Extract<Model[number], {
        variable: K;
    }>['type']>(variable: K, ...values: (T extends YAMLTypes[] ? T : never)): number;
    /**
     * Removes existing elements from a variable's array, returns the new length of the array. If the variable was not found in the database, it will return **-1**.
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
     * @param variable The variable's name.
     * @param values The values to remove.
     * @returns
     */
    pull<K extends Model[number]['variable'], T extends Extract<Model[number], {
        variable: K;
    }>['type']>(variable: K, ...values: (T extends YAMLTypes[] ? T : never)): number;
}
