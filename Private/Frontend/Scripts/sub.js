// This is a secondary entrypoint for js.
// You can have multiple Entrypoints, as demonstrated here. Main Entrypoint is main.js
// Additional entrypoints need to be referenced in rollup.config.js.
// Shared components or dynamic/lazy loaded components will be split in chunks with rollup.
// comments and console.log lines for debugging may be left in source files. They will be removed, in production build.

// import your own components here. For dynamic/lazy loading, see example in main.js.
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

domReady(() => {
    console.log('sub.js loaded');

    // initialise your imported component here
    dialogs();
});
