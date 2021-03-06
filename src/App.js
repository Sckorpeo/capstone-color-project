
import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';
import { Switch, Route } from 'react-router-dom';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import ErrorBoundary from './ErrorBoundary';
import Page from './Page';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';


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
    return (

      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            classNames='page'
            timeout={500}
          >
            <Switch location={location}>
              <Route exact path='/palette/new' render={(routeProps) =>
                <Page>
                  <NewPaletteForm
                    palettes={this.state.palettes}
                    savePalette={this.savePalette}
                    {...routeProps} />
                </Page>}
              />
              <Route exact
                path={'/palette/:paletteId/:colorId'}
                render={(routeProps) =>
                  <Page>
                    <SingleColorPalette
                      palette={generatePalette(
                        this.findPalette(routeProps.match.params.paletteId)
                      )}
                      colorId={routeProps.match.params.colorId}
                    />
                  </Page>}
              />
              <Route exact path='/' render={(routeProps) =>
                <Page>
                  <PaletteList palettes={this.state.palettes} {...routeProps} deletePalette={this.deletePalette} />
                </Page>}
              />
              <Route exact path='/palette/:id' render={(routeProps) =>
                <Page>
                  <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))} />
                </Page>}
              />
              <Route render={(routeProps) =>
                <Page>
                  <PaletteList palettes={this.state.palettes} {...routeProps} deletePalette={this.deletePalette} />
                </Page>}
              />

            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )} />
    );
  }

}

export default App;
