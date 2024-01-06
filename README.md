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

To start with, create a new database using the class **QuickYAML**:
```ts
import { QuickYAML } from 'quick-yaml.db';

const db = new QuickYAML('example.yaml');
```

You can use any of the methods below to write and parse the YAML file data:
```ts
// Setting a variable in the database:
db.set('user', { name: 'John', age: 24 });

// Checking whenever the variable exist or not:
db.has('user');
// → true

// Getting the variable's value:
db.get('user');
// → { name: 'John', age: 24 }

// Deleting the variable:
db.delete('user');

// Clearing the database:
db.clear();
```

## License
[GNU General Public License 3](#license)