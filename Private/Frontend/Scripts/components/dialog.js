import A11yDialog from 'a11y-dialog';

export default () => {
    console.log('dialog a11y loaded');
    const html = document.querySelector('html');

    // setup example dialog one
    const dialogOneEl = document.querySelector('#dialog-example');
    if (dialogOneEl) {
        const dialogOne = new A11yDialog(dialogOneEl);
        dialogOne
            .on('show', () => html.classList.add('html-preventScroll'))
            .on('hide', () => html.classList.remove('html-preventScroll'));
    }

    // setup example dialog two
    const dialogTwoEl = document.querySelector('#dialog-example2');
    if (dialogTwoEl) {
        const dialogTwo = new A11yDialog(dialogTwoEl);
        dialogTwo
            .on('show', () => html.classList.add('html-preventScroll'))
            .on('hide', () => html.classList.remove('html-preventScroll'));
    }

    // setup burger menu with a11y dialog
    const dialogBurgerEl = document.querySelector('#menu');
    const burger = document.querySelector('.js-burger');
    if (dialogBurgerEl && burger) {
        const dialogBurger = new A11yDialog(dialogBurgerEl);
        dialogBurger
            .on('show', () => {
                html.classList.add('html-preventScroll');
                burger.classList.add('-active');
            })
            .on('hide', () => {
                html.classList.remove('html-preventScroll');
                burger.classList.remove('-active');
            });
    }
};
