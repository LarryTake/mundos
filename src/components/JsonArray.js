/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 20/10/16
 * Licence: See Readme
 */
/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */
import React, { Component, PropTypes } from 'react';
import JsonNode from './JsonNode.js';
import JsonAddValue from './JsonAddValue.js';
import objectTypes from '../utils/objectTypes.js';
import { ADD_DELTA_TYPE, REMOVE_DELTA_TYPE, UPDATE_DELTA_TYPE } from '../utils/deltaTypes.js';

const { getObjectType } = objectTypes;

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */
// Prop types
const propTypes = {
    data: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    isCollapsed: PropTypes.func.isRequired,
    keyPath: PropTypes.array,
    deep: PropTypes.number,
    handleRemove: PropTypes.func,
    onUpdate: PropTypes.func.isRequired,
    onDeltaUpdate: PropTypes.func.isRequired,
    readOnly: PropTypes.bool.isRequired,
    dataType: PropTypes.string,
    getStyle: PropTypes.func.isRequired,
};
// Default props
const defaultProps = {
    collapsed: true,
    name: 'root',
    data: [],
    keyPath: [],
    deep: 0,
};

/* ************************************* */
/* ********      COMPONENT      ******** */
/* ************************************* */
class JsonArray extends Component {
    constructor(props) {
        super(props);
        const keyPath = [
            ...props.keyPath,
            props.name,
        ];
        const deep = props.deep + 1;
        this.state = {
            data: this.props.data,
            name: this.props.name,
            keyPath,
            deep,
            collapsed: props.isCollapsed(keyPath, deep),
            addFormVisible: false,
        };

        // Bind
        this.handleCollapseMode = this.handleCollapseMode.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.handleAddMode = this.handleAddMode.bind(this);
        this.handleAddValueAdd = this.handleAddValueAdd.bind(this);
        this.handleAddValueCancel = this.handleAddValueCancel.bind(this);
        this.handleEditValue = this.handleEditValue.bind(this);
        this.onChildUpdate = this.onChildUpdate.bind(this);
        this.renderCollapsed = this.renderCollapsed.bind(this);
        this.renderNotCollapsed = this.renderNotCollapsed.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data,
        });
    }

    onChildUpdate(childKey, childData) {
        const { data, keyPath } = this.state;
        // Update data
        data[childKey] = childData;
        // Put new data
        this.setState({
            data,
        });
        // Spread
        const { onUpdate } = this.props;
        const size = keyPath.length;
        onUpdate(keyPath[size - 1], data);
    }

    handleAddMode() {
        this.setState({
            addFormVisible: true,
        });
    }

    handleCollapseMode() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    handleRemoveItem(index) {
        return () => {
            const { data, keyPath, deep } = this.state;
            const objType = getObjectType(data[index]);
            let deltaUpdateResult = null;
            if (objType === 'Object' || objType === 'Array') {
                deltaUpdateResult = {
                    type: UPDATE_DELTA_TYPE,
                    keyPath,
                    deep,
                    key: index,
                    oldValue: data[index],
                    newValue: null,
                };
                data[index] = null;
            } else {
                deltaUpdateResult = {
                    type: REMOVE_DELTA_TYPE,
                    keyPath,
                    deep,
                    key: index,
                    oldValue: data[index],
                };
                data.splice(index, 1);
            }
            this.setState({
                data,
            });
            // Spread new update
            const { onUpdate, onDeltaUpdate } = this.props;
            onUpdate(keyPath[keyPath.length - 1], data);
            // Spread delta update
            onDeltaUpdate(deltaUpdateResult);
        };
    }

    handleAddValueAdd({ value }) {
        const { data, keyPath, deep } = this.state;
        // Update data
        const newData = [
            ...data,
            value,
        ];
        this.setState({
            data: newData,
        });
        // Cancel add to close
        this.handleAddValueCancel();
        // Spread new update
        const { onUpdate, onDeltaUpdate } = this.props;
        onUpdate(keyPath[keyPath.length - 1], newData);
        // Spread delta update
        onDeltaUpdate({
            type: ADD_DELTA_TYPE,
            keyPath,
            deep,
            key: newData.length - 1,
            newValue: value,
        });
    }

    handleAddValueCancel() {
        this.setState({
            addFormVisible: false,
        });
    }

    handleEditValue({ key, value }) {
        const { data, keyPath, deep } = this.state;
        // Update value
        const oldValue = data[key];
        data[key] = value;
        // Set state
        this.setState({
            data,
        });
        // Spread new update
        const { onUpdate, onDeltaUpdate } = this.props;
        onUpdate(keyPath[keyPath.length - 1], data);
        // Spread delta update
        onDeltaUpdate({
            type: UPDATE_DELTA_TYPE,
            keyPath,
            deep,
            key,
            newValue: value,
            oldValue,
        });
    }

    renderCollapsed() {
        const { name, data, keyPath, deep } = this.state;
        const { handleRemove, readOnly, getStyle, dataType } = this.props;

        const { minus, collapsed } = getStyle(name, data, keyPath, deep, dataType);
        const collapseValue = ' [...]';
        const numberOfItems = data.length;
        let minusElement = (deep !== 0) ? (<span onClick={handleRemove} style={minus}> - </span>) : null;
        // Check if readOnly is activated
        if (readOnly) {
            minusElement = null;
        }

        const itemName = (numberOfItems > 1) ? 'items' : 'item';

        return (<span>
            <span style={collapsed} onClick={this.handleCollapseMode}>
                {collapseValue} {numberOfItems} {itemName}
            </span>
            {minusElement}
        </span>);
    }

    renderNotCollapsed() {
        const { name, data, keyPath, deep, addFormVisible } = this.state;
        const { isCollapsed, handleRemove, onDeltaUpdate, readOnly, getStyle, dataType } = this.props;
        const { minus, plus, delimiter, ul, addForm } = getStyle(name, data, keyPath, deep, dataType);

        let minusElement = (deep !== 0) ? (<span onClick={handleRemove} style={minus}> - </span>) : null;
        // Check if readOnly is activated
        if (readOnly) {
            minusElement = null;
        }

        const list = data
            .map((item, index) => <JsonNode
                key={index}
                name={`${index}`}
                data={item}
                keyPath={keyPath}
                deep={deep}
                isCollapsed={isCollapsed}
                handleRemove={this.handleRemoveItem(index)}
                handleUpdateValue={this.handleEditValue}
                onUpdate={this.onChildUpdate}
                onDeltaUpdate={onDeltaUpdate}
                readOnly={readOnly}
                getStyle={getStyle}
            />);

        const onlyValue = true;
        let menu = addFormVisible ?
            (<span style={addForm}><JsonAddValue
                handleAdd={this.handleAddValueAdd}
                handleCancel={this.handleAddValueCancel}
                onlyValue={onlyValue}
            /></span>) :
            (<span><span onClick={this.handleAddMode} style={plus}> + </span> {minusElement}</span>);
        // Check if readOnly is activated
        if (readOnly) {
            menu = null;
        }

        const startObject = '[';
        const endObject = ']';
        return (<span>
            <span style={delimiter}>{startObject}</span>
            <ul style={ul}>
                {list}
            </ul>
            <span style={delimiter}>{endObject}</span>
            {menu}
        </span>);
    }

    render() {
        const { name, collapsed, data, keyPath, deep } = this.state;
        const { dataType, getStyle } = this.props;
        const value = collapsed ? this.renderCollapsed() : this.renderNotCollapsed();
        const style = getStyle(name, data, keyPath, deep, dataType);

        return (
            <div>
                <label onClick={this.handleCollapseMode}>
                    <span style={style.name}>{name} : </span>
                </label>
                {value}
            </div>
        );
    }
}

// Add prop types
JsonArray.propTypes = propTypes;
// Add default props
JsonArray.defaultProps = defaultProps;

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
export default JsonArray;
