/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 22/10/16
 * Licence: See Readme
 */
/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */
import ReactDom from 'react-dom';
import React, { Component, PropTypes } from 'react';
import parse from '../utils/parse.jsx';

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */
// Prop types
const propTypes = {
    handleAdd: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    onlyValue: PropTypes.bool,
};
// Default props
const defaultProps = {
    onlyValue: false,
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
            ReactDom.findDOMNode(inputRefKey).focus();
        }

        if (onlyValue && inputRefValue){
            ReactDom.findDOMNode(inputRefValue).focus();
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
        const { handleCancel, onlyValue } = this.props;

        let result = null;
        if (onlyValue) {
            result = (<span> <input placeholder="Value"
                                    ref={this.refInputValue} /> <button onClick={handleCancel}>c</button>
                <button onClick={this.onSubmit}>+</button>
            </span>);
        } else {
            result = (<span> <input
                placeholder="Key"
                ref={this.refInputKey} />: <input
                placeholder="Value"
                ref={this.refInputValue} /> <button
                onClick={handleCancel}>c
            </button><button onClick={this.onSubmit}>+</button>
            </span>);
        }

        return result;
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
