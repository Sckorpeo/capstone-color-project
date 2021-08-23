
import './App.css';
import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import { Switch, Route } from 'react-router-dom';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';


class App extends Component {
  findPalette(id) {
    return seedColors.find((palette) => {
      return palette.id === id;
    })
  }


  render() {
    // const palette = generatePalette(seedColors[4]);
    return (
      <Switch>
        <Route exact path='/palette/new' render={() => <NewPaletteForm />} />
        <Route exact
          path={'/palette/:paletteId/:colorId'}
          render={(routeProps) => <SingleColorPalette
            palette={generatePalette(
              this.findPalette(routeProps.match.params.paletteId)
            )}
            colorId={routeProps.match.params.colorId}
          />}
        />
        <Route exact path='/' render={(routeProps) => <PaletteList palettes={seedColors} {...routeProps} />} />
        <Route exact path='/palette/:id' render={(routeProps) => <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />} />

      </Switch>
      // <div>
      //   <Palette palette={palette} />
      // </div>
    );
  }

}

export default App;
