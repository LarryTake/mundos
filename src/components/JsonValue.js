/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 18/10/16
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
    editButtonElement: PropTypes.element,
    cancelButtonElement: PropTypes.element,
    inputElement: PropTypes.element,
};
// Default props
const defaultProps = {
    keyPath: [],
    deep: 0,
    handleUpdateValue: () => {
    },
    editButtonElement: <button>e</button>,
    cancelButtonElement: <button>c</button>,
    inputElement: <input />,
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
        const { readOnly } = this.props;

        if (editEnabled && !readOnly) {
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
        const {
            handleRemove,
            originalValue,
            readOnly,
            dataType,
            getStyle,
            editButtonElement,
            cancelButtonElement,
            inputElement,
            } = this.props;

        const style = getStyle(name, value, keyPath, deep, dataType);
        let result = null;
        let minusElement = null;

        if (editEnabled && !readOnly) {
            const editButtonElementLayout = React.cloneElement(editButtonElement, {
                onClick: this.handleEdit,
            });
            const cancelButtonElementLayout = React.cloneElement(cancelButtonElement, {
                onClick: this.handleCancelEdit,
            });
            const inputElementLayout = React.cloneElement(inputElement, {
                ref: this.refInput,
                defaultValue: originalValue,
            });

            result = (<span className="rejt-edit-form" style={style.editForm}>
                {inputElementLayout} {cancelButtonElementLayout}{editButtonElementLayout}
            </span>);
            minusElement = null;
        } else {
            result = (<span className="rejt-value" style={style.value} onClick={readOnly ? null : this.handleEditMode}>
                {value}
            </span>);
            minusElement = (readOnly) ? null : (<span
                className="rejt-minus-menu"
                onClick={handleRemove}
                style={style.minus}
            > - </span>);
        }

        const handlers = {
            esc: this.handleCancelEdit,
            enter: this.handleEdit,
        };

        return (
            <HotKeys className="rejt-value-node" component={'li'} style={style.li} handlers={handlers}>
                <span className="rejt-name" style={style.name}>{name} : </span>{result}
                {minusElement}
            </HotKeys>
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
