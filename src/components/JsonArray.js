/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 20/10/16
 * Licence: See Readme
 */
/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import JsonNode from './JsonNode';
import JsonAddValue from './JsonAddValue';
import { getObjectType } from '../utils/objectTypes';
import { ADD_DELTA_TYPE, REMOVE_DELTA_TYPE, UPDATE_DELTA_TYPE } from '../types/deltaTypes';

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
    readOnly: PropTypes.func.isRequired,
    dataType: PropTypes.string,
    getStyle: PropTypes.func.isRequired,
    addButtonElement: PropTypes.element,
    cancelButtonElement: PropTypes.element,
    editButtonElement: PropTypes.element,
    inputElementGenerator: PropTypes.func.isRequired,
    textareaElementGenerator: PropTypes.func.isRequired,
    minusMenuElement: PropTypes.element,
    plusMenuElement: PropTypes.element,
    beforeRemoveAction: PropTypes.func,
    beforeAddAction: PropTypes.func,
    beforeUpdateAction: PropTypes.func,
    logger: PropTypes.object.isRequired,
    onSubmitValueParser: PropTypes.func.isRequired,
};
// Default props
const defaultProps = {
    keyPath: [],
    deep: 0,
    minusMenuElement: <span> - </span>,
    plusMenuElement: <span> + </span>,
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
        this.state = {
            data: props.data,
            name: props.name,
            keyPath,
            deep: props.deep,
            collapsed: props.isCollapsed(keyPath, props.deep, props.data),
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
            const { beforeRemoveAction, logger } = this.props;
            const { data, keyPath, deep } = this.state;
            const oldValue = data[index];

            // Before Remove Action
            beforeRemoveAction(index, keyPath, deep, oldValue).then(() => {
                const objType = getObjectType(data[index]);
                const deltaUpdateResult = {
                    keyPath,
                    deep,
                    key: index,
                    oldValue,
                };

                if (objType === 'Object' || objType === 'Array') {
                    deltaUpdateResult.type = UPDATE_DELTA_TYPE;
                    deltaUpdateResult.newValue = null;
                    data[index] = null;
                } else {
                    deltaUpdateResult.type = REMOVE_DELTA_TYPE;
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
            }).catch(logger.error);
        };
    }

    handleAddValueAdd({ newValue }) {
        const { data, keyPath, deep } = this.state;
        const { beforeAddAction, logger } = this.props;

        beforeAddAction(data.length, keyPath, deep, newValue).then(() => {
            // Update data
            const newData = [
                ...data,
                newValue,
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
                newValue,
            });
        }).catch(logger.error);
    }

    handleAddValueCancel() {
        this.setState({
            addFormVisible: false,
        });
    }

    handleEditValue({ key, value }) {
        return new Promise((resolve, reject) => {
            const { beforeUpdateAction } = this.props;
            const { data, keyPath, deep } = this.state;

            // Old value
            const oldValue = data[key];

            // Before update action
            beforeUpdateAction(key, keyPath, deep, oldValue, value).then(() => {
                // Update value
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
                // Resolve
                resolve();
            }).catch(reject);
        });
    }

    renderCollapsed() {
        const { name, data, keyPath, deep } = this.state;
        const { handleRemove, readOnly, getStyle, dataType, minusMenuElement } = this.props;

        const { minus, collapsed } = getStyle(name, data, keyPath, deep, dataType);
        const collapseValue = ' [...]';
        const numberOfItems = data.length;
        let minusElement = null;
        // Check if readOnly is activated
        if (!readOnly(name, data, keyPath, deep, dataType)) {
            const minusMenuLayout = React.cloneElement(minusMenuElement, {
                onClick: handleRemove,
                className: 'rejt-minus-menu',
                style: minus,
            });
            minusElement = (deep !== -1) ? minusMenuLayout : null;
        }

        const itemName = (numberOfItems > 1) ? 'items' : 'item';

        /* eslint-disable jsx-a11y/no-static-element-interactions */
        return (<span className="rejt-collapsed">
            <span className="rejt-collapsed-text" style={collapsed} onClick={this.handleCollapseMode}>
                {collapseValue} {numberOfItems} {itemName}
            </span>
            {minusElement}
        </span>);
        /* eslint-enable */
    }

    renderNotCollapsed() {
        const { name, data, keyPath, deep, addFormVisible } = this.state;
        const {
            isCollapsed,
            handleRemove,
            onDeltaUpdate,
            readOnly,
            getStyle,
            dataType,
            addButtonElement,
            cancelButtonElement,
            editButtonElement,
            inputElementGenerator,
            textareaElementGenerator,
            minusMenuElement,
            plusMenuElement,
            beforeRemoveAction,
            beforeAddAction,
            beforeUpdateAction,
            logger,
            onSubmitValueParser,
            } = this.props;
        const { minus, plus, delimiter, ul, addForm } = getStyle(name, data, keyPath, deep, dataType);

        let minusElement = null;
        const readOnlyResult = readOnly(name, data, keyPath, deep, dataType);
        // Check if readOnly is activated
        if (!readOnlyResult) {
            const minusMenuLayout = React.cloneElement(minusMenuElement, {
                onClick: handleRemove,
                className: 'rejt-minus-menu',
                style: minus,
            });
            minusElement = (deep !== -1) ? minusMenuLayout : null;
        }

        const list = data
            .map((item, index) => <JsonNode
                key={index}
                name={`${index}`}
                data={item}
                keyPath={keyPath}
                deep={deep + 1}
                isCollapsed={isCollapsed}
                handleRemove={this.handleRemoveItem(index)}
                handleUpdateValue={this.handleEditValue}
                onUpdate={this.onChildUpdate}
                onDeltaUpdate={onDeltaUpdate}
                readOnly={readOnly}
                getStyle={getStyle}
                addButtonElement={addButtonElement}
                cancelButtonElement={cancelButtonElement}
                editButtonElement={editButtonElement}
                inputElementGenerator={inputElementGenerator}
                textareaElementGenerator={textareaElementGenerator}
                minusMenuElement={minusMenuElement}
                plusMenuElement={plusMenuElement}
                beforeRemoveAction={beforeRemoveAction}
                beforeAddAction={beforeAddAction}
                beforeUpdateAction={beforeUpdateAction}
                logger={logger}
                onSubmitValueParser={onSubmitValueParser}
            />);

        const onlyValue = true;
        let menu = null;
        // Check if readOnly is activated
        if (!readOnlyResult) {
            const plusMenuLayout = React.cloneElement(plusMenuElement, {
                onClick: this.handleAddMode,
                className: 'rejt-plus-menu',
                style: plus,
            });
            menu = addFormVisible ?
                (<span className="rejt-add-form" style={addForm}><JsonAddValue
                    handleAdd={this.handleAddValueAdd}
                    handleCancel={this.handleAddValueCancel}
                    onlyValue={onlyValue}
                    addButtonElement={addButtonElement}
                    cancelButtonElement={cancelButtonElement}
                    inputElementGenerator={inputElementGenerator}
                    keyPath={keyPath}
                    deep={deep}
                    onSubmitValueParser={onSubmitValueParser}
                /></span>) :
                (<span>
                    {plusMenuLayout} {minusElement}
                </span>);
        }

        const startObject = '[';
        const endObject = ']';
        return (<span className="rejt-not-collapsed">
            <span className="rejt-not-collapsed-delimiter" style={delimiter}>{startObject}</span>
            <ul className="rejt-not-collapsed-list" style={ul}>
                {list}
            </ul>
            <span className="rejt-not-collapsed-delimiter" style={delimiter}>{endObject}</span>
            {menu}
        </span>);
    }

    render() {
        const { name, collapsed, data, keyPath, deep } = this.state;
        const { dataType, getStyle } = this.props;
        const value = collapsed ? this.renderCollapsed() : this.renderNotCollapsed();
        const style = getStyle(name, data, keyPath, deep, dataType);

        /* eslint-disable jsx-a11y/no-static-element-interactions */
        return (
            <div className="rejt-array-node">
                <span onClick={this.handleCollapseMode}>
                    <span className="rejt-name" style={style.name}>{name} : </span>
                </span>
                {value}
            </div>
        );
        /* eslint-enable */
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
