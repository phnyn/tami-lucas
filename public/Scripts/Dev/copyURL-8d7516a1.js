import { g as generateNode } from './helperFunctions-726a7a96.js';

// .c-alert
//     .c-alert_wrap
//         .c-alert_msg
//              p alert_text
//         .c-alert_close
//             span(aria-hidden="true").c-alert_icon.icon-name

/**
 * Creates an alert that disappears after 5000 miliseconds
 * @param {String} alert_text 
 * @param {boolean} hasBtn 
 */
function alert(alert_text, hasBtn){
    const alert = generateNode('div', 'c-alert'); // Create alert container

    const alert_wrap = generateNode('div','c-alert_wrap'); // Create alert wrapper
    alert.appendChild(alert_wrap);
    
    const alert_msg = generateNode('div', 'c-alert_msg'); // Create alert_msg container

    const p = generateNode('p','',alert_text); // Create p with alert text
    alert_msg.appendChild(p);

    alert_wrap.appendChild(alert_msg); // Add the alert message to the alert wrapper

    if(hasBtn){
        const alert_close = generateNode('button', 'c-alert_close'); // Create close button

        // Create the close button icon
        const icon = generateNode('span',null,'x');
        // if there is an icon, use this instead
        // const icon = generateNode('span','c-alert_icon icon-closename');
        // icon.setAttribute('aria-hidden', true)

        // Add the icon to the close button
        alert_close.appendChild(icon);
        alert_wrap.appendChild(alert_close);

        // Add a click event listener to hide the alert
        alert_close.addEventListener('click', function(){
            alert.style.display = 'none';
        });
    }

    //Add the alert element to the DOM as needed
    document.body.appendChild(alert);
    fadeOut(alert);

    // header height is unknown when smaller than TLS
    getTopPosition(alert);

    // in case window is resized, adjust the top position
    window.addEventListener('resize', function(){
        if(!this.window.matchMedia('(min-width: 740px)').matches){
            getTopPosition(alert);
        }
    });
}

// Remove the overlay after a given time with fade-out animation
function fadeOut(overlay){
    const removeTime = 5000; // Specify the time in milliseconds
    setTimeout(function () {
        overlay.style.opacity = '0'; // Set opacity to 0 to trigger the fade-out animation

        // After the animation ends, remove the overlay from the DOM
        overlay.addEventListener('transitionend', function () {
            overlay.parentNode.removeChild(overlay);
        });
    }, removeTime);
}

function getTopPosition(element){
    const header = document.getElementsByClassName('g-header');
    const top = header[0].offsetHeight;

    element.style.top = top + 'px';
}

var copyURL = () => {
    console.log('copyURL.js loaded');

    const copyBtn = document.getElementsByClassName('js-copyURL');

    for (let i = 0; i < copyBtn.length; i++) {
        copyBtn[i].addEventListener('click', function() {
            const copyText = window.location.href;
            const tempInput = document.createElement('input');
            tempInput.value = copyText;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            alert('Link kopiert', true);
        });
    }
};

export { copyURL as default };
//# sourceMappingURL=copyURL-8d7516a1.js.map
