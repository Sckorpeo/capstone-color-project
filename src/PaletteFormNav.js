import React, { Component } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import NewPaletteDialog from './NewPaletteDialog';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import styles from './styles/PaletteFormNavStyles';


class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formShowing: false
        }
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
    }
    showForm() {
        this.setState({ formShowing: true })
    }
    hideForm() {
        this.setState({ formShowing: false })
    }

    render() {
        const { classes, open, newPaletteName, handleDrawerOpen, savePalette, handleNewPaletteName, palettes } = this.props
        return (<div className={classes.root}>
            <CssBaseline />
            <AppBar
                color='default'
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Create A Palette
                    </Typography>
                </Toolbar>
                <div className={classes.navBtns}>
                    <Link to='/' className={classes.link}>
                        <Button
                            variant='contained'
                            color='secondary'
                            className={classes.button}
                        >
                            Go Back
                        </Button>
                    </Link>
                    <Button variant="contained" color="primary" onClick={this.showForm}
                        className={classes.button}>

                        Save Palette
                    </Button>
                </div>
            </AppBar>
            {this.state.formShowing && (<NewPaletteDialog
                newPaletteName={newPaletteName}
                handleNewPaletteName={handleNewPaletteName}
                savePalette={savePalette}
                palettes={palettes}
                hideForm={this.hideForm}
            />)}
        </div>);
    }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);