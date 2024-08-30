/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 20/10/16
 * Licence: See Readme
 */
/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */
import React, { Component, PropTypes } from 'react';
import JsonValue from './JsonValue';
import JsonObject from './JsonObject';
import JsonArray from './JsonArray';
import JsonFunctionValue from './JsonFunctionValue';
import objectTypes from '../utils/objectTypes';

const { getObjectType } = objectTypes;

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */
// Prop types
const propTypes = {
    name: PropTypes.string.isRequired,
    data: PropTypes.any,
    isCollapsed: PropTypes.func.isRequired,
    keyPath: PropTypes.array,
    deep: PropTypes.number,
    handleRemove: PropTypes.func,
    handleUpdateValue: PropTypes.func,
    onUpdate: PropTypes.func.isRequired,
    onDeltaUpdate: PropTypes.func.isRequired,
    readOnly: PropTypes.bool.isRequired,
    getStyle: PropTypes.func.isRequired,
    addButtonElement: PropTypes.element,
    cancelButtonElement: PropTypes.element,
    editButtonElement: PropTypes.element,
    inputElement: PropTypes.element,
    textareaElement: PropTypes.element,
};
// Default props
const defaultProps = {
    keyPath: [],
    deep: 0,
};

/* ************************************* */
/* ********      COMPONENT      ******** */
/* ************************************* */
class JsonNode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            name: props.name,
            keyPath: props.keyPath,
            deep: props.deep,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data,
        });
    }

    render() {
        const { data, name, keyPath, deep } = this.state;
        const {
            isCollapsed,
            handleRemove,
            handleUpdateValue,
            onUpdate,
            onDeltaUpdate,
            readOnly,
            getStyle,
            addButtonElement,
            cancelButtonElement,
            editButtonElement,
            inputElement,
            textareaElement,
            } = this.props;
        const readOnlyTrue = true;

        const dataType = getObjectType(data);
        switch (dataType) {
            case 'Error':
                return (<JsonObject
                    data={data}
                    name={name}
                    isCollapsed={isCollapsed}
                    keyPath={keyPath}
                    deep={deep}
                    handleRemove={handleRemove}
                    onUpdate={onUpdate}
                    onDeltaUpdate={onDeltaUpdate}
                    readOnly={readOnlyTrue}
                    dataType={dataType}
                    getStyle={getStyle}
                    addButtonElement={addButtonElement}
                    cancelButtonElement={cancelButtonElement}
                    editButtonElement={editButtonElement}
                    inputElement={inputElement}
                    textareaElement={textareaElement}
                />);
            case 'Object':
                return (<JsonObject
                    data={data}
                    name={name}
                    isCollapsed={isCollapsed}
                    keyPath={keyPath}
                    deep={deep}
                    handleRemove={handleRemove}
                    onUpdate={onUpdate}
                    onDeltaUpdate={onDeltaUpdate}
                    readOnly={readOnly}
                    dataType={dataType}
                    getStyle={getStyle}
                    addButtonElement={addButtonElement}
                    cancelButtonElement={cancelButtonElement}
                    editButtonElement={editButtonElement}
                    inputElement={inputElement}
                    textareaElement={textareaElement}
                />);
            case 'Array':
                return (<JsonArray
                    data={data}
                    name={name}
                    isCollapsed={isCollapsed}
                    keyPath={keyPath}
                    deep={deep}
                    handleRemove={handleRemove}
                    onUpdate={onUpdate}
                    onDeltaUpdate={onDeltaUpdate}
                    readOnly={readOnly}
                    dataType={dataType}
                    getStyle={getStyle}
                    addButtonElement={addButtonElement}
                    cancelButtonElement={cancelButtonElement}
                    editButtonElement={editButtonElement}
                    inputElement={inputElement}
                    textareaElement={textareaElement}
                />);
            case 'String':
                return (<JsonValue
                    name={name}
                    value={`"${data}"`}
                    originalValue={data}
                    keyPath={keyPath}
                    deep={deep}
                    handleRemove={handleRemove}
                    handleUpdateValue={handleUpdateValue}
                    readOnly={readOnly}
                    dataType={dataType}
                    getStyle={getStyle}
                    cancelButtonElement={cancelButtonElement}
                    editButtonElement={editButtonElement}
                    inputElement={inputElement}
                />);
            case 'Number':
                return (<JsonValue
                    name={name}
                    value={data}
                    originalValue={data}
                    keyPath={keyPath}
                    deep={deep}
                    handleRemove={handleRemove}
                    handleUpdateValue={handleUpdateValue}
                    readOnly={readOnly}
                    dataType={dataType}
                    getStyle={getStyle}
                    cancelButtonElement={cancelButtonElement}
                    editButtonElement={editButtonElement}
                    inputElement={inputElement}
                />);
            case 'Boolean':
                return (<JsonValue
                    name={name}
                    value={data ? 'true' : 'false'}
                    originalValue={data}
                    keyPath={keyPath}
                    deep={deep}
                    handleRemove={handleRemove}
                    handleUpdateValue={handleUpdateValue}
                    readOnly={readOnly}
                    dataType={dataType}
                    getStyle={getStyle}
                    cancelButtonElement={cancelButtonElement}
                    editButtonElement={editButtonElement}
                    inputElement={inputElement}
                />);
            case 'Date':
                return (<JsonValue
                    name={name}
                    value={data.toISOString()}
                    originalValue={data}
                    keyPath={keyPath}
                    deep={deep}
                    handleRemove={handleRemove}
                    handleUpdateValue={handleUpdateValue}
                    readOnly={readOnlyTrue}
                    dataType={dataType}
                    getStyle={getStyle}
                    cancelButtonElement={cancelButtonElement}
                    editButtonElement={editButtonElement}
                    inputElement={inputElement}
                />);
            case 'Null':
                return (<JsonValue
                    name={name}
                    value={'null'}
                    originalValue={'null'}
                    keyPath={keyPath}
                    deep={deep}
                    handleRemove={handleRemove}
                    handleUpdateValue={handleUpdateValue}
                    readOnly={readOnly}
                    dataType={dataType}
                    getStyle={getStyle}
                    cancelButtonElement={cancelButtonElement}
                    editButtonElement={editButtonElement}
                    inputElement={inputElement}
                />);
            case 'Undefined':
                return (<JsonValue
                    name={name}
                    value={'undefined'}
                    originalValue={'undefined'}
                    keyPath={keyPath}
                    deep={deep}
                    handleRemove={handleRemove}
                    handleUpdateValue={handleUpdateValue}
                    readOnly={readOnly}
                    dataType={dataType}
                    getStyle={getStyle}
                    cancelButtonElement={cancelButtonElement}
                    editButtonElement={editButtonElement}
                    inputElement={inputElement}
                />);
            case 'Function':
                return (<JsonFunctionValue
                    name={name}
                    value={data.toString()}
                    originalValue={data}
                    keyPath={keyPath}
                    deep={deep}
                    handleRemove={handleRemove}
                    handleUpdateValue={handleUpdateValue}
                    readOnly={readOnly}
                    dataType={dataType}
                    getStyle={getStyle}
                    cancelButtonElement={cancelButtonElement}
                    editButtonElement={editButtonElement}
                    textareaElement={textareaElement}
                />);
            case 'Symbol':
                return (<JsonValue
                    name={name}
                    value={data.toString()}
                    originalValue={data}
                    keyPath={keyPath}
                    deep={deep}
                    handleRemove={handleRemove}
                    handleUpdateValue={handleUpdateValue}
                    readOnly={readOnlyTrue}
                    dataType={dataType}
                    getStyle={getStyle}
                    cancelButtonElement={cancelButtonElement}
                    editButtonElement={editButtonElement}
                    inputElement={inputElement}
                />);
            default:
                return null;
        }
    }
}

// Add prop types
JsonNode.propTypes = propTypes;
// Add default props
JsonNode.defaultProps = defaultProps;

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
export default JsonNode;
