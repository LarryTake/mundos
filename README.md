React Editable Json Tree
========================
[![Build Status](https://travis-ci.org/oxyno-zeta/react-editable-json-tree.svg?branch=master)](https://travis-ci.org/oxyno-zeta/react-editable-json-tree)[![Build Status](https://circleci.com/gh/oxyno-zeta/react-editable-json-tree.png)](https://circleci.com/gh/oxyno-zeta/react-editable-json-tree)[![npm](https://img.shields.io/npm/v/react-editable-json-tree.svg)]()

## ⚠ Security advisory

This library was previously affected by an `eval` security vulnerability.
We have taken steps to mitigate this issue with non-breaking changes in this
patch, v2.2.2, but for more info, please read
[our security advisory](https://github.com/oxyno-zeta/react-editable-json-tree/security/advisories/GHSA-j3rv-w43q-f9x2).

If you do not have time to read and want to completely mitigate this issue,
simply set the [allowFunctionEvaluation](#allowfunctionevaluation)
prop to `false`. In the next major version, we will set this value to `false` by
default.

## Demo
Demo is available here : [Demo](https://oxyno-zeta.github.io/react-editable-json-tree/)

## Features

- Json Viewer
- Collapse node possibility via function
- Add new node value
- Remove node value
- Update node value
- Implicit convert of new value ({} for object, [] for array, true for boolean, ...)
- Style via function
- Read only possibility
- Call for global update and delta update
- Possibility to give buttons, inputs, ... in parameters
- Possibility to authorize remove action

## How to use
### Install
```bash
npm install --save react-editable-json-tree
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

There is a screenshot of the result :

![Screenshot](https://github.com/oxyno-zeta/react-editable-json-tree/blob/master/.github/screen1.png)

## Props
### data
|  Key |          Description        |      Type    | Required | Default  |
|:----:|:---------------------------:|:------------:|:--------:|:--------:|
| data | Data to be displayed/edited | Object/Array |   True   |   None   |

### rootName
|   Key    |         Description        |  Type  |  Required | Default  |
|:--------:|:--------------------------:|:------:|:---------:|:--------:|
| rootName | Root name for first object | String |   False   |   root   |

### isCollapsed
|     Key     |                  Description                 |   Type   |  Required |               Default             |
|:-----------:|:--------------------------------------------:|:--------:|:---------:|:---------------------------------:|
| isCollapsed | Is node collapsed ? (For Array/Object/Error) | Function |   False   | `(keyPath, deep) => (deep !== 0)` |

Function parameters :

|     Key     |        Description       |  Type  |                            Example                              |
|:-----------:|:------------------------:|:------:|:---------------------------------------------------------------:|
|   keyPath   | Key path of current node | Array  |       ['object'] for data: { object: { string: 'test' } }       |
|    deep     |   Deep of current node   | Number |   1 for data: { object: { string: 'test' } } on 'object' node   |
|    data     |    data of current node/value   |   Any   |   { string: 'test' } for data: { object: { string: 'test' } }   |

### onFullyUpdate
|      Key      |                          Description                                  |   Type   |  Required |   Default  |
|:-------------:|:---------------------------------------------------------------------:|:--------:|:---------:|:----------:|
| onFullyUpdate | Function called each time an update is done and give the updated data | Function |   False   | `() => {}` |

Function parameters :

|    Key   |  Description |               Type            |
|:--------:|:------------:|:-----------------------------:|
|   data   | Updated data | Object/Array (Same as entry)  |

### onDeltaUpdate
|      Key      |                         Description                               |   Type   |  Required |   Default  |
|:-------------:|:-----------------------------------------------------------------:|:--------:|:---------:|:----------:|
| onDeltaUpdate | Function called each time an update is done and give delta update | Function |   False   | `() => {}` |

Function parameters :

|    Key   | Description |   Type  |
|:--------:|:-----------:|:-------:|
|   data   |  Delta data | Object  |

Delta data structure :

|    Key   |          Description           |   Type  |                            Example                             |
|:--------:|:------------------------------:|:-------:|:--------------------------------------------------------------:|
|   type   |  Delta type                    | String  | 'ADD_DELTA_TYPE' or 'REMOVE_DELTA_TYPE' or 'UPDATE_DELTA_TYPE' |
|  keyPath |   key path                     |  Array  |       ['object'] for data: { object: { string: 'test' } }      |
|    deep  |   Deep of current node         | Number  |   1 for data: { object: { string: 'test' } } on 'object' node  |
|    key   | Modified/Created/Removed key   | String  |                               None                             |
| newValue |           New Value            |   Any   |                               None                             |
| oldValue |           Old Value            |   Any   |                               None                             |

### readOnly
|   Key    |            Description           |   Type  |  Required |  Default  |
|:--------:|:--------------------------------:|:-------:|:---------:|:---------:|
| readOnly | Read only boolean for all object when a boolean is provided, read only for specific keys when function is provided | Boolean / Function |   False   |   `(keyName, data, keyPath, deep, dataType) => false`   |

This function must return a boolean.

Function parameters :

|     Key     |           Description           |   Type  |                            Example                              |
|:-----------:|:-------------------------------:|:-------:|:---------------------------------------------------------------:|
|   keyName   | Key name of current node/value  | String  |        'object' for data: { object: { string: 'test' } }        |
|    data     |    data of current node/value   |   Any   |   { string: 'test' } for data: { object: { string: 'test' } }   |
|   keyPath   |   key path                      |  Array  |       ['object'] for data: { object: { string: 'test' } }       |
|     deep    |   Deep of current node          | Number  |   1 for data: { object: { string: 'test' } } on 'object' node   |
|  dataType   | data type of current node/value |  String |  'Object', 'Array', 'Null', 'Undefined', 'Error', 'Number', ... |


### getStyle
|     Key     |     Description      |   Type   |  Required |                       Default                       |
|:-----------:|:--------------------:|:--------:|:---------:|:---------------------------------------------------:|
|  getStyle   | Get style (CSS keys) | Function |   False   | `(keyName, data, keyPath, deep, dataType) => {...}` |

Function parameters :

|     Key     |           Description           |   Type  |                            Example                              |
|:-----------:|:-------------------------------:|:-------:|:---------------------------------------------------------------:|
|   keyName   | Key name of current node/value  | String  |        'object' for data: { object: { string: 'test' } }        |
|    data     |    data of current node/value   |   Any   |   { string: 'test' } for data: { object: { string: 'test' } }   |
|   keyPath   |   key path                      |  Array  |       ['object'] for data: { object: { string: 'test' } }       |
|     deep    |   Deep of current node          | Number  |   1 for data: { object: { string: 'test' } } on 'object' node   |
|  dataType   | data type of current node/value |  String |  'Object', 'Array', 'Null', 'Undefined', 'Error', 'Number', ... |

An example of return :
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
You can see the actual used in `src/utils/styles.js`. 

### addButtonElement
|       Key        |                  Description              |     Type    | Required |        Default        |
|:----------------:|:-----------------------------------------:|:-----------:|:--------:|:---------------------:|
| addButtonElement | Add button Element to replace library one |   Element   |   False  | `<button>+</button>`  |

The library will add a `onClick` props on element.

### cancelButtonElement
|         Key         |                   Description                |     Type    | Required |        Default        |
|:-------------------:|:--------------------------------------------:|:-----------:|:--------:|:---------------------:|
| cancelButtonElement | Cancel button Element to replace library one |   Element   |   False  | `<button>c</button>`  |

The library will add a `onClick` props on element.

### editButtonElement
|        Key        |                 Description                |     Type    | Required |        Default        |
|:-----------------:|:------------------------------------------:|:-----------:|:--------:|:---------------------:|
| editButtonElement | Edit button Element to replace library one |   Element   |   False  | `<button>e</button>`  |

The library will add a `onClick` props on element.

### inputElement
|      Key     |                Description                |     Type    | Required |   Default    |
|:------------:|:-----------------------------------------:|:-----------:|:--------:|:------------:|
| inputElement | Input Text Element to replace library one |   Element / Function   |   False  | `(usage, keyPath, deep, keyName, data, dataType) => <input />`  |

The library will add a `placeholder`, `ref`, `defaultValue` props on element.
This item will be focus when possible.

Function parameters:

|     Key     |           Description           |   Type  |                            Example                                           |
|:-----------:|:-------------------------------:|:-------:|:----------------------------------------------------------------------------:|
|    usage    |    Usage of the generated input    | String  |        All values are listed in INPUT_USAGE_TYPES                    |
|   keyPath   |   key path                      |  Array  |              [] for data: { object: { string: 'test' } }                     |
|     deep    |   Deep of current node          | Number  |   1 for data: { object: { string: 'test' } } on 'object' node                |
|     key     |    Key of current node/value    | String  |        'object' for data: { object: { string: 'test' } }                     |
|    value    |       Value of the key          |   Any   | { string: 'test' } for data: { object: { string: 'test' } } on 'object' node |
|    dataType    |       Data type of the value          |   String   | All values are listed in DATA_TYPES |

### textareaElement
|        Key      |                Description                |     Type    | Required |    Default     |
|:---------------:|:-----------------------------------------:|:-----------:|:--------:|:--------------:|
| textareaElement |  Textarea Element to replace library one  |   Element / Function   |   False  | `(usage, keyPath, deep, keyName, data, dataType) => <textarea />` |

The library will add a `ref`, `defaultValue` props on element.
This item will be focus when possible.

Function parameters:

|     Key     |           Description           |   Type  |                            Example                                           |
|:-----------:|:-------------------------------:|:-------:|:----------------------------------------------------------------------------:|
|    usage    |    Usage of the generated input    | String  |        All values are listed in INPUT_USAGE_TYPES                    |
|   keyPath   |   key path                      |  Array  |              [] for data: { object: { string: 'test' } }                     |
|     deep    |   Deep of current node          | Number  |   1 for data: { object: { string: 'test' } } on 'object' node                |
|     key     |    Key of current node/value    | String  |        'object' for data: { object: { string: 'test' } }                     |
|    value    |       Value of the key          |   Any   | { string: 'test' } for data: { object: { string: 'test' } } on 'object' node |
|    dataType    |       Data type of the value          |   String   | All values are listed in DATA_TYPES |

### minusMenuElement
|        Key       |                 Description               |     Type    | Required |       Default       |
|:----------------:|:-----------------------------------------:|:-----------:|:--------:|:-------------------:|
| minusMenuElement | Minus Menu Element to replace library one |   Element   |   False  | `<span> - </span>`  |

The library will add a `onClick`, `className` and `style` props on element.

### plusMenuElement
|       Key       |                Description               |     Type    | Required |       Default       |
|:---------------:|:----------------------------------------:|:-----------:|:--------:|:-------------------:|
| plusMenuElement | Plus Menu Element to replace library one |   Element   |   False  | `<span> + </span>`  |

The library will add a `onClick`, `className` and `style` props on element.

### beforeRemoveAction
|         Key        |                      Description                             |   Type   |  Required |                                 Default                               |
|:------------------:|:------------------------------------------------------------:|:--------:|:---------:|:---------------------------------------------------------------------:|
| beforeRemoveAction | Function called before each remove action (with minus menu)  | Function |   False   | `(key, keyPath, deep, oldValue) => new Promise(resolve => resolve())` |

This function must return a `Promise`. In case of resolve of this one, the remove will be done. Otherwise, in reject, nothing will be done.

Function parameters :

|     Key     |           Description           |   Type  |                            Example                                           |
|:-----------:|:-------------------------------:|:-------:|:----------------------------------------------------------------------------:|
|     key     |    Key of current node/value    | String  |        'object' for data: { object: { string: 'test' } }                     |
|   keyPath   |   key path                      |  Array  |              [] for data: { object: { string: 'test' } }                     |
|     deep    |   Deep of current node          | Number  |   1 for data: { object: { string: 'test' } } on 'object' node                |
|   oldValue  |   Old value of the key          |   Any   | { string: 'test' } for data: { object: { string: 'test' } } on 'object' node |

### beforeAddAction
|       Key       |                    Description                           |   Type   |  Required |                                Default                                |
|:---------------:|:--------------------------------------------------------:|:--------:|:---------:|:---------------------------------------------------------------------:|
| beforeAddAction | Function called before each add action (with plus menu)  | Function |   False   | `(key, keyPath, deep, newValue) => new Promise(resolve => resolve())` |

This function must return a `Promise`. In case of resolve of this one, the remove will be done. Otherwise, in reject, nothing will be done.

Function parameters :

|     Key     |           Description           |   Type  |                            Example                                           |
|:-----------:|:-------------------------------:|:-------:|:----------------------------------------------------------------------------:|
|     key     |    Key of current node/value    | String  |        'string' for data: { object: { string: 'test' } }                     |
|   keyPath   |   key path                      |  Array  |           ['object'] for data: { object: { string: 'test' } }                |
|     deep    |   Deep of current node          | Number  |   1 for data: { object: { string: 'test' } } on 'object' node                |
|   newValue  |   New value of the key          |   Any   |       'test' for data: { object: { string: 'test' } } on 'string' node       |

### beforeUpdateAction
|         Key        |            Description                    |   Type   |  Required |                                     Default                                     |
|:------------------:|:-----------------------------------------:|:--------:|:---------:|:-------------------------------------------------------------------------------:|
| beforeUpdateAction | Function called before each update action | Function |   False   | `(key, keyPath, deep, oldValue, newValue) => new Promise(resolve => resolve())` |

This function must return a `Promise`. In case of resolve of this one, the remove will be done. Otherwise, in reject, nothing will be done.

Function parameters :

|     Key     |           Description           |   Type  |                            Example                                           |
|:-----------:|:-------------------------------:|:-------:|:----------------------------------------------------------------------------:|
|     key     |    Key of current node/value    | String  |        'string' for data: { object: { string: 'test' } }                     |
|   keyPath   |   key path                      |  Array  |           ['object'] for data: { object: { string: 'test' } }                |
|     deep    |   Deep of current node          | Number  |   1 for data: { object: { string: 'test' } } on 'object' node                |
|   oldValue  |   Old value of the key          |   Any   |       'test' for data: { object: { string: 'test' } } on 'string' node       |
|   newValue  |   New value of the key          |   Any   |     'update' for data: { object: { string: 'update' } } on 'string' node     |

### logger
|   Key  |            Description                                           |   Type   |  Required |        Default        |
|:------:|:----------------------------------------------------------------:|:--------:|:---------:|:---------------------:|
| logger | Object used to log 'catch' from promise (using only 'error' key) |  Object  |   False   | `{ error: () => {} }` |

### onSubmitValueParser
|          Key        |                                                   Description                                                 |   Type   |  Required |                               Default                                  |
|:-------------------:|:-------------------------------------------------------------------------------------------------------------:|:--------:|:---------:|:----------------------------------------------------------------------:|
| onSubmitValueParser | Function called after each edit/update phase to parse raw data from inputElement or textareaElement component | Function |   False   | `(isEditMode, keyPath, deep, key, rawValue) => nativeParser(rawValue)` |

Function parameters :

|     Key     |           Description                                    |   Type  |                            Example                                           |
|:-----------:|:--------------------------------------------------------:|:-------:|:----------------------------------------------------------------------------:|
|  isEditMode | Is in edit mode or in add mode ?                         | String  |        'string' for data: { object: { string: 'test' } }                     |
|   keyPath   |   key path                                               |  Array  |           ['object'] for data: { object: { string: 'test' } }                |
|     deep    |   Deep of current node                                   | Number  |   1 for data: { object: { string: 'test' } } on 'object' node                |
|     key     |    Key of current node/value                             | String  |        'string' for data: { object: { string: 'test' } }                     |
|   rawValue  | Raw value from inputElement or textareaElement component | String  |        'string' for data: { object: { string: 'test' } }                     |

### allowFunctionEvaluation
|           Key           |                                               Description                                               |  Type   | Required | Default |
|:-----------------------:|:-------------------------------------------------------------------------------------------------------:|:-------:|:--------:|:-------:|
| allowFunctionEvaluation | Allow strings that appear to be Javascript function definitions to be evaluated as Javascript functions | Boolean |  False   |  True   |


## Design
The library provide CSS class on elements. All are prefixed by "rejt" to avoid conflict. 
To avoid being linked with a CSS file, the library will use the inline style.

Here is the list of classes by element and by deep and with basic element (on which it's applied).

### JsonTree
* rejt-tree (div)

### JsonObject
#### Collapsed
* rejt-object-node (div)
    * rejt-name (span)
    * rejt-collapsed (span)
        * rejt-collapsed-text (span)
        * rejt-minus-menu (span)

#### Not Collapsed
* rejt-object-node (div)
    * rejt-name (span)
    * rejt-not-collapsed (span)
        * rejt-not-collapsed-delimiter (span)
        * rejt-not-collapsed-list (ul)
        * rejt-not-collapsed-delimiter (span)
        * rejt-add-form (span)
        * rejt-plus-menu (span)
        * rejt-minus-menu (span)
        
### JsonArray
#### Collapsed
* rejt-array-node (div)
    * rejt-name (span)
    * rejt-collapsed (span)
        * rejt-collapsed-text (span)
        * rejt-minus-menu (span)

#### Not Collapsed
* rejt-array-node (div)
    * rejt-name (span)
    * rejt-not-collapsed (span)
        * rejt-not-collapsed-delimiter (span)
        * rejt-not-collapsed-list (ul)
        * rejt-not-collapsed-delimiter (span)
        * rejt-add-form (span)
        * rejt-plus-menu (span)
        * rejt-minus-menu (span)

### JsonAddValue
* rejt-add-value-node (span)

### JsonFunctionValue
* rejt-function-value-node (li)
    * rejt-name (span)
    * rejt-edit-form (span)
    * rejt-value (span)
    * rejt-minus-menu (span)

### JsonValue
* rejt-value-node (li)
    * rejt-name (span)
    * rejt-edit-form (span)
    * rejt-value (span)
    * rejt-minus-menu (span)

## Development
### Serve
```bash
npm run serve
```

### Release
```bash
npm run release
```

## Inspired by
- [alexkuz/react-json-tree](https://github.com/alexkuz/react-json-tree)
- [krispo/json-tree](https://github.com/krispo/json-tree)

## Thanks
* My wife BH to support me doing this

## Author
* Oxyno-zeta (Havrileck Alexandre)

## License
MIT (See in License.md)
