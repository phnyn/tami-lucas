export default () => {
    const flipcards = document.querySelectorAll('.js-flipCard');
    if (!flipcards.length) return;

    flipcards.forEach(card => {
        const id = Math.random().toString(16).slice(2);
        const closeBtn = card.querySelector('.c-flipCard_btn');
        const closeLabel = closeBtn.querySelector('.c-flipCard_btnLabel');
        const headline = card.querySelector('.c-flipCard_headline');
        const backpanel = card.querySelector('.c-flipCard_face.-back');
        const frontpanel = card.querySelector('.c-flipCard_face.-front');

        closeLabel.id= `flipcard-${id}-label`;
        headline.id = `flipcard-${id}-headline`;
        backpanel.id = `flipcard-${id}-back`;

        closeBtn.setAttribute('aria-expanded', false);
        closeBtn.setAttribute('aria-controls', backpanel.id);
        closeBtn.setAttribute('aria-labelledby', `${headline.id} ${closeLabel.id}`);

        frontpanel.setAttribute('aria-hidden', 'false');
        frontpanel.removeAttribute('inert');

        backpanel.setAttribute('aria-hidden', 'true');
        backpanel.setAttribute('inert','');
        backpanel.setAttribute('tabindex', '-1');

        closeBtn.addEventListener('click', () => {
            const isOpen = closeBtn.getAttribute('aria-expanded') === 'true';
            const willOpen = !isOpen;

            closeBtn.setAttribute('aria-expanded', willOpen? 'true':'false');
            closeLabel.textContent = willOpen ? 'Details schließen' : 'Details anzeigen';
            card.classList.toggle('-flipped', willOpen);

            frontpanel.setAttribute('aria-hidden', willOpen ? 'true' : 'false');
            frontpanel.toggleAttribute('inert', willOpen);

            backpanel.setAttribute('aria-hidden', willOpen ? 'false' : 'true');
            backpanel.toggleAttribute('inert', !willOpen);
            card.classList.add('-isFlipping');
            setTimeout(() =>  {
                card.classList.remove('-isFlipping');
            }, 450);
        });
    });
};