/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 18/10/16
 * Licence: See Readme
 */
/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */
import React, { Component, PropTypes } from 'react';
import parse from '../utils/parse.jsx';

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */
// Prop types
const propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    originalValue: PropTypes.any,
    keyPath: PropTypes.array,
    deep: PropTypes.number,
    handleRemove: PropTypes.func,
    handleUpdateValue: PropTypes.func,
    readOnly: PropTypes.bool.isRequired,
    dataType: PropTypes.string,
    getStyle: PropTypes.func.isRequired,
};
// Default props
const defaultProps = {
    keyPath: [],
    deep: 0,
    handleUpdateValue: () => {
    },
};

/* ************************************* */
/* ********      COMPONENT      ******** */
/* ************************************* */
class JsonValue extends Component {
    constructor(props) {
        super(props);
        const keyPath = [
            ...props.keyPath,
            props.name,
        ];
        this.state = {
            value: props.value,
            name: props.name,
            keyPath,
            deep: props.deep,
            editEnabled: false,
            inputRef: null,
        };

        // Bind
        this.handleEditMode = this.handleEditMode.bind(this);
        this.refInput = this.refInput.bind(this);
        this.handleCancelEdit = this.handleCancelEdit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value,
        });
    }

    componentDidUpdate() {
        const { editEnabled, inputRef } = this.state;
        if (editEnabled) {
            inputRef.focus();
        }
    }

    handleEdit() {
        const { handleUpdateValue } = this.props;
        const { inputRef, name } = this.state;
        const result = {
            value: parse(inputRef.value),
            key: name,
        };

        // Run update
        handleUpdateValue(result);

        // Cancel edit mode
        this.handleCancelEdit();
    }

    handleEditMode() {
        this.setState({
            editEnabled: true,
        });
    }

    refInput(node) {
        this.state.inputRef = node;
    }

    handleCancelEdit() {
        this.setState({
            editEnabled: false,
        });
    }

    render() {
        const { name, value, editEnabled, keyPath, deep } = this.state;
        const { handleRemove, originalValue, readOnly, dataType, getStyle } = this.props;

        const style = getStyle(name, value, keyPath, deep, dataType);
        let result = null;
        let minusElement = null;
        if (editEnabled && !readOnly) {
            result = (<span style={style.editForm}>
                <input
                    type="text"
                    ref={this.refInput}
                    defaultValue={originalValue}
                /> <button onClick={this.handleCancelEdit}>c</button>
                <button onClick={this.handleEdit}>e</button>
            </span>);
            minusElement = null;
        } else {
            result = <span style={style.value} onClick={this.handleEditMode}>{value}</span>;
            minusElement = (readOnly) ? null : <span onClick={handleRemove} style={style.minus}> - </span>;
        }
        return (
            <li style={style.li}>
                <span style={style.name}>{name} : </span>{result}
                {minusElement}
            </li>
        );
    }
}

// Add prop types
JsonValue.propTypes = propTypes;
// Add default props
JsonValue.defaultProps = defaultProps;

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
export default JsonValue;
