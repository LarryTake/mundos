/*
 * Author: Alexandre Havrileck (Oxyno-zeta)
 * Date: 18/10/16
 * Licence: See Readme
 */

import React from "react";
import Body from "./components/Body";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <React.StrictMode>
      <div>
        <Header />
        <Body />
        <Footer />
      </div>
    </React.StrictMode>
  );
}

export default App;
