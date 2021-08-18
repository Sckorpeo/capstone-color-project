import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PaletteList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { palettes } = this.props;
        return (
            <div>
                <h1>Palette List</h1>
                {palettes.map((p) => <Link to={`/palette/${p.id}`}>{p.paletteName}</Link>)}
            </div>);
    }
}

export default PaletteList;