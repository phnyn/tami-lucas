import { customSelects } from './selectGenerator';

export default () => {
    console.log('select.js loaded');

    //Generate the custom selects
    customSelects();

    const nativeComponent = document.querySelectorAll('.js-selectNative');
    const customComponent = document.querySelectorAll('.js-selectCustom');

    //for each custom or native select
    for(let i=0; i < nativeComponent.length; i++){
        const nativeSelect = nativeComponent[i];
        const customSelect = customComponent[i];
        let custom = {
            trigger: customSelect.children[0],
            option_wrap: customSelect.children[1],
            options: Array.from(customComponent[i].children[1].children)
        };

        let optionChecked = '';
        let optionHoveredIndex = -1;

        //add event listeners to every custom trigger
        custom.trigger.addEventListener('click', () => {
            customSelect.classList.contains('-active') ? close() : open();
        });

        //update selectCustom value, when native value is changed
        //BUG doesn't work fully
        nativeSelect.addEventListener('change', (e) => {
            const value = e.target.value;
            const newOption = custom.option_wrap.querySelectorAll(`[data-value="${value}"]`)[0];
            updateCustomSelectChecked(value, newOption.textContent);
        });

        // update selectCustom value when an option is clicked or hovered
        custom.options.forEach((elOption, index) => {
            elOption.addEventListener('click', (e) => {
                const value = e.target.getAttribute('data-value');
        
                // Sync native select to have the same value as custom
                nativeSelect.value = value;
                updateCustomSelectChecked(value, e.target.textContent);
                close();
            });
        
            elOption.addEventListener('mouseenter', () => {
                updateSelectedOption(index);
            });
        });

        // update selectCustom Trigger and values
        function updateCustomSelectChecked(value, text) {
            const prevValue = optionChecked;
            const elPrevOption = custom.option_wrap.querySelector(`[data-value="${prevValue}"]`); 
            const elOption = custom.option_wrap.querySelector(`[data-value="${value}"]`);

            //switch which option -active / selected
            if (elPrevOption) {
                elPrevOption.classList.remove('-active');
            }
    
            if (elOption) {
                elOption.classList.add('-active');
            }

            //change selectCustom Trigger
            custom.trigger.textContent = text;
            optionChecked = value;
        }

        // opens custom select 
        function open(){
            customSelect.classList.add('-active');

            // Remove aria-hidden in case this was opened by a user who uses AT (e.g. Screen Reader) and a mouse at the same time.
            customSelect.setAttribute('aria-hidden', false);

            if(optionChecked){
                const optionCheckedIndex = custom.options.findIndex(
                    el => {
                        el.getAttribute('data-value') === optionChecked;
                    }
                );
                updateSelectedOption(optionCheckedIndex);
            }

            document.addEventListener('click', watchClickOutside);
            document.addEventListener('keydown', supportKeyboardNavigation);
        }

        function close(){
            customSelect.classList.remove('-active');
            customSelect.setAttribute('aria-hidden', true);
            updateSelectedOption(-1);
            document.removeEventListener('click', watchClickOutside);
            document.addEventListener('keydown', supportKeyboardNavigation);
        }

        function watchClickOutside(e) {
            const didClickedOutside = !customSelect.contains(e.target);
            if (didClickedOutside) {
                close();
            }
        }

        function supportKeyboardNavigation(e) {
            const spacebar = [0,32];
            const enter = 13;
            const down= 40;
            const up = 38;
            const esc = 27;

            // press down -> go next
            if (e.keyCode === down && optionHoveredIndex < custom.options.length - 1) {
                let index = optionHoveredIndex;
                e.preventDefault(); // prevent page scrolling
                updateSelectedOption(optionHoveredIndex + 1);
            }
    
            // press up -> go previous
            if (e.keyCode === up && optionHoveredIndex > 0) {
                e.preventDefault(); // prevent page scrolling
                updateSelectedOption(optionHoveredIndex - 1);
            }
    
            // press Enter or space -> select the option
            if (e.keyCode === enter || e.keyCode === spacebar[0] || e.keyCode === spacebar[1]) {
                console.log('enter value');
                e.preventDefault();
    
                const option = custom.options[optionHoveredIndex];
                const value = option && option.getAttribute('data-value');
    
                if (value) {
                    nativeSelect.value = value;
                    updateCustomSelectChecked(value, option.textContent);
                }
                close();
            }
    
            // if( !opens && (e.keyCode === enter || e.keyCode === spacebar[0] || e.keyCode === spacebar[1] )){
            //     console.log('open');
            //     e.preventDefault(); // prevent page scrolling
            //     open();
            // }

            // press ESC -> close selectCustom
            if (e.keyCode === esc) {
                close();
            }
        }

        //when you use keyboard to hover
        function updateSelectedOption(newIndex){
            const prev = custom.options[optionHoveredIndex];
            const option = custom.options[newIndex];

            if(prev){
                prev.classList.remove('-hover');
            }

            if(option){
                option.classList.add('-hover');
            }

            optionHoveredIndex = newIndex;
        }
    }
};

