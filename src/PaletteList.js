import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { Close, DeleteForever } from '@material-ui/icons';
import Avatar from '@material-ui/core/Avatar';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import styles from './styles/PaletteListStyles';


class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteDialog: false,
            deletingPalette: ''
        }
        this.goToPalette = this.goToPalette.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.openDialog = this.openDialog.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    goToPalette(id) {
        this.props.history.push(`/palette/${id}`)
    }
    openDialog(id) {
        this.setState({ deleteDialog: true, deletingPalette: id })
    }
    closeDialog() {
        this.setState({ deleteDialog: false, deletingPalette: '' })
    }
    handleDelete() {
        this.props.deletePalette(this.state.deletingPalette);
        this.closeDialog();

    }
    render() {
        const { palettes, classes, deletePalette } = this.props;
        const { deleteDialog } = this.state;
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
                                    deletePalette={this.openDialog}
                                    key={p.id}
                                />
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                </div>
                <Dialog open={deleteDialog}
                    onClose={this.closeDialog}
                >

                    <DialogTitle>Are you sure you want to delete?</DialogTitle>
                    <List>
                        <ListItem button
                            onClick={this.handleDelete}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    style={{ background: red[100], color: red[600] }}
                                >
                                    <DeleteForever />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='Delete' />
                        </ListItem>
                        <ListItem button
                            onClick={this.closeDialog}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    style={{ background: blue[100], color: blue[900] }}
                                >
                                    <Close />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='Cancel' />
                        </ListItem>
                    </List>
                </Dialog>
            </div>);
    }
}

export default withStyles(styles)(PaletteList);