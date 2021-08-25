import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const styles = {
    root: {
        width: '100%'
    },
    picker: {
        width: '100% !important',
        marginTop: '2rem'
    },
    addColor: {
        width: '100%',
        padding: '1rem',
        marginTop: '1rem',
        fontSize: '2rem'
    },
    colorNameInput: {
        width: '100%',
        height: '70px',
    }
}

class ColorPickerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curColor: 'purple',
            newName: ''
        }
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleColorAdd = this.handleColorAdd.bind(this);
    }
    componentDidMount() {
        ValidatorForm.addValidationRule("isNameUnique", value => {
            return this.props.colorArray.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            );
        });
        ValidatorForm.addValidationRule("isColorUnique", value => {
            return this.props.colorArray.every(
                ({ color }) => color !== this.state.curColor
            );
        });
    }
    handleColorChange(newColor) {
        this.setState({ curColor: newColor.hex })
    }
    handleChange(evt) {
        this.setState({ newName: evt.target.value })
    }
    handleColorAdd() {
        const { curColor, newName } = this.state;
        this.props.handleColorAdd(curColor, newName);
        this.setState({ newName: '' });
    }
    render() {
        const { paletteIsFull, classes } = this.props;
        const { curColor, newName } = this.state;
        return (<div className={classes.root}>
            <ChromePicker
                color={curColor}
                onChangeComplete={this.handleColorChange}
                className={classes.picker}
            />
            <ValidatorForm onSubmit={this.handleColorAdd}>
                <TextValidator
                    value={newName}
                    onChange={this.handleChange}
                    validators={['required', 'isNameUnique', 'isColorUnique']}
                    errorMessages={['This field is required', 'Color name must be unique', 'Color must be unique']}
                    className={classes.colorNameInput}
                    variant='filled'
                    margin='normal'
                    placeholder='Color Name'
                />
                <Button
                    variant='contained'
                    color='primary'
                    style={{ backgroundColor: paletteIsFull ? 'grey' : curColor }}
                    type='submit'
                    disabled={paletteIsFull}
                    className={classes.addColor}
                >{paletteIsFull ? 'Palette Full' : 'Add Color'}</Button>
            </ValidatorForm>
        </div>);
    }
}

export default withStyles(styles)(ColorPickerForm);