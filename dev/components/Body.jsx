/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 30/10/16
 * Licence: See Readme
 */
/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */
import React, { Component } from 'react';
import _ from 'lodash';
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
            json: _.cloneDeep(defaultJson),
            deltaUpdateString: '{}',
            globalUpdateString: '{}',
            textareaRef: null,
            readOnlyBooleanRef: null,
            readOnlyFunctionRef: null,
            readOnlyRef: null,
            readOnlyEnable: false,
            readOnlyFunctionEnable: false,
            readOnlyBooleanEnable: false,
            readOnly: false,
            customInputRef: null,
            customInput: false,
            minusMenuRef: null,
            minusMenu: false,
        };
        // Bind
        this.onFullyUpdate = this.onFullyUpdate.bind(this);
        this.onDeltaUpdate = this.onDeltaUpdate.bind(this);
        this.refTextarea = this.refTextarea.bind(this);
        this.refReadOnlyCheckbox = this.refReadOnlyCheckbox.bind(this);
        this.refReadOnlyFunctionCheckbox = this.refReadOnlyFunctionCheckbox.bind(this);
        this.refReadOnlyBooleanCheckbox = this.refReadOnlyBooleanCheckbox.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleResetToDefault = this.handleResetToDefault.bind(this);
        this.handleChangeReadOnlyBoolean = this.handleChangeReadOnlyBoolean.bind(this);
        this.handleChangeReadOnlyFunction = this.handleChangeReadOnlyFunction.bind(this);
        this.handleChangeReadOnly = this.handleChangeReadOnly.bind(this);
        this.handleClearGlobalUpdateString = this.handleClearGlobalUpdateString.bind(this);
        this.handleClearDeltaUpdateString = this.handleClearDeltaUpdateString.bind(this);
        this.refCustomInputCheckbox = this.refCustomInputCheckbox.bind(this);
        this.handleChangeCustomInput = this.handleChangeCustomInput.bind(this);
        this.refMinusMenuCheckbox = this.refMinusMenuCheckbox.bind(this);
        this.handleChangeMinusMenu = this.handleChangeMinusMenu.bind(this);
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

    refReadOnlyFunctionCheckbox(node) {
        this.state.readOnlyFunctionRef = node;
        this.state.readOnlyFunctionRef.disabled = true;
    }

    refReadOnlyBooleanCheckbox(node) {
        this.state.readOnlyBooleanRef = node;
        this.state.readOnlyBooleanRef.disabled = true;
    }

    refReadOnlyCheckbox(node) {
        this.state.readOnlyRef = node;
    }

    refMinusMenuCheckbox(node) {
        this.state.minusMenuRef = node;
    }

    handleChangeMinusMenu() {
        const { minusMenuRef } = this.state;

        this.setState({
            minusMenu: minusMenuRef.checked,
        });
    }

    refCustomInputCheckbox(node) {
        this.state.customInputRef = node;
    }

    handleChangeCustomInput() {
        const { customInputRef } = this.state;

        this.setState({
            customInput: customInputRef.checked,
        });
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
            json: _.cloneDeep(defaultJson),
        });
    }

    handleChangeReadOnly() {
        const { readOnlyRef, readOnlyBooleanRef, readOnlyFunctionRef } = this.state;

        this.setState({
            readOnlyEnable: readOnlyRef.checked,
        });

        if (readOnlyRef.checked) {
            readOnlyBooleanRef.disabled = false;
            readOnlyFunctionRef.disabled = false;
            if (readOnlyBooleanRef.checked) {
                this.handleChangeReadOnlyBoolean();
            } else if (readOnlyFunctionRef.checked) {
                this.handleChangeReadOnlyFunction();
            }
        } else {
            readOnlyBooleanRef.disabled = true;
            readOnlyFunctionRef.disabled = true;
            this.setState({
                readOnly: false,
            });
        }
    }

    handleChangeReadOnlyBoolean() {
        const { readOnlyBooleanRef, readOnlyFunctionRef } = this.state;

        readOnlyFunctionRef.disabled = readOnlyBooleanRef.checked;

        this.setState({
            readOnly: readOnlyBooleanRef.checked,
        });
    }

    handleChangeReadOnlyFunction() {
        const { readOnlyFunctionRef, readOnlyBooleanRef } = this.state;

        readOnlyBooleanRef.disabled = readOnlyFunctionRef.checked;

        let result = null;
        if (readOnlyFunctionRef.checked) {
            result = (name, value, keyPath) => (keyPath[keyPath.length - 1] === 'text');
        } else {
            result = () => false;
        }

        this.setState({
            readOnly: result,
        });
    }

    handleClearGlobalUpdateString() {
        this.setState({
            globalUpdateString: '{}',
        });
    }

    handleClearDeltaUpdateString() {
        this.setState({
            deltaUpdateString: '{}',
        });
    }

    render() {
        const { json, deltaUpdateString, globalUpdateString, readOnly, customInput, minusMenu } = this.state;

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
        const style5 = {
            backgroundColor: 'black',
            color: 'yellow',
            border: '1px solid green',
        };
        const customInputElement = customInput ? <input style={style5} /> : undefined;
        const minusMenuElement = minusMenu ? <button>Remove</button> : undefined;

        return (
            <div>
                <div style={style4}>
                    <span>
                        <input
                            type="checkbox"
                            ref={this.refReadOnlyCheckbox}
                            onChange={this.handleChangeReadOnly}
                        />Read Only
                    </span>
                    <span>
                        <input
                            type="checkbox"
                            ref={this.refReadOnlyBooleanCheckbox}
                            onChange={this.handleChangeReadOnlyBoolean}
                        />Read Only Boolean
                    </span>
                    <span>
                        <input
                            type="checkbox"
                            ref={this.refReadOnlyFunctionCheckbox}
                            onChange={this.handleChangeReadOnlyFunction}
                        />Read Only Function (read only for all 'text' key)
                    </span>
                    <span>
                        <input
                            type="checkbox"
                            ref={this.refCustomInputCheckbox}
                            onChange={this.handleChangeCustomInput}
                        />Custom input
                    </span>
                    <span>
                        <input
                            type="checkbox"
                            ref={this.refMinusMenuCheckbox}
                            onChange={this.handleChangeMinusMenu}
                        />Custom minus menu
                    </span>
                </div>
                <table style={style1}>
                    <thead>
                        <tr>
                            <th>
                                <span>Result</span>
                            </th>
                            <th>
                                <span>
                                    Global Update <button onClick={this.handleClearGlobalUpdateString}>Clear</button>
                                </span>
                            </th>
                            <th>
                                <span>
                                    Delta Update <button onClick={this.handleClearDeltaUpdateString}>Clear</button>
                                </span>
                            </th>
                            <th>
                                <span>Put Your Json</span>
                            </th>
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
                                        inputElement={customInputElement}
                                        minusMenuElement={minusMenuElement}
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
