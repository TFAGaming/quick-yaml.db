# Quick-YAML.db
Quick-YAML.db is an open-source Node.js library that allows you to store data in a YAML file easily. The module is fully written in TypeScript to enhance types for JavaScript.

GitHub repository: https://github.com/TFAGaming/quick-yaml.db

## Changes
- New constructor parameter: `options` (**QuickYAMLOptions**)
- Set default values from each model if a model's variable doesn't exist in the database.
- Handle methods parameters.

## Installation
Use the command below to install the package ([js-yaml](https://www.npmjs.com/package/js-yaml) is also required to install):

```
npm install quick-yaml.db js-yaml
```

## Example Usage
In this example, create a YAML file and set the file's path into the constructor's parameter. The file extensions allowed to use: `.yaml`, `.yml`. The code below is based on TypeScript, using **CommonJS** module.

### Define a new database:
Create a new database using the class **QuickYAML** with a model. Using the class without a model will always return `never` to the variable and the type when using any of the methods that are related to the class.

```ts
import { QuickYAML } from 'quick-yaml.db';

type Model = [
    { variable: 'name', type: string },
    { variable: 'age', type: number },
    { variable: 'alive', type: boolean },
    { variable: 'languages', type: string[] }
];

const db = new QuickYAML<Model>('./example.yaml');
```

If you want to set the variables with a specific value in the database when the manager is ready, use the following method:

```ts
new QuickYAML<Model>('./example.yaml', {
    model: {
        setValuesOnReady: true,
        defaultModelValues: [
            { variable: 'name', value: 'John' },
            { variable: 'age', value: 24 },
            { variable: 'alive', value: true },
            { variable: 'languages', value: ['English', 'French'] }
        ]
    }
});
```

### The method: `set`
Adds a new variable to the database with a value. If the variable already exist, it will update the variable's value.

```ts
const obj = {
    name: 'John',
    age: 24,
    alive: true,
    languages: ['English', 'French']
};

type Keys = keyof typeof obj;

for (const key in obj) {
    db.set(key as Keys, obj[key as Keys]);
};
```

The YAML file content when the method is used:

```yaml
name: John
age: 24
alive: true
languages:
  - English
  - French
```

### The method: `has`

Checks if a variable exist in the database or not.

```ts
db.has('name');
db.has('age');
db.has('hobbies');
```

The return for each of the tests above:

```ts
true
true
false
```

### The method: `get`

Gets a variable's value from the database, returns `undefined` if it doesn't exist.

```ts
db.get('name');
db.get('age');
db.get('hobbies');
```

The return for each of the tests above:

```ts
'John'
24
undefined
```

### The method: `find`

Gets a variable's object data from the database.

```ts
db.find('name');
db.find('languages');
db.find('hobbies');
```

The return for each of the tests above:

```ts
{ variable: 'name', value: 'John' }
{ variable: 'languages', value: ['English', 'French'] }
{ variable: 'hobbies', value: undefined }
```

### The method: `delete`

Deletes a variable from the database.

```ts
db.delete('name');
```

### The method: `clear`

Deletes every variable in the YAML data.

```ts
db.clear();
```

### Other methods:

Object related functions:
```ts
db.entries();

db.keys();
db.values();
```

Array related functions:

```ts
db.first();
db.last();

db.indexOf(variable);

db.push(variable, ...values);
db.pull(variable, ...values);

db.map((value, key, index) => ...);
db.forEach((value, key, index) => ...);
```

Other useful functions:
```ts
db.ensure(variable, default_value);

db.pick(...variables);
db.purge(...variables);
```

## License
[GNU General Public License v3](#license)