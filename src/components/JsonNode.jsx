/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 20/10/16
 * Licence: See Readme
 */
/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */
import React, { Component, PropTypes } from 'react';
import JsonValue from './JsonValue.jsx';
import JsonObject from './JsonObject.jsx';
import JsonArray from './JsonArray.jsx';
import objectTypes from '../utils/objectTypes.jsx';

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
                />);
            case 'Function':
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
