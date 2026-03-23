import {generateNode} from './helperFunctions';

/**
 *  generate custom selects for all 'native' selects in markup
 */
export function customSelects(){
    const select_wrap = document.getElementsByClassName('e-select_wrap');
    Array.from(select_wrap).forEach((element) => {
        generateCustomSelect(element);
    });
}

/**
 * Generates the select markup 
 * @param {*} select_wrap 
 */
function generateCustomSelect(select_wrap){
    //create div for select custom <div class="e-select_custom js-selectCustom" aria-hidden="true"> 
    const selectCustom = generateNode('div', 'e-select_custom');
    selectCustom.classList.add('js-selectCustom');
    selectCustom.setAttribute('aria-hidden', true);
    select_wrap.append(selectCustom);

    //get native select and it's options
    const selectNative = select_wrap.children[0];
    //generate the trigger from option[1]
    const trigger = generateNode('div', 'e-select_custom-trigger', selectNative[0].innerHTML);
    //checkClassList(selectNative[0], trigger);
    selectCustom.append(trigger);
    const option_wrap = generateNode('div', 'e-select_custom-options');

    for(let i=1; i < selectNative.length; i++){
        let node = generateNode('div', 'e-select_custom-option', selectNative[i].innerHTML);
        node.dataset.value = i;
        option_wrap.appendChild(node);
    }
    selectCustom.appendChild(option_wrap);
} 