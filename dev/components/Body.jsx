/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 30/10/16
 * Licence: See Readme
 */
/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */
import React, { Component } from 'react';
import { JsonTree } from '../../src/JsonTree.js';

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */
// Prop types
const propTypes = {};
// Default props
const defaultProps = {};

const defaultJson = {
    error: new Error('error'),
    func: () => {
        console.log('test');
    },
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
};

/* ************************************* */
/* ********      COMPONENT      ******** */
/* ************************************* */
class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: defaultJson,
            deltaUpdateString: '{}',
            globalUpdateString: '{}',
            textareaRef: null,
            readOnlyRef: null,
            readOnly: false,
        };
        // Bind
        this.onFullyUpdate = this.onFullyUpdate.bind(this);
        this.onDeltaUpdate = this.onDeltaUpdate.bind(this);
        this.refTextarea = this.refTextarea.bind(this);
        this.refReadOnlyCheckbox = this.refReadOnlyCheckbox.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResetToDefault = this.handleResetToDefault.bind(this);
        this.handleChangeReadOnly = this.handleChangeReadOnly.bind(this);
    }

    onFullyUpdate(newJson) {
        this.setState({
            globalUpdateString: JSON.stringify(newJson, null, 4),
        });
    }

    onDeltaUpdate(deltaUpdate) {
        this.setState({
            deltaUpdateString: JSON.stringify(deltaUpdate, null, 4),
        });
    }

    refTextarea(node) {
        this.state.textareaRef = node;
    }

    refReadOnlyCheckbox(node) {
        this.state.readOnlyRef = node;
    }

    handleSubmit() {
        const { textareaRef } = this.state;
        // Get data
        const jsonString = textareaRef.value;

        try {
            const json = JSON.parse(jsonString);
            this.setState({
                json,
            });
            // Reset value
            textareaRef.value = '';
        } catch (e) {
            // Nothing
            console.error(e);
        }
    }

    handleResetToDefault() {
        this.setState({
            json: defaultJson,
        });
    }

    handleChangeReadOnly() {
        const { readOnlyRef } = this.state;

        this.setState({
            readOnly: readOnlyRef.checked,
        });
    }

    render() {
        const { json, deltaUpdateString, globalUpdateString, readOnly } = this.state;

        const style1 = {
            width: '100%',
        };
        const style2 = {
            verticalAlign: 'top',
        };
        const style3 = {
            backgroundColor: '#e0e0e0',
            border: '1px lightgrey solid',
        };
        const style4 = {
            margin: '0 15px',
            minWidth: '200px',
        };
        return (
            <div>
                <div style={style4}>
                    <input
                        type="checkbox"
                        ref={this.refReadOnlyCheckbox}
                        onChange={this.handleChangeReadOnly}
                    />Read Only
                </div>
                <table style={style1}>
                    <thead>
                        <tr>
                            <th>Result</th>
                            <th>Global Update</th>
                            <th>Delta Update</th>
                            <th>Put Your Json</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={style2}>
                                <div style={style4}>
                                    <JsonTree
                                        data={json}
                                        onFullyUpdate={this.onFullyUpdate}
                                        onDeltaUpdate={this.onDeltaUpdate}
                                        readOnly={readOnly}
                                    />
                                </div>
                            </td>
                            <td style={style2}>
                                <div style={style4}>
                                    <pre style={style3}>{globalUpdateString}</pre>
                                </div>
                            </td>
                            <td style={style2}>
                                <div style={style4}>
                                    <pre style={style3}>{deltaUpdateString}</pre>
                                </div>
                            </td>
                            <td style={style2}>
                                <div style={style4}>
                                    <textarea ref={this.refTextarea} rows="15" cols="40" />
                                    <div>
                                        <button onClick={this.handleSubmit}>Submit</button>
                                        <button onClick={this.handleResetToDefault}>Default</button>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

// Add prop types
Body.propTypes = propTypes;
// Add default props
Body.defaultProps = defaultProps;

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
export default Body;
