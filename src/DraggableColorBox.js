
import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
    root: {
        width: '20%',
        height: '25%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-5px',
        '&:hover svg': {
            color: 'white',
            transform: 'scale(1.5)'
        }
    },
    boxContent: {
        position: 'absolute',
        width: '100%',
        left: '0px',
        padding: '10px',
        bottom: '0px',
        color: 'black',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontSize: '12px',
        display: 'flex',
        justifyContent: 'space-between'
    },
    deleteIcon: {
        color: 'rgba(0,0,0,0.5)',
        transition: 'all 0.3s ease-in-out'
    }


}

const DraggableColorBox = SortableElement((props) => {
    const { classes, handleDelete, name, color } = props;
    return (<div
        className={classes.root}
        style={{ backgroundColor: color }}
    >
        <div className={classes.boxContent}>
            <span>{props.name}</span>
            <DeleteIcon className={classes.deleteIcon}
                onClick={handleDelete} />
        </div>

    </div>);

})

export default withStyles(styles)(DraggableColorBox);