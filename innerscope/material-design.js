
/**
* @description 
* Material Design Components
* For InnerScope.
* 
* @license 
* GPL-2.0 license
* 
* Written BY : Oarabile Koore
*/

const mdui = function Material (){
    this.getVersion = function () {
        return '0.01' 
    }
}


function InitializePlugin (){
    ui.loadScript('material-design/mdui.js');
    ui.loadCSS('material-design/mdui.css');
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
    this.element = ui.createLayout(type, options, width, height);
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
        
        let splitOptions = this.options.toLowerCase().split(',');
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
                TODO
                
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
    
    /**    
     * Adds a right side icon to button.
     * @param {string} iconName 
     */
    set icon(iconName){
        this.element.icon = iconName;
        this.iconName = iconName;
    }
    
    get icon(){
        return this.iconName;
    }
    
    set endIcon(iconName){
        this.element.endIcon = iconName;
        this.endIconName = iconName;
    }
    
    get endIcon(){
        return this.endIconName;
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

/**
 * Adds An Icon Button
 * @param {object} parent 
 * @param {string} icon 
 * @param {string} options 
 * @param {number} width 
 * @param {number} height 
 */
mdui.addIcon = function (parent, icon, options, width, height){
    return new iconObject(parent, icon, options, width, height)
}

const iconObject = class extends ui.Control {
    constructor(parent, icon, options = 'standard', width, height){
        super(parent, width, height, options, 'Icon');
        
        this._icon = icon;
        this._create()
    }
    
    _create (){
        this.element = document.createElement('mdui-button-icon');
        this.element.icon = this._icon;
        
        let iconVariants = ['standard', 'filled', 'tonal', 'outlined'];
        let iconProperties = ['link','selectable','loading','disabled'];
        
        let splitOptions = this.options.toLowerCase().split(',');
        
        splitOptions.forEach( option => {
            if (iconVariants.includes(option)) {
                this.element.variant = option;
            }
            
            if (splitOptions.includes(option)) {
                switch (option) {
                    case 'link':
                      this.element.href = 'https://www.droidscript.org';
                      this.element.target = '_blank';
                      break;
                    case 'disabled':
                      this.element.disabled = true;
                      break;
                    case 'loading':
                      this.element.loading = true;
                      break;
                    default:
                      this.element.selectable = true;
                }
            }
        })
        
        this._div.appendChild(this.element)   
    }
    
    /**    
     * Adds a right side icon to button.
     * @param {string} iconName 
     */
    set icon(iconName){
        this.element.icon = iconName;
        this.iconName = iconName;
    }
    
    get icon(){
        return this.iconName;
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

/**
 * Adds a FAB to View.
 * @param {object} parent 
 * @param {string} icon 
 * @param {string} options 
 * @param {string} text 
 */
mdui.addFAB = function (parent, icon, options, text) {
    return new fabObject(parent, icon, options, text)
}

const fabObject = class extends ui.Control {
    constructor(parent, icon, options = 'normal', text){
        super (parent, null, null, options, 'FAB')
        
        this._icon = icon;
        this._text = text;
        
        this._create();
    }
    
    _create() {
        this.element = document.createElement('mdui-fab');
        this.element.icon = this._icon;
        
        if (this._text) {
            this.element.extended = true;
            this.element.textContent = this._text;
        }
        else { ; }
        
        let fabVariants = ['primary', 'secondary', 'tetiary', 'surface'];
        let fabOptions = ['link','loading','disabled']
        let sizeVariants = ['small','normal','large'];
        
        let splitOptions = this.options.toLowerCase().split(',');
        
        splitOptions.forEach( option =>{
            if (fabVariants.includes(option)){
                this.element.variant = option;
            }
            
            if (sizeVariants.includes(option)){
                this.element.size = option;
            }
            
            if (fabOptions.includes(option)){
                if (option == 'loading'){
                    this.element.loading = true;
                }
                
                if (option == 'link'){
                    this.element.href = 'https://www.droidscript.org';
                    this.element.target = '_blank';
                }
                
                else { ; }
            }
            
            else { ; }
        })
        this._div.appendChild(this.element)
    }
    
    /**    
     * Adds a right side icon to button.
     * @param {string} iconName 
     */
    set icon(iconName){
        this.element.icon = iconName;
        this.iconName = iconName;
    }
    
    get icon(){
        return this.iconName;
    }
    
    /**    
     * Adds Text Content
     * @param {string} text 
     */
    set text(text){
        this.element.textContent = text;
        this._text = text;
    }
    
    get text (){
        return this._text;
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
