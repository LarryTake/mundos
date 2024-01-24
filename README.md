React Editable Json Tree
========================
[![Build Status](https://travis-ci.org/oxyno-zeta/react-editable-json-tree.svg?branch=master)](https://travis-ci.org/oxyno-zeta/react-editable-json-tree)[![npm](https://img.shields.io/npm/v/react-editable-json-tree.svg)]()

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

## How to use
### Install
```bash
npm install react-editable-json-tree
```

### Example Usage
```jsx
// Import
import { JsonTree, deltaTypes } from 'react-editable-json-tree'

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
|     Key     |                  Description                 |   Type   |  Required |              Default            |
|:-----------:|:--------------------------------------------:|:--------:|:---------:|:-------------------------------:|
| isCollapsed | Is node collapsed ? (For Array/Object/Error) | Function |   False   | (keyPath, deep) => (deep !== 0) |

Function parameters :

|     Key     |        Description       |  Type  |                            Example                              |
|:-----------:|:------------------------:|:------:|:---------------------------------------------------------------:|
|   keyPath   | Key path of current node | Array  |       ['object'] for data: { object: { string: 'test' } }       |
|    deep     |   Deep of current node   | Number |   1 for data: { object: { string: 'test' } } on 'object' node   |

### onFullyUpdate
|      Key      |                          Description                                  |   Type   |  Required | Default  |
|:-------------:|:---------------------------------------------------------------------:|:--------:|:---------:|:--------:|
| onFullyUpdate | Function called each time an update is done and give the updated data | Function |   False   | () => {} |

Function parameters :

|    Key   |  Description |               Type            |
|:--------:|:------------:|:-----------------------------:|
|   data   | Updated data | Object/Array (Same as entry)  |

### onDeltaUpdate
|      Key      |                         Description                               |   Type   |  Required | Default  |
|:-------------:|:-----------------------------------------------------------------:|:--------:|:---------:|:--------:|
| onDeltaUpdate | Function called each time an update is done and give delta update | Function |   False   | () => {} |

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
| readOnly | Read only boolean for all object | Boolean |   False   |   false   |

### getStyle
|     Key     |     Description      |   Type   |  Required |                      Default                      |
|:-----------:|:--------------------:|:--------:|:---------:|:-------------------------------------------------:|
|  getStyle   | Get style (CSS keys) | Function |   False   | (keyName, data, keyPath, deep, dataType) => {...} |

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

## Development
### Serve
```bash
npm run serve
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
