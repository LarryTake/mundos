/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 13/10/16
 * Licence: See Readme
 */
/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */
import React, { Component, PropTypes } from 'react';
import JsonNode from './components/JsonNode.jsx';
import { value, object, array } from './utils/styles.jsx';
import deltaTypes from './utils/deltaTypes.jsx';
import objectTypes from './utils/objectTypes.jsx';

const { getObjectType } = objectTypes;

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */
// Prop types
const propTypes = {
    data: PropTypes.any.isRequired,
    rootName: PropTypes.string,
    isCollapsed: PropTypes.func,
    onFullyUpdate: PropTypes.func,
    onDeltaUpdate: PropTypes.func,
    readOnly: PropTypes.bool,
    getStyle: PropTypes.func,
};
// Default props
const defaultProps = {
    rootName: 'root',
    isCollapsed: (keyPath, deep) => (deep !== 0),
    onFullyUpdate: () => {
    },
    onDeltaUpdate: () => {
    },
    readOnly: false,
    getStyle: (keyName, data, keyPath, deep, dataType) => {
        switch (dataType) {
            case 'Object':
            case 'Error':
                return object;
            case 'Array':
                return array;
            default:
                return value;
        }
    },
};

/* ************************************* */
/* ********      COMPONENT      ******** */
/* ************************************* */
class JsonTree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            rootName: props.rootName,
        };
        // Bind
        this.onUpdate = this.onUpdate.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.state = {
            data: nextProps.data,
            rootName: nextProps.rootName,
        };
    }

    onUpdate(key, data) {
        this.setState({
            data,
        });
        // Call on fully update
        const { onFullyUpdate } = this.props;
        onFullyUpdate(data);
    }

    render() {
        const { data, rootName } = this.state;
        const { isCollapsed, onDeltaUpdate, readOnly, getStyle } = this.props;

        // Node type
        const dataType = getObjectType(data);
        let node = null;
        if (dataType === 'Object' || dataType === 'Array') {
            node = (<JsonNode
                data={data}
                name={rootName}
                collapsed={false}
                deep={-1}
                isCollapsed={isCollapsed}
                onUpdate={this.onUpdate}
                onDeltaUpdate={onDeltaUpdate}
                readOnly={readOnly}
                getStyle={getStyle}
            />);
        } else {
            node = 'Data must be an Array or Object';
        }

        return (<div>{node}</div>);
    }
}

// Add prop types
JsonTree.propTypes = propTypes;
// Add default props
JsonTree.defaultProps = defaultProps;

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
export { JsonTree };
export { deltaTypes };
