// controls behaviour of accordion component
// there is a check if one of the accordion items is already expanded in the markup and sets this item as open
// if you add the class -oneOpen to a .js-accordion then at least one item stays open

var accordion = () => {
    console.log('accordion.js loaded');

    // Function to generate a random unique ID
    function generateUniqueId() {
        return Math.floor(Math.random() * 1000000);
    }

    // Function to handle item attributes and keep track if at least one item is open
    function handleItemAttributes(items, itemsNumber, keepOneOpen) {
        let atLeastOneOpen = keepOneOpen; // Initialize based on the value of keepOneOpen

        items.forEach((item, i) => {
            const content = item.textContent;
            const expanded = item.getAttribute('aria-expanded');
            console.log(expanded);
            console.log(content);
            item.setAttribute('aria-owns', `${itemsNumber}-${i}`);

            // Set attributes based on whether the item is expanded or not
            if (expanded === 'true') {
                item.setAttribute(
                    'aria-label',
                    `Den Accordion Inhalt "${content}" verstecken`
                );
                item.parentNode.nextElementSibling.setAttribute(
                    'aria-hidden',
                    false
                );
                atLeastOneOpen = true; // Keep track that at least one item is open
            } else {
                item.setAttribute(
                    'aria-label',
                    `Den Accordion Inhalt "${content}" zeigen`
                );
                item.parentNode.nextElementSibling.setAttribute(
                    'aria-hidden',
                    true
                );
            }

            item.parentNode.nextElementSibling.setAttribute(
                'id',
                `${itemsNumber}-${i}`
            );
        });

        // Return a function to check if at least one item should be open based on the keepOneOpen value and atLeastOneOpen
        return () => (!keepOneOpen ? atLeastOneOpen : false);
    }

    // Function to initialize the accordion items
    function initializeAccordionItems(accordion, itemsNumber, keepOneOpen) {
        const items = accordion.querySelectorAll('.js-accordion_toggle');
        const atLeastOneOpen = handleItemAttributes(
            items,
            itemsNumber,
            keepOneOpen
        );

        function toggleTabcordion() {
            console.log('accordion item clicked');
            const itemToggle = this.getAttribute('aria-expanded');

            // Check if at least one item should be open or if the clicked item is closed
            if (atLeastOneOpen() || itemToggle === 'false') {
                items.forEach((item) => {
                    const content = item.textContent;
                    item.setAttribute('aria-expanded', false);
                    item.setAttribute(
                        'aria-label',
                        `Den Accordion Inhalt "${content}" zeigen`
                    );
                    item.parentNode.parentNode.classList.remove('-active');
                    item.parentNode.nextElementSibling.setAttribute(
                        'aria-hidden',
                        true
                    );
                });

                if (itemToggle === 'false') {
                    const content = this.textContent;
                    this.setAttribute('aria-expanded', 'true');
                    this.setAttribute(
                        'aria-label',
                        `Den Accordion Inhalt "${content}" verstecken`
                    );
                    this.parentNode.parentNode.classList.add('-active');
                    this.parentNode.nextElementSibling.setAttribute(
                        'aria-hidden',
                        false
                    );
                    Array.from(items).indexOf(this);
                    // this.scrollIntoView({ block: 'start', behavior: 'smooth' });
                }
            }
        }

        items.forEach((item) =>
            item.addEventListener('click', toggleTabcordion)
        );
    }

    // Function to initialize all accordions on the page
    function initializeAccordions() {
        const componentAccordions = document.querySelectorAll('.js-accordion');

        componentAccordions.forEach((accordion) => {
            const itemsNumber = generateUniqueId();
            const keepOneOpen = accordion.classList.contains('-oneOpen');
            initializeAccordionItems(accordion, itemsNumber, keepOneOpen);
        });
    }

    // Initialize all accordions on the page
    initializeAccordions();





};

export { accordion as default };
//# sourceMappingURL=accordion-53089587.js.map
