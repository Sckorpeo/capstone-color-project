import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/styles';
import 'rc-slider/assets/index.css';
import styles from './styles/NavbarStyles';



class Navbar extends Component {

    render() {
        const { level, changeLevel, changeFormat, format, sliderToggle, classes } = this.props
        return (
            <nav className={classes.Navbar}>
                <div className={classes.logo}>
                    <Link to='/'>reactcolorpicker</Link>
                </div>
                {sliderToggle && <div>
                    <span>Level: {level}</span>
                    <div className={classes.slider}>
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
                <div className={classes.selectContainer}>
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

export default withStyles(styles)(Navbar);