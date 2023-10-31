/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 18/10/16
 * Licence: See Readme
 */
/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */
import React, { Component } from 'react';
import JsonTree from '../src/JsonTree.jsx';

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */
// Prop types
const propTypes = {};
// Default props
const defaultProps = {};

/* ************************************* */
/* ********      COMPONENT      ******** */
/* ************************************* */
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: {
                error: new Error('error'),
                func: () => {
                    console.log('test');
                },
                'merder-a-merde': 'azdzad',
                text: 'text',
                int: 100,
                boolean: true,
                null: null,
                undefined: undefined,
                object: {
                    text: 'text',
                    int: 100,
                    boolean: true,
                },
                array: [
                    1,
                    2,
                    3,
                    {
                        string: 'test',
                    },
                ],
            },
        };
        // Bind
        this.onFullyUpdate = this.onFullyUpdate.bind(this);
    }

    onFullyUpdate(json) {
        this.setState({
            json,
        });
    }

    render() {
        return (<div>
            <JsonTree
                data={this.state.json}
                onFullyUpdate={this.onFullyUpdate}
                readOnly={false}
            />
        </div>);
    }
}

// Add prop types
App.propTypes = propTypes;
// Add default props
App.defaultProps = defaultProps;

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
export default App;
