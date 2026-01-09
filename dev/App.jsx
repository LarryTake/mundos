/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 18/10/16
 * Licence: See Readme
 */
/* ************************************* */
/* ********       IMPORTS       ******** */
/* ************************************* */
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';

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
function App() {
    return (<div>
        <Header />
        <Body />
        <Footer />
    </div>);
}

// Add prop types
App.propTypes = propTypes;
// Add default props
App.defaultProps = defaultProps;

/* ************************************* */
/* ********       EXPORTS       ******** */
/* ************************************* */
export default App;
