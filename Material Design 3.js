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


var layInfo;

ui.addLayout = function(type,options){
   lay = app.CreateLayout(type, options)
    if (theme ==='dark') {
        lay.SetBackColor(md_theme_dark_surface);
        app.SetStatusBarColor(md_theme_dark_surface)
    } else {
        lay.SetBackColor(md_theme_light_surface);
    }
    layInfo = type;
    return lay;
}


ui.addSearch = function(width,hint,layout){
    return new searchObject(width,hint,layout)
}

function searchObject(width,hint,layout){
    this.leftIconFunc = null
    this.withAvatar = function(leftIcon,avatarIcon){
        
    }
    this.setOnTouch = function(icon,callBack){
        if(icon==='leftIcon'){
            this.leftIconFunc = callBack;
        }
        if(icon==='rightIcon'){
            this.rightIconFunc = callBack;
        }
    }
    this.withTrailingIcon = function(leftIcon,rightIcon){
        this.leftIcon = leftIcon;
        this.rightIcon = rightIcon
        drawSearchwithTrailingIcon(width,hint,layout,this.leftIcon,this.rightIcon,this)
    }
    this.with2TrailingIcons = function(leftIcon,rightIcon1,rightIcon2){
        
    }
    this.withAvaterTrailingIcon = function(leftIcon,rightIcon,avatarIcon){
        
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
function drawSearchwithTrailingIcon(width, hint, layout, leftIcon, rightIcon, onTouchEvent) {
    searchContainer = app.CreateLayout('Card')
    searchContainer.SetCornerRadius(36)
    searchContainer.SetElevation(2.0)
    searchContainer.SetSize(width, 0.08)
    layout.AddChild(searchContainer)
    
    const searchBox = app.AddLayout(searchContainer, "Linear", "Left,Horizontal,VCenter");
    searchBox.SetSize(width, 0.08)
    
    _leftIcon = app.AddText(searchBox,leftIcon, 0.065, 0.037, 'Left,VCenter')
    _leftIcon.SetFontFile(defaultIcons)
    _leftIcon.SetTextSize(24)
    _leftIcon.SetMargins(16, null, 16, null, 'dp')
    _leftIcon.SetOnTouchDown(function(){
        try{
            onTouchEvent.leftIconFunc();
        }
        catch(err){
            return null;
        }
        })
        
        
    _searchArea = app.AddTextEdit(searchBox, '', 0.5, null, 'SingleLine,Left')
    _searchArea.SetHint(hint)
    _searchArea.SetOnEnter(function(){
        onTouchEvent.onEnter();
        })
    
    
    _rightIcon = app.AddText(searchBox,rightIcon,0.065,0.037,'Right,VCenter')
    _rightIcon.SetTextSize(24)
    _rightIcon.SetFontFile(defaultIcons)
    _rightIcon.SetMargins(42,null,16,null,'dp')
    _rightIcon.SetOnTouchDown(function(){
        try{
        onTouchEvent.rightIconFunc();
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
ui.addFAB = function(icon, layout) {
    return new _Fab(icon, layout);
}

function drawFab(icon, layout, _FabInfo) {
    let fabContainer = app.CreateLayout('Linear', 'TouchThrough,Spy');
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


ui.addSmallFAB = function(icon, layout) {
    return new _smallFab(icon, layout);
}

function drawSmallFab(icon, layout, _FabInfo) {
    let smallFabContainer = app.CreateLayout('Linear', 'TouchThrough,Spy');
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

//Add OnTouch And SetMargin Methods 
 
// For now, all buttons are kept the same
ui.addFilledButton = function(btnName, width, height, icon, layout) {
    return new filledButtonObject(btnName, width, height, icon, layout);
}
function filledButtonObject(btnName, width, height, icon, layout){
    this.onTouch = null;
    this.onLongTouch = null;
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
            console.log('For Component onLongTouch Function Isnt Available');
        }
        })
    filledButtonContainer.SetOnTouch(function(){
        onTouchEvent.onTouch()
        })
}

ui.addElevatedButton = function(btnName, width, height, icon, layout) {
    let elevatedButtonContainer = app.CreateLayout('Frame', 'Spy,TouchThrough');
    elevatedButtonContainer.SetBackAlpha(0);
    
    let elevatedBtnUi = app.CreateLayout('Card', 'FillXY');
    elevatedBtnUi.SetCornerRadius(20);
    elevatedBtnUi.SetElevation(0);
    elevatedBtnUi.SetSize(width, height);
    elevatedButtonContainer.AddChild(elevatedBtnUi);
    elevatedBtnUi.SetBackColor(baseTheme);

    let elevatedBtnText = app.AddText(elevatedBtnUi, btnName, null, null, 'H/VCenter,AutoScale,NoWrap,FillXY');
    elevatedBtnText.SetTextColor('black');

    if (height === null) {
        elevatedBtnUi.SetSize(null, 40, 'dp');
    }

    layout.AddChild(elevatedButtonContainer);

    elevatedButtonContainer.SetOnTouch = elevatedBtnText.SetOnTouchUp;
    return elevatedButtonContainer;
}
ui.addExtendedFAB = function(btnName, icon, width, layout) {
    var btnText;

    let extendedFabContainer = app.CreateLayout('Frame', 'Spy,TouchThrough');
    let fabUi = app.CreateLayout('Card', 'FillXY');
    fabUi.SetCornerRadius(16);
    fabUi.SetElevation(0);
    fabUi.SetSize(-1, 56, 'dp');
    extendedFabContainer.AddChild(fabUi);

    if (icon === null) {
        btnText = app.AddText(fabUi, btnName, null, null, 'H/VCenter,AutoScale,NoWrap,FillXY');
        btnText.SetPadding(24, null, 24, null, 'dp');
    }

    if (theme === 'light') {
        fabUi.SetBackColor(md_theme_light_primaryContainer);
        btnText.SetTextColor(md_theme_light_onPrimaryContainer);
    } else {
        fabUi.SetBackColor(md_theme_dark_primaryContainer);
        btnText.SetTextColor(md_theme_dark_onPrimaryContainer);
    }

    layout.AddChild(extendedFabContainer);

    extendedFabContainer.SetOnTouch = btnText.SetOnTouchUp;

    return extendedFabContainer;
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
}ui.addSnackBar = function(text, btnAction, width) {
    return new SnackBarObject(text, btnAction, width);
}

function SnackBarObject(text, btnAction, width) {
    this.showContainer = function() {
        drawSnackBarUi(text, btnAction, width, this.align, this.top, this.animateIn, this.animateOut, this.timeOut, this.callback);
    }
    this.setAlignment = function(align) {
        this.align = align;
    }
    this.setRawAlignment = function(top){
        this.top = top;
    }
    this.setAnimateIn = function(animateIn) {
        this.animateIn = animateIn;
    }
    this.setAnimateOut = function(animateOut) {
        this.animateOut = animateOut;
    }
    this.setTimeOut = function(timeOut) {
        this.timeOut = timeOut
    }
    this.setOnAction = function(callback) {
        this.callback = callback;
    }
}

function drawSnackBarUi(text, btnAction, width, align, top, animateIn, animateOut, timeOut, callback) {
    let snackContainer = app.CreateLayout('Linear', align + ',FillXY,TouchThrough,Center');
    snackContainer.SetBackAlpha(256);
    let snackUi = MUI.CreateLayout('Card', '');
    try {
        snackUi.Animate(animateIn, null, timeout/10);
    } catch (err) {
        snackUi.Animate('Fade-In');
    }
    snackContainer.AddChild(snackUi);

    snackUi.SetMargins(0.055, 0.018, 0.055, 0.018);
    snackUi.SetCornerRadius(4);
    snackUi.SetElevation(6, '');
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
    snackButton.SetOnTouchUp(callback);
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
            app.DestroyLayout(snackContainer);
        }, 3000);
    } else {
        setTimeout(function() {
            try {
                snackUi.Animate(animateOut);
            } catch (err) {
                snackUi.Animate('Fade-Out');
            }
            app.DestroyLayout(snackContainer);
        }, timeOut);
    }
}

function hideSnackBar() {
    app.DestroyLayout(snackContainer);
}

ui.addMenu = function(list,menuType,position){
    return new menuObject(list,menuType,position)
}

function menuObject(list,menuType,position){
    this.showMenu = function(){
        if(menuType === 'simple') drawSimpleMenu(list,menuType,position);
    }
}

function drawSimpleMenu(list,menuType,position){
    _menu = app.CreateLayout('Linear','FillXY,Bottom');
    _menu.SetSize(1,1)
    _menu.SetOnTouchDown(function(){
        //alert('OnBack')
        })
        
    menuContainer = app.CreateLayout('Card',position+'');
    menuContainer.SetSize(0.52,-1)
    menuContainer.SetCornerRadius(4)
    
    _menuItems = app.AddList(menuContainer,list,null,null,'Menu,Bold')
    menuContainer.Show()
    
    _menu.AddChild(menuContainer)
    app.AddLayout(_menu);
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
