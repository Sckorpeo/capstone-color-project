import React from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';
import { Delete } from '@material-ui/icons';



function MiniPalette(props) {
    const { classes, paletteName, emoji, colors, handleClick, id } = props;
    const miniColorBoxes = colors.map(c => (
        <div className={classes.miniColor}
            style={{ backgroundColor: c.color }}
            key={c.name}
        ></div>
    ));

    const deletePalette = (e) => {
        e.stopPropagation();
        props.deletePalette(id)
    }
    return (
        <div className={classes.root} onClick={handleClick}>
            <Delete className={classes.deleteIcon}
                onClick={deletePalette}
            />
            <div className={classes.colors}>
                {miniColorBoxes}
            </div>
            <h5 className={classes.title}>
                {paletteName}
                <span className={classes.emoji}>{emoji}</span>
            </h5>
        </div>
    );
}

export default withStyles(styles)(MiniPalette);