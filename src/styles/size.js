
// @media (max-width: 575.98px){...}
// @media(max-width: 767.98px)
// @media(max-width: 991.98px)
// @media(max-width: 1199.98px)



function up() {

};

function down(size) {
    const sizes = {
        xs: '575.98px',
        sm: '767.98px',
        md: '991.98px',
        lg: '1199.98px'
    }
    return `@media (max-width: ${sizes[size]})`
}


export { up, down }