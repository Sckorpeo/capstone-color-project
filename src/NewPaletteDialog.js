import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { useEffect } from 'react';

export default function NewPaletteDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        ValidatorForm.addValidationRule("isPaletteNameUnique", value => {
            return props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            );
        });
    });

    const { newPaletteName, handleNewPaletteName, savePalette } = props;

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Choose Palette Name</DialogTitle>
            <ValidatorForm onSubmit={savePalette}>
                <DialogContent>
                    <DialogContentText>
                        Please enter a name for your new palette. Names must be unique.
                    </DialogContentText>

                    <TextValidator
                        fullWidth
                        margin='normal'
                        value={newPaletteName}
                        onChange={handleNewPaletteName}
                        label='Palette Name'
                        validators={['required', 'isPaletteNameUnique']}
                        errorMessages={['This field is required', 'Palette name already taken']}
                    />


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                    >Save Palette</Button>
                </DialogActions>
            </ValidatorForm>
        </Dialog>
    );
}
