
/**
 * Returns a code styled cli
 * @param {object} parent 
 * @param {String} hint 
 * @param {String} options 
 * @param {number} width 
 * @param {number} height 
 */
ui.addCommandBar = function (parent, hint, width, height, options){
    return new ui.CommandBar(parent, hint, width, height, options )
}

ui.CommandBar = class extends ui.Control {
    constructor(parent, hint, width, height, options){
        super(parent, width, height, options, "Input")
        this.hint = hint
        this._create()
    }
    
    _create() {
        let elem = this._ctl = document.createElement('input');
        elem.placeholder = this.hint;
        elem.style.width = this.width * 100 + '%';
        elem.style.height =  this.height * 100 + '%'
        elem.className = 'cli-input'
 
        this._div.appendChild( elem )
    }
}
