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
    dialogs();

    const componentHero = document.querySelectorAll('.c-hero');
    if (componentHero.length > 0) {
        import('./components/heroGallery').then(({ default: hero }) => {
            hero();
            return null;
        });
    }

    const componentfadeIn = document.querySelectorAll('.fade-in');
    if (componentfadeIn.length > 0) {
        import('./components/fadeIn').then(({ default: fadeIn }) => {
            fadeIn();
            return null;
        });
    }

    // for dynamic/lazy loading of your component use this example
    const componentAccordion = document.querySelectorAll('.js-accordion');
    if (componentAccordion.length > 0) {
        import('./components/accordion').then(({ default: accordion }) => {
            accordion();
            return null;
        });
    }

    // const componentSlider = document.querySelectorAll('.js-imageSlider');
    // if (componentSlider.length > 0) {
    //     import('./components/slider').then(({ default: slider }) => {
    //         slider();
    //         return null;
    //     });
    // }
});
