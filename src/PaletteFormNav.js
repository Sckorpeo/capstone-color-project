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
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const drawerWidth = 400;

const styles = (theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    navBtns: {

    }
});


class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {}
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

                    <NewPaletteDialog
                        newPaletteName={newPaletteName}
                        handleNewPaletteName={handleNewPaletteName}
                        savePalette={savePalette}
                        palettes={palettes}
                    />
                    <Link to='/'>
                        <Button
                            variant='contained'
                            color='secondary'
                        >
                            Go Back
                        </Button>
                    </Link>

                </div>
            </AppBar>
        </div>);
    }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);