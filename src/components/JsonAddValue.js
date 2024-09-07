/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 22/10/16
 * Licence: See Readme
 */
/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */
import React, { Component, PropTypes } from 'react';
import { HotKeys } from 'react-hotkeys';
import parse from '../utils/parse';

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
    inputElement: PropTypes.element,
};
// Default props
const defaultProps = {
    onlyValue: false,
    addButtonElement: <button>+</button>,
    cancelButtonElement: <button>c</button>,
    inputElement: <input />,
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

        if (inputRefKey) {
            inputRefKey.focus();
        }

        if (onlyValue && inputRefValue) {
            inputRefValue.focus();
        }
    }

    onSubmit() {
        const { handleAdd, onlyValue } = this.props;
        const { inputRefKey, inputRefValue } = this.state;
        const result = {
            value: parse(inputRefValue.value),
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
        const { handleCancel, onlyValue, addButtonElement, cancelButtonElement, inputElement } = this.props;

        const addButtonElementLayout = React.cloneElement(addButtonElement, {
            onClick: this.onSubmit,
        });
        const cancelButtonElementLayout = React.cloneElement(cancelButtonElement, {
            onClick: handleCancel,
        });
        let result = null;
        if (onlyValue) {
            const inputElementValueLayout = React.cloneElement(inputElement, {
                placeholder: 'Value',
                ref: this.refInputValue,
            });

            result = (<span> {inputElementValueLayout} {cancelButtonElementLayout}{addButtonElementLayout}</span>);
        } else {
            const inputElementValueLayout = React.cloneElement(inputElement, {
                placeholder: 'Value',
                ref: this.refInputValue,
            });
            const inputElementKeyLayout = React.cloneElement(inputElement, {
                placeholder: 'Key',
                ref: this.refInputKey,
            });

            result = (<span> {inputElementKeyLayout}: {inputElementValueLayout} {cancelButtonElementLayout}
                {addButtonElementLayout}
            </span>);
        }

        const handlers = {
            esc: handleCancel,
            enter: this.onSubmit,
        };

        return (<HotKeys component={'span'} handlers={handlers}>
            {result}
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
