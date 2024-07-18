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
        const {
            handleRemove,
            originalValue,
            readOnly,
            dataType,
            getStyle,
            editButtonElement,
            cancelButtonElement,
            inputElement} = this.props;

        const style = getStyle(name, value, keyPath, deep, dataType);
        let result = null;
        let minusElement = null;

        const editButtonElementLayout = React.cloneElement(editButtonElement, {
            onClick: this.handleEdit,
        });
        const cancelButtonElementLayout = React.cloneElement(cancelButtonElement, {
            onClick: this.handleCancelEdit,
        });

        if (editEnabled && !readOnly) {
            const inputElementLayout = React.cloneElement(inputElement, {
                ref: this.refInput,
                defaultValue: originalValue,
            });
            result = (<span style={style.editForm}>
                {inputElementLayout} {cancelButtonElementLayout}{editButtonElementLayout}
            </span>);
            minusElement = null;
        } else {
            result = <span style={style.value} onClick={this.handleEditMode}>{value}</span>;
            minusElement = (readOnly) ? null : <span onClick={handleRemove} style={style.minus}> - </span>;
        }

        const handlers = {
            esc: this.handleCancelEdit,
            enter: this.handleEdit,
        };

        const noSpanFocus = {
            outline: '0px',
        };

        return (
            <HotKeys component={'span'} style={noSpanFocus} handlers={handlers}>
                <li style={style.li}>
                    <span style={style.name}>{name} : </span>{result}
                    {minusElement}
                </li>
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
