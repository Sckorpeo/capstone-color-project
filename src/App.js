
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
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
    this.state = {
      palettes: savedPalettes || seedColors
    };
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  findPalette(id) {
    return this.state.palettes.find((palette) => {
      return palette.id === id;
    })
  }
  savePalette(newPalette) {
    this.setState({
      palettes: [...this.state.palettes, newPalette]
    }, this.syncLocalStorage)
  }
  deletePalette(id) {
    this.setState(st => ({
      palettes: st.palettes.filter(palette => palette.id !== id)
    }), this.syncLocalStorage)
  }
  syncLocalStorage() {
    window.localStorage.setItem('palettes', JSON.stringify(this.state.palettes));
  }


  render() {
    // const palette = generatePalette(seedColors[4]);
    return (
      <Switch>
        <Route exact path='/palette/new' render={(routeProps) => <NewPaletteForm
          palettes={this.state.palettes}
          savePalette={this.savePalette}
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
        <Route exact path='/' render={(routeProps) => <PaletteList palettes={this.state.palettes} {...routeProps} deletePalette={this.deletePalette} />} />
        <Route exact path='/palette/:id' render={(routeProps) => <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />} />

      </Switch>
      // <div>
      //   <Palette palette={palette} />
      // </div>
    );
  }

}

export default App;
