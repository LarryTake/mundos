# React Editable Json Tree

[![Node.js CI](https://github.com/oxyno-zeta/react-editable-json-tree/actions/workflows/node.js.yml/badge.svg)](https://github.com/oxyno-zeta/react-editable-json-tree/actions/workflows/node.js.yml) [![npm](https://img.shields.io/npm/v/react-editable-json-tree.svg)]() [![Node version](https://img.shields.io/node/v/react-editable-json-tree)](https://nodejs.org) [![React version](https://img.shields.io/npm/dependency-version/react-editable-json-tree/peer/react)](https://reactjs.org/)

## ⚠ Security advisory

This library was previously affected by an `eval` security vulnerability.
We have taken steps to mitigate this issue with non-breaking changes in this
patch, v2.2.2, but for more info, please read
[our security advisory](https://github.com/oxyno-zeta/react-editable-json-tree/security/advisories/GHSA-j3rv-w43q-f9x2).

If you do not have time to read and want to completely mitigate this issue,
simply set the [allowFunctionEvaluation](#allowfunctionevaluation)
prop to `false`. In the next major version, we will set this value to `false` by
default.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [How to use](#how-to-use)
- [Props](#props)
- [Design](#design)
- [Development](#development)
- [Inspired by](#inspired-by)
- [Thanks](#thanks)
- [Author](#author)
- [License](#license)

## Demo

Demo is available here: [Demo](https://oxyno-zeta.github.io/react-editable-json-tree/)

## Features

- Json viewer
- Collapse node conditionally via callback function
- Add/remove/update node values
- Implicit type inference of new values (`{}` for objects, `[]` for arrays,
  `true` for booleans, etc.)
- Style via callback function
- Make entire structure read-only (or individual nodes, by callback function)
- Callback on global and delta updates
- Supply custom buttons, inputs, etc. via props
- Ability to confirm add/remove/update actions

## How to use

### Install

```bash
npm install react-editable-json-tree
# or
yarn add react-editable-json-tree
```

### Example Usage

```jsx
// Import
import {
    JsonTree,
    ADD_DELTA_TYPE,
    REMOVE_DELTA_TYPE,
    UPDATE_DELTA_TYPE,
    DATA_TYPES,
    INPUT_USAGE_TYPES,
} from 'react-editable-json-tree'

// Data
const data = {
    error: new Error('error'),
    text: 'text',
    int: 100,
    boolean: true,
    null: null,
    object: {
        text: 'text',
        int: 100,
        boolean: true,
    },
    array: [
        1,
        {
            string: 'test',
        },
    ],
}

// Component
<JsonTree data={data} />
```

Here is a screenshot of the result:

![Screenshot](https://github.com/oxyno-zeta/react-editable-json-tree/blob/master/.github/screen1.png)

## Props

### data

| Key  |         Description         |         Type          | Required | Default |
| :--: | :-------------------------: | :-------------------: | :------: | :-----: |
| data | Data to be displayed/edited | `Object &#124; Array` |   True   |  None   |

### rootName

|   Key    |       Description       |   Type   | Required | Default |
| :------: | :---------------------: | :------: | :------: | :-----: |
| rootName | Name of the root object | `string` |  False   |  root   |

### isCollapsed

|     Key     |                      Description                       |    Type    | Required |              Default              |
| :---------: | :----------------------------------------------------: | :--------: | :------: | :-------------------------------: |
| isCollapsed | Whether the node is collapsed (for Array/Object/Error) | `Function` |  False   | `(keyPath, deep) => (deep !== 0)` |

Function parameters:

|   Key   |          Description           |    Type    |                             Example                             |
| :-----: | :----------------------------: | :--------: | :-------------------------------------------------------------: |
| keyPath | Path to the current node/value | `string[]` |     `['object']` for data: `{ object: { string: 'test' } }`     |
|  deep   |   Depth of the current node    |  `number`  | `1` for data: `{ object: { string: 'test' } }` on 'object' node |
|  data   | Data of the current node/value | `unknown`  | `{ string: 'test' }` for data: `{ object: { string: 'test' } }` |

### onFullyUpdate

|      Key      |                                 Description                                  |    Type    | Required |  Default   |
| :-----------: | :--------------------------------------------------------------------------: | :--------: | :------: | :--------: |
| onFullyUpdate | Callback function called upon each update with the entire new data structure | `Function` |  False   | `() => {}` |

Function parameters:

| Key  | Description  |                         Type                         |
| :--: | :----------: | :--------------------------------------------------: |
| data | Updated data | `Object &#124; Array` (same type as the `data` prop) |

### onDeltaUpdate

|      Key      |                                  Description                                  |    Type    | Required |  Default   |
| :-----------: | :---------------------------------------------------------------------------: | :--------: | :------: | :--------: |
| onDeltaUpdate | Callback function called upon each update with only the data that has changed | `Function` |  False   | `() => {}` |

Function parameters:

| Key  | Description |   Type   |
| :--: | :---------: | :------: |
| data | Delta data  | `Object` |

Delta data structure:

|   Key    |            Description            |    Type    |                               Example                               |
| :------: | :-------------------------------: | :--------: | :-----------------------------------------------------------------: |
|   type   |            Delta type             |  `string`  | `'ADD_DELTA_TYPE'`, `'REMOVE_DELTA_TYPE'`, or `'UPDATE_DELTA_TYPE'` |
| keyPath  |  Path to the current node/value   | `string[]` |       `['object']` for data: `{ object: { string: 'test' } }`       |
|   deep   |     Depth of the current node     |  `number`  |   `1` for data: `{ object: { string: 'test' } }` on 'object' node   |
|   key    | Modified/created/removed key name |  `string`  |                                None                                 |
| newValue |             New value             | `unknown`  |                                None                                 |
| oldValue |             Old value             | `unknown`  |                                None                                 |

### readOnly

|   Key    |                                                                                    Description                                                                                    |           Type            | Required |                       Default                       |
| :------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------: | :------: | :-------------------------------------------------: |
| readOnly | If a boolean, whether the entire structure should be read-only. If a function, whether the node/value supplied to the function should be read-only (called for all nodes/values). | `boolean &#124; Function` |  False   | `(keyName, data, keyPath, deep, dataType) => false` |

This function must return a boolean.

Function parameters:

|   Key    |             Description             |    Type    |                                  Example                                   |
| :------: | :---------------------------------: | :--------: | :------------------------------------------------------------------------: |
| keyName  | Key name of the current node/value  |  `string`  |           `'object'` for data: `{ object: { string: 'test' } }`            |
|   data   |   Data of the current node/value    | `unknown`  |      `{ string: 'test' }` for data: `{ object: { string: 'test' } }`       |
| keyPath  |   Path to the current node/value    | `string[]` |          `['object']` for data: `{ object: { string: 'test' } }`           |
|   deep   |      Depth of the current node      |  `number`  |      `1` for data: `{ object: { string: 'test' } }` on 'object' node       |
| dataType | Data type of the current node/value |  `string`  | `'Object'`, `'Array'`, `'Null'`, `'Undefined'`, `'Error'`, `'Number'`, ... |

### getStyle

|   Key    |                               Description                               |    Type    | Required |                       Default                       |
| :------: | :---------------------------------------------------------------------: | :--------: | :------: | :-------------------------------------------------: |
| getStyle | Callback function which should return the CSS style for each node/value | `Function` |  False   | `(keyName, data, keyPath, deep, dataType) => {...}` |

Function parameters:

|   Key    |             Description             |    Type    |                                  Example                                   |
| :------: | :---------------------------------: | :--------: | :------------------------------------------------------------------------: |
| keyName  | Key name of the current node/value  |  `string`  |           `'object'` for data: `{ object: { string: 'test' } }`            |
|   data   |   data of the current node/value    | `unknown`  |      `{ string: 'test' }` for data: `{ object: { string: 'test' } }`       |
| keyPath  |   Path to the current node/value    | `string[]` |          `['object']` for data: `{ object: { string: 'test' } }`           |
|   deep   |      Depth of the current node      |  `number`  |      `1` for data: `{ object: { string: 'test' } }` on 'object' node       |
| dataType | Data type of the current node/value |  `string`  | `'Object'`, `'Array'`, `'Null'`, `'Undefined'`, `'Error'`, `'Number'`, ... |

An example of return:

```javascript
{
    minus: {
        color: 'red',
    },
    plus: {
        color: 'green',
    },
    collapsed: {
        color: 'grey',
    },
    delimiter: {},
    ul: {
        padding: '0px',
        margin: '0 0 0 25px',
        listStyle: 'none',
    },
    name: {
        color: '#2287CD',
    },
    addForm: {},
}
```

You can see the default style definitions in [`src/utils/styles.js`](https://github.com/oxyno-zeta/react-editable-json-tree/blob/master/src/utils/styles.js).

### addButtonElement

|       Key        |                                 Description                                  |     Type      | Required |       Default        |
| :--------------: | :--------------------------------------------------------------------------: | :-----------: | :------: | :------------------: |
| addButtonElement | Custom add button element (to confirm adding a new value to an object/array) | `JSX.Element` |  False   | `<button>+</button>` |

The library will add an `onClick` handler to the element.

### cancelButtonElement

|         Key         |                       Description                        |     Type      | Required |       Default        |
| :-----------------: | :------------------------------------------------------: | :-----------: | :------: | :------------------: |
| cancelButtonElement | Custom cancel button element (to cancel editing a value) | `JSX.Element` |  False   | `<button>c</button>` |

The library will add an `onClick` handler to the element.

### editButtonElement

|        Key        |                      Description                       |     Type      | Required |       Default        |
| :---------------: | :----------------------------------------------------: | :-----------: | :------: | :------------------: |
| editButtonElement | Custom edit button element (to finish editing a value) | `JSX.Element` |  False   | `<button>e</button>` |

The library will add an `onClick` handler to the element.

### inputElement

|     Key      |                 Description                 |             Type              | Required |                            Default                             |
| :----------: | :-----------------------------------------: | :---------------------------: | :------: | :------------------------------------------------------------: |
| inputElement | Custom text input element (to edit a value) | `JSX.Element &#124; Function` |  False   | `(usage, keyPath, deep, keyName, data, dataType) => <input />` |

The library will add a `placeholder`, `ref`, and `defaultValue` prop to the
element. This element will be focused when possible.

Function parameters:

|   Key    |          Description           |    Type    |                                                                    Example                                                                    |
| :------: | :----------------------------: | :--------: | :-------------------------------------------------------------------------------------------------------------------------------------------: |
|  usage   |  Usage of the generated input  |  `string`  | All values are listed in [INPUT_USAGE_TYPES](https://github.com/oxyno-zeta/react-editable-json-tree/blob/master/src/types/inputUsageTypes.js) |
| keyPath  | Path to the current node/value | `string[]` |                                                `[]` for data: `{ object: { string: 'test' } }`                                                |
|   deep   |   Depth of the current node    |  `number`  |                                        `1` for data: `{ object: { string: 'test' } }` on 'object' node                                        |
|   key    | Key of the current node/value  |  `string`  |                                             `'object'` for data: `{ object: { string: 'test' } }`                                             |
|  value   |        Value of the key        | `unknown`  |                               `{ string: 'test' }` for data: `{ object: { string: 'test' } }` on 'object' node                                |
| dataType |     Data type of the value     |  `string`  |       All values are listed in [DATA_TYPES](https://github.com/oxyno-zeta/react-editable-json-tree/blob/master/src/types/dataTypes.js)        |

### textareaElement

|       Key       |                          Description                           |             Type              | Required |                              Default                              |
| :-------------: | :------------------------------------------------------------: | :---------------------------: | :------: | :---------------------------------------------------------------: |
| textareaElement | Custom textarea element (to edit a long value, like functions) | `JSX.Element &#124; Function` |  False   | `(usage, keyPath, deep, keyName, data, dataType) => <textarea />` |

The library will add a `ref` and `defaultValue` prop to the element. This
element will be focused when possible.

Function parameters:

|   Key    |          Description           |    Type    |                                                                    Example                                                                    |
| :------: | :----------------------------: | :--------: | :-------------------------------------------------------------------------------------------------------------------------------------------: |
|  usage   |  Usage of the generated input  |  `string`  | All values are listed in [INPUT_USAGE_TYPES](https://github.com/oxyno-zeta/react-editable-json-tree/blob/master/src/types/inputUsageTypes.js) |
| keyPath  | Path to the current node/value | `string[]` |                                                `[]` for data: `{ object: { string: 'test' } }`                                                |
|   deep   |   Depth of the current node    |  `number`  |                                        `1` for data: `{ object: { string: 'test' } }` on 'object' node                                        |
|   key    | Key of the current node/value  |  `string`  |                                             `'object'` for data: `{ object: { string: 'test' } }`                                             |
|  value   |        Value of the key        | `unknown`  |                               `{ string: 'test' }` for data: `{ object: { string: 'test' } }` on 'object' node                                |
| dataType |     Data type of the value     |  `string`  |       All values are listed in [DATA_TYPES](https://github.com/oxyno-zeta/react-editable-json-tree/blob/master/src/types/dataTypes.js)        |

### minusMenuElement

|       Key        |                            Description                             |     Type      | Required |      Default       |
| :--------------: | :----------------------------------------------------------------: | :-----------: | :------: | :----------------: |
| minusMenuElement | Custom minus menu element (to remove a value from an object/array) | `JSX.Element` |  False   | `<span> - </span>` |

The library will add an `onClick`, `className`, and `style` prop to the element.

### plusMenuElement

|       Key       |                                Description                                |     Type      | Required |      Default       |
| :-------------: | :-----------------------------------------------------------------------: | :-----------: | :------: | :----------------: |
| plusMenuElement | Custom plus menu element (to begin adding a new value to an object/array) | `JSX.Element` |  False   | `<span> + </span>` |

The library will add an `onClick`, `className`, and `style` prop to the element.

### beforeRemoveAction

|        Key         |                                          Description                                          |    Type    | Required |                                Default                                |
| :----------------: | :-------------------------------------------------------------------------------------------: | :--------: | :------: | :-------------------------------------------------------------------: |
| beforeRemoveAction | Async function called upon the user trying to remove a node/value with the minus menu element | `Function` |  False   | `(key, keyPath, deep, oldValue) => new Promise(resolve => resolve())` |

This function must return a `Promise`. If the promise is resolved, the
node/value will be removed. Otherwise, if rejected, nothing will be done.

Function parameters:

|   Key    |            Description             |    Type    |                                     Example                                      |
| :------: | :--------------------------------: | :--------: | :------------------------------------------------------------------------------: |
|   key    | Key name of the current node/value |  `string`  |              `'object'` for data: `{ object: { string: 'test' } }`               |
| keyPath  |   Path to the current node/value   | `string[]` |                 `[]` for data: `{ object: { string: 'test' } }`                  |
|   deep   |     Depth of the current node      |  `number`  |         `1` for data: `{ object: { string: 'test' } }` on 'object' node          |
| oldValue |        Old value of the key        | `unknown`  | `{ string: 'test' }` for data: `{ object: { string: 'test' } }` on 'object' node |

### beforeAddAction

|       Key       |                                       Description                                        |    Type    | Required |                                Default                                |
| :-------------: | :--------------------------------------------------------------------------------------: | :--------: | :------: | :-------------------------------------------------------------------: |
| beforeAddAction | Async function called upon the user trying to add a node/value with the add menu element | `Function` |  False   | `(key, keyPath, deep, newValue) => new Promise(resolve => resolve())` |

This function must return a `Promise`. If the promise is resolved, the
node/value will be added. Otherwise, if rejected, nothing will be done.

Function parameters:

|   Key    |          Description           |    Type    |                               Example                                |
| :------: | :----------------------------: | :--------: | :------------------------------------------------------------------: |
|   key    | Key of the current node/value  |  `string`  |        `'string'` for data: `{ object: { string: 'test' } }`         |
| keyPath  | Path to the current node/value | `string[]` |       `['object']` for data: `{ object: { string: 'test' } }`        |
|   deep   |   Depth of the current node    |  `number`  |   `1` for data: `{ object: { string: 'test' } }` on 'object' node    |
| newValue |      New value of the key      | `unknown`  | `'test'` for data: `{ object: { string: 'test' } }` on 'string' node |

### beforeUpdateAction

|        Key         |                           Description                           |    Type    | Required |                                     Default                                     |
| :----------------: | :-------------------------------------------------------------: | :--------: | :------: | :-----------------------------------------------------------------------------: |
| beforeUpdateAction | Async function called upon the user trying to edit a node/value | `Function` |  False   | `(key, keyPath, deep, oldValue, newValue) => new Promise(resolve => resolve())` |

This function must return a `Promise`. If the promise is resolved, the
node/value will be updated. Otherwise, if rejected, nothing will be done.

Function parameters:

|   Key    |          Description           |    Type    |                                 Example                                  |
| :------: | :----------------------------: | :--------: | :----------------------------------------------------------------------: |
|   key    | Key of the current node/value  |  `string`  |          `'string'` for data: `{ object: { string: 'test' } }`           |
| keyPath  | Path to the current node/value | `string[]` |         `['object']` for data: `{ object: { string: 'test' } }`          |
|   deep   |   Depth of the current node    |  `number`  |     `1` for data: `{ object: { string: 'test' } }` on 'object' node      |
| oldValue |      Old value of the key      | `unknown`  |   `'test'` for data: `{ object: { string: 'test' } }` on 'string' node   |
| newValue |      New value of the key      | `unknown`  | `'update'` for data: `{ object: { string: 'update' } }` on 'string' node |

### logger

|  Key   |                                 Description                                 |   Type   | Required |        Default        |
| :----: | :-------------------------------------------------------------------------: | :------: | :------: | :-------------------: |
| logger | Object used to log errors caught from promises (using only the 'error' key) | `Object` |  False   | `{ error: () => {} }` |

### onSubmitValueParser

|         Key         |                                                                  Description                                                                   |    Type    | Required |                                Default                                 |
| :-----------------: | :--------------------------------------------------------------------------------------------------------------------------------------------: | :--------: | :------: | :--------------------------------------------------------------------: |
| onSubmitValueParser | Function called upon every value addition/update to parse raw string data from inputElements or textareaElements into the correct object types | `Function` |  False   | `(isEditMode, keyPath, deep, key, rawValue) => nativeParser(rawValue)` |

Function parameters:

|    Key     |                                          Description                                          |    Type    |                             Example                             |
| :--------: | :-------------------------------------------------------------------------------------------: | :--------: | :-------------------------------------------------------------: |
| isEditMode | Whether the value is being edited on an existing node/value, otherwise it's being newly added | `boolean`  |                             `True`                              |
|  keyPath   |                                Path to the current node/value                                 | `string[]` |     `['object']` for data: `{ object: { string: 'test' } }`     |
|    deep    |                                   Depth of the current node                                   |  `number`  | `1` for data: `{ object: { string: 'test' } }` on 'object' node |
|    key     |                                 Key of the current node/value                                 |  `string`  |      `'string'` for data: `{ object: { string: 'test' } }`      |
|  rawValue  |                   Raw string value from the inputElement or textareaElement                   |  `string`  |       `'test'` for data: `{ object: { string: 'test' } }`       |

### allowFunctionEvaluation

|           Key           |                                               Description                                               |   Type    | Required | Default |
| :---------------------: | :-----------------------------------------------------------------------------------------------------: | :-------: | :------: | :-----: |
| allowFunctionEvaluation | Allow strings that appear to be Javascript function definitions to be evaluated as Javascript functions | `boolean` |  False   |  True   |

## Design

The library assigns a CSS class to every element. All classes are prefixed with
"rejt" to avoid name clashes. To avoid being linked with a CSS file, the
library itself uses inline styles.

Here is the list of CSS classes, ordered by REJT element and depth, with the
default HTML element on which each class is applied.

### JsonTree

- `rejt-tree` (div)

### JsonObject

#### Collapsed

- `rejt-object-node` (div)
  - `rejt-name` (span)
  - `rejt-collapsed` (span)
    - `rejt-collapsed-text` (span)
    - `rejt-minus-menu` (span)

#### Not Collapsed

- `rejt-object-node` (div)
  - `rejt-name` (span)
  - `rejt-not-collapsed` (span)
    - `rejt-not-collapsed-delimiter` (span)
    - `rejt-not-collapsed-list` (ul)
    - `rejt-not-collapsed-delimiter` (span)
    - `rejt-add-form` (span)
    - `rejt-plus-menu` (span)
    - `rejt-minus-menu` (span)

### JsonArray

#### Collapsed

- `rejt-array-node` (div)
  - `rejt-name` (span)
  - `rejt-collapsed` (span)
    - `rejt-collapsed-text` (span)
    - `rejt-minus-menu` (span)

#### Not Collapsed

- `rejt-array-node` (div)
  - `rejt-name` (span)
  - `rejt-not-collapsed` (span)
    - `rejt-not-collapsed-delimiter` (span)
    - `rejt-not-collapsed-list` (ul)
    - `rejt-not-collapsed-delimiter` (span)
    - `rejt-add-form` (span)
    - `rejt-plus-menu` (span)
    - `rejt-minus-menu` (span)

### JsonAddValue

- `rejt-add-value-node` (span)

### JsonFunctionValue

- `rejt-function-value-node` (li)
  - `rejt-name` (span)
  - `rejt-edit-form` (span)
  - `rejt-value` (span)
  - `rejt-minus-menu` (span)

### JsonValue

- `rejt-value-node` (li)
  - `rejt-name` (span)
  - `rejt-edit-form` (span)
  - `rejt-value` (span)
  - `rejt-minus-menu` (span)

## Development

### npm commands

#### Build

Build the library to `dist/` using parcel.

```bash
npm run build
```

#### Publish

Publishes the library to npm. This runs a parcel build.

```bash
npm publish
```

### Dev app

We have an app available in [`dev_app/`](./dev_app) to test this library in
your browser during development. We use [yalc](https://github.com/wclr/yalc)
to build and link the REJT library inside this subpackage.

If you want to use this dev app, you must run the following command once to
initialize yalc:

```sh
npm run yalcInit
```

This will tell yalc to link `dev_app/` to the root REJT library (this link
is usually stored in `~/.yalc/installations.json` if you're curious). After
initializing, you can run the following command in the root package every
time you make changes to REJT to push the changes to the dev app
(with hot-loading!):

```sh
npm run yalcPush
```

You can run the dev app just like any old create-react-app application (make
sure you're running this inside the `dev_app/` subpackage):

```sh
npm start
```

## Inspired by

- [alexkuz/react-json-tree](https://github.com/alexkuz/react-json-tree)
- [krispo/json-tree](https://github.com/krispo/json-tree)

## Thanks

- My wife BH to support me doing this

## Author

- [Oxyno-zeta (Havrileck Alexandre)](https://github.com/oxyno-zeta)

### Contributors

- [Phanabani](https://github.com/Phanabani)

## License

MIT (see [License.md](https://github.com/oxyno-zeta/react-editable-json-tree/blob/master/LICENSE.md)).
