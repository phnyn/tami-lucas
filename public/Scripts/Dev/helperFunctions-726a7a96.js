/**
 * creates <{tag} class={classname}> {content.innerHTML} </{tag}>
 * @param {Tag} tag 
 * @param {String || [String]} classname -> no dots
 * @param {String} content 
 * @returns  <{tag} class={classname}> {content} </{tag}>
 */
function generateNode(tag, classnames, content){
    const node = document.createElement(tag);

    if(classnames !='' & classnames != null){
        if(Array.isArray(classnames)){
            node.classList.add(...classnames);
        } else if (typeof classnames === 'string') {
            // c-alert_icon icon-close
            node.classList.add(...classnames.split(' '));
        }
    }

    if(content != undefined & content != null){
        node.innerHTML = content;
    }

    return node;
}

export { generateNode as g };
//# sourceMappingURL=helperFunctions-726a7a96.js.map
