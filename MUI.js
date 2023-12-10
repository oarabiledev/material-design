var uiVersion = 0.01;
var defaultFont = 'Fonts/Text/Roboto.ttf'
var defaultIcons = 'Fonts/Icons/Regular.ttf'

var screenHeight = app.GetScreenHeight('Real');
var screenWidth = app.GetScreenWidth('Real');
var screenDensity = app.GetScreenDensity('Real');

//ui color constants

const ui = {};

ui.getVersion = function() {
    return uiVersion;
}


ui.setIconFill = function(iconFill){
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
}
ui.setProps = function(colorSystem, userTheme) {
    theme = userTheme
    //alert(theme)
    if (colorSystem === 'static') {
        appTheme = app.ReadFile('appTheme/appTheme.json');
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

ui.addLayout = function(type,options){
    
    lay = app.CreateLayout(type, options)
    if (theme ==='dark') {
        lay.SetBackColor(md_theme_dark_surface);
        app.SetStatusBarColor(md_theme_dark_surface)
    } else {
        lay.SetBackColor(md_theme_light_surface);
        //app.SetStatusBarColor()
    }
    return lay;
}


ui.addFAB = function(icon,layout){
    return new _Fab(icon,layout)
}


function drawFab(icon,layout,_FabInfo){
    mainUi = app.CreateLayout('Linear','TouchThrough,Spy')
    mainUi.SetSize(56,56,'dp');
    
    
    fab = app.CreateLayout('Card','Right,Bottom,FillXY');
    fab.SetSize(56,56,'dp');
    fab.SetElevation(0);
    fab.SetCornerRadius(16);

    
    _fabIcon = app.CreateText(icon,null,null,'H/VCenter,FillXY')
    _fabIcon.SetFontFile(defaultIcons)
    _fabIcon.SetOnTouchDown(function () {
        _FabInfo.onTouch();
    });

    _fabIcon.SetTextSize(24)
    fab.AddChild(_fabIcon)
    mainUi.AddChild(fab)
    
    layout.AddChild(mainUi)  
    
    if(theme==='light'){
        fab.SetBackColor(md_theme_light_primaryContainer)
        _fabIcon.SetTextColor(md_theme_light_onPrimaryContainer)
    }
    else{
        fab.SetBackColor(md_theme_dark_primaryContainer)
        _fabIcon.SetTextColor(md_theme_dark_onPrimaryContainer)
        
    }
}

function _Fab(icon,layout){
    
    this.setOnTouch = null;
    this.setOnTouch = function(onTouch){
        this.onTouch = onTouch;
    }
    
    this.setMargins = function(left,top,right,bottom,mode){
       mainUi.SetMargins(left,top,right,bottom,mode);
    }
    this.setPosition = function( left, top, width, height, options){
        mainUi.SetPosition(left,top,width,height,options)
    }
    drawFab(icon,layout,this)
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

ui.addBottomSheet = function(sheetLayout,height){
    return new bottomSheetObject(sheetLayout,height);
}

function bottomSheetObject(sheetLayout,height){
    this.dismissSheet = function(){
        dismissBSheet()
    }
    this.showSheet = function(){
        drawBottomSheet(sheetLayout,height)
    }
}

function drawBottomSheet(sheetLayout,height){
    mainUi = app.CreateLayout('Linear','FillXY,VCenter,Bottom')
    mainUi.SetSize(1,1)
    mainUi.SetOnTouchUp(dismissBSheet)
    
    _bSheet = app.CreateLayout('Card','FillX,VCenter,Bottom')
    _bSheet.SetSize(-1,height)
    _bSheet.SetCornerRadius(28)
    _bSheet.Animate('BounceBottom',null,550)
    _bSheet.AddChild(sheetLayout)
    mainUi.AddChild(_bSheet)
    
    app.AddLayout(mainUi)
    
    if(theme==='light'){
        mainUi.SetBackColor(md_theme_light_scrim)
        mainUi.SetBackAlpha(0.33)
        _bSheet.SetBackColor(md_theme_light_surfaceVariant)
    }
    else{
        mainUi.SetBackColor(md_theme_dark_scrim)
        mainUi.SetBackAlpha(0.33)
        _bSheet.SetBackColor(md_theme_dark_surfaceVariant)
    }
}

function dismissBSheet(){
    _bSheet.Animate('SlideToBottom',function(){
        app.DestroyLayout(mainUi)
        },210)
    
}
ui.addBottomAppBar = function(icon1,icon2,icon3,icon4,fabIcon,layout){
    return new _bottomBar(icon1,icon2,icon3,icon4,fabIcon,layout)
}
function _bottomBar(icon1, icon2, icon3, icon4, fabIcon, layout) {
    this.icon1Func = null;
    this.icon2Func = null;
    this.icon3Func = null;
    this.icon4Func = null;
    this.callback = null;

    this.setIcon1Func = function (icon1Func) { this.icon1Func = icon1Func; }
    this.setIcon2Func = function (icon2Func) { this.icon2Func = icon2Func; }
    this.setIcon3Func = function (icon3Func) { this.icon3Func = icon3Func; }
    this.setIcon4Func = function (icon4Func) { this.icon4Func = icon4Func; }
    this.setOnAction = function (callback) { this.callback = callback; }

    drawBottomBar(icon1, icon2, icon3, icon4, fabIcon, layout, this);
}


ui.addSmallFAB = function(icon,layout){
    return new _smallFab(icon,layout)
}


function drawSmallFab(icon,layout,_FabInfo){
    mainUi = app.CreateLayout('Linear','TouchThrough,Spy')
    mainUi.SetSize(40,40,'dp');
    
    
    fab = app.CreateLayout('Card','Right,Bottom,FillXY');
    fab.SetSize(40,40,'dp');
    fab.SetElevation(0);
    fab.SetCornerRadius(12);

    
    _fabIcon = app.CreateText(icon,null,null,'H/VCenter,FillXY')
    _fabIcon.SetFontFile(defaultIcons)
    _fabIcon.SetOnTouchDown(function () {
        _FabInfo.onTouch();
    });

    _fabIcon.SetTextSize(18)
    fab.AddChild(_fabIcon)
    mainUi.AddChild(fab)
    
    layout.AddChild(mainUi)  
    
    if(theme==='light'){
        fab.SetBackColor(md_theme_light_primaryContainer)
        _fabIcon.SetTextColor(md_theme_light_onPrimaryContainer)
    }
    else{
        fab.SetBackColor(md_theme_dark_primaryContainer)
        _fabIcon.SetTextColor(md_theme_dark_onPrimaryContainer)
        
    }
}

function _smallFab(icon,layout){
    
    this.setOnTouch = null;
    this.setOnTouch = function(onTouch){
        this.onTouch = onTouch;
    }
    
    this.setMargins = function(left,top,right,bottom,mode){
       mainUi.SetMargins(left,top,right,bottom,mode);
    }
    this.setPosition = function( left, top, width, height, options){
        mainUi.SetPosition(left,top,width,height,options)
    }
    drawSmallFab(icon,layout,this)
}

ui.addLargeFAB = function(icon,layout){
    return new _largeFab(icon,layout)
}


function drawLargeFab(icon,layout,_FabInfo){
    mainUi = app.CreateLayout('Linear','TouchThrough,Spy')
    mainUi.SetSize(96,96,'dp');
    
    
    fab = app.CreateLayout('Card','Right,Bottom,FillXY');
    fab.SetSize(96,96,'dp');
    fab.SetElevation(0);
    fab.SetCornerRadius(28);

    
    _fabIcon = app.CreateText(icon,null,null,'H/VCenter,FillXY')
    _fabIcon.SetFontFile(defaultIcons)
    _fabIcon.SetOnTouchDown(function () {
        _FabInfo.onTouch();
    });

    _fabIcon.SetTextSize(36)
    fab.AddChild(_fabIcon)
    mainUi.AddChild(fab)
    
    layout.AddChild(mainUi)  
    
    if(theme==='light'){
        fab.SetBackColor(md_theme_light_primaryContainer)
        _fabIcon.SetTextColor(md_theme_light_onPrimaryContainer)
    }
    else{
        fab.SetBackColor(md_theme_dark_primaryContainer)
        _fabIcon.SetTextColor(md_theme_dark_onPrimaryContainer)
        
    }
}

function _largeFab(icon,layout){
    
    this.setOnTouch = null;
    this.setOnTouch = function(onTouch){
        this.onTouch = onTouch;
    }
    
    this.setMargins = function(left,top,right,bottom,mode){
       mainUi.SetMargins(left,top,right,bottom,mode);
    }
    this.setPosition = function( left, top, width, height, options){
        mainUi.SetPosition(left,top,width,height,options)
    }
    drawLargeFab(icon,layout,this)
}

var shader1,shader2,shader3;
 _shader2 = app.CreateLayout('Card');
ui.addBottomNavBar = function(iconNum,icon1,icon2,icon3,icon4,icon5,lay1,lay2,lay3,lay4,lay5){
    return new navObject(iconNum,icon1,icon2,icon3,icon4,icon5,lay1,lay2,lay3,lay4,lay5);
}

function navObject(iconNum,icon1,icon2,icon3,icon4,icon5,lay1,lay2,lay3,lay4,lay5){
    this.setActiveTab = function(activeIcon){
        
    }
    this.setIconLabel = function(label1,label2,label3,label4,label5){
        _label1 = app.AddText(_shaderUi1,label1,null,null,'FillXY')
        _label1.SetOnTouchUp(function(){
          
        })
        
        _label2 = app.AddText(_shaderUi2,label2,null,null,'H/VCenter,FillXY')
        _label2.SetOnTouchUp(function(){
       
        })
        _label3 = app.AddText(_shaderUi3,label3,null,null,'H/VCenter,FillXY')
        this.label2 = label2;
        this.label3 = label3;
        this.label4 = label4;
        this.label5 = label5;
    }
    this.setAnimation = function(state,animation){
        this.state = state;
        this.animation = animation;
    }
    this.goTo = function(goToIcon){
        this.goToIcon = goToIcon;
    }
    this.setOnScrollUp = function(scrollType,objectVisibility,objectAnimation){
        
    }
    this.setOnScrollDown = function(scrollType,objectVisibility,objectAnimation){
        
    }
    drawNav(iconNum,icon1,icon2,icon3,icon4,icon5,lay1,lay2,lay3,lay4,lay5,this.activeIcon)
}
function drawNav(iconNum,icon1,icon2,icon3,icon4,icon5,lay1,lay2,lay3,lay4,lay5,activeIcon){
    _mainUi = app.CreateLayout('linear')
    _mainUi.SetSize(1,1)
    
    
    _barUi = app.CreateLayout('Card');
    _barUi.SetSize(1,0.108)
    _barUi.SetMargins(0,0.892)
    _mainUi.AddChild(_barUi)
    
    _iconUi = app.CreateLayout('linear','Horizontal')
    _iconUi.SetBackAlpha(256)
    _barUi.AddChild(_iconUi)
    
    if(iconNum === 3){
        //1st Icon
        _shaderUi1 = app.CreateLayout('Linear','vertical,VCenter')
        _shaderUi1.SetSize(0.25,null)
        
        _iconUi.AddChild(_shaderUi1)
        _shader1 = app.CreateLayout('Card');
        _shader1.SetElevation(0)
        
        _shaderUi1.SetMargins(25,12,null,16,'dp')
        _shader1.SetSize(64,32,'dp')
        _shader1.SetCornerRadius(16)
        _shaderUi1.AddChild(_shader1)
        
        _icon1 = app.AddText(_shader1,icon1,null,null,'H/VCenter,FillXY')
        _icon1.SetFontFile(defaultIcons)
        
        //2nd Icon
        _shaderUi2 = app.CreateLayout('Linear','vertical,VCenter')
        _shaderUi2.SetSize(0.25,null)
        
        _iconUi.AddChild(_shaderUi2)
       
        _shader2.SetElevation(0)
       
        
        _shaderUi2.SetMargins(35,12,null,16,'dp')
        _shader2.SetSize(64,32,'dp')
        _shader2.SetCornerRadius(16)
        _shaderUi2.AddChild(_shader2)
        _shader2.SetBackColor(md_theme_dark_surface)
        
        _icon2 = app.AddText(_shader2,icon2,null,null,'H/VCenter,FillXY')
        _icon2.SetFontFile(defaultIcons)
        
        
        //3nd Icon
        _shaderUi3 = app.CreateLayout('Linear','Vertical,VCenter')
        _shaderUi3.SetSize(0.25,null)
        
        _iconUi.AddChild(_shaderUi3)
        _shader3 = app.CreateLayout('Card');
       _shader3.SetElevation(0)
       
       
        _shaderUi3.SetMargins(35,12,null,16,'dp')
        _shader3.SetSize(64,32,'dp')
        _shader3.SetCornerRadius(16)
        _shaderUi3.AddChild(_shader3)
        _shader3.SetBackColor(md_theme_dark_surface)
        
        _icon3 = app.AddText(_shader3,icon3,null,null,'H/VCenter,FillXY')
        _icon3.SetFontFile(defaultIcons)
        
    }
    
    if(iconNum === 4){
        

    }
    
    
    if(iconNum === 5){
        
        
    }
        
    if(theme==='light'){
        _barUi.SetBackColor(md_theme_light_surface)
        _shader1.SetBackColor(md_theme_light_onSecondaryContainer)
        _icon1.SetTextColor(md_theme_light_onSurfaceVariant)
    }
    else{
         _barUi.SetBackColor(md_theme_dark_surface)
         _shader1.SetBackColor(md_theme_dark_secondaryContainer)
         _icon1.SetTextColor(md_theme_dark_onSurfaceVariant)
         
    }
    
    app.AddLayout(_mainUi);
}




function showPage(layouty){
    
}
ui.addBottomAppBar = function(icon1,icon2,icon3,icon4,fabIcon,layout){
    return new _bottomBar(icon1,icon2,icon3,icon4,fabIcon,layout)
}

ui.addBottomAppBar = function(icon1,icon2,icon3,icon4,fabIcon,layout){
    return new _bottomBar(icon1,icon2,icon3,icon4,fabIcon,layout)
}
function _bottomBar(icon1, icon2, icon3, icon4, fabIcon, layout) {
    this.icon1Func = null;
    this.icon2Func = null;
    this.icon3Func = null;
    this.icon4Func = null;
    this.callback = null;

    this.setIcon1Func = function (icon1Func) { this.icon1Func = icon1Func; }
    this.setIcon2Func = function (icon2Func) { this.icon2Func = icon2Func; }
    this.setIcon3Func = function (icon3Func) { this.icon3Func = icon3Func; }
    this.setIcon4Func = function (icon4Func) { this.icon4Func = icon4Func; }
    this.setOnAction = function (callback) { this.callback = callback; }

    drawBottomBar(icon1, icon2, icon3, icon4, fabIcon, layout, this);
}

function drawBottomBar(icon1,icon2,icon3,icon4,fabIcon,layout,barInfo){
    mainUi = app.CreateLayout("Card", "Bottom,FillXY,Horizontal" );
    mainUi.SetSize(-1,80,'dp')  
    mainUi.SetMargins(0,0.9)
    //this.mainUi.SetPosition(0,0.9)
    mainUi.SetElevation(3,'dp')

    const box = app.CreateLayout('Linear','Horizontal')
    mainUi.AddChild(box);
    box.SetSize(-1,80,'dp')
    
    //Note I increased left padding to 8, i was using setmargin
    _icon1 = app.CreateText(icon1,null,null,'H/VCenter,FillXY')
    _icon1.SetFontFile(defaultIcons)
    _icon1.SetTextSize(24)
    _icon1.SetOnTouchUp(function(){
        barInfo.icon1Func()})
        
    _icon1.SetMargins(8,null,16,null,'dp')
    
    _icon2 = app.CreateText(icon2,null,null,'H/VCenter,FillXY')
    _icon2.SetFontFile(defaultIcons)
    _icon2.SetTextSize(24)
    _icon2.SetOnTouchUp(function(){
    barInfo.icon2Func();
    })
    _icon2.SetMargins(8,null,16,null,'dp')
    
    _icon3 = app.CreateText(icon3,null,null,'H/V,FillXY')
    _icon3.SetFontFile(defaultIcons)
    _icon3.SetTextSize(24)
    _icon3.SetOnTouchUp(function(){
    barInfo.icon3Func();
    })
    _icon3.SetMargins(8,null,16,null,'dp')
    
    
    _icon4 = app.CreateText(icon4,null,null,'H/V,FillXY')
    _icon4.SetFontFile(defaultIcons)
    _icon4.SetTextSize(24)
    _icon4.SetOnTouchUp(function(){
    barInfo.icon4Func();
    })
    _icon4.SetMargins(8,null,16,null,'dp')
    
    fab = app.CreateLayout('Card','Right,FillXY')
    fab.SetSize(56,56,'dp')
    fab.SetElevation(0)
    fab.SetCornerRadius(16)
    fab.SetMargins(100,12,16,12,'dp')
    
    _fabIcon = app.CreateText(fabIcon,null,null,'H/V,FillXY')
    _fabIcon.SetFontFile(defaultIcons)
    _fabIcon.SetOnTouchDown(function () {
        console.log("FabIcon touched");
        barInfo.callback(); // Check if this function is being called
    });

    _fabIcon.SetTextSize(24)
    fab.AddChild(_fabIcon)
    
    
    box.AddChild(_icon1)
    box.AddChild(_icon2)
    box.AddChild(_icon3)
    box.AddChild(_icon4)
    box.AddChild(fab)
    
    if(theme==='light'){
        mainUi.SetBackColor(md_theme_light_surfaceVariant); 
        _icon1.SetTextColor(md_theme_light_onPrimaryContainer)
        _icon2.SetTextColor(md_theme_light_onPrimaryContainer)
        _icon3.SetTextColor(md_theme_light_onPrimaryContainer)
        _icon4.SetTextColor(md_theme_light_onPrimaryContainer)
        fab.SetBackColor(md_theme_light_primaryContainer)
        _fabIcon.SetTextColor(md_theme_light_onPrimaryContainer)
    }
    else{
        mainUi.SetBackColor(md_theme_dark_surfaceVariant);
        _icon1.SetTextColor(md_theme_dark_onPrimaryContainer)
        _icon2.SetTextColor(md_theme_dark_onPrimaryContainer)
        _icon3.SetTextColor(md_theme_dark_onPrimaryContainer)
        _icon4.SetTextColor(md_theme_dark_onPrimaryContainer)
        fab.SetBackColor(md_theme_dark_primaryContainer)
        _fabIcon.SetTextColor(md_theme_dark_onPrimaryContainer)
        
    }
    
    layout.AddChild(mainUi)
}



//For now all butoons are kept the same
ui.addFilledButton = function(btnName, width, height, icon, layout) {
    mainUi = app.CreateLayout('Frame', 'Spy,TouchThrough');
    mainUi.SetBackAlpha(0)
    btnUi = app.CreateLayout('Card', 'FillXY')
    btnUi.SetCornerRadius(20)
    btnUi.SetElevation(0)
    btnUi.SetSize(width, height)
    mainUi.AddChild(btnUi)
    
    

    btnText = app.AddText(btnUi, btnName, null, null, 'H/VCenter,AutoScale,NoWrap,FillXY')
    btnText.SetTextColor('black');

    if (height === null) btnUi.SetSize(null, 40, 'dp');
    if(theme==='light'){
        btnUi.SetBackColor(md_theme_light_primaryContainer);
        btnText.SetTextColor(md_theme_light_onPrimaryContainer);
    }
    else{
        btnUi.SetBackColor(md_theme_dark_primaryContainer);
        btnText.SetTextColor(md_theme_dark_onPrimaryContainer);
    }

    layout.AddChild(mainUi)

    mainUi.SetOnTouch = btnText.SetOnTouchUp
    return mainUi;
}

ui.addElevatedButton = function(btnName, width, height, icon, layout) {

    mainUi = app.CreateLayout('Frame', 'Spy,TouchThrough');
    mainUi.SetBackAlpha(0)
    btnUi = app.CreateLayout('Card', 'FillXY')
    btnUi.SetCornerRadius(20)
    btnUi.SetElevation(0)
    btnUi.SetSize(width, height)
    mainUi.AddChild(btnUi)
    btnUi.SetBackColor(baseTheme)


    btnText = app.AddText(btnUi, btnName, null, null, 'H/VCenter,AutoScale,NoWrap,FillXY')
    btnText.SetTextColor('black');

    if (height === null) btnUi.SetSize(null, 40, 'dp');

    layout.AddChild(mainUi)

    mainUi.SetOnTouch = btnText.SetOnTouchUp
    return mainUi;

}

ui.addExtendedFAB = function(btnName, icon, width, layout) {
    var btnText;

    mainUi = app.CreateLayout('Frame', 'Spy,TouchThrough');
    btnUi = app.CreateLayout('Card', 'FillXY')
    btnUi.SetCornerRadius(16)
    btnUi.SetElevation(0)
    btnUi.SetSize(-1, 56, 'dp')
    mainUi.AddChild(btnUi)
    

    if (icon === null) {
        btnText = app.AddText(btnUi, btnName, null, null, 'H/VCenter,AutoScale,NoWrap,FillXY')
        btnText.SetPadding(24, null, 24, null, 'dp')
    }
    
    if(theme==='light'){
        btnUi.SetBackColor(md_theme_light_primaryContainer);
        btnText.SetTextColor(md_theme_light_onPrimaryContainer);
    }
    else{
        btnUi.SetBackColor(md_theme_dark_primaryContainer);
        btnText.SetTextColor(md_theme_dark_onPrimaryContainer);
    }

    layout.AddChild(mainUi)

    mainUi.SetOnTouch = btnText.SetOnTouchUp

    return mainUi;

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
    return _radio;
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

function _drawCenterTopAppBar(title,rightIcon,leftIcon,layout,topBarNav){
    barUi = MUI.CreateLayout('Card','Top,Center');
    barUi.SetSize(1,0.085)
    barUi.SetCornerRadius(0)
    barUi.SetElevation(5)
    
    
    
    _leftIcon = app.CreateText(leftIcon,null,null,'Left,VCenter,FillXY,Wrap')
    _leftIcon.SetFontFile(defaultIcons)
    _leftIcon.SetTextSize(24)
    _leftIcon.SetOnTouchUp(function(){
        alert('Wl')})
    _leftIcon.SetMargins(16,null,24,null,'dp')
    barUi.AddChild(_leftIcon);
    
    
    _title = app.CreateText(title,null,null,'VCenter,FillXY,Wrap')
    _title.SetFontFile(defaultFont)
    _title.SetTextSize(26)
    barUi.AddChild(_title)
   
    
    _rightIcon = app.CreateText(rightIcon,null,null,'Right,VCenter,FillXY,Wrap')
    _rightIcon.SetFontFile(defaultIcons)
    _rightIcon.SetMargins(24,null,16,null,'dp')
    _rightIcon.SetTextSize(24)
    _rightIcon.SetOnTouchUp(function(){
        alert('W')})    
        barUi.AddChild(_rightIcon);   
    
 
    
    if(theme==='light'){
        barUi.SetBackColor(md_theme_light_surface)
        _title.SetTextColor(md_theme_light_onSurface)
        _leftIcon.SetTextColor(md_theme_light_onSurfaceVariant)
        _rightIcon.SetTextColor(md_theme_light_onSurfaceVariant)
    }
    else{
        barUi.SetBackColor(md_theme_dark_surface)
        _title.SetTextColor(md_theme_dark_onSurface)
        _leftIcon.SetTextColor(md_theme_dark_onSurfaceVariant)
        _rightIcon.SetTextColor(md_theme_dark_onSurfaceVariant)
    }
    layout.AddChild(barUi)
    
    
}
ui.addSnackBar = function(text, btnAction, width) {
    return new i_snackBar(text, btnAction, width);

}

function i_snackBar(text, btnAction, width) {
    this.showContainer = function() {
        drawSnackUi(text, btnAction, width, this.align, this.top, this.animateIn, this.animateOut, this.timeOut, this.callback);

    }
    this.setAlignment = function(align) {
        this.align = align;
    }
    this.setRawAlignment = function(top){
        this.top = top;
    }
    this.AnimateIn = function(animateIn) {
        this.animateIn = animateIn;
    }
    this.AnimateOut = function(animateOut) {
        this.animateOut = animateOut;
    }
    this.setTimeOut = function(timeOut) {
        this.timeOut = timeOut
    }
    this.setOnAction = function(callback) {
        this.callback = callback;
    }
    
}

function drawSnackUi(text, btnAction, width, align, top, animateIn, animateOut, timeOut, callback) {
    mainUi = app.CreateLayout('Linear', align + ',FillXY,TouchThrough,Center');
    mainUi.SetBackAlpha(256)
    snackUi = MUI.CreateLayout('Card', '');
    try {
        snackUi.Animate(animateIn)
    } catch (err) {
        snackUi.Animate('Fade-In');
    }
    mainUi.AddChild(snackUi)

    snackUi.SetMargins(0.055, 0.018, 0.055, 0.018)

    snackUi.SetCornerRadius(4);
    snackUi.SetElevation(6, '');
    snackUi.SetSize(width, 0.065);


    const box = MUI.CreateLayout("Linear", "Horizontal");
    box.SetSize(width, 0.065);
    snackUi.AddChild(box);
    snackText = app.CreateText(text, null, null, 'Multiline,AutoScale,VCenter');
    snackText.SetTextColor('black')
    snackText.SetMargins(0.055, 0.018, 0.055, 0.01)
    snackText.SetFontFile(defaultFont)
    snackText.SetTextSize(16)
    box.AddChild(snackText)

    snackButton = app.CreateText(btnAction, null, null, "VCenter,FillXY,AutoScale,Wrap,Right");
    snackButton.SetMargins(null, null, 16, null, 'dp');
    snackButton.SetTextSize(16)
    snackButton.SetFontFile(defaultFont)
    snackButton.SetOnTouchUp(callback)
    box.AddChild(snackButton)

    app.AddLayout(mainUi);
    
    if(theme === 'light'){
        box.SetBackColor(md_theme_light_inverseSurface)
        snackText.SetTextColor(md_theme_light_inverseOnSurface)
        snackButton.SetTextColor(md_theme_light_inversePrimary)
        
    }
    else{
        box.SetBackColor(md_theme_dark_inverseSurface);
        snackText.SetTextColor(md_theme_dark_inverseOnSurface)
        snackButton.SetTextColor(md_theme_dark_inversePrimary)
    }
        
    if (timeOut === undefined) {
        setTimeout(function() {
            try {
                snackUi.Animate(AnimateOut)
            } catch (err) {
                snackUi.Animate('Fade-Out');
            }
            app.DestroyLayout(mainUi);
        }, 3000)
    }
   else {
        setTimeout(function() {
            try {
                snackUi.Animate(AnimateOut)
            } catch (err) {
                snackUi.Animate('Fade-Out');
            }
            app.DestroyLayout(mainUi);
        }, timeOut)
    }
}

function hideBar(){
    app.DestroyLayout(mainUi)
}
ui.addDialog = function(title, text, dlgOptions, noAction, yesAction) {
    return new dlgBar(title, text, dlgOptions, noAction, yesAction);
}

function dlgBar(title, text, dlgOptions, noAction, yesAction) {
    this.setOnCancel = function(onCancel) {
        this.onCancel = onCancel;
    }
    this.setOnTrue = function(onTrue) {
        this.onTrue = onTrue;
    }
    this.setOnBack = function(onBack) {
        this.onBack = onBack
    }
    this.setOnFalse = function(onFalse) {
        this.onFalse = onFalse;
    }
    this.setDimensions = function(width, height) {
        this.width = width;
        this.height = height;
    }
    this.show = function() {

        showDialogBar(title, text, dlgOptions, noAction, yesAction, this.width, this.height, this.onCancel, this.onTrue, this.onFalse, this.onBack)
    }
}

function showDialogBar(title, text, dlgOptions, noAction, yesAction, width, height, onCancel, onTrue, onFalse, onBack) {

    dlgA = app.CreateDialog();
    dlgA.SetBackColor("#00000000");
    dlgA.SetOnCancel(onCancel)
    dlgA.SetOnBack(onBack)

    dlgUi = MUI.CreateLayout('Card')
    dlgA.AddLayout(dlgUi)

    dlgUi.SetBackColor(hexValueOfColorA200)
    dlgUi.SetElevation(0)
    dlgUi.SetSize(width, null)
    dlgUi.SetCornerRadius(28)

    const box = app.CreateLayout("Linear", "Left");
    box.SetSize(width, null)
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
    footer.SetSize(width, null);
    footer.SetPadding(24, null, 24, 24, "dp");

    noBtn = app.AddText(footer, noAction, null, null, 'Bold')
    noBtn.SetTextColor(hexValueOfColor700)
    noBtn.SetOnTouchUp(onFalse)
    noBtn.SetPadding(8, null, 8, null, "dp");

    yesBtn = app.AddText(footer, yesAction, null, null, 'Bold,VCenter')
    yesBtn.SetTextColor(hexValueOfColor700)
    yesBtn.SetOnTouchUp(onTrue)
    yesBtn.SetPadding(8, null, 8, null, "dp");

    this.dlgA.Show()
}
