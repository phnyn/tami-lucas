import { alert } from './alert';

export default () => {
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