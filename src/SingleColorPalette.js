import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PaletteFooter from './PaletteFooter';
import { Link } from 'react-router-dom';

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            format: 'hex',
            open: false
        }
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.changeFormat = this.changeFormat.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
        console.log(this._shades)
    }
    gatherShades(palette, color) {
        let shades = [];
        let allColors = palette.colors;
        for (let key in allColors) {
            shades = shades.concat(
                allColors[key].filter(c => c.id === color)
            )
        }
        return shades.slice(1);
    }
    changeFormat(evt) {
        this.setState({
            format: evt.target.value,
            open: true
        })
    }
    closeSnackbar(evt) {
        this.setState({
            open: false
        })
    }
    render() {
        const { format, open } = this.state;
        const { paletteName, emoji, id } = this.props.palette;
        const colorBoxes = this._shades.map(color => {
            return <ColorBox
                key={color.name}
                name={color.name}
                background={color[format]}
                fullPalette={false}
            />
        })

        return (
            <div className='SingleColorPalette Palette'>
                <Navbar
                    format={format}
                    changeFormat={this.changeFormat}
                    sliderToggle={false}
                />
                <div className='Palette-colors'>
                    {colorBoxes}
                    <div className='go-back ColorBox'>
                        <Link to={`/palette/${id}`}
                            className='back-btn'
                        >Go Back</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji} />
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    open={open}
                    autoHideDuration={3000}
                    message={<span id='message-id'>Format Changed</span>}
                    ContentProps={{
                        'aria-describedby': 'message-id'
                    }}
                    action={[
                        <IconButton onClick={this.closeSnackbar}
                            color='inherit'
                            key='close'
                            aria-label='close notification'
                        >
                            <CloseIcon />
                        </IconButton>
                    ]}
                    onClose={this.closeSnackbar}
                />
            </div>);
    }
}

export default SingleColorPalette;