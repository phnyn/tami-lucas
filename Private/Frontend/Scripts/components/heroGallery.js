export default () => {
    const images = document.querySelectorAll('.c-hero_slide');
    if (!images.length) return;

    const fadeDuration = 1500; // CSS transition Dauer
    const intervalDuration = 4000;

    let current = 0;

    // Erstes Bild sichtbar
    images[current].classList.add('-active');

    setInterval(() => {
        const next = (current + 1) % 5; // TODO change to images.length after removing other heros

        // Nächstes Bild aktivieren
        images[next].classList.add('-active');

        // Altes Bild nach Fade entfernen
        setTimeout(() => {
            if(current !== 0){
                images[current].classList.remove('-active');
            }
            current = next; // Update current
        }, fadeDuration);

    }, intervalDuration);
};