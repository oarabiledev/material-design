
/**
* @description 
* Material Design Components For
* DroidScript Hybrid.
* 
* @license 
* GPL-2.0 license
*/


const mdui = {
    getVersion : function(){
        return '0.01';
    }
}

let InitializePlugin = function (){
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
    constructor(parent, text, options, width, height) {
        super(parent, width, height, options, 'Button');
        this.text = text;
        this._create()
    }
    _create(){

        this.element = document.createElement('mdui-button');
        
        this.element.style.width = this.width;
            
        this.element.style.height = this.height;
          
        if (this.options.split(',').length == 1){
            this.element.variant = this.options.split(',')[0]
            this.element.textContent = this.text;
        }

        else {
            if (this.options.includes('link')){

                this.element.variant = this.options.split(',')[0]
            }
            if (this.options.includes('loading')){
                this.element.loading = true;
                this.element.textContent = this.text;
                this.element.variant = this.options.split(',')[0]
            }
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
