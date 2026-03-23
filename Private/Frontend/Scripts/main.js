// This is the main entrypoint for js.
// You can have multiple Entrypoints, as demonstrated with sub.js.
// Shared components or dynamic/lazy loaded components will be split in chunks with rollup.
// comments and console.log lines for debugging may be left in source files. They will be removed, in production build.

// import your own components here. For dynamic loading, see example in domReady call
import headerSticky from './components/headerSticky';
import dialogs from './components/dialog';

// DOM ready helper function. Please do not touch
function domReady (callbackFunc) {
    if (document.readyState !== 'loading') {
        callbackFunc();
    } else if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', callbackFunc);
    } else {
        document.attachEvent('onreadystatechange', function () {
            if (document.readyState === 'complete') {
                callbackFunc();
            }
        });
    }
}

// Party starts here
domReady(() => {
    console.log('main.js loaded');
    
    // initialise your imported component here
    headerSticky();
    console.log('hello');
    dialogs();

    // for dynamic/lazy loading of your component use this example
    const componentAccordion = document.querySelectorAll('.js-accordion');
    if (componentAccordion.length > 0) {
        import('./components/accordion').then(({ default: accordion }) => {
            accordion();
            return null;
        });
    }

    const componentSlider = document.querySelectorAll('.js-imageSlider');
    if (componentSlider.length > 0) {
        import('./components/slider').then(({ default: slider }) => {
            slider();
            return null;
        });
    }

    const componentSelect = document.querySelectorAll('.js-select');
    if (componentSelect.length > 0) {
        import('./components/select').then(({ default: select }) => {
            select();
            return null;
        });
    }

    const componentCopyURL = document.querySelectorAll('.js-copyURL');
    if (componentSelect.length > 0) {
        import('./components/copyURL').then(({ default: copyURL }) => {
            copyURL();
            return null;
        });
    }

    const componentflipCard = document.querySelectorAll('.js-flipCard');
    if (componentSelect.length > 0) {
        import('./components/flipCard').then(({ default: flipCard }) => {
            flipCard();
            return null;
        });
    }
});
