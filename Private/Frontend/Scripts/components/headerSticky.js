// // Importing the throttle function from the Lodash library
// import { throttle } from 'lodash';

// // Exporting a default function that accepts no argument
// export default () => {
//     // Defining a function to toggle class on the header based on the user's scrolling behavior
//     function handleHeaderClass(scrollDownAmount, scrollUpAmount, className, headerElement) {
//         let lastScrollPosition = 0;
//         let scrollUpCounter = 0;
//         let scrollDownCounter = 0;

//         const handleScroll = throttle(function () {
//             const currentScrollPosition =
//                 window.pageYOffset || document.documentElement.scrollTop;

//             // Check if scrolled to the top of the page
//             if (currentScrollPosition === 0) {
//                 // Remove the class, reset scroll counters, and exit the function
//                 headerElement.classList.remove(className);
//                 scrollUpCounter = 0;
//                 scrollDownCounter = 0;
//                 return;
//             }

//             if (currentScrollPosition > lastScrollPosition) {
//                 // Scrolling Down
//                 scrollUpCounter = 0;
//                 scrollDownCounter += currentScrollPosition - lastScrollPosition;

//                 if (scrollDownCounter >= scrollDownAmount) {
//                     // Add the class when scrollDownAmount is reached
//                     headerElement.classList.add(className);
//                     scrollDownCounter = 0;
//                 }
//             } else {
//                 // Scrolling Up
//                 scrollDownCounter = 0;
//                 scrollUpCounter += Math.abs(
//                     currentScrollPosition - lastScrollPosition
//                 );

//                 if (scrollUpCounter >= scrollUpAmount) {
//                     // Remove the class when scrollUpAmount is reached
//                     headerElement.classList.remove(className);
//                     scrollUpCounter = 0;
//                 }
//             }

//             lastScrollPosition = currentScrollPosition;
//         }, 200); // Set the desired throttle time (in milliseconds)

//         window.addEventListener('scroll', handleScroll);
//     }

//     // Selecting the header element from the DOM
//     const header = document.querySelector('.g-header');

//     // Calling the handleHeaderClass function with three arguments
//     handleHeaderClass(30, 100, '-scrolled', header);



//     // // Defining a function to toggle class on the header based on the user's scrolling behavior
//     // // Variant which removes -scrolled only when we reach the top of the page
//     // function handleHeaderClass(scrollDownAmount, className, headerElement) {
//     //     const handleScroll = throttle(function () {
//     //         const currentScrollPosition =
//     //             window.pageYOffset || document.documentElement.scrollTop;

//     //         if (currentScrollPosition > scrollDownAmount) {
//     //             // Add the class when scrollDownAmount is reached
//     //             headerElement.classList.add(className);
//     //         } else {
//     //             // Remove the class when scrollDownAmount is not reached
//     //             headerElement.classList.remove(className);
//     //         }
//     //     }, 200); // Set the desired throttle time (in milliseconds)

//     //     window.addEventListener('scroll', handleScroll);
//     // }

//     // // Selecting the header element from the DOM
//     // const header = document.querySelector('.g-header');

//     // // Calling the handleHeaderClass function with three arguments
//     // handleHeaderClass(170, '-scrolled', header);
// };

export default() => {
    const header = document.querySelector('.g-header');
    const hero = document.querySelector('.c-hero');

    window.addEventListener('scroll', () => {
        const heroBottom = hero.getBoundingClientRect().bottom;

        if (heroBottom <= 0) {
            header.classList.add('-scrolled');
            console.log('scrolled');
        } else {
            header.classList.remove('-scrolled');
        }
    });
};