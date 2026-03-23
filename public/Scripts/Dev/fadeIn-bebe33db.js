var fadeIn = () => {
    console.log('fadeIn.js');
    const elements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    elements.forEach((element) => {
        observer.observe(element);
    });
};

export { fadeIn as default };
//# sourceMappingURL=fadeIn-bebe33db.js.map
