import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

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
        const { paletteIsFull } = this.props;
        const { curColor, newName } = this.state;
        return (<div>
            <ChromePicker
                color={curColor}
                onChangeComplete={this.handleColorChange}
            />
            <ValidatorForm onSubmit={this.handleColorAdd}>
                <TextValidator
                    value={newName}
                    onChange={this.handleChange}
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
        </div>);
    }
}

export default ColorPickerForm;