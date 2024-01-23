/*
      |\      /|   ________
      | \    / |          /
      |  \  /  |         /
      |   \/   |         \ 
      |        |   _______\       
      
*/

// :: PROJECT WILL BE SWITCHED OVER TO CLASS BASED CHECK THE Material3 FOLDER 🫠

var uiVersion = 0.01;
var defaultFont = 'Fonts/Text/Roboto.ttf'
var defaultIcons = 'Fonts/Icons/Regular.ttf'

var screenHeight = app.GetScreenHeight('Real');
var screenWidth = app.GetScreenWidth('Real');
var screenDensity = app.GetScreenDensity('Real');

var lastPressedItem = null;

const ui = {};

ui.getVersion = function() {
    return uiVersion;
}


ui.setProps = function(appProps) {
    appInfo = JSON.stringify(appProps);
    props = JSON.parse(appInfo);
    
    theme = props.defaultMode;
    colorSystem = props.colorSystem;
    iconFill = props.defaultIconFill;
    dir = props.defaultAppTheme;
    if(!props.defaultFontFile){
        defaultFont = 'Fonts/Text/Roboto.ttf';
    }
    else{
        defaultFont = props.defaultFontFile;
    }
    
    if(iconFill==='outline'){
        defaultIcons = 'Fonts/Icons/Outlined-Regular.otf'
    }
    if(iconFill==='sharp'){
        defaultIcons = 'Fonts/Icons/Sharp-Regular.otf'
    }
    if(iconFill==='two-tone'){
        defaultIcons = 'Fonts/Icons/TwoTone-Regular.otf'
    }
    if(iconFill==='round'){
        defaultIcons = 'Fonts/Icons/Round-Regular.otf'
    }
    
    //alert(theme)
    if (colorSystem === 'static') {
        appTheme = app.ReadFile(dir);
        jsonData = JSON.parse(appTheme)
        // Function to get the text value based on the color name
        const getColorTextValue = (jsonData, colorName) => {
            const colorObject = jsonData.resources.color.find(color => color._name === colorName);
            return colorObject ? colorObject.__text : null;
        };

        // Get the text value for "md_theme_dark_scrim"
        seed = getColorTextValue(jsonData,"seed");
        md_theme_light_primary = getColorTextValue(jsonData,"md_theme_light_primary")
        md_theme_light_onPrimary = getColorTextValue(jsonData, "md_theme_light_onPrimary");
        md_theme_light_primaryContainer = getColorTextValue(jsonData,"md_theme_light_primaryContainer");
        md_theme_light_onPrimaryContainer = getColorTextValue(jsonData,"md_theme_light_onPrimaryContainer");
        md_theme_light_secondary = getColorTextValue(jsonData, "md_theme_light_secondary");
        md_theme_light_onSecondary = getColorTextValue(jsonData, "md_theme_light_onSecondary");
        md_theme_light_secondaryContainer = getColorTextValue(jsonData, "md_theme_light_secondaryContainer");
        md_theme_light_onSecondaryContainer = getColorTextValue(jsonData, "md_theme_light_onSecondaryContainer");
        md_theme_light_tertiary = getColorTextValue(jsonData, "md_theme_light_tertiary");
        md_theme_light_onTertiary = getColorTextValue(jsonData, "md_theme_light_onTertiary");
        md_theme_light_tertiaryContainer = getColorTextValue(jsonData, "md_theme_light_tertiaryContainer");
        md_theme_light_onTertiaryContainer = getColorTextValue(jsonData, "md_theme_light_onTertiaryContainer");
        md_theme_light_error = getColorTextValue(jsonData, "md_theme_light_error");
        md_theme_light_onError = getColorTextValue(jsonData, "md_theme_light_onError");
        md_theme_light_errorContainer = getColorTextValue(jsonData, "md_theme_light_errorContainer");
        md_theme_light_onErrorContainer = getColorTextValue(jsonData, "md_theme_light_onErrorContainer");
        md_theme_light_outline = getColorTextValue(jsonData, "md_theme_light_outline");
        md_theme_light_background = getColorTextValue(jsonData, "md_theme_light_background");
        md_theme_light_onBackground = getColorTextValue(jsonData, "md_theme_light_onBackground");
        md_theme_light_surface = getColorTextValue(jsonData, "md_theme_light_surface");
        md_theme_light_onSurface = getColorTextValue(jsonData, "md_theme_light_onSurface");
        md_theme_light_surfaceVariant = getColorTextValue(jsonData, "md_theme_light_surfaceVariant");
        md_theme_light_onSurfaceVariant = getColorTextValue(jsonData, "md_theme_light_onSurfaceVariant");
        md_theme_light_inverseSurface = getColorTextValue(jsonData, "md_theme_light_inverseSurface");
        md_theme_light_inverseOnSurface = getColorTextValue(jsonData, "md_theme_light_inverseOnSurface");
        md_theme_light_inversePrimary = getColorTextValue(jsonData, "md_theme_light_inversePrimary");
        md_theme_light_shadow = getColorTextValue(jsonData, "md_theme_light_shadow");
        md_theme_light_surfaceTint = getColorTextValue(jsonData, "md_theme_light_surfaceTint");
        md_theme_light_outlineVariant = getColorTextValue(jsonData, "md_theme_light_outlineVariant");
        md_theme_light_scrim = getColorTextValue(jsonData, "md_theme_light_scrim");
        md_theme_dark_primary = getColorTextValue(jsonData, "md_theme_dark_primary");
        md_theme_dark_onPrimary = getColorTextValue(jsonData, "md_theme_dark_onPrimary");
        md_theme_dark_primaryContainer = getColorTextValue(jsonData, "md_theme_dark_primaryContainer");
        md_theme_dark_onPrimaryContainer = getColorTextValue(jsonData, "md_theme_dark_onPrimaryContainer");
        md_theme_dark_secondary = getColorTextValue(jsonData, "md_theme_dark_secondary");
        md_theme_dark_onSecondary = getColorTextValue(jsonData, "md_theme_dark_onSecondary");
        md_theme_dark_secondaryContainer = getColorTextValue(jsonData, "md_theme_dark_secondaryContainer");
        md_theme_dark_onSecondaryContainer = getColorTextValue(jsonData, "md_theme_dark_onSecondaryContainer");
        md_theme_dark_tertiary = getColorTextValue(jsonData, "md_theme_dark_tertiary");
        md_theme_dark_onTertiary = getColorTextValue(jsonData, "md_theme_dark_onTertiary");
        md_theme_dark_tertiaryContainer = getColorTextValue(jsonData, "md_theme_dark_tertiaryContainer");
        md_theme_dark_onTertiaryContainer = getColorTextValue(jsonData, "md_theme_dark_onTertiaryContainer");
        md_theme_dark_error = getColorTextValue(jsonData, "md_theme_dark_error");
        md_theme_dark_onError = getColorTextValue(jsonData, "md_theme_dark_onError");
        md_theme_dark_errorContainer = getColorTextValue(jsonData, "md_theme_dark_errorContainer");
        md_theme_dark_onErrorContainer = getColorTextValue(jsonData, "md_theme_dark_onErrorContainer");
        md_theme_dark_outline = getColorTextValue(jsonData, "md_theme_dark_outline");
        md_theme_dark_background = getColorTextValue(jsonData, "md_theme_dark_background");
        md_theme_dark_onBackground = getColorTextValue(jsonData, "md_theme_dark_onBackground");
        md_theme_dark_surface = getColorTextValue(jsonData, "md_theme_dark_surface");
        md_theme_dark_onSurface = getColorTextValue(jsonData, "md_theme_dark_onSurface");
        md_theme_dark_surfaceVariant = getColorTextValue(jsonData, "md_theme_dark_surfaceVariant");
        md_theme_dark_onSurfaceVariant = getColorTextValue(jsonData, "md_theme_dark_onSurfaceVariant");
        md_theme_dark_inverseSurface = getColorTextValue(jsonData, "md_theme_dark_inverseSurface");
        md_theme_dark_inverseOnSurface = getColorTextValue(jsonData, "md_theme_dark_inverseOnSurface");
        md_theme_dark_inversePrimary = getColorTextValue(jsonData, "md_theme_dark_inversePrimary");
        md_theme_dark_shadow = getColorTextValue(jsonData, "md_theme_dark_shadow");
        md_theme_dark_surfaceTint = getColorTextValue(jsonData, "md_theme_dark_surfaceTint");
        md_theme_dark_outlineVariant = getColorTextValue(jsonData, "md_theme_dark_outlineVariant");
        md_theme_dark_scrim = getColorTextValue(jsonData, "md_theme_dark_scrim");
    }
    //For Incase Dynamic Theming Becomes Available
    else{
        
    }
}

ui.setTheme = function(userTheme){
    theme = userTheme;
    OnStart()
}

var layInfo;

ui.addLayout = function(type,options){
   lay = app.CreateLayout(type, options)
    if (theme ==='dark') {
        lay.SetBackColor(md_theme_dark_background);
        app.SetStatusBarColor(md_theme_dark_background)
    } else {
        lay.SetBackColor(md_theme_light_background);
    }
    layInfo = type;
    layTop = lay.GetTop();
    return lay;
}

ui.addAvatar = function(imgFile,parent_Layout){
    return new avatarObj(imgFile,parent_Layout);
}

function avatarObj(imgFile,parent_Layout){
    drawAvatar(imgFile,parent_Layout)
}

function drawAvatar(imgFile,parent_Layout){
    
}

ui.addSearchBar = function(barProps,width,height,parent_Layout){
    return new searchObject(barProps,width,height,parent_Layout)
}

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
//Variable Is made global so that clearInterval with method
//stopProgress works, to avoid an not defined error.
var animation;
ui.addProgressBar = function(progressType, width, layout) {
    return new progressObject(progressType, width, layout)
}
function progressObject(progressType, width, layout) {
    
    this.setTimeOut = function(progressTimeOut){
        this.progressTimeOut = progressTimeOut;
        drawProgressBar(progressType, width, layout,this.progressTimeOut)
    }
    this.startProgress = function(){
        drawProgressBar(progressType, width, layout,this.progressTimeOut)
    }
    this.stopProgress = function(){
        progressContainer.Hide()
        clearInterval(animation);
    }
    this.setValue = function(value) {
        this.value = value;
        drawProgressBar(progressType, width, layout)
        _progressIndicator.SetSize(parseFloat(value / 100), 0.05);
    }
    this.hideContainer = function(){
        app.DestroyLayout(this.progressContainer);
    }
    
    
    this.getValue = function() {
        return this.value;
    }
    this.setMargins = function(left, top, right, bottom, mode){
        progressContainer.SetMargins(left, top, right, bottom, mode)
    }
    this.setPosition = function( left, top, width, height, options){
        progressContainer.SetPosition( left, top, width, height, options)
    }
}  

function drawProgressBar(progressType, width, layout, timeOut) {

    if (progressType === 'linear') {
        let trackColor = '#E6E0E9';
        progressContainer = app.CreateLayout('Linear', 'Horizontal,Left,FillXY');
        progressContainer.SetSize(width, 0.005);
        _progressIndicator = app.AddText(progressContainer, '');

        if (theme === 'light') {
            progressContainer.SetBackColor(md_theme_light_surfaceVariant);
            _progressIndicator.SetBackColor(md_theme_light_primary);
        } else {
            progressContainer.SetBackColor(md_theme_dark_surfaceVariant);
            _progressIndicator.SetBackColor(md_theme_dark_primary);
        }
        layout.AddChild(progressContainer);
    }

    if (progressType === 'linearIntermediate') {
        
        progressContainer = app.CreateLayout('Linear', 'Horizontal,Left,FillXY');
        progressContainer.SetSize(width, 0.005);

        _progressIndicator = app.AddText(progressContainer, '', null, null, 'Left,FillXy');
        
        animation = setInterval(function() {
            _progressIndicator.Animate('SlideToRight', null, null);
        }, 600);
        if(timeOut!= undefined || timeOut!= null){
        setTimeout(function() {
            clearInterval(animation);
            progressContainer.Hide()
        }, timeOut);
        }
        if (theme === 'light') {
            progressContainer.SetBackColor(md_theme_light_surfaceVariant);
            _progressIndicator.SetBackColor(md_theme_light_primary);
        } else {
            progressContainer.SetBackColor(md_theme_dark_surfaceVariant);
            _progressIndicator.SetBackColor(md_theme_dark_primary);
        }
        layout.AddChild(progressContainer);
    }
}

/* menuTypes:
   - simple
   - withIcon
   */
   
ui.addMenu = function(menuType,list,position){
    return new menuObj(menuType,list,position);
}

function menuObj(menuType,list,position){
    this.setOnTouch = function(onTouch){
        this.onTouch = onTouch;
    }
    switch(menuType){
        case 'simple':
            drawSimpleMenu(menuType,list,position,this);
            break;
        case 'withIcon':
            drawMenuWithIcon(menuType,list,position,this);
    }
}

function drawSimpleMenu(menuType,list,position,menuFunc){
    let menuWidth = ()=>{
        if(app.IsTablet()) return 280;
        else return 190;
    }
    
    topValue = ()=>{
        if( top< 0.25 ) return top + 0.03
        else return top - 0.23;
    }
    
    
    menuContainer = app.CreateLayout('Linear',position);
    menuContainer.SetSize(1,1)
    menuContainer.SetOnTouch(function(){
        app.RemoveLayout(menuContainer)
        })
        
    menuUi = app.CreateLayout('Card',position + 'Center')
    menuContainer.AddChild(menuUi)
    menuUi.SetMargins(0.05,topValue())
    menuUi.Animate('FadeIn',null,100)
    menuUi.SetSize(menuWidth(),null,'dp')
    menuUi.SetCornerRadius(4)
    
    list = app.CreateList(list,menuWidth(),null,'Menu,Expand')
    list.SetOnTouch(function(title){
        try{
            menuFunc.onTouch(title)
        }
        catch(err){
            return null;
        }
        })
    menuUi.AddChild(list)
    
    app.AddLayout(menuContainer)
    
    if(theme === 'light'){
        menuUi.SetBackColor(md_theme_light_secondary)
        list.SetBackColor(md_theme_light_secondary)
    }
    else{
        menuUi.SetBackColor(md_theme_dark_secondary)
        list.SetBackColor(md_theme_dark_secondary)
    }
    
}

function drawMenuWithIcon(menuType,list,position,menuFunc){
    let menuWidth = ()=>{
        if(app.IsTablet()) return 280;
        else return 190;
    }
    
    //alert(top)
    topValue = ()=>{
        if( top< 0.25 ) return top + 0.03
        else return top - 0.23;
    }
    menuContainer = app.CreateLayout('Linear',position);
    menuContainer.SetSize(1,1)
    menuContainer.SetOnTouch(function(){
        app.RemoveLayout(menuContainer)
        })
        
    menuUi = app.CreateLayout('Card',position + 'Center')
    menuContainer.AddChild(menuUi)
    menuUi.SetMargins(0.05,topValue())
    menuUi.Animate('FadeIn',null,100)
    menuUi.SetSize(menuWidth(),null,'dp')
    menuUi.SetCornerRadius(4)
    
    list = app.CreateList(list,menuWidth(),null,'Menu,Expand')
    list.SetFontFile(defaultFont)
    list.SetOnTouch(function(title,icon){
        try{
            menuFunc.onTouch(title,icon)
        }
        catch(err){
            return null;
        }
        })
    menuUi.AddChild(list)
    
    app.AddLayout(menuContainer)
    
    if(theme === 'light'){
        menuUi.SetBackColor(md_theme_light_secondary)
        list.SetBackColor(md_theme_light_secondary)
    }
    else{
        menuUi.SetBackColor(md_theme_dark_secondary)
        list.SetBackColor(md_theme_dark_secondary)
    }
}
ui.addSwitch = function(switchType,value,parent_Layout){
    return new switchObj(switchType,value,parent_Layout)
}

function switchObj(switchType,value,parent_Layout){
    this.getValue = function(){
        return switchValue;
    }
    this.setOnToggle = function(onToggle){
        this.onToggle = onToggle;
    }
    this.setPosition = function( left, top, width, height, options){
        _switch.SetPosition( left, top, width, height, options)
    }
    switch(switchType){
        case 'noIcon':
            drawSwitchNoIcon(value,parent_Layout,this);
            break;
        case 'onIcon':
            drawSwitchOnIcon(value,parent_Layout,this);
            break;
        case 'allIcon':
            drawSwitchAllIcon(value,parent_Layout,this);
    }
}

var switchValue;
function drawSwitchNoIcon(value,parent_Layout,objFunc){
    switchValue = value;
    
    _switch = app.CreateLayout('Card')
    _switch.SetSize(52,32,'dp');
    _switch.SetElevation(0.9)
    _switch.SetCornerRadius(16)
    

    handle = app.CreateImage(null,0.085,0.05)
	handle.DrawCircle( 0.52, 0.42, 0.30 )
	handle.SetAutoUpdate(false)
	_switch.SetMargins(0.05)
	handle.Hide()
	
	handle2 = app.CreateImage(null,0.085,0.05)
	handle2.DrawCircle( 0.52, 0.42, 0.45 )
	handle2.SetAutoUpdate(false)
	handle2.SetMargins(0.052)
	handle2.Hide()
	
	if(value){
	    handle2.Show()
	    if(theme==='light'){
	        handle2.SetPaintColor(md_theme_light_onPrimary)
	        _switch.SetBackColor(md_theme_light_primaryContainer)
	    }
	    else{
	        handle2.SetPaintColor(md_theme_dark_onPrimary)
	        _switch.SetBackColor(md_theme_dark_primaryContainer)
	    }
	}
	else{
	    handle.Show()
	    handle2.Hide()
	    if(theme==='light'){
	        handle.SetPaintColor(md_theme_light_onSurfaceVariant)
	        _switch.SetBackColor(md_theme_light_surfaceVariant)
	    }
	    else{
	        handle.SetPaintColor(md_theme_dark_onSurfaceVariant)
	        _switch.SetBackColor(md_theme_dark_surfaceVariant)
	    }
	}
	
	handle.SetOnTouchUp(function(){
	       handle.Hide()
	       handle2.Show()
	       switchValue = true;
	       if(theme==='light'){
	        handle2.SetPaintColor(md_theme_light_onPrimary)
	        _switch.SetBackColor(md_theme_light_primaryContainer)
	      }
	      else{
	        handle2.SetPaintColor(md_theme_dark_onPrimary)
	        _switch.SetBackColor(md_theme_dark_primaryContainer)
	      }
	       try{
	           objFunc.onToggle(switchValue);
	       }
	       catch(err){
	           return null;
	       }
	       
})

	handle2.SetOnTouchUp(function(){
	       handle2.Hide()
	       handle.Show()
	       switchValue = false;
	       
	       if(theme==='light'){
	        handle.SetPaintColor(md_theme_light_onSurfaceVariant)
	        _switch.SetBackColor(md_theme_light_surfaceVariant)
	    }
	    else{
	        handle.SetPaintColor(md_theme_dark_onSurfaceVariant)
	        _switch.SetBackColor(md_theme_dark_surfaceVariant)
	    }

	       try{
	           objFunc.onToggle(switchValue);
	       }
	       catch(err){
	           return null;
	       }
})

    parent_Layout.AddChild(_switch);
    _switch.AddChild(handle)
    _switch.AddChild(handle2)
    
}
function drawSwitchOnIcon(value,parent_Layout,objFunc){
    
}
function drawSwitchAllIcon(value,parent_Layout,objFunc){
    
}
ui.addDrawer = function(drawerLayout,side,width){
    return new navDrawerObject(drawerLayout,side,width)
}

function navDrawerObject(drawerLayout,side,width){
    this.openDrawer = function(side){
        app.OpenDrawer(side)
    }
    this.closeDrawer = function(side){
        app.CloseDrawer(side)
    }
    this.removeDrawer = function(side){
        
    }
    drawNavDrawer(drawerLayout,side,width)
}

function drawNavDrawer(drawerLayout,side,width){
    _drawerContainer = app.CreateLayout('Card','FillXY')
    
    _drawerContainer.AddChild(drawerLayout)
    
    if (theme ==='dark') {
        _drawerContainer.SetBackColor(md_theme_dark_surface);
    } else {
        _drawerContainer.SetBackColor(md_theme_light_surface);
    }
    app.AddDrawer(_drawerContainer,side,width)
}
var fabContainer;
ui.addFAB = function(icon, layout) {
    return new _Fab(icon, layout);
}

function drawFab(icon, layout, _FabInfo) {
    fabContainer = app.CreateLayout('Linear', 'TouchThrough,Spy');
    fabContainer.SetSize(56, 56, 'dp');

    let fab = app.CreateLayout('Card', 'Right,Bottom,FillXY');
    fab.SetSize(56, 56, 'dp');
    fab.SetElevation(0);
    fab.SetCornerRadius(16);

    let _fabIcon = app.CreateText(icon, null, null, 'H/VCenter,FillXY');
    _fabIcon.SetFontFile(defaultIcons);
    _fabIcon.SetOnTouchDown(function() {
        _FabInfo.onTouch();
    });

    _fabIcon.SetTextSize(24);
    fab.AddChild(_fabIcon);
    fabContainer.AddChild(fab);

    layout.AddChild(fabContainer);

    if (theme === 'light') {
        fab.SetBackColor(md_theme_light_primaryContainer);
        _fabIcon.SetTextColor(md_theme_light_onPrimaryContainer);
    } else {
        fab.SetBackColor(md_theme_dark_primaryContainer);
        _fabIcon.SetTextColor(md_theme_dark_onPrimaryContainer);
    }
}

function _Fab(icon, layout) {
    this.setOnTouch = null;
    this.setOnTouch = function(onTouch) {
        this.onTouch = onTouch;
    }

    this.setMargins = function(left, top, right, bottom, mode) {
        fabContainer.SetMargins(left, top, right, bottom, mode);
    }

    this.setPosition = function(left, top, width, height, options) {
        fabContainer.SetPosition(left, top, width, height, options);
    }

    drawFab(icon, layout, this);
}


ui.addSeekBar = function(value,range,width,layout){
    return new seekBarObject(value,range,width,layout)
}

function seekBarObject(value,range,width,layout){
    /*this.setValue = function(value){
        _seekBar.SetValue(value);
    }
    This doesnt work for some reoson
    */
    this.setVisibility = function(mode){
        _seekBar.SetVisibility(mode)
    }
    this.setSize = function(width,height,options){
        _seekBar.SetSize(width,height,options)
        }
    this.setPosition = function(left, top, width, height, options ){
        _seekBar.SetPosition(left, top, width, height, options )
    }
    this.setOnTouch = function(onTouch){
        _seekBar.SetOnTouch(onTouch)
    }
    this.getValue = function(){
        return _seekBar.GetValue();
    }
    this.isVisible = function(){
        return _seekBar.IsVisible();
    }
    this.animate = function(type,callback,time){
        _seekBar.Animate(type,callback,time)
    }
    this.goneComponent = function(){
        _seekBar.Gone();
    }
    this.setDecimals = function(decimals){
        _seekBar.SetDecimals(decimals)
    }
    drawSeekBar(value,range,width,layout)
}

function drawSeekBar(value,range,width,layout){
    var getSeekColor = function(uitheme){
        if(uitheme==='light'){
            return md_theme_light_onSurfaceVariant;
        }
        else{
            return md_theme_dark_onSurfaceVariant;
        }
    }
    _seekBar = MUI.CreateSeekBar(value,range,width,getSeekColor(theme))
    
    layout.AddChild(_seekBar)
}
ui.addSlideSheet = function(sheetLayout, width, options) {
    return new slideSheetObject(sheetLayout, width, options);
}

function slideSheetObject(sheetLayout, width, options) {
    this.dismissSheet = function() {
        dismissSlideSheet();
    }
    this.showSheet = function() {
        drawSlideSheet(sheetLayout, width, options);
    }
}

function drawSlideSheet(sheetLayout, width, options) {
    let slideSheetContainer = app.CreateLayout('Linear', 'FillXY,VCenter,Bottom,Right');
    slideSheetContainer.SetSize(1, 1);
    slideSheetContainer.SetOnTouchUp(dismissSlideSheet);

    let _bSheet = app.CreateLayout('Card', 'FillX,VCenter,Right');
    _bSheet.SetSize(width, 1);
    _bSheet.SetCornerRadius();
    _bSheet.Animate('BounceRight', null, 550);
    _bSheet.AddChild(sheetLayout);
    slideSheetContainer.AddChild(_bSheet);

    app.AddLayout(slideSheetContainer);

    if (theme === 'light') {
        slideSheetContainer.SetBackColor(md_theme_light_scrim);
        slideSheetContainer.SetBackAlpha(0.33);
        _bSheet.SetBackColor(md_theme_light_surfaceVariant);
    } else {
        slideSheetContainer.SetBackColor(md_theme_dark_scrim);
        slideSheetContainer.SetBackAlpha(0.33);
        _bSheet.SetBackColor(md_theme_dark_surfaceVariant);
    }
}

function dismissSlideSheet() {
    _bSheet.Animate('SlideToRight', function() {
        app.DestroyLayout(slideSheetContainer);
    }, 210);
}

//Available Options For BottomSheet
/*
  
  2. NoEdge
  3. Expandable
  */
ui.addBottomSheet = function(sheetLayout, height, options) {
    return new bottomSheetObject(sheetLayout, height, options);
}

function bottomSheetObject(sheetLayout, height, options) {
    this.dismissSheet = function() {
        dismissBSheet();
    }
    this.showSheet = function() {
        drawBottomSheet(sheetLayout, height, options);
    }
}

function drawBottomSheet(sheetLayout, height, options) {
    bottomSheetContainer = app.CreateLayout('Linear', 'FillXY,VCenter,Bottom');
    bottomSheetContainer.SetSize(1, 1);
    bottomSheetContainer.SetOnTouchUp(dismissBSheet);

    _bSheet = app.CreateLayout('Card', 'FillX,VCenter,Bottom');
    _bSheet.SetSize(-1, height);
    _bSheet.SetCornerRadius(28);
    _bSheet.Animate('BounceBottom', null, 550);
    _bSheet.AddChild(sheetLayout);
    bottomSheetContainer.AddChild(_bSheet);

    app.AddLayout(bottomSheetContainer);

    if (theme === 'light') {
        bottomSheetContainer.SetBackColor(md_theme_light_scrim);
        bottomSheetContainer.SetBackAlpha(0.33);
        _bSheet.SetBackColor(md_theme_light_surfaceVariant);
    } else {
        bottomSheetContainer.SetBackColor(md_theme_dark_scrim);
        bottomSheetContainer.SetBackAlpha(0.33);
        _bSheet.SetBackColor(md_theme_dark_surfaceVariant);
    }
}

function dismissBSheet() {
    _bSheet.Animate('SlideToBottom', function() {
        app.DestroyLayout(bottomSheetContainer);
    }, 210);
}

var smallFabContainer;
ui.addSmallFAB = function(icon, layout) {
    return new _smallFab(icon, layout);
}

function drawSmallFab(icon, layout, _FabInfo) {
    smallFabContainer = app.CreateLayout('Linear', 'TouchThrough,Spy');
    smallFabContainer.SetSize(40, 40, 'dp');

    let fab = app.CreateLayout('Card', 'Right,Bottom,FillXY');
    fab.SetSize(40, 40, 'dp');
    fab.SetElevation(0);
    fab.SetCornerRadius(12);

    let _fabIcon = app.CreateText(icon, null, null, 'H/VCenter,FillXY');
    _fabIcon.SetFontFile(defaultIcons);
    _fabIcon.SetOnTouchDown(function() {
        _FabInfo.onTouch();
    });

    _fabIcon.SetTextSize(18);
    fab.AddChild(_fabIcon);
    smallFabContainer.AddChild(fab);

    layout.AddChild(smallFabContainer);

    if (theme === 'light') {
        fab.SetBackColor(md_theme_light_primaryContainer);
        _fabIcon.SetTextColor(md_theme_light_onPrimaryContainer);
    } else {
        fab.SetBackColor(md_theme_dark_primaryContainer);
        _fabIcon.SetTextColor(md_theme_dark_onPrimaryContainer);
    }
}

function _smallFab(icon, layout) {
    this.setOnTouch = null;
    this.setOnTouch = function(onTouch) {
        this.onTouch = onTouch;
    }

    this.setMargins = function(left, top, right, bottom, mode) {
        smallFabContainer.SetMargins(left, top, right, bottom, mode);
    }

    this.setPosition = function(left, top, width, height, options) {
        smallFabContainer.SetPosition(left, top, width, height, options);
    }

    drawSmallFab(icon, layout, this);
}
ui.addLargeFAB = function(icon, layout) {
    return new _largeFab(icon, layout);
}

function drawLargeFab(icon, layout, _FabInfo) {
    let largeFabContainer = app.CreateLayout('Linear', 'TouchThrough,Spy');
    largeFabContainer.SetSize(96, 96, 'dp');

    let fab = app.CreateLayout('Card', 'Right,Bottom,FillXY');
    fab.SetSize(96, 96, 'dp');
    fab.SetElevation(0);
    fab.SetCornerRadius(28);

    let _fabIcon = app.CreateText(icon, null, null, 'H/VCenter,FillXY');
    _fabIcon.SetFontFile(defaultIcons);
    _fabIcon.SetOnTouchDown(function() {
        _FabInfo.onTouch();
    });

    _fabIcon.SetTextSize(36);
    fab.AddChild(_fabIcon);
    largeFabContainer.AddChild(fab);

    layout.AddChild(largeFabContainer);

    if (theme === 'light') {
        fab.SetBackColor(md_theme_light_primaryContainer);
        _fabIcon.SetTextColor(md_theme_light_onPrimaryContainer);
    } else {
        fab.SetBackColor(md_theme_dark_primaryContainer);
        _fabIcon.SetTextColor(md_theme_dark_onPrimaryContainer);
    }
}

function _largeFab(icon, layout) {
    this.setOnTouch = null;
    this.setOnTouch = function(onTouch) {
        this.onTouch = onTouch;
    }

    this.setMargins = function(left, top, right, bottom, mode) {
        largeFabContainer.SetMargins(left, top, right, bottom, mode);
    }

    this.setPosition = function(left, top, width, height, options) {
        largeFabContainer.SetPosition(left, top, width, height, options);
    }

    drawLargeFab(icon, layout, this);
}



ui.addBottomAppBar = function(barPropsInjson,parentLayout) {
    return new bottomBarObject(barPropsInjson,parentLayout);
}


function bottomBarObject(barPropsInjson,parentLayout) {
    this.setOnTouch = function(onTouchFunc){
       this.onTouchFunc = onTouchFunc;
   }
   this.setRawAdjustment = function(distanceFromTop) {
       if(layInfo.toLowerCase().includes('linear')){
           bottomBarContainer.SetMargins(0, distanceFromTop);
           }
           else{
               bottomBarContainer.SetPosition(0, distanceFromTop);
               }
            }
   drawBottomBar(barPropsInjson,parentLayout,this)
}

function drawBottomBar(barPropsInjson,parentLayout,bottomBarObj) {
    
    let props = JSON.stringify(barPropsInjson);
    let info = JSON.parse(props);
    icon1 = info.bottomBarProps.firstIcon;
    icon2 = info.bottomBarProps.secondIcon;
    icon3 = info.bottomBarProps.thirdIcon;
    icon4 = info.bottomBarProps.fourthIcon;
    fabIcon = info.bottomBarProps.fabIcon;
       
    bottomBarContainer = app.CreateLayout("Card", "Horizontal,Bottom,FillXY");
    
    bottomBarContainer.SetSize(null, 80, 'dp');
    bottomBarContainer.SetElevation(3, 'dp');
    
    
    if(layInfo.toLowerCase().includes('linear')){
        bottomBarContainer.SetMargins(0, 0.9);
    }
    else{
        bottomBarContainer.SetPosition(0, 0.9);
    }
    const box = app.CreateLayout('Linear', 'Horizontal');
    bottomBarContainer.AddChild(box);
    box.SetSize(-1, 80, 'dp');

    _icon1 = app.CreateText(icon1, null, null, 'H/VCenter,FillXY');
    _icon1.SetFontFile(defaultIcons);
    _icon1.SetTextSize(24);
    _icon1.SetOnTouchUp(function() {
        bottomBarObj.onTouchFunc(icon1);

    });

    _icon1.SetMargins(8, null, 16, null, 'dp');

    _icon2 = app.CreateText(icon2, null, null, 'H/VCenter,FillXY');
    _icon2.SetFontFile(defaultIcons);
    _icon2.SetTextSize(24);
    _icon2.SetOnTouchUp(function() {
        bottomBarObj.onTouchFunc(icon2);
    });
    _icon2.SetMargins(8, null, 16, null, 'dp');

    _icon3 = app.CreateText(icon3, null, null, 'H/VCenter,FillXY');
    _icon3.SetFontFile(defaultIcons);
    _icon3.SetTextSize(24);
    _icon3.SetOnTouchUp(function() {
        bottomBarObj.onTouchFunc(icon3);
    });
    _icon3.SetMargins(8, null, 16, null, 'dp');

    _icon4 = app.CreateText(icon4, null, null, 'H/Vcenter,FillXY');
    _icon4.SetFontFile(defaultIcons);
    _icon4.SetTextSize(24);
    _icon4.SetOnTouchUp(function() {
        bottomBarObj.onTouchFunc(icon4);
    });
    _icon4.SetMargins(8, null, 16, null, 'dp');

    fab = app.CreateLayout('Card', 'Right,FillXY');
    fab.SetSize(56, 56, 'dp');
    fab.SetElevation(0);
    fab.SetCornerRadius(16);
    fab.SetMargins(125, 12, 16, 12, 'dp');

    _fabIcon = app.CreateText(fabIcon, null, null, 'H/VCenter,FillXY');
    _fabIcon.SetFontFile(defaultIcons);
    _fabIcon.SetOnTouchDown(function() {
        bottomBarObj.onTouchFunc(fabIcon);
    });

    _fabIcon.SetTextSize(24);
    fab.AddChild(_fabIcon);

    box.AddChild(_icon1);
    box.AddChild(_icon2);
    box.AddChild(_icon3);
    box.AddChild(_icon4);
    box.AddChild(fab);

    if (theme === 'light') {
        bottomBarContainer.SetBackColor(md_theme_light_surfaceVariant);
        _icon1.SetTextColor(md_theme_light_onPrimaryContainer);
        _icon2.SetTextColor(md_theme_light_onPrimaryContainer);
        _icon3.SetTextColor(md_theme_light_onPrimaryContainer);
        _icon4.SetTextColor(md_theme_light_onPrimaryContainer);
        fab.SetBackColor(md_theme_light_primaryContainer);
        _fabIcon.SetTextColor(md_theme_light_onPrimaryContainer);
    } else {
        bottomBarContainer.SetBackColor(md_theme_dark_surfaceVariant);
        _icon1.SetTextColor(md_theme_dark_onPrimaryContainer);
        _icon2.SetTextColor(md_theme_dark_onPrimaryContainer);
        _icon3.SetTextColor(md_theme_dark_onPrimaryContainer);
        _icon4.SetTextColor(md_theme_dark_onPrimaryContainer);
        fab.SetBackColor(md_theme_dark_primaryContainer);
        _fabIcon.SetTextColor(md_theme_dark_onPrimaryContainer);
    }

    parentLayout.AddChild(bottomBarContainer);
}

var filledButtonContainer;

ui.addFilledButton = function(btnName, width, height, icon, layout) {
    return new filledButtonObject(btnName, width, height, icon, layout);
}
function filledButtonObject(btnName, width, height, icon, layout){
    this.onTouch = null;
    this.onLongTouch = null;
    this.getTop = function(){
        return filledButtonContainer.GetTop();
    }
    this.setOnTouch = function(onTouch){
        this.onTouch = onTouch;
    }
    this.setMargins = function( left, top, right, bottom, mode){
        filledButtonContainer.SetMargins( left, top, right, bottom, mode)
    }
    this.setPosition = function(left, top, width, height, options){
        filledButtonContainer.SetPosition(left, top, width, height, options)
    }
    this.setOnLongTouch = function(onLongTouch){
        this.onLongTouch = onLongTouch;
    }
    this.setPadding = function(left, top, right, bottom, mode){
        filledButtonContainer.SetPadding(left, top, right, bottom, mode);
    }
    this.setVisibility = function(mode){
        filledButtonContainer.SetVisibility(mode);
    }
    this.show = function(){
        filledButtonContainer.Show();
    }
    this.hide = function(){
        filledButtonContainer.Hide()
    }
    this.isEnabled = function(){
        return filledButtonContainer.IsEnabled();
    }
    this.animate = function( type, callback, time ){
        filledButtonContainer.Animate( type, callback, time );
    }
    this.tween = function( target, duration, type, repeat, yoyo, callback){
        filledButtonContainer.Tween( target, duration, type, repeat, yoyo, callback)
    }
    drawFilledBtn(btnName, width, height, icon, layout,this);
}
function drawFilledBtn(btnName, width, height, icon, layout,onTouchEvent){
    filledButtonContainer = app.CreateLayout('Frame', 'Spy,TouchThrough');
    
    let filledBtnUi = app.CreateLayout('Card', 'FillXY');
    filledBtnUi.SetCornerRadius(20);
    filledBtnUi.SetElevation(0);
    filledBtnUi.SetSize(width, height);
    filledButtonContainer.AddChild(filledBtnUi);

    let filledBtnText = app.AddText(filledBtnUi, btnName, null, null, 'H/VCenter,AutoScale,NoWrap,FillXY');
    filledBtnText.SetTextColor('black');

    if (height === null) {
        filledBtnUi.SetSize(null, 40, 'dp');
    }
    
    if (theme === 'light') {
        filledBtnUi.SetBackColor(md_theme_light_primaryContainer);
        filledBtnText.SetTextColor(md_theme_light_onPrimaryContainer);
    } else {
        filledBtnUi.SetBackColor(md_theme_dark_primaryContainer);
        filledBtnText.SetTextColor(md_theme_dark_onPrimaryContainer);
    }

    layout.AddChild(filledButtonContainer);
    filledButtonContainer.SetOnTouch = filledBtnText.SetOnTouchUp;
    filledButtonContainer.SetOnLongTouch = filledBtnText.SetOnLongTouch;
    
    filledButtonContainer.SetOnLongTouch(function(){
        
        try{
            onTouchEvent.onLongTouch();
        }
        catch(err){
            return null;
        }
    })
        
    filledButtonContainer.SetOnTouch(function(){
        top = filledButtonContainer.GetTop();
        left = filledButtonContainer.GetLeft();
        try{
            onTouchEvent.onTouch();
        }
        catch(err){
            return null;
        }
    })
}

var elevatedButtonContainer,elevatedBtnText;

ui.addElevatedButton = function(btnName, width, height, icon, parent_Layout) {
    return new elevatedBtnObj(btnName, width, height, icon, parent_Layout)
}

function elevatedBtnObj(btnName, width, height, icon, parent_Layout){
    this.setMargins = function( left, top, right, bottom, mode){
        elevatedButtonContainer.SetMargins( left, top, right, bottom, mode)
    }
    this.setPosition = function( left, top, width, height, options ){
        elevatedButtonContainer.SetPosition( left, top, width, height, options )
    }
    this.setOnTouch = function(onTouch){
        this.onTouch = onTouch;
    }
    this.setOnLongTouch = function(onLongTouch){
        this.onLongTouch = onLongTouch;
    }
    this.setScale = function(x,y){
        elevatedButtonContainer.SetScale(x,y)
    }
    this.setDescription = function(desc){
        elevatedButtonContainer.SetDescription(desc)
    }
    this.isVisible = function(){
        return elevatedButtonContainer.IsVisible();
    }
    this.isEnabled = function(){
        return elevatedButtonContainer.IsEnabled();
    }
    this.show = function(){
        elevatedButtonContainer.Show()
    }
    this.hide = function(){
        elevatedButtonContainer.Hide()
    }
    this.setVisibility = function(mode){
        elevatedButtonContainer.SetVisibility(mode);
    }
    this.setSize = function(width,height,options){
        elevatedButtonContainer.SetSize(width,height,options);
    }
    this.tween = function( target, duration, type, repeat, yoyo, callback){
        elevatedButtonContainer.Tween( target, duration, type, repeat, yoyo, callback )
    }
    this.animate = function( type, callback, time ){
        elevatedButtonContainer.Animate( type, callback, time )
    }
    drawElevatedBtn(btnName, width, height, icon, parent_Layout,this)
}

function drawElevatedBtn(btnName, width, height, icon, parent_Layout,elevatedFunc){
    elevatedButtonContainer = app.CreateLayout('Card', 'Spy,TouchThrough');
    elevatedButtonContainer.SetBackAlpha(0);
    elevatedButtonContainer.SetCornerRadius(20);
    elevatedButtonContainer.SetElevation(2);
    elevatedButtonContainer.SetSize(width, height);
    
    elevatedBtnUi = app.CreateLayout('Linear','Horizontal,H/VCenter');
    elevatedBtnUi.SetSize(width, height);
    elevatedButtonContainer.AddChild(elevatedBtnUi);
    

    if (height === null) {
        elevatedBtnUi.SetSize(null, 40, 'dp');
    }
    
    if(icon === null){
        elevatedBtnText = app.AddText(elevatedBtnUi, btnName, null, null, 'H/VCenter,NoWrap,FillXY');
    }
    else{
        iconUi = app.AddText(elevatedBtnUi,icon,null,null,'left')
        iconUi.SetFontFile(defaultIcons)
        iconUi.SetPadding(16,null,8,null,'dp')
        elevatedBtnText = app.AddText(elevatedBtnUi,btnName, null, null, 'H/VCenter,NoWrap,FillXY');
        elevatedBtnText.SetPadding(null,null,24,null,'dp')
    }
    elevatedBtnText.SetFontFile(defaultFont)
    
    if(theme==='light'){
        elevatedBtnUi.SetBackColor(md_theme_light_surface);
        elevatedBtnText.SetTextColor(md_theme_light_primary);
        iconUi.SetTextColor(md_theme_light_primary);
    }
    else{
        elevatedBtnUi.SetBackColor(md_theme_dark_surface);
        elevatedBtnText.SetTextColor(md_theme_dark_primary);
        iconUi.SetTextColor(md_theme_dark_primary);
    }
    
    elevatedBtnText.SetOnTouchUp(function(){
        try{
            elevatedFunc.onTouch();
        }
        catch(err){
            return null;
        }
    })
    
    elevatedBtnText.SetOnLongTouch(function(){
        try{
            elevatedFunc.onLongTouch();
        }
        catch(err){
            return null;
        }
    })
    
    parent_Layout.AddChild(elevatedButtonContainer);
}

var extendedFabContainer,btnText;
ui.addExtendedFAB = function(btnName, icon, width, parent_Layout) {
    return new extendedFABObj(btnName, icon, width, parent_Layout)
}

function extendedFABObj(btnName, icon, width, parent_Layout){
    this.setMargins = function(left,top,right,bottom,mode){
        extendedFabContainer.SetMargins(left,top,right,bottom,mode)
    }
    this.setPosition = function( left, top, width, height, options){
        extendedFabContainer.SetPosition( left, top, width, height, options)
    }
    this.setOnTouch = function(onTouch){
        this.onTouch = onTouch
    }
    this.setOnLongTouch = function(onLongTouch){
        this.onLongTouch = onLongTouch;
    }
    this.setOnScroll = function(scrollProps){
        
    }
    this.animate = function( type, callback, time ){
        extendedFabContainer.Animate( type, callback, time )
    }
    this.isVisible = function(){
        return extendedFabContainer.IsVisible();
    }
    this.setSize = function(width,height,options){
        extendedFabContainer.SetSize(width,height,options)
    }
    this.setDesription = function(desc){
        extendedFabContainer.SetDescription(desc)
    }
    this.setScale = function(x,y){
        extendedFabContainer.SetScale(x,y)
    }
    drawExtendedFab(btnName, icon, width, parent_Layout,this)
}

function drawExtendedFab(btnName, icon, width, parent_Layout,extendedFunc){
    extendedFabContainer = app.CreateLayout('Card', 'Spy,TouchThrough');
    let fabUi = app.CreateLayout('Linear', 'Horizontal,H/VCenter');
    fabUi.SetSize(null, 56, 'dp');
    
    extendedFabContainer.SetCornerRadius(16);
    extendedFabContainer.SetElevation(0);
    extendedFabContainer.SetSize(-1, 56, 'dp');
    extendedFabContainer.AddChild(fabUi);

    if (icon === null) {
        btnText = app.AddText(fabUi, btnName, null, null, 'H/VCenter,NoWrap,FillXY');
        btnText.SetPadding(16, null, 16, null, 'dp');
        btnText.SetFontFile(defaultFont)
        btnText.SetTextSize(18)
    }
    else{
        iconUi = app.AddText(fabUi,icon,null,null,'Left')
        iconUi.SetFontFile(defaultIcons)
        iconUi.SetPadding(16,null,null,null,'dp')
        iconUi.SetTextSize(24)
        
        btnText = app.AddText(fabUi, btnName, null, null, 'H/VCenter,NoWrap,FillXY');
        btnText.SetFontFile(defaultFont)
        btnText.SetPadding(16, null, 16, null, 'dp');
        btnText.SetTextSize(18)
    }
    try{
    if (theme === 'light') {
        extendedFabContainer.SetBackColor(md_theme_light_primaryContainer);
        btnText.SetTextColor(md_theme_light_onPrimaryContainer);
        iconUi.SetTextColor(md_theme_light_onPrimaryContainer);
    } else {
        extendedFabContainer.SetBackColor(md_theme_dark_primaryContainer);
        btnText.SetTextColor(md_theme_dark_onPrimaryContainer);
        iconUi.SetTextColor(md_theme_dark_onPrimaryContainer);
    }
    }
    catch(err){
        
    }

    btnText.SetOnTouchUp(function(){
        try{
            extendedFunc.onTouch();
        }
        catch(err){
            return null;
        }
    })
    
    iconUi.SetOnTouchUp(function(){
        try{
            extendedFunc.onTouch();
        }
        catch(err){
            return null;
        }
    })
    
    btnText.SetOnLongTouch(function(){
        try{
            extendedFunc.onLongTouch();
        }
        catch(err){
            return null;
        }
    })
    
    iconUi.SetOnLongTouch(function(){
        try{
            extendedFunc.onLongTouch();
        }
        catch(err){
            return null;
        }
    })
    
    parent_Layout.AddChild(extendedFabContainer);

}
ui.addRadioButtons = function(list,width,height,layout){
    return new i_radioList(list,width,height,layout)
}

function i_radioList(list,width,height,layout){
    this.getCheckedItems = function(){return _radio.GetCheckItem();}
    this.checkItemByIndex = function(checkItem){return _radio.CheckItemByIndex(checkItem);}
    this.getItem = function(title){return _radio.GetItem(title);}
    this.removeAll = function(){return _radio.RemoveAll()}
    this.removeItem = function(title){return _radio.RemoveItem(title);}
    this.removeItemByIndex = function(index){return _radio.RemoveItemByIndex(index);}
    this.scrollToItem = function(title,body){return _radio.ScrollToItem(title,body);}
    this.scrollToItemByIndex = function(index){return _radio.ScrollToItemByIndex(index);}
    this.selectItem = function(item){return _radio.SelectItem(item)}
    this.selectItemByIndex = function(index,scroll){_radio.SelectItemByIndex(index,scroll)}
    this.setOnSelect = function(onSelect){return _radio.SetOnSelect(onSelect);}
    this.setOnTouch = function(onTouch){return _radio.SetOnTouch(onTouch);}
    this.setList = function(list,delim){return _radio.SetList(list,delim);}
    this.setMargins = function(left,top,right,bottom){ _radio.SetMargins(left,top,right,bottom)}
    this.setPosition = function(left, top, width, height, options){_radio.SetPosition( left, top, width, height, options)}
    this.setSize = function(width,height){_radio.SetSize(width,height)}
    this.setScale = function(x,y){_radio.SetScale(x,y)}
    this.showContainer = function(){_radio.Show()}
    this.hideContainer = function(){_radio.Hide()}
    this.getLength = function(){return _radio.GetLength();}
    this.insertItem = function(index,title,body,image){_radio.InsertItem(index,title,body,image)}
    this.isVisible = function(){return _radio.IsVisible()}
    this.isEnabled = function(){return _radio.IsEnabled()}
    addRadioUi(list,width,height,layout)
}

var getStateColor = function(mode){
    if(mode==='light'){
        return md_theme_light_primary;
    }
    else{
        return md_theme_dark_primary;
    }
}
function addRadioUi(list,width,height,layout,index){
    _radio = MUI.CreateRadio(list,width,height,getStateColor(theme))
    _radio.SetFontFile(defaultFont)
    
    if(theme==='light'){
        _radio.SetTextColor(md_theme_light_onSurfaceVariant)
    }
    else{
        _radio.SetTextColor(md_theme_dark_onSurfaceVariant)
    }
    
    layout.AddChild(_radio)
    //return _radio;
}

ui.addCenterTopAppBar = function(title,rightIcon,leftIcon,layout){
    return new i_centerTopBar(title,rightIcon,leftIcon,layout)
}

function i_centerTopBar(title,rightIcon,leftIcon,layout){
    this.onNav = null;
    this.onIcon = null;
    this.setOnNav = function(onNav){this.onNav = onNav};
    this.setOnIcon = function(onIcon){this.onIcon = onIcon};
    _drawCenterTopAppBar(title,rightIcon,leftIcon,layout,this)
}
function _drawCenterTopAppBar(title,rightIcon,leftIcon,layout,onNav,onIcon){
    barUi = app.CreateLayout('Card','Top,Horizontal');
    barUi.SetCornerRadius(0)
    barUi.SetElevation(0)
    barUi.SetSize(1,0.065)
    
    const box = app.AddLayout(barUi, "Linear", "Horizontal,VCenter");
    box.SetSize(1,0.065)

    _leftUi = app.CreateLayout('Linear','VCenter');
    _leftUi.SetSize(0.1, 0.065)
    box.AddChild(_leftUi)
    
    _leftIcon = app.CreateText(leftIcon)
    _leftIcon.SetFontFile(defaultIcons)
    _leftIcon.SetTextSize(24)
    _leftUi.AddChild(_leftIcon);
    
    _title = app.CreateText( title )
    _title.SetFontFile(defaultFont)
    _title.SetSize(0.8, null)
    _title.SetTextSize(24)
    box.AddChild(_title)
    
    _rightUi = app.CreateLayout('Linear','VCenter');
    _rightUi.SetSize(0.1, 0.065)
    box.AddChild(_rightUi)
    
    _rightIcon = app.CreateText(rightIcon)
    _rightIcon.SetFontFile(defaultIcons)
    _rightIcon.SetTextSize(24)
    _rightUi.AddChild(_rightIcon);
    
    
    if(theme==='light'){
        barUi.SetBackColor(md_theme_light_surface)
        _title.SetTextColor(md_theme_light_onSurface)
    }
    else{
        barUi.SetBackColor(md_theme_dark_onSurface)
        _title.SetTextColor(md_theme_dark_onSurface)
    }
    
    layout.AddChild(barUi)
}

var snackContainer;
ui.addSnackBar = function(text, btnAction, width, alignment) {
    return new SnackBarObject(text, btnAction, width, alignment);
}

function SnackBarObject(text, btnAction, width, alignment) {

    this.setRawAlignment = function(top){
        snackContainer.SetMargins(null,top)
    }
    this.setTimeOut = function(timeOut) {
        this.timeOut = timeOut;
    }
    this.setOnAction = function(callback) {
        this.callback = callback; 
    } 
    this.show = function(){
        drawSnackBarUi(text, btnAction, width, this.timeOut, this.callback);
    }
    
}
// notice we didnt use something like snackFunc.callback()
// I dont know why it dont work but this works
function drawSnackBarUi(text, btnAction, width, alignment, timeOut, callback) {
   
    snackContainer = app.CreateLayout('Linear', alignment + ',FillXY,TouchThrough,Center');
    let snackUi = app.CreateLayout('Card', '');
    
    snackContainer.AddChild(snackUi);

    snackUi.SetMargins(0.055, 0.018, 0.055, 0.018);
    snackUi.SetCornerRadius(4);
    snackUi.SetElevation(6);
    snackUi.SetSize(width, 0.065);

    const box = MUI.CreateLayout("Linear", "Horizontal");
    box.SetSize(width, 0.065);
    snackUi.AddChild(box);

    let snackText = app.CreateText(text, null, null, 'Multiline,AutoScale,VCenter');
    snackText.SetTextColor('black');
    snackText.SetMargins(0.055, 0.018, 0.055, 0.01);
    snackText.SetFontFile(defaultFont);
    snackText.SetTextSize(16);
    box.AddChild(snackText);

    let snackButton = app.CreateText(btnAction, null, null, "VCenter,FillXY,AutoScale,Wrap,Right");
    snackButton.SetMargins(null, null, 16, null, 'dp');
    snackButton.SetTextSize(16);
    snackButton.SetFontFile(defaultFont);
    snackButton.SetOnTouchUp(callback)
    box.AddChild(snackButton);

    app.AddLayout(snackContainer);
    if (theme === 'light') {
        box.SetBackColor(md_theme_light_inverseSurface);
        snackText.SetTextColor(md_theme_light_inverseOnSurface);
        snackButton.SetTextColor(md_theme_light_inversePrimary);
    } else {
        box.SetBackColor(md_theme_dark_inverseSurface);
        snackText.SetTextColor(md_theme_dark_inverseOnSurface);
        snackButton.SetTextColor(md_theme_dark_inversePrimary);
    }
    
    if (timeOut === undefined) {
        setTimeout(function() {
            try {
                snackUi.Animate(animateOut, null, timeOut/10);
            } catch (err) {
                snackUi.Animate('Fade-Out', null, timeOut/10);
            }
            app.DestroyLayout(this.snackContainer);
        }, 3000);
    } else {
        setTimeout(function() {
            try {
                snackUi.Animate(animateOut);
            } catch (err) {
                snackUi.Animate('Fade-Out');
            }
            app.DestroyLayout(this.snackContainer);
        }, timeOut);
    }
    
}

var _text;
ui.addText = function(text,width,height,options,parent_Layout){
    return new textObject(text,width,height,options,parent_Layout)
}

function textObject(text,width,height,options,parent_Layout){
    this.setMargins = function(left,top,right,bottom,mode){
        _text.SetMargins(left,top,right,bottom,mode)
    }
    this.setPosition = function( left, top, width, height, options){
        _text.SetPosition( left, top, width, height, options)
    }
    this.setOnTouch = function(onTouch){
        _text.SetOnTouch(onTouch)
    }
    this.setOnTouchDown = function(onTouchDown){
        _text.SetOnTouchDown(onTouchDown)
    }
    this.setOnTouchUp  = function(onTouchUp){
        _text.SetOnTouchUp(onTouchUp)
     }
    this.setVisibility = function(mode){
        _text.SetVisibility(mode)
    }
    this.setTextColor = function(color){
        _text.SetTextColor(color)   
    }
    this.setTextSize = function(size,mode){
        _text.SetTextSize(size,mode)
    }
    this.setTextShadow = function( radius, dx, dy, color){
        _text.SetTextShadow( radius, dx, dy, color)
    }
    this.setScale = function(x,y){
        _text.SetScale(x,y)
    }
    this.setFontFile = function(fontFile){
        _text.SetFontFile(fontFile)
    }
    this.setSize = function(width,height,options){
        _text.SetSize(width,height,options)
    }
    this.setOnLongTouch = function(callback){
        _text.SetOnLongTouch(callback)
    }
    this.setHtml = function(str){
        _text.SetHtml(str)
    }
    this.setEllipsize = function(mode){
        _text.SetEllipsize(mode)
    }
    this.setLog = function(maxLines){
        _text.SetLog(maxLines)
    }
    this.show = function(){
        _text.SHow();
    }
    this.hide = function(){
        _text.Hide();
    }
    this.setBackAlpha = function(alpha){
        _text.SetBackAlpha(alpha)
    }
    this.setBackColor = function(color){
        _text.SetBackColor(color)
    }
    this.setBackGradient = function( color1, color2, color3, options){
        _text.SetBackGradient( color1, color2, color3, options)
    }
    this.setBackground = function(file, options){
        _text.SetBackground(file, options)   
    }
    this.setBackGradientRadial = function(x, y, radius, color1, color2, color3, options){
        _text.SetBackGradientRadial( x, y, radius, color1, color2, color3, options)
    }
    this.setColorFilter = function(color, mode ){
        _text.SetColorFilter(color, mode)
    }
    this.setDescription = function(desc){
        _text.SetDescription(desc)
    }
    this.isVisible = function(){
        return _text.IsVisible();
    }
    this.getText = function(){
        return _text.GetText();
    }
    this.adjustColor = function( hue, saturation, brightness, contrast){
        _text.AdjustColor( hue, saturation, brightness, contrast)
    }
    this.animate = function( type, callback, time){
        _text.Animate( type, callback, time)
    }
    this.focus = function(){
        _text.Focus()
    }
    this.tween = function( target, duration, type, repeat, yoyo, callback){
        _text.Tween( target, duration, type, repeat, yoyo, callback)
    }
    drawText(text,width,height,options,parent_Layout)
}

function drawText(text,width,height,options,parent_Layout){
    _text = app.CreateText(text,width,height,options);
    _text.SetFontFile(defaultFont)
    parent_Layout.AddChild(_text)
    
    if(theme==='light'){
        _text.SetTextColor(md_theme_light_onSurface)
    }
    else{
        _text.SetTextColor(md_theme_dark_onSurface)
    }
}

ui.addTimePickerInput = function(){
    return new timeInputObj();
}

function timeInputObj(){
    this.setOnAction = function(){
        
    }
    drawTimeInput()
}

function drawTimeInput(){
    
    let borderColor = function(){
        if(theme==='light') return md_theme_light_primaryContainer;
        else return md_theme_dark_primaryContainer;
    }
    let backColor = function(){
        if(theme==='light') return md_theme_light_onPrimaryContainer;
        else return md_theme_dark_onPrimaryContainer;
    }
    pickerDlg = app.CreateDialog();
    pickerDlg.SetBackColor("#00000000");
    
    pickerUi = app.CreateLayout('Card');
    pickerDlg.AddLayout(pickerUi);
    
    pickerUi.SetCornerRadius(24);
    pickerUi.SetSize(320,250,'dp')
    
    const box = app.CreateLayout('Linear','Left');
    box.SetSize(320,250,'dp');
    pickerUi.AddChild(box);
    
    title = app.AddText(box,'Enter Time',null,null,'Left')
    title.SetMargins(24,24,null,null,'dp')
    
    const tbox = app.CreateLayout('Linear','Horizontal,Left');
    tbox.SetSize(320,82,'dp')
    tbox.SetMargins(null,20,null,null,'dp')
    //tbox.SetBackColor('green')
    box.AddChild(tbox)
    
    hrInput = MUI.AddTextAreaOutlineA(tbox,0.25,0.1,'',false,borderColor(),backColor())
    hrInput.SetMargins(20,null,null,null,'dp')
    
    minInput = MUI.AddTextAreaOutlineA(tbox,0.25,0.1,'',false,borderColor(),backColor())
    minInput.SetMargins(20,null,null,null,'dp')
    
    hrText = app.AddText(box,'Hour',null,null,null)
    hrText.SetMargins(23,null,null,null,'dp')
    
    minText = app.AddText(box,'Minute',null,null)
    minText.SetMargins(144,null,null,null,'dp')
    if(theme==='light'){
        pickerUi.SetBackColor(md_theme_light_surface);
        title.SetTextColor(md_theme_light_onSurfaceVariant)
        hrText.SetTextColor(md_theme_light_onSurfaceVariant)
    }
    else{
        pickerUi.SetBackColor(md_theme_dark_surface);
        title.SetTextColor(md_theme_dark_onSurfaceVariant)
        hrText.SetTextColor(md_theme_dark_onSurfaceVariant)
    }
    this.pickerDlg.Show();
}

ui.showDialog = function(title, text, dlgOptions, noAction, yesAction) {
    return new dlgBar(title, text, dlgOptions, noAction, yesAction);
}

function dlgBar(title, text, dlgOptions, noAction, yesAction) {
    this.setOnCancel = function(onCancel) {
        this.onCancel = onCancel;
    }
    this.setOnAction = function(onAction){
        this.onAction = onAction;
    }
    showDialogBar(title, text, dlgOptions, noAction, yesAction,this)
}

function showDialogBar(title, text, dlgOptions, noAction, yesAction,dlgFunc) {
    
    let width = function(){
        if(app.IsTablet()) return 560;
        else return 280;
    }
    
    dlgA = app.CreateDialog();
    dlgA.SetBackColor("#00000000");
    dlgA.SetOnCancel(function(){
        try{
            dlgFunc.onCancel();
            }
        catch(err){
            return null;
            }
    })
    
    dlgUi = app.CreateLayout('Card')
    dlgA.AddLayout(dlgUi)

    
    dlgUi.SetElevation(0)
    dlgUi.SetSize(width(), null,'dp')
    dlgUi.SetCornerRadius(28)

    const box = app.CreateLayout("Linear", "Left");
    box.SetSize(width(), null,'dp')
    dlgUi.AddChild(box);

    dlgTitle = app.AddText(box, title, 1, null, 'Bold,Left')
    dlgTitle.SetPadding(24, 24, 24, 16, 'dp')
    dlgTitle.SetTextSize(14)
    dlgTitle.SetFontFile(defaultFont)

    dlgText = app.AddText(box, text, null, null, 'Multiline,Left')
    dlgText.SetPadding(24, null, 24, 24, 'dp')
    dlgText.SetTextSize(14)
    dlgText.SetFontFile(defaultFont)

    const footer = app.AddLayout(box, "Linear", "Horizontal,Right");
    footer.SetSize(width(), null,'dp');
    footer.SetPadding(24, null, 24, 24, "dp");

    noBtn = app.AddText(footer, noAction, null, null, 'Bold')
    noBtn.SetOnTouchUp(function(){
        try{
            dlgFunc.onAction(false);
            dlgA.Dismiss();
        }
        catch(err){
            return null;
        }
    })
    noBtn.SetPadding(8, null, 8, null, "dp");

    yesBtn = app.AddText(footer, yesAction, null, null, 'Bold,VCenter')
    yesBtn.SetOnTouchUp(function(){
        try{
            dlgFunc.onAction(true);
            dlgA.Dismiss();
        }
        catch(err){
            return null;
        }
    })
    yesBtn.SetPadding(8, null, 8, null, "dp");
    
    if(theme === 'light'){
        noBtn.SetBackColor(md_theme_light_primary)
        yesBtn.SetBackColor(md_theme_light_primary)
        dlgUi.SetBackColor(md_theme_light_secondaryContainer)
        dlgTitle.SetTextColor(md_theme_light_onSurface)
        dlgText.SetTextColor(md_theme_light_onSurfaceVariant)
    }
    else{
        noBtn.SetTextColor(md_theme_dark_primary)
        yesBtn.SetTextColor(md_theme_dark_primary)
        dlgUi.SetBackColor(md_theme_dark_secondaryContainer)
        dlgTitle.SetTextColor(md_theme_dark_onSurface)
        dlgText.SetTextColor(md_theme_dark_onSurfaceVariant)
    }
    this.dlgA.Show()
}
