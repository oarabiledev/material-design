

function searchObject(barProps,width,height,parent_Layout){
    let props = JSON.stringify(barProps);
    let info = JSON.parse(props)
    let searchType = info.searchBarProps.barType;
    
    switch(searchType){
        case 'withTrailingIcon':
        drawSearchwithTrailingIcon(barProps,width,height,parent_Layout,this);
        break;
        case 'with2TrailingIcons':
        drawSearchWith2TrailingIcons(barProps,width,height,parent_Layout,this);
        break;
        case 'withAvaterTrailingIcon':
        drawSearchWithAvaterTrailingIcon(barProps,width,height,parent_Layout,this);
    }
    
    this.setOnTouch = function(onTouch){
        this.onTouch = onTouch;
    }

    this.setMargins = function( left, top, right, bottom, mode){
        searchContainer.SetMargins( left, top, right, bottom, mode)
    }
    this.setPosition = function( left, top, width, height, options){
        searchContainer.SetPosition( left, top, width, height, options)
    }
    this.setOnEnter = function(onEnter){
        this.onEnter = onEnter;
    }
    this.getText = function(){
        return _searchArea.GetText();
    }
    this.setText = function(text){
        
    }
    this.replaceText = function( text, start, end ){
        
    }
    this.insertText = function( text, start){
        
    }
    
    this.isVisible = function(){
        
    }
    this.isEnable = function(){
        
    }
    this.undo = function(){
        
    }
    this.redo = function(){
        
    }
}
/* SearchBAr Types
   1. withAvater -  wA
   2. withTrailingIcon - wTI
   3. with2TrailingIcons - w2TI
   4. withAvater&TrailingIcon - wATI
*/

function drawSearchWith2TrailingIcons(barProps,width,height,parent_Layout){
}
function drawSearchWithAvaterTrailingIcon(barProps,width,height,parent_Layout){
    
}
function drawSearchwithTrailingIcon(barProps,width,height,parent_Layout,objFunc) {
    let props = JSON.stringify(barProps);
    let info = JSON.parse(props);
    
    let leftIcon = info.searchBarProps.leftHandIcon;
    let rightIcon = info.searchBarProps.rightHandIcon;
    let hint = info.searchBarProps.searchHint;
    
    searchContainer = app.CreateLayout('Card')
    searchContainer.SetCornerRadius(36)
    searchContainer.SetElevation(2.0)
    searchContainer.SetSize(width, 0.08)
    
    
    const searchBox = app.AddLayout(searchContainer, "Linear", "Left,Horizontal,VCenter");
    searchBox.SetSize(width, 0.08)
    
    _leftIcon = app.AddText(searchBox,leftIcon, 0.065, 0.037, 'Left,VCenter')
    _leftIcon.SetFontFile(defaultIcons)
    _leftIcon.SetTextSize(24)
    _leftIcon.SetMargins(16, null, 16, null, 'dp')
    _leftIcon.SetOnTouchDown(function(){
        try{
            objFunc.onTouch(leftIcon)
        }
        catch(err){
            return null;
        }
    })
            
    _searchArea = app.AddTextEdit(searchBox, '', 0.52, null, 'SingleLine,Left')
    _searchArea.SetHint(hint)
    _searchArea.SetOnEnter(function(){
        try{
            objFunc.onEnter();
        }
        catch(err){
            return null;
        }
    })
    
    _rightIcon = app.AddText(searchBox,rightIcon,0.065,0.037,'VCenter')
    _rightIcon.SetTextSize(24)
    _rightIcon.SetFontFile(defaultIcons)
    
    _rightIcon.SetMargins(variableSpacer(width),null,null,null,'dp')
    _rightIcon.SetOnTouchDown(function(){
        try{
        objFunc.onTouch(rightIcon)
        }
        catch(err){
            return null;
        }
    })
    
    if (theme == 'light') {
        searchContainer.SetBackColor(md_theme_light_surfaceVariant);
        _searchArea.SetBackColor(md_theme_light_surfaceVariant)
        _searchArea.SetTextColor(md_theme_light_onSurfaceVariant)
        _leftIcon.SetTextColor(md_theme_light_onSurface)
        _rightIcon.SetTextColor(md_theme_light_onSurface)
    } else {
        searchContainer.SetBackColor(md_theme_dark_surfaceVariant)
        _searchArea.SetBackColor(md_theme_dark_surfaceVariant)
        _leftIcon.SetTextColor(md_theme_dark_onSurface)
        _rightIcon.SetTextColor(md_theme_dark_onSurface)
    }
    parent_Layout.AddChild(searchContainer)
}

function variableSpacer(width){
    let fixedWidth = parseFloat(width.toFixed(1));
    
    switch(fixedWidth){
        case 0.7:
            return 4;
            break;
        case 0.8:
            return 12;
            break;
        case 0.9:
            return 42;
            break;
        case 1.0:
            return 78;
    }
}
