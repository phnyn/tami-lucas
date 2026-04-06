import { d as dialogs } from './dialog-a7c2a742.js';

// This is a secondary entrypoint for js.

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
//# sourceMappingURL=sub.js.map
