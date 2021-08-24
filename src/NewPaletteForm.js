import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorBox from './DraggableColorBox';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


const drawerWidth = 400;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
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
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        height: 'calc(100vh - 64px)',
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export default function NewPaletteForm(props) {


    const classes = useStyles();
    // const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [curColor, setColor] = React.useState('purple');
    const [colorArray, addColor] = React.useState([]);
    const [newName, setName] = React.useState('');



    React.useEffect(() => {
        ValidatorForm.addValidationRule("isNameUnique", value => {
            return colorArray.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            );
        });
        ValidatorForm.addValidationRule("isColorUnique", value => {
            return colorArray.every(
                ({ color }) => color !== curColor
            );
        });
    });

    const savePalette = () => {
        let newName = 'New test palette'
        const newPalette = {
            paletteName: newName,
            id: newName.toLowerCase().replace(/ /g, '-'),
            emoji: '',
            colors: colorArray
        }
        props.savePalette(newPalette);
        props.history.push('/');
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    }

    const handleColorChange = (newColor) => {
        setColor(newColor.hex);
    }

    const handleColorAdd = () => {
        const newColor = {
            color: curColor,
            name: newName
        }
        addColor([...colorArray, newColor]);
        setName('');
    }

    const handleClear = () => {
        addColor([])
    }

    const handleChange = (evt) => {
        setName(evt.target.value)
    }

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
                    Persistent drawer
                </Typography>
                <Button
                    variant='contained'
                    color='primary'
                    onClick={savePalette}
                >Save Palette</Button>
            </Toolbar>
        </AppBar>
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <Divider />

            <Typography variant='h4'>Design Your Palette</Typography>
            <div>
                <Button variant='contained' color='secondary'
                    onClick={handleClear}
                >Clear Palette</Button>
                <Button variant='contained' color='primary'>Random Color</Button>
            </div>
            <ChromePicker
                color={curColor}
                onChangeComplete={handleColorChange}
            />
            <ValidatorForm onSubmit={handleColorAdd}>
                <TextValidator
                    value={newName}
                    onChange={handleChange}
                    validators={['required', 'isNameUnique', 'isColorUnique']}
                    errorMessages={['This field is required', 'Color name must be unique', 'Color must be unique']}
                />
                <Button
                    variant='contained'
                    color='primary'
                    style={{ backgroundColor: curColor }}
                    type='submit'
                >Add Color</Button>
            </ValidatorForm>


        </Drawer>
        <main
            className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}
        >
            <div className={classes.drawerHeader} />

            {colorArray.map(color => (
                <DraggableColorBox color={color.color} name={color.name} />
            ))}


        </main>
    </div>);
}


