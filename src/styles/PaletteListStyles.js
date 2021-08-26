import { urlToRequest } from 'loader-utils';
import { down } from './size';
import bg from './bg.svg'
const styles = {
    root: {
        height: '100vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        // background by SVGBackgrounds.com 
        backgroundColor: '#1C34EE',
        backgroundImage: `url(${bg})`,
        overflow: 'scroll'
    },
    container: {
        width: '50%',
        display: 'flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
        flexWrap: 'wrap',
        [down('lg')]: {
            width: '80%'
        },
        [down('xs')]: {
            width: '60%'
        }
    },
    nav: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        color: 'white',
        alignItems: 'center',
        '& a': {
            color: 'white'
        }
    },
    palettes: {
        boxSizing: 'border-box',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(3,30%)',
        gridGap: '2.5rem',
        [down('md')]: {
            gridTemplateColumns: 'repeat(2,50%)'
        },
        [down('xs')]: {
            gridTemplateColumns: 'repeat(1,100%)'
        }
    },
    heading: {
        fontSize: '2rem'
    }
}

export default styles;