import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import styles from './styles/PaletteListStyles';


class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.goToPalette = this.goToPalette.bind(this);
    }
    goToPalette(id) {
        this.props.history.push(`/palette/${id}`)
    }
    render() {
        const { palettes, classes, deletePalette } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1 className={classes.heading}>Mak-A-Palette</h1>
                        <Link to='/palette/new'>Create Palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {palettes.map((p) =>
                            <CSSTransition
                                key={p.id}
                                classNames='fade'
                                timeout={500}
                            >
                                <MiniPalette {...p}
                                    handleClick={() => this.goToPalette(p.id)}
                                    deletePalette={deletePalette}
                                    key={p.id}
                                />
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                </div>
            </div>);
    }
}

export default withStyles(styles)(PaletteList);