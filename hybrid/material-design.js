
/**
* @description 
* Material Design Components For
* DroidScript Hybrid.
* 
* @license 
* GPL-2.0 license
*/

'use strict'

const mdui = function Material (){
    this.getVersion = function () {
        return '0.01' 
    }
}


function InitializePlugin (){
    ui.script('material-design/mdui.js');
    ui.css('material-design/mdui.css');
}

InitializePlugin();


/**
 * Add a layout
 * @param {string} parent 
 * @param {string} type 
 * @param {string} options 
 * @param {number} width 
 * @param {number} height 
 */
 
mdui.addLayout = function (parent, type, options, width, height){
    return new layout(parent, type, options, width, height)
}

const layout = function (parent, type, options, width, height){
    this.element = ui.addLayout(parent, type, options, width, height);
    this.element.backColor = '--mdui-color-primary-light'
    return this.element;
}

/**
 * Changes Interface Theme
 * @param {string} theme = 'light' 
 */
 
mdui.setTheme = function (theme = 'light'){
    if (theme == 'light'){
        document.body.className = 'mdui-theme-light';
    }
    else if (theme == 'dark'){
        document.body.className = 'mdui-theme-dark';
    }
    else {
        document.body.className = 'mdui-theme-auto';
    }
} 

/**
 * Adds a button to parent.
 * First option should be button type.
 * @param {object} parent 
 * @param {string} text 
 * @param {string} options 
 * @param {number} width 
 * @param {number} height 
 */
mdui.addButton = function (parent, text, options, width, height){
    return new buttonObject(parent, text, options, width, height)
}

const buttonObject = class extends ui.Control {
    constructor(parent, text, options = 'filled', width, height) {
        super(parent, width, height, options, 'Button');
        this.text = text;
        
        this._create()
    }
    
    _create(){

        this.element = document.createElement('mdui-button');
        
        this.element.style.width = this.width;
            
        this.element.style.height = this.height;
        
        let splitOptions = this.options.split(',');
        let noOfOptions = splitOptions.length;
        let buttonVariant, buttonOptions;
        
        let btnVariants = ['filled','outlined','tonal','elevated','text'];
        let btnOptions = ['link','loading'];
        
        splitOptions.forEach(option => {
            if (btnVariants.includes(option)) {
                buttonVariant = option;
            }
            else if (btnOptions.includes(option)) {
                buttonOptions = option;
            }
            else { ; }
        });
        
        
        if (noOfOptions == 1) {
            this.element.variant = buttonVariant;
            this.element.textContent = this.text;
        }
        else {
            this.element.variant = buttonVariant;
            this.element.textContent = this.text;
            
            if (buttonOptions == 'link') {
                this.element.href = 'https://www.google.com'
                this.element.target = "_blank"
            }
            
            if (buttonOptions == 'loading') {
                this.element.loading = true;
            }
            else { ; }
            
        }
          
        this._div.appendChild(this.element)
    }
    
    setOnTouch(onTouch){
        if (platform.type == 'mobile'){
            this.element.addEventListener('mouseup',(event) =>{
                onTouch(event)
            })
        }
        else {
            this.element.addEventListener('mousedown', (event) =>{
                onTouch(event)
            })
        }
    }
}
