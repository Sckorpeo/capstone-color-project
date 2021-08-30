import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
    '@global': {
        '.page-enter': {
            transform: 'translateX(100%)'
        },
        '.page-enter-active': {
            transform: 'translateX(0)'
        },
        '.page-exit-active': {
            transform: 'translateX(-100%)',

        }
    },
    Page: {
        height: '100vh',
        position: 'fixed',
        width: '100%',
        top: '0',
        transition: 'transform 0.5s ease-in-out'
    }
}

class Page extends Component {
    render() {
        const { classes } = this.props;
        return (
            <section
                className={classes.Page}
                onClick={this.handleClick}>
                {this.props.children}
            </section>
        );
    }
}

export default withStyles(styles)(Page);