import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/styles';
import styles from './styles/MiniPaletteStyles';
import { Delete } from '@material-ui/icons';



class MiniPalette extends PureComponent {

    deletePalette = (e) => {
        e.stopPropagation();
        this.props.deletePalette(this.props.id)
    }
    render() {
        const { classes, paletteName, emoji, colors, handleClick, id } = this.props;
        const miniColorBoxes = colors.map(c => (
            <div className={classes.miniColor}
                style={{ backgroundColor: c.color }}
                key={c.name}
            ></div>
        ));
        console.log('Rerendeing:', paletteName)
        return (
            <div className={classes.root} onClick={() => handleClick(id)}>
                <Delete className={classes.deleteIcon}
                    onClick={this.deletePalette}
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
}

export default withStyles(styles)(MiniPalette);