# Quick-YAML.db
Quick-YAML.db is an open-source Node.js library that allows you to store data in a YAML file easily. The module is fully written in TypeScript to enhance types for JavaScript.

GitHub repository: https://github.com/TFAGaming/quick-yaml.db

## Installation
You must install [js-yaml](https://www.npmjs.com/package/js-yaml) to parse and write YAML data.

```
npm install quick-yaml.db js-yaml
```

## Example Usage
In this example, create a YAML file and set the file's path into the constructor's parameter. The file extensions allowed to use: `.yaml`, `.yml`.

### Define a new database:
Create a new database using the class **QuickYAML** with a model. Using the class without a model will always return `never` to the variable and the type when using any of the methods that are related to the class.

```ts
import { QuickYAML } from 'quick-yaml.db';

type Model = [
    { variable: 'name', type: string },
    { variable: 'age', type: number },
    { variable: 'alive', type: boolean }
];

const db = new QuickYAML('./example.yaml');
```

### The method: `set`
Adds a new variable to the database with a value. If the variable already exist, it will update the variable's value.

```ts
const obj = {
    name: 'John',
    age: 24,
    alive: true
};

db.set('user', obj);
```

### The method: `delete`

Deletes a variable from the database.

```ts
db.delete('user');
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

### The method: `clear`

Deletes every variable in the YAML data.

```ts
db.clear();
```

### Other methods:

```ts
db.entries();
db.keys();
db.values();
db.forEach((value, key, index) => ...);
```

## License
[GNU General Public License v3](#license)