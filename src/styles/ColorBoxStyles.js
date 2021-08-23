import chroma from 'chroma-js';

const styles = {
    ColorBox: {
        width: '20%',
        height: props => props.fullPalette ? '25%' : '50%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-3.5px',
        '&:hover button': {
            opacity: 1
        }
    },
    copyText: {
        color: props =>
            chroma(props.background).luminance() >= .65 ? 'black' : 'white'
    },
    colorName: {
        color: props =>
            chroma(props.background).luminance() <= .06 ? 'white' : 'black'
    },
    seeMore: {
        background: 'rgba(255,255,255,0.3)',
        position: 'absolute',
        border: 'none',
        right: '0px',
        bottom: '0px',
        color: props =>
            chroma(props.background).luminance() >= .65 ? 'black' : 'white',
        width: '60px',
        height: '30px',
        textAlign: 'center',
        lineHeight: '30px',
        textTransform: 'uppercase'
    },
    copyButton: {
        width: '100px',
        height: '30px',
        position: 'absolute',
        display: 'inline-block',
        top: '50%',
        left: '50%',
        marginLeft: '-50px',
        marginTop: '-15px',
        textAlign: 'center',
        outline: 'none',
        background: 'rgba(255,255,255,0.3)',
        fontSize: '1rem',
        lineHeight: '30px',
        color: props =>
            chroma(props.background).luminance() >= .65 ? 'black' : 'white',
        textTransform: 'uppercase',
        border: 'none',
        transition: '.3s',
        textDecoration: 'none',
        opacity: 0

    },
    boxContent: {
        position: 'absolute',
        width: '90%',
        left: '0px',
        padding: '10px',
        bottom: '0px',
        color: 'black',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontSize: '12px',
    },
    copyOverlay: {
        opacity: '0',
        zIndex: '0',
        width: '100%',
        height: '100%',
        transition: 'transform ease-in-out 0.6s',
        transform: 'scale(0.1)',
    },
    showOverlay: {
        opacity: '1',
        transform: 'scale(50)',
        zIndex: '10',
        position: 'absolute',
    },
    copyMsg: {
        position: 'fixed',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        fontSize: '4rem',
        transform: 'scale(0.1)',
        opacity: '0',
        color: 'white',
        '& h1': {
            fontWeight: '400',
            textShadow: '1px 2px black',
            background: 'rgba(255,255,255,0.2)',
            width: '100%',
            textAlign: 'center',
            marginBottom: '0',
            padding: '1rem',
            textTransform: 'uppercase',
        },
        '& p': {
            fontSize: '2rem',
            fontWeight: '100',
            textAlign: 'center',
        }
    },
    showMsg: {
        opacity: '1',
        transform: 'scale(1)',
        zIndex: '25',
        transition: 'all .4s ease-in-out',
        transitionDelay: '.3s',
    }
}

export default styles;