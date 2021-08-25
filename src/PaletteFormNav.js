import React, { Component } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


class PaletteFormNav extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
            return this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            );
        });
    }

    render() {
        const { classes, open, newPaletteName, handleDrawerOpen, savePalette, handleNewPaletteName } = this.props
        return (<div>
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
                        Persistent drawer
                    </Typography>
                    <ValidatorForm onSubmit={savePalette}>
                        <TextValidator
                            value={newPaletteName}
                            onChange={handleNewPaletteName}
                            label='Palette Name'
                            validators={['required', 'isPaletteNameUnique']}
                            errorMessages={['This field is required', 'Palette name already taken']}
                        />
                    </ValidatorForm>
                    <Link to='/'>
                        <Button
                            variant='contained'
                            color='secondary'
                        >
                            Go Back
                        </Button>
                    </Link>
                    <Button
                        variant='contained'
                        color='primary'
                        onClick={savePalette}
                    >Save Palette</Button>
                </Toolbar>
            </AppBar>
        </div>);
    }
}

export default PaletteFormNav;