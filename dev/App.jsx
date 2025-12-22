/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 18/10/16
 * Licence: See Readme
 */
/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */
import React, {Component} from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Body from './components/Body.jsx'

/* ************************************* */
/* ********      VARIABLES      ******** */
/* ************************************* */
// Prop types
const propTypes = {};
// Default props
const defaultProps = {};

/* ************************************* */
/* ********      COMPONENT      ******** */
/* ************************************* */
class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
            <Header />
            <Body />
            <Footer />
        </div>);
    }
}

// Add prop types
App.propTypes = propTypes;
// Add default props
App.defaultProps = defaultProps;

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
export default App;
