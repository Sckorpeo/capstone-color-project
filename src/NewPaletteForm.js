import React from 'react';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
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

const drawerWidth = 400;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
        display: 'flex',
        alignItems: 'center'
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
    container: {
        width: '90%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttons: {
        width: '100%'
    },
    btn: {
        width: '50%'
    }
}));

export default function NewPaletteForm(props) {

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [colorArray, addColor] = React.useState([]);
    const [newPaletteName, setNewPaletteName] = React.useState('');

    let paletteIsFull = colorArray.length >= 20;

    const savePalette = (emoji) => {
        let newName = newPaletteName;
        const newPalette = {
            paletteName: newName,
            id: newName.toLowerCase().replace(/ /g, '-'),
            emoji,
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

    const handleColorAdd = (curColor, newName) => {
        const newColor = {
            color: curColor,
            name: newName
        }
        addColor([...colorArray, newColor]);
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
            <div className={classes.container}>
                <Typography variant='h4' gutterBottom>Design Your Palette</Typography>
                <div className={classes.buttons}>
                    <Button variant='contained' color='secondary'
                        onClick={handleClear}
                        className={classes.btn}
                    >Clear Palette</Button>
                    <Button variant='contained' color='primary'
                        onClick={addRandomColor}
                        disabled={paletteIsFull}
                        className={classes.btn}
                    >Random Color</Button>
                </div>


                <ColorPickerForm
                    paletteIsFull={paletteIsFull}
                    colorArray={colorArray}
                    handleColorAdd={handleColorAdd}
                />
            </div>
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


