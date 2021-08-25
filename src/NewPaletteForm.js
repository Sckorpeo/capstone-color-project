import React from 'react';
import PaletteFormNav from './PaletteFormNav';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
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
    const [newPaletteName, setNewPaletteName] = React.useState('');

    let paletteIsFull = colorArray.length >= 20;



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
        let newName = newPaletteName;
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
    const addRandomColor = () => {
        let done = false;
        let randomColor = null;
        while (!done) {
            let randomPalette = props.palettes[Math.floor(Math.random() * props.palettes.length)]
            randomColor = randomPalette.colors[Math.floor(Math.random() * randomPalette.colors.length)]
            done = colorArray.every(({ name }) => name.toLowerCase() !== randomColor.name.toLowerCase())
            console.log('match')
        }
        addColor([...colorArray, randomColor])
    }

    const handleChange = (evt) => {
        setName(evt.target.value)
    }
    const handleNewPaletteName = (evt) => {
        setNewPaletteName(evt.target.value)
    }

    const removeColor = (colorName) => {
        addColor(colorArray.filter(color => color.name !== colorName))
    }

    const onSortEnd = ({ oldIndex, newIndex }) => {
        addColor(
            arrayMove(colorArray, oldIndex, newIndex)
        );
    }

    return (<div className={classes.root}>
        <PaletteFormNav
            open={open}
            classes={classes}
            newPaletteName={newPaletteName}
            palettes={props.palettes}
            handleDrawerOpen={handleDrawerOpen}
            savePalette={savePalette}
            handleNewPaletteName={handleNewPaletteName}
            savePalette={savePalette}
        />
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
                <Button variant='contained' color='primary'
                    onClick={addRandomColor}
                    disabled={paletteIsFull}
                >Random Color</Button>
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
                    style={{ backgroundColor: paletteIsFull ? 'grey' : curColor }}
                    type='submit'
                    disabled={paletteIsFull}
                >{paletteIsFull ? 'Palette Full' : 'Add Color'}</Button>
            </ValidatorForm>


        </Drawer>
        <main
            className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}
        >
            <div className={classes.drawerHeader} />

            <DraggableColorList
                colorArray={colorArray}
                removeColor={removeColor}
                axis='xy'
                onSortEnd={onSortEnd}
            />


        </main>
    </div>);
}


