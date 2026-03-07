/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 22/10/16
 * Licence: See Readme
 */
/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { HotKeys } from 'react-hotkeys';
import parse from '../utils/parse';
import inputUsageTypes from '../types/inputUsageTypes';

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */
// Prop types
const propTypes = {
    handleAdd: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    onlyValue: PropTypes.bool,
    addButtonElement: PropTypes.element,
    cancelButtonElement: PropTypes.element,
    inputElementGenerator: PropTypes.func,
    keyPath: PropTypes.array,
    deep: PropTypes.number,
};
// Default props
const defaultProps = {
    onlyValue: false,
    addButtonElement: <button>+</button>,
    cancelButtonElement: <button>c</button>,
    inputElementGenerator: () => <input />,
};

/* ************************************* */
/* ********      COMPONENT      ******** */
/* ************************************* */
class JsonAddValue extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputRefKey: null,
            inputRefValue: null,
        };
        // Bind
        this.refInputValue = this.refInputValue.bind(this);
        this.refInputKey = this.refInputKey.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        const { inputRefKey, inputRefValue } = this.state;
        const { onlyValue } = this.props;

        if (inputRefKey && (typeof inputRefKey.focus === 'function')) {
            inputRefKey.focus();
        }

        if (onlyValue && inputRefValue && (typeof inputRefValue.focus === 'function')) {
            inputRefValue.focus();
        }
    }

    onSubmit() {
        const { handleAdd, onlyValue } = this.props;
        const { inputRefKey, inputRefValue } = this.state;
        const result = {
            newValue: parse(inputRefValue.value),
        };
        // Check if we have the key
        if (!onlyValue) {
            // Check that there is a key
            if (!inputRefKey.value) {
                // Empty key => Not authorized
                return;
            }

            result.key = inputRefKey.value;
        }
        handleAdd(result);
    }

    refInputKey(node) {
        this.state.inputRefKey = node;
    }

    refInputValue(node) {
        this.state.inputRefValue = node;
    }

    render() {
        const {
            handleCancel,
            onlyValue,
            addButtonElement,
            cancelButtonElement,
            inputElementGenerator,
            keyPath,
            deep,
        } = this.props;
        const addButtonElementLayout = React.cloneElement(addButtonElement, {
            onClick: this.onSubmit,
        });
        const cancelButtonElementLayout = React.cloneElement(cancelButtonElement, {
            onClick: handleCancel,
        });
        const inputElementValue = inputElementGenerator(inputUsageTypes.VALUE, keyPath, deep);
        const inputElementValueLayout = React.cloneElement(inputElementValue, {
            placeholder: 'Value',
            ref: this.refInputValue,
        });
        let inputElementKeyLayout = null;
        let separatorElement = null;

        if (!onlyValue) {
            const inputElementKey = inputElementGenerator(inputUsageTypes.KEY, keyPath, deep);
            inputElementKeyLayout = React.cloneElement(inputElementKey, {
                placeholder: 'Key',
                ref: this.refInputKey,
            });
            separatorElement = ':';
        }

        const handlers = {
            esc: handleCancel,
            enter: this.onSubmit,
        };

        return (<HotKeys className="rejt-add-value-node" component={'span'} handlers={handlers}>
            {inputElementKeyLayout} {separatorElement} {inputElementValueLayout} {cancelButtonElementLayout}
            {addButtonElementLayout}
        </HotKeys>);
    }
}

// Add prop types
JsonAddValue.propTypes = propTypes;
// Add default props
JsonAddValue.defaultProps = defaultProps;

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
export default JsonAddValue;
