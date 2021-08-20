import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import 'rc-slider/assets/index.css';
import './Navbar.css';

class Navbar extends Component {

    render() {
        const { level, changeLevel, changeFormat, format, sliderToggle } = this.props
        return (
            <nav className='Navbar'>
                <div className='logo'>
                    <Link to='/'>reactcolorpicker</Link>
                </div>
                {sliderToggle && <div className='slider-container'>
                    <span>Level: {level}</span>
                    <div className='slider'>
                        <Slider
                            defaultValue={level}
                            min={100}
                            max={900}
                            onAfterChange={changeLevel}
                            step={100}
                            trackStyle={{ backgroundColor: 'transparent' }}
                            railStyle={{ height: '8px' }}
                            handleStyle={{
                                backgroundColor: 'green', outline: 'none',
                                border: '2px solid green',
                                boxShadow: 'none'
                            }}
                        />
                    </div>
                </div>}
                <div className='select-container'>
                    <Select onChange={changeFormat}
                        value={format}>
                        <MenuItem value='hex'>HEX - #ffffff</MenuItem>
                        <MenuItem value='rgb'>RGB - rgb(255,255,255)</MenuItem>
                        <MenuItem value='rgba'>RGBA - rgba(255,255,255,1.0) </MenuItem>
                    </Select>
                </div>
            </nav>
        );
    }
}

export default Navbar;