
import './App.css';
import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import { Switch, Route } from 'react-router-dom';


class App extends React.Component {
  findPalette(id) {
    return seedColors.find((palette) => {
      return palette.id === id;
    })
  }


  render() {
    const palette = generatePalette(seedColors[4]);
    return (
      <Switch>
        <Route exact path='/' render={() => <h1>Palette List Goes Here</h1>} />
        <Route exact path='/palette/:id' render={(routeProps) => <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />} />
      </Switch>
      // <div>
      //   <Palette palette={palette} />
      // </div>
    );
  }

}

export default App;
