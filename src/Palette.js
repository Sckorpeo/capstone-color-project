import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import PaletteFooter from './PaletteFooter';
import './Palette.css';


class Palette extends Component {
    constructor(props) {
        super(props);
        this.state = {
            level: 500,
            format: 'hex',
            open: false
        };
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }
    changeLevel(level) {
        console.log(level)
        this.setState({ level })
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
        const { colors, paletteName, emoji, id } = this.props.palette;
        const { level, format, open } = this.state;
        const colorBoxes = colors[level].map(color => {
            return <ColorBox
                background={color[format]}
                name={color.name}
                id={color.id}
                key={color.id}
                paletteId={id}
                fullPalette />
        });
        return (
            <div className='Palette'>
                <Navbar level={level}
                    changeLevel={this.changeLevel}
                    changeFormat={this.changeFormat}
                    format={format}
                    sliderToggle
                />
                <div className='Palette-colors'>
                    {colorBoxes}
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
            </div>
        );
    }
}

export default Palette;