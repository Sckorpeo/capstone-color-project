
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
  constructor(props) {
    super(props);
    this.state = {
      palettes: seedColors
    }
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }

  findPalette(id) {
    return this.state.palettes.find((palette) => {
      return palette.id === id;
    })
  }
  savePalette(newPalette) {
    this.setState({
      palettes: [...this.state.palettes, newPalette]
    })
  }


  render() {
    // const palette = generatePalette(seedColors[4]);
    return (
      <Switch>
        <Route exact path='/palette/new' render={(routeProps) => <NewPaletteForm savePalette={this.savePalette}
          {...routeProps} />} />
        <Route exact
          path={'/palette/:paletteId/:colorId'}
          render={(routeProps) => <SingleColorPalette
            palette={generatePalette(
              this.findPalette(routeProps.match.params.paletteId)
            )}
            colorId={routeProps.match.params.colorId}
          />}
        />
        <Route exact path='/' render={(routeProps) => <PaletteList palettes={this.state.palettes} {...routeProps} />} />
        <Route exact path='/palette/:id' render={(routeProps) => <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />} />

      </Switch>
      // <div>
      //   <Palette palette={palette} />
      // </div>
    );
  }

}

export default App;
