/* Material 3 For DroidScript
   This Project Is Licensed
   Under The MIT License.

   This Project Was Ported 
   By Oarabile Koore.
   The Following Contributers 
   Helped:
   - David Hurren
   - Symbrosom
   - Alan H
   - Hamac Jumar
   - captainstarbuck
*/

cfg.MUI 


const __debug = app.GetAppPath().endsWith('/Material3'); 
const _path = __debug ? '' : app.GetPrivateFolder('Plugins') + '/material3/' 



/* The following values will be used by other M3 Componets 
       To SetPositions and Accuratly Align Properly: 
       layoutInfo and layoutTopDistance 
*/ 

var theme,iconFill,m3ColorSystem; 
var layoutTopDistance,layoutInfo; 
var defaultIcons; 
var defaultFont = _path + 'uxFonts/Text/Roboto.ttf'; 


var pluginVersion = 'v0.79';
var isUpToDateText = `Material3 Plugin At The Latest Version: ${pluginVersion}`
let showUpdates = app.LoadBoolean('showUpdate?',true,'defaultM3Config')

app.HttpRequest('GET','https://api.github.com','/repos/oarabiledev/Material3/releases/latest',
null,handleUpdateReply);
    
function handleUpdateReply(error,reply){
    let info = JSON.parse(reply);
    const latestVersion = info.tag_name;
    
    if(latestVersion !== pluginVersion){
        
        if(app.InIDE() === true && showUpdates === true){
            console.log("<div style='color:yellow'> " + `An update is available :: Version ${latestVersion} \n 
            Update Link:: https://github.com/oarabiledev/Material3/releases/tag/${latestVersion}`);
        
            updateDialog = ui.showDialog('Update Warning !',`This Version Of Material3 is not upto-date.\nLatest Version Is :: ${latestVersion}`,null, 'Ignore', 'Update');
            updateDialog.setOnAction((boolAnswer)=>{
                if(boolAnswer){
                    app.OpenUrl(`https://github.com/oarabiledev/Material3/releases/tag/${latestVersion}`)
                }
                else{
                    app.SaveBoolean('showUpdate?',false,'defaultM3Config')
                }
            });
        }
    }
}

//Formulars For Dp & Px Conversion

const dpToPxConversion = function (dpValue){
    // Using The Formular 
    //Pixel = DP * (DPI/160)
    return dpValue * (app.GetScreenDensity()/160);
}

const pxToDpConversion = function (pxValue){
    //Using The Formular
    //Dp = Pixel / (DPI/160)
    return pxValue / (app.GetScreenDensity()/160)
}


//Create The Ui Object

const ui = {};

ui.InitializeUIKit = function(defaultTheme,defaultIconFill,defaultThemeDir){
    theme = defaultTheme; 
    iconFill = defaultIconFill; 
    
    /* To Make Things Easy We Will Take 'default' or dflt 
    Which will reference the location uxDesign/appTheme.json 
    As The Path Were The m3ColorSystem JSON File 'appTheme'is 
    located 🫠  
    */ 
    
    if(defaultThemeDir === 'default' || defaultThemeDir === 'dflt'){ 
        m3ColorSystem = 'uxDesign/appTheme.json'; 
    } 
    
    if(!app.FileExists(defaultThemeDir) || !defaultThemeDir || defaultThemeDir === undefined){
        m3ColorSystem = _path + 'uxFonts/defaultTheme.json';
    }
    
    else{ 
        m3ColorSystem = defaultThemeDir; 
    } 
    
    
    // Variable Location For Icon Fills 
    
    switch(iconFill){ 
        case 'outline': 
            defaultIcons = _path + 'uxFonts/Icons/Outlined-Regular.otf'; 
            break; 
        case 'sharp': 
            defaultIcons = _path + 'uxFonts/Icons/Sharp-Regular.otf'; 
            break; 
        case 'two-tone': 
            defaultIcons = _path + 'uxFonts/Icons/TwoTone-Regular.otf'; 
            break; 
        case 'round': 
            defaultIcons = _path + 'uxFonts/Icons/Round-Regular.otf' 
    } 
    
    if(m3ColorSystem) setM3BaseColors(m3ColorSystem);
    
}


//Configure UI Model And First Run Model
var isThisAppFirstRun = app.LoadBoolean('isFirstRun?', true, 'defaultM3Config');

app.CreateMaterial3 = function(defaultTheme,defaultIconFill,defaultThemeDir){
    ui.InitializeUIKit(defaultTheme,defaultIconFill,defaultThemeDir);
    
    if (isThisAppFirstRun){
        app.SaveBoolean('isFirstRun?', false, 'defaultM3Config');
    }
}

ui.getVersion = function() { 
    return `Material3 Plugin Version :: ${pluginVersion}`
}; 

ui.isFirstStart = function() {
    return isThisAppFirstRun;
}

/*Provide An Easier Way To Clear Material Color Data
  And FirstStartData.
*/

ui.clearConfiguration = function(){
    app.ClearData('defaultM3Config');
}

ui.addLayout = function(type, options, width, height, parentLay) { 
    const lay = app.CreateLayout(type, options); 
    if (theme === 'dark') { 
        lay.SetBackColor(md_theme_dark_background); 
        
    } else { 
        lay.SetBackColor(md_theme_light_background); 
    } 
    layoutInfo = type; 
    layoutTopDistance = lay.GetTop(); 
    return lay; 
}; 

// m3 Buttons  
ui.addFilledButton = function(btnName, width, height, icon, parentLay) { 
    return new filledButtonObject(btnName, width, height, icon, parentLay); 
}; 

ui.addElevatedButton = function(btnName, width, height, icon, parentLay) { 
    return new elevatedButtonObject(btnName, width, height, icon, parentLay); 
}; 

ui.addFilledTonalButton = function(btnName, width, height, icon, parentLay) { 
    return new filledTonalButtonObject(btnName, width, height, icon, parentLay); 
}; 

ui.addOutlinedButton = function(btnName, width, height, icon, parentLay) { 
    return new outlinedButtonObject(btnName, width, height, icon, parentLay); 
}; 

ui.addTextButton = function(btnName, width, height, icon, parentLay) { 
    return new textButtonObject(btnName, width, height, icon, parentLay); 
}; 

ui.addExtendedFAB = function(btnName, icon, width, parentLay) { 
    return new extendedFABObject(btnName, icon, width, parentLay); 
}; 


ui.addFAB = function(icon, layout) { 
    return new fabObject(icon, layout); 
}; 

ui.addSmallFAB = function(icon, layout) { 
    return new smallFABObject(icon, layout); 
}; 

ui.addLargeFAB = function(icon, layout) { 
    return new largeFABObject(icon, layout); 
}; 

ui.addRadioButtons = function(list,width,height,layout) { 
    return new radioListObject(list,width,height,layout); 
};

// m3 Switches 
ui.addSwitch = function(switchType,value,parent_Layout) { 
    return new switchObject(switchType,value,parent_Layout); 
}; 

// m3 Progress & Seekbars
ui.addProgressBar = function(progressType, width, layout) { 
    return new progressObject(progressType, width, layout); 
}; 


ui.addSeekBar = function(value,range,width,layout) { 
    return new seekBarObject(value,range,width,layout); 
}; 

ui.addSlider = function(value, range, width, layout){
    return new sliderObject(value, range, width, layout);
}

// m3 Dialogs And SnackBars
ui.showDialog = function(title, text, dlgOptions, noAction, yesAction) { 
    return new dlgBarObject(title, text, dlgOptions, noAction, yesAction); 
}; 


ui.addSnackBar = function(text, btnAction, width, alignment) { 
    return new SnackBarObject(text, btnAction, width, alignment); 
}; 



// m3 Navigation 
ui.addMenu = function(menuType,list,position) { 
    return new menuObj(menuType,list,position); 
}; 

ui.addBottomAppBar = function(barPropsInjson,parentLayout) { 
    return new bottomBarObject(barPropsInjson,parentLayout); 
}; 

ui.addDrawer = function(drawerLayout,side,width) { 
    return new navDrawerObject(drawerLayout,side,width); 
}; 

ui.addSeekBar = function(value,range,width,layout) { 
    return new seekBarObject(value,range,width,layout); 
}; 

ui.addSlideSheet = function(sheetLayout, width, options) { 
    return new slideSheetObject(sheetLayout, width, options); 
}; 

ui.addBottomSheet = function(sheetLayout, height, options) { 
    return new bottomSheetObject(sheetLayout, height, options); 
}; 


ui.addTextField = function(type, width, height, hint, options, labeled, parentLay){
    return new textFieldObject(type, width, height, hint, options, labeled, parentLay);
}

ui.addChip = function(type, text, icon, width, height, parentLay){
    return new chipObject(type, text, icon, width, height, parentLay);
}

ui.addAppBar = function(title, leadingIcon, controlIcons, parentLay){
    return new appBarObject(title, leadingIcon, controlIcons, parentLay);
}

//This Function Basically Returns The Appropraite Color For The Correct Theme 

const stateColor = (lightColor,darkColor) => { 
    if(theme === 'light') return lightColor; 
    else return darkColor; 
}; 

const backgroundColor = () => { 
    if(theme === 'light') return md_theme_light_background; 
    else return md_theme_dark_background; 
}; 


    
function setM3BaseColors(colorDir) { 
    
    appTheme = app.ReadFile(colorDir); 
    jsonData = JSON.parse(appTheme) 
    // Function to get the text value based on the color name 
    const getColorTextValue = (jsonData, colorName) => { 
        const colorObject = jsonData.resources.color.find(color => color._name === colorName); 
        return colorObject ? colorObject.__text : null; 
    }; 
    
    // Get the text value for "md_theme_dark_scrim" 
    seed = getColorTextValue(jsonData, "seed"); 
    md_theme_light_primary = getColorTextValue(jsonData, "md_theme_light_primary") 
    md_theme_light_onPrimary = getColorTextValue(jsonData, "md_theme_light_onPrimary"); 
    md_theme_light_primaryContainer = getColorTextValue(jsonData, "md_theme_light_primaryContainer"); 
    md_theme_light_onPrimaryContainer = getColorTextValue(jsonData, "md_theme_light_onPrimaryContainer"); 
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



function appBarObject(title, leadingIcon, controlIcons, parentLay){
    
    this.setOnTouch = function(onTouch){
        this.onTouch = onTouch
    }
    
    
    drawAppBar(title, leadingIcon, controlIcons, parentLay, this)
}



function drawAppBar(title, leadingIcon, controlIcons, parentLay, appBarObj){
    barCardLay = app.AddLayout(parentLay, "Card");
    barCardLay.SetSize(DW(),dpToPxConversion(64), 'px');
    
    barCardLay.SetBackColor(stateColor(md_theme_light_surface,md_theme_dark_surface))
    barCardLay.SetMargins(0, 0)
    
    
    barUi = app.CreateLayout('Linear','Horizontal,Left');
    barCardLay.AddChild(barUi);
    
    _leftIcon = app.AddText(barUi, leadingIcon, null, null,'Left');
    _leftIcon.SetMargins(48,24,pxToDpConversion(DW())-190 ,null,'px')
    _leftIcon.SetPadding(12,12,null,null,'dp')
    _leftIcon.SetTextSize(24,'dp')
    _leftIcon.SetSize(48,48,'dp')
    _leftIcon.SetFontFile(defaultIcons)
    _leftIcon.SetTextColor(stateColor(md_theme_light_onSurface,md_theme_dark_onSurface))
    _leftIcon.SetOnTouchDown(function(){
        if(appBarObj.onTouch){
            appBarObj.onTouch(leadingIcon)
            }
        })
    
    _title = app.AddText(barUi, title, -1, -1,'Center,Wrap');
    _title.SetMargins(null,24,null,24,'px')
    _title.SetTextSize(28,'dp');
    _title.SetTextColor(stateColor(md_theme_light_onSurface,md_theme_dark_onSurface))
    
    
    
    _rightIcon = app.AddText(barUi,controlIcons, null, null,'Left')
    _rightIcon.SetMargins(pxToDpConversion(DW())-190,24,30,null,'px')
    _rightIcon.SetPadding(12,12,null,null,'dp')
    _rightIcon.SetSize(48,48,'dp')
    _rightIcon.SetTextSize(24,'dp');
    _rightIcon.SetFontFile(defaultIcons)
    _rightIcon.SetTextColor(stateColor(md_theme_light_onSurface,md_theme_dark_onSurface))
    _rightIcon.SetOnTouchDown(function(){
        if(appBarObj.onTouch){
            appBarObj.onTouch(controlIcons)
            }
        })
    
}



var sliderElem;
function sliderObject(value, range , width, layout){
    this.getValue = function(){
        
    }
    
    this.setValue = function(value){
        
    }
    
    drawSlider(value, range, width, layout)
}

function drawSlider(value, range , width, layout){
    sliderElem = app.AddImage(layout, null, width, 0.1);
    //sliderElem.SetMargins( 16,16,16,16,"px")
    sliderElem.SetOnTouchMove((ev)=>{
        drawSliderShading(ev.x[0]);
    })
    sliderElem.SetAutoUpdate( false )
    drawSliderShading(0);
}

function drawSliderShading(x){

    sliderElem.Clear()
    sliderElem.SetLineWidth( 8 ) 
    sliderElem.SetPaintColor(stateColor(md_theme_light_primaryContainer,md_theme_dark_primaryContainer))
    sliderElem.DrawLine( x,0.5 ,1 ,0.5 ) 
    sliderElem.SetPaintColor(stateColor(md_theme_light_primary,md_theme_dark_primary))
    sliderElem.DrawLine( 0,0.5 ,x ,0.5 ) 
    sliderElem.SetPaintColor(stateColor(md_theme_light_primary,md_theme_dark_primary))
    sliderElem.DrawLine( x,0.25 ,x ,0.75 ) 
    sliderElem.Update()
}

var chipElem;

function chipObject(type, text, icon, width, height, parentLay){
    drawChip(type, text, icon, width, height, parentLay)
}


function drawChip(type, text, icon, width, height, parentLay){
    if(type.toLowerCase() === 'assist'){
        chipElem = app.AddButton(parentLay, text, width, height, 'Custom,FontAwesome' );
        chipElem.SetFontFile(defaultFont)
        chipElem.SetTextColor(stateColor(md_theme_light_onSurface,md_theme_dark_onSurface));
        chipElem.SetText(text)
        chipElem.SetStyle(clrOutlined(), clrOutlined(), 8, stateColor(md_theme_light_outline,md_theme_dark_outline), 1, 0.1); 
    }
    else if(type.toLowerCase() === 'filter'){
        chipElem = app.AddButton(parentLay, text, width, height, 'Custom,FontAwesome');
        chipElem.SetFontFile(defaultFont)
        chipElem.SetTextColor(stateColor(md_theme_light_onSurface,md_theme_dark_onSurface));
        chipElem.SetText(text)
        chipElem.SetStyle(clrOutlined(), clrOutlined(), 8, stateColor(md_theme_light_outline,md_theme_dark_outline), 1, 0.1); 
        
        chipElem.SetOnTouch(()=>{
            chipElem.SetText(`[fa-check]`+' '+text)
            chipElem.SetStyle(stateColor(md_theme_light_onSurfaceVariant,md_theme_dark_onSurfaceVariant), stateColor(md_theme_light_onSurfaceVariant,md_theme_dark_onSurfaceVariant), 8, stateColor(md_theme_light_outline,md_theme_dark_outline), 1, 0.1); 
        });
    }
}


var textEdit;
function textFieldObject(type, width, height, hint, options, labeled, parentLay){
    this.setOnEnter = function(onEnter){
        textEdit.SetOnEnter(onEnter)
    }
    drawTextField(type, width, height, hint, options, labeled, parentLay)
}

function drawTextField(type, width, height, hint, options, labeled, parentLay){
    if (type.toLowerCase() === 'texteditfilled' || type.toLowerCase() === 'tef'){
        
        textEdit = MUI.CreateTextEditFilled(width, options, hint , labeled, stateColor(md_theme_light_primary,md_theme_dark_primary));
        parentLay.AddChild(textEdit);
        
    }
    else if (type.toLowerCase() === 'texteditfilledactive' || type.toLowerCase() === 'tefa'){
        
        textEdit = MUI.CreateTextEditFilledA(width, options, hint , labeled, stateColor(md_theme_light_primary,md_theme_dark_primary));
        parentLay.AddChild(textEdit);
        
    }
    else if (type.toLowerCase() === 'texteditoutline' || type.toLowerCase() === 'teo'){
        
        textEdit = MUI.CreateTextEditOutline(width, options, hint , labeled, stateColor(md_theme_light_primary,md_theme_dark_primary));
        parentLay.AddChild(textEdit);
        
    }
    else if (type.toLowerCase() === 'texteditoutlineactive' || type.toLowerCase() === 'teoa'){
        
        textEdit = MUI.CreateTextEditOutlineA(width, options, hint , labeled, stateColor(md_theme_light_primary,md_theme_dark_primary),stateColor(md_theme_light_primary,md_theme_dark_primary));
        parentLay.AddChild(textEdit);
        
    }
}
var filledButton;

function filledButtonObject(btnName, width, height, icon, parentLay) {
    // Button Methods :::
    this.onTouch = null;
    this.animate = function (type, callback, time) {
        filledButton.Animate(type, callback, time);
    }
    this.setScale = function (x, y) {
        filledButton.SetScale(x, y);
    }
    this.setVisibility = function (mode) {
        filledButton.SetVisibility(mode);
    }
    this.setEnabled = function (enableBool) {
        filledButton.SetEnabled(enableBool);
    }
    this.setEllipsize = function (mode) {
        filledButton.SetEllipsize(mode);
    }
    this.setDescription = function (desc) {
        filledButton.SetDescription(desc);
    }
    this.setHtml = function (str) {
        filledButton.SetHtml(str);
    }
    this.setText = function (text) {
        filledButton.SetText(text);
    }
    this.setTextSize = function (size, mode) {
        filledButton.SetTextSize(size, mode);
    }
    this.setMargins = function (left, top, right, bottom, mode) {
        filledButton.SetMargins(left, top, right, bottom, mode);
    }
    this.setPadding = function (left, top, right, bottom, mode) {
        filledButton.SetPadding(left, top, right, bottom, mode);
    }
    this.setOnTouch = function (onTouch) {
        this.onTouch = onTouch;
    }
    this.setOnLongTouch = function (onLongTouch) {
        this.onLongTouch = onLongTouch;
    }
    this.tween = function (target, duration, type, repeat, yoyo, callback) {
        filledButton.Tween(target, duration, type, repeat, yoyo, callback);
    }
    this.focus = function () {
        filledButton.Focus();
    }
    this.gone = function () {
        filledButton.Gone();
    }
    this.show = function () {
        filledButton.Show();
    }
    this.hide = function () {
        filledButton.Hide();
    }
    
    drawFilledButton(btnName, width, height, icon, parentLay, this)
}

function drawFilledButton(btnName, width, height, icon, parentLay, filledObj) {
    filledButton = app.AddButton(parentLay, null, width, height, 'Custom,FontAwesome');
    
    filledButton.SetTextColor(stateColor(md_theme_light_onPrimary, md_theme_dark_onPrimary))
    filledButton.SetStyle(stateColor(md_theme_light_primary,md_theme_dark_primary),stateColor(md_theme_light_primary,md_theme_dark_primary), 20, null, null, 0)
    filledButton.SetFontFile(defaultFont);
    filledButton.SetText(`[fa-${icon}]`+' '+btnName)
    filledButton.SetOnTouch(() => {
        if (filledObj.onTouch) {
            //Added To Allow Menus To Position Correct
            filledObj.onTouch(filledButton.GetTop());

        }
    });
    
    filledButton.SetOnLongTouch(() => {
        if (filledObj.onTouch) {
            filledObj.onLongTouch();
            //Added To Allow Menus To Position Correct
            top = filledButton.GetTop(); 
        }
    });
    
    
}


var elevatedButton;


function elevatedButtonObject(btnName, width, height, icon, parentLay) {
    // Button Methods :::
    this.onTouch = null;
    this.animate = function (type, callback, time) {
        elevatedButton.Animate(type, callback, time);
    }
    this.setScale = function (x, y) {
        elevatedButton.SetScale(x, y);
    }
    this.setVisibility = function (mode) {
        elevatedButton.SetVisibility(mode);
    }
    this.setEnabled = function (enableBool) {
        elevatedButton.SetEnabled(enableBool);
    }
    this.setEllipsize = function (mode) {
        elevatedButton.SetEllipsize(mode);
    }
    this.setDescription = function (desc) {
        elevatedButton.SetDescription(desc);
    }
    this.setHtml = function (str) {
        elevatedButton.SetHtml(str);
    }
    this.setText = function (text) {
        elevatedButton.SetText(text);
    }
    this.setTextSize = function (size, mode) {
        elevatedButton.SetTextSize(size, mode);
    }
    this.setMargins = function (left, top, right, bottom, mode) {
        elevatedButton.SetMargins(left, top, right, bottom, mode);
    }
    this.setPadding = function (left, top, right, bottom, mode) {
        elevatedButton.SetPadding(left, top, right, bottom, mode);
    }
    this.setOnTouch = function (onTouch) {
        this.onTouch = onTouch;
    }
    this.setOnLongTouch = function (onLongTouch) {
        this.onLongTouch = onLongTouch;
    }
    this.tween = function (target, duration, type, repeat, yoyo, callback) {
        elevatedButton.Tween(target, duration, type, repeat, yoyo, callback);
    }
    this.focus = function () {
        elevatedButton.Focus();
    }
    this.gone = function () {
        elevatedButton.Gone();
    }
    this.show = function () {
        elevatedButton.Show();
    }
    this.hide = function () {
        elevatedButton.Hide();
    }
    
    //Call It 
    drawElevatedBtn(btnName, width, height, icon, parentLay, this)
}


function drawElevatedBtn(btnName, width, height, icon, parentLay, elevatedObj) {
    elevatedButton = app.AddButton(parentLay, null, width, height, 'Custom,FontAwesome');
    elevatedButton.SetTextColor(stateColor(md_theme_light_primary,md_theme_dark_primary));
    elevatedButton.SetFontFile(defaultFont)
    elevatedButton.SetText(`[fa-${icon}]`+' '+btnName)
    elevatedButton.SetStyle(clr1(), clr1(), 20, null, null, 0.1);
    
    elevatedButton.SetOnTouch(() => {
        if (elevatedObj.onTouch) {
            elevatedObj.onTouch()
        }
    });
    
    elevatedButton.SetOnLongTouch(() => {
        if (elevatedObj.onLongTouch) {
            elevatedObj.onLongTouch();
        }
    });
}

function clr1() {
    return stateColor(md_theme_light_secondaryContainer, md_theme_dark_secondaryContainer);
}



var filledTonalButton;


function filledTonalButtonObject(btnName, width, height, icon, parentLay) {
    // Button Methods :::
    this.onTouch = null;
    this.animate = function (type, callback, time) {
        filledTonalButton.Animate(type, callback, time);
    }
    this.setScale = function (x, y) {
        filledTonalButton.SetScale(x, y);
    }
    this.setVisibility = function (mode) {
        filledTonalButton.SetVisibility(mode);
    }
    this.setEnabled = function (enableBool) {
        filledTonalButton.SetEnabled(enableBool);
    }
    this.setEllipsize = function (mode) {
        filledTonalButton.SetEllipsize(mode);
    }
    this.setDescription = function (desc) {
        filledTonalButton.SetDescription(desc);
    }
    this.setHtml = function (str) {
        filledTonalButton.SetHtml(str);
    }
    this.setText = function (text) {
        filledTonalButton.SetText(text);
    }
    this.setTextSize = function (size, mode) {
        filledTonalButton.SetTextSize(size, mode);
    }
    this.setMargins = function (left, top, right, bottom, mode) {
        filledTonalButton.SetMargins(left, top, right, bottom, mode);
    }
    this.setPadding = function (left, top, right, bottom, mode) {
        filledTonalButton.SetPadding(left, top, right, bottom, mode);
    }
    this.setOnTouch = function (onTouch) {
        this.onTouch = onTouch;
    }
    this.setOnLongTouch = function (onLongTouch) {
        this.onLongTouch = onLongTouch;
    }
    this.tween = function (target, duration, type, repeat, yoyo, callback) {
        filledTonalButton.Tween(target, duration, type, repeat, yoyo, callback);
    }
    this.focus = function () {
        filledTonalButton.Focus();
    }
    this.gone = function () {
        filledTonalButton.Gone();
    }
    this.show = function () {
        filledTonalButton.Show();
    }
    this.hide = function () {
        filledTonalButton.Hide();
    }
    
    //Call It
    
    drawFilledTonalBtn(btnName, width, height, icon, parentLay, this)
}

function drawFilledTonalBtn(btnName, width, height, icon, parentLay, filledObj) {
    filledTonalButton = app.AddButton(parentLay, btnName, width, height, 'Custom,FontAwesome');
    filledTonalButton.SetFontFile(defaultFont)
    filledTonalButton.SetTextColor(stateColor(md_theme_light_onSecondaryContainer, md_theme_dark_onSecondaryContainer));
    
    filledTonalButton.SetStyle(stateColor(md_theme_light_primaryContainer,md_theme_dark_primaryContainer), stateColor(md_theme_light_primaryContainer,md_theme_dark_primaryContainer), 20, null, null, 0);
    
    filledTonalButton.SetOnTouch(() => {
        if (filledObj.onTouch) {
            filledObj.onTouch()
        }
    });
    
    filledTonalButton.SetOnTouch(() => {
        if (filledObj.onLongTouch) {
            filledObj.onLongTouch();
        }
    });
}

var outlinedButton;

function outlinedButtonObject(btnName, width, height, icon, parentLay) {
    // Button Methods :::
    
    this.animate = function (type, callback, time) {
        outlinedButton.Animate(type, callback, time);
    }
    this.setScale = function (x, y) {
        outlinedButton.SetScale(x, y);
    }
    this.setVisibility = function (mode) {
        outlinedButton.SetVisibility(mode);
    }
    this.setEnabled = function (enableBool) {
        outlinedButton.SetEnabled(enableBool);
    }
    this.setEllipsize = function (mode) {
        outlinedButton.SetEllipsize(mode);
    }
    this.setDescription = function (desc) {
        outlinedButton.SetDescription(desc);
    }
    this.setHtml = function (str) {
        outlinedButton.SetHtml(str);
    }
    this.setText = function (text) {
        outlinedButton.SetText(text);
    }
    this.setTextSize = function (size, mode) {
        outlinedButton.SetTextSize(size, mode);
    }
    this.setMargins = function (left, top, right, bottom, mode) {
        outlinedButton.SetMargins(left, top, right, bottom, mode);
    }
    this.setPadding = function (left, top, right, bottom, mode) {
        outlinedButton.SetPadding(left, top, right, bottom, mode);
    }
    this.setOnTouch = function (onTouch) {
        this.onTouch = onTouch;
    }
    this.setOnLongTouch = function (onLongTouch) {
        this.onLongTouch = onLongTouch;
    }
    this.tween = function (target, duration, type, repeat, yoyo, callback) {
        outlinedButton.Tween(target, duration, type, repeat, yoyo, callback);
    }
    this.focus = function () {
        outlinedButton.Focus();
    }
    this.gone = function () {
        outlinedButton.Gone();
    }
    this.show = function () {
        outlinedButton.Show();
    }
    this.hide = function () {
        outlinedButton.Hide();
    }
    
    //Call It 
    drawOutlinedBtn(btnName, width, height, icon, parentLay, this);
}

function drawOutlinedBtn(btnName, width, height, icon, parentLay, outlineObj) {
    outlinedButton = app.AddButton(parentLay, null, width, height, 'Custom,FontAwesome');
    outlinedButton.SetFontFile(defaultFont)
    outlinedButton.SetTextColor(stateColor(md_theme_light_primary, md_theme_dark_primary));
    outlinedButton.SetText(`[fa-${icon}]`+' '+btnName)
    outlinedButton.SetStyle(clrOutlined(), clrOutlined(), 20,strokeClrOutlined(), 1, 0.1);
    
    outlinedButton.SetOnTouch(() => {
        if (outlineObj.onTouch) {
            outlineObj.onTouch()
        }
    });
    
    outlinedButton.SetOnLongTouch(() => {
        if (outlineObj.onLongTouch) {
            outlineObj.onLongTouch();
        }
    });
    
}

function clrOutlined() {
    return stateColor(md_theme_light_surface, md_theme_dark_surface);
}

function strokeClrOutlined() {
    return stateColor(md_theme_light_outline, md_theme_dark_outline);
}


var textButton;


function textButtonObject(btnName, width, height, icon, parentLay) {
    // Button Methods :::
    
    this.animate = function (type, callback, time) {
        textButton.Animate(type, callback, time);
    }
    this.setScale = function (x, y) {
        textButton.SetScale(x, y);
    }
    this.setVisibility = function (mode) {
        textButton.SetVisibility(mode);
    }
    this.setEnabled = function (enableBool) {
        textButton.SetEnabled(enableBool);
    }
    this.setEllipsize = function (mode) {
        textButton.SetEllipsize(mode);
    }
    this.setDescription = function (desc) {
        textButton.SetDescription(desc);
    }
    this.setHtml = function (str) {
        textButton.SetHtml(str);
    }
    this.setText = function (text) {
        textButton.SetText(text);
    }
    this.setTextSize = function (size, mode) {
        textButton.SetTextSize(size, mode);
    }
    this.setMargins = function (left, top, right, bottom, mode) {
        textButton.SetMargins(left, top, right, bottom, mode);
    }
    this.setPadding = function (left, top, right, bottom, mode) {
        textButton.SetPadding(left, top, right, bottom, mode);
    }
    this.setOnTouch = function (onTouch) {
        this.onTouch = onTouch;
    }
    this.setOnLongTouch = function (onLongTouch) {
        this.onLongTouch = onLongTouch;
    }
    this.tween = function (target, duration, type, repeat, yoyo, callback) {
        textButton.Tween(target, duration, type, repeat, yoyo, callback);
    }
    this.focus = function () {
        textButton.Focus();
    }
    this.gone = function () {
        textButton.Gone();
    }
    this.show = function () {
        textButton.Show();
    }
    this.hide = function () {
        textButton.Hide();
    }
    // Call It
    drawTextBtn(btnName, width, height, icon, parentLay, this);
    
}

function drawTextBtn(btnName, width, height, icon, parentLay, textBtnObj) {
    textButton = app.AddButton(parentLay, null, width, height, 'Custom,FontAwesome');
    textButton.SetFontFile(defaultFont)
    textButton.SetTextColor(stateColor(md_theme_light_primary, md_theme_dark_primary));
    textButton.SetText(`[fa-${icon}]`+' '+btnName)
    textButton.SetStyle(backgroundColor(), backgroundColor(), 20, null, null, 0);
    
    textButton.SetOnTouch(() => {
        if (textBtnObj.onTouch) {
            textBtnObj.onTouch()
        }
    });
    
    textButton.SetOnLongTouch(() => {
        if (textBtnObj.onLongTouch) {
            textBtnObj.onLongTouch();
        }
    });
}



var fabContainer;

function fabObject(icon, parentLay) {
    this.setOnTouch = null;
    
    this.setOnTouch = function (onTouch) {
        this.onTouch = onTouch;
    }
    
    this.setMargins = function (left, top, right, bottom, mode) {
        fabContainer.SetMargins(left, top, right, bottom, mode);
    }
    
    this.setPosition = function (left, top, width, height, options) {
        fabContainer.SetPosition(left, top, width, height, options);
    }
    
    
    drawFAB(icon, parentLay, this);
}

function drawFAB(icon, parentLay, fabObj) {
    
    fabContainer = app.CreateLayout('Linear', 'TouchThrough,Spy');
    fabContainer.SetSize(56, 56, 'dp');
    
    
    const fab = app.CreateLayout('Card', 'Right,Bottom,FillXY');
    fab.SetSize(56, 56, 'dp');
    fab.SetElevation(0);
    fab.SetCornerRadius(16);
    
    const _fabIcon = app.CreateText(icon, null, null, 'H/VCenter,FillXY');
    _fabIcon.SetFontFile(defaultIcons);
    _fabIcon.SetOnTouchDown(function () {
        fabObj.onTouch();
    });
    
    _fabIcon.SetTextSize(24);
    fab.AddChild(_fabIcon);
    fabContainer.AddChild(fab);
    
    parentLay.AddChild(fabContainer);
    
    fab.SetBackColor(stateColor(md_theme_light_primaryContainer, md_theme_dark_primaryContainer));
    _fabIcon.SetTextColor(stateColor(md_theme_light_onPrimaryContainer, md_theme_dark_onPrimaryContainer));
}


var smallFabContainer;


function smallFABObject(icon, parentLay) {
    this.setOnTouch = null;
    
    this.setOnTouch = function (onTouch) {
        this.onTouch = onTouch;
    }
    
    this.setMargins = function (left, top, right, bottom, mode) {
        smallFabContainer.SetMargins(left, top, right, bottom, mode);
    }
    
    this.setPosition = function (left, top, width, height, options) {
        smallFabContainer.SetPosition(left, top, width, height, options);
    }
    
    drawSmallFab(icon, parentLay, this);
}

function drawSmallFab(icon, parentLay, fabObj) {
    smallFabContainer = app.CreateLayout('Linear', 'TouchThrough,Spy');
    smallFabContainer.SetSize(40, 40, 'dp');

    
    const fab = app.CreateLayout('Card', 'Right,Bottom,FillXY');
    fab.SetSize(40, 40, 'dp');
    fab.SetElevation(0);
    fab.SetCornerRadius(12);
    
    const _fabIcon = app.CreateText(icon, null, null, 'H/VCenter,FillXY');
    _fabIcon.SetFontFile(defaultIcons);
    
    _fabIcon.SetOnTouchDown(function (){
        if(fabObj.onTouch){
            fabObj.onTouch()
        }
    })
    
    _fabIcon.SetTextSize(18);
    fab.AddChild(_fabIcon);
    smallFabContainer.AddChild(fab);
    
    fab.SetBackColor(stateColor(md_theme_light_primaryContainer, md_theme_dark_primaryContainer));
    _fabIcon.SetTextColor(stateColor(md_theme_light_onPrimaryContainer, md_theme_dark_onPrimaryContainer));
    
    parentLay.AddChild(smallFabContainer);
    
}


var largeFabContainer;

function largeFABObject(icon, parentLay) {
    this.setOnTouch = null;
    
    this.setOnTouch = function (onTouch) {
        this.onTouch = onTouch;
    }
    
    this.setMargins = function (left, top, right, bottom, mode) {
        largeFabContainer.SetMargins(left, top, right, bottom, mode);
    }
    
    this.setPosition = function (left, top, width, height, options) {
        largeFabContainer.SetPosition(left, top, width, height, options);
    }
    
    drawLargeFab(icon, parentLay, this)
}

function drawLargeFab(icon, parentLay, largefabOBj) {
    largeFabContainer = app.CreateLayout('Linear', 'TouchThrough,Spy');
    largeFabContainer.SetSize(96, 96, 'dp');
    
    
    const fab = app.CreateLayout('Card', 'Right,Bottom,FillXY');
    fab.SetSize(96, 96, 'dp');
    fab.SetElevation(0);
    fab.SetCornerRadius(28);
    
    const _fabIcon = app.CreateText(icon, null, null, 'H/VCenter,FillXY');
    _fabIcon.SetFontFile(defaultIcons);
    _fabIcon.SetOnTouchDown(function () {
        largefabOBj.onTouch();
    });
    
    _fabIcon.SetTextSize(36);
    fab.AddChild(_fabIcon);
    largeFabContainer.AddChild(fab);
    
    
    fab.SetBackColor(stateColor(md_theme_light_primaryContainer, md_theme_dark_primaryContainer));
    _fabIcon.SetTextColor(stateColor(md_theme_light_onPrimaryContainer, md_theme_dark_onPrimaryContainer))
    
    parentLay.AddChild(largeFabContainer);
    
}

function switchObject(switchType,value,parent_Layout){
    this.getValue = function(){
        return switchValue;
    }
    this.setOnToggle = function(onToggle){
        this.onToggle = onToggle;
    }
    this.setPosition = function( left, top, width, height, options){
        _switch.SetPosition( left, top, width, height, options)
    }
    /*
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
    */
    
    //Temporary !
    drawSwitchNoIcon(value,parent_Layout,this);
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

//Variable Is made global so that clearInterval with method
//stopProgress works, to avoid an not defined error.
var animation, progressContainer, _progressIndicator;


function progressObject(progressType, width, parentLay) {
    
    this.stopProgress = function () {
        progressContainer.Hide();
        progressContainer.Destroy();
        clearInterval(animation);
    }
    
    this.setValue = function (value) {
        this.value = value;
        _progressIndicator.SetSize(parseFloat(value / 100), 0.05);
    }
    
    this.hideContainer = function () {
        app.DestroyLayout(this.progressContainer);
    }
    
    this.getValue = function () {
        return this.value;
    }
    
    this.setMargins = function (left, top, right, bottom, mode) {
        progressContainer.SetMargins(left, top, right, bottom, mode)
    }
    this.setPosition = function (left, top, width, height, options) {
        progressContainer.SetPosition(left, top, width, height, options)
    }
    
    drawProgressBar(progressType, width, parentLay, this)
}

function drawProgressBar(progressType, width, parentLay, progressObj) {
    
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
        parentLay.AddChild(progressContainer);
    }
    
    if (progressType === 'linearIntermediate') {
        
        progressContainer = app.CreateLayout('Linear', 'Horizontal,Left,FillXY');
        progressContainer.SetSize(width, 0.005);
        
        _progressIndicator = app.AddText(progressContainer, '', null, null, 'Left,FillXy');
        
        animation = setInterval(function () {
            _progressIndicator.Animate('SlideToRight', null, null);
        }, 600);
        
        progressContainer.SetBackColor(stateColor(md_theme_light_surfaceVariant, md_theme_dark_surfaceVariant))
        _progressIndicator.SetBackColor(stateColor(md_theme_light_primary, md_theme_dark_primary))
        
        parentLay.AddChild(progressContainer);
    }
}


var _radio;

function radioListObject(list, width, height, parentLay) {
    
    this.getCheckedItems = function () {
        return _radio.GetCheckItem();
    }
    
    this.checkItemByIndex = function (checkItem) {
        return _radio.CheckItemByIndex(checkItem);
    }
    
    this.getItem = function (title) {
        return _radio.GetItem(title);
    }
    
    this.removeAll = function () {
        return _radio.RemoveAll();
    }
    
    this.removeItem = function (title) {
        return _radio.RemoveItem(title);
    }
    
    this.removeItemByIndex = function (index) {
        return _radio.RemoveItemByIndex(index);
    }
    
    this.scrollToItem = function (title, body) {
        return _radio.ScrollToItem(title, body);
    }
    
    this.scrollToItemByIndex = function (index) {
        return _radio.ScrollToItemByIndex(index);
    }
    
    this.selectItem = function (item) {
        return _radio.SelectItem(item);
    }
    
    this.selectItemByIndex = function (index, scroll) {
        _radio.SelectItemByIndex(index, scroll);
    }
    
    this.setOnSelect = function (onSelect) {
        return _radio.SetOnSelect(onSelect);
    }
    
    this.setOnTouch = function (onTouch) {
        this.onTouch = onTouch;
    }
    
    this.setList = function (list, delim) {
        return _radio.SetList(list, delim);
    }
    
    this.setMargins = function (left, top, right, bottom) {
        _radio.SetMargins(left, top, right, bottom);
    }
    
    this.setPosition = function (left, top, width, height, options) {
        _radio.SetPosition(left, top, width, height, options);
    }
    
    this.setSize = function (width, height) {
        _radio.SetSize(width, height);
    }
    
    this.setScale = function (x, y) {
        _radio.SetScale(x, y);
    }
    
    this.showContainer = function () {
        _radio.Show();
    }
    
    this.hideContainer = function () {
        _radio.Hide();
    }
    
    this.getLength = function () {
        return _radio.GetLength();
    }
    
    this.insertItem = function (index, title, body, image) {
        _radio.InsertItem(index, title, body, image);
    }
    
    this.isVisible = function () {
        return _radio.IsVisible();
    }
    
    this.isEnabled = function () {
        return _radio.IsEnabled();
    }
    
    
    addRadioUi(list, width, height, parentLay)
}

function addRadioUi(list, width, height, parentLay, index) {
    _radio = MUI.CreateRadio(list, width, height, stateColor(md_theme_light_primary, md_theme_dark_primary));
    _radio.SetTextColor(stateColor(md_theme_light_onSurfaceVariant, md_theme_dark_onSurfaceVariant))
    _radio.SetFontFile(defaultFont);
    
    
    parentLay.AddChild(_radio);
}



function dlgBarObject(title, text, dlgOptions, noAction, yesAction) {
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
            dlgA.Hide();
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
        if(dlgFunc.onAction){
            dlgFunc.onAction(false);
            dlgA.Dismiss();
        }
    })
    noBtn.SetPadding(8, null, 8, null, "dp");

    yesBtn = app.AddText(footer, yesAction, null, null, 'Bold,VCenter')
    yesBtn.SetOnTouchUp(function(){
        if(dlgFunc.onAction){
            dlgFunc.onAction(true);
            dlgA.Dismiss();
        }
    })
    yesBtn.SetPadding(8, null, 8, null, "dp");
    
    if(theme === 'light'){
        noBtn.SetTextColor(md_theme_light_primary)
        yesBtn.SetTextColor(md_theme_light_primary)
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


var snackUi, snackContainer;

function SnackBarObject(text, btnAction, width, alignment) {
    
    this.setRawAlignment = function (top) {
        snackContainer.SetMargins(null, top)
    }
    
    this.setTimeout = function (timeout) {
        this.timeout = timeout;
    }
    
    this.setOnAction = function (onTouch) {
        this.onTouch = onTouch;
    }
    
    this.showObj = function () {
        drawSnackBarUi(text, btnAction, width, alignment, this.onTouch, this.timeout);
    }
    
}

function drawSnackBarUi(text, btnAction, width, alignment, onTouch, timeout) {
    
    snackContainer = app.CreateLayout('Linear', alignment + ',FillXY,TouchThrough,Center');
    snackUi = app.CreateLayout('Card', '');
    
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
    
    
    if (onTouch) {
        snackButton.SetOnTouchUp(onTouch)
    }
    
    box.AddChild(snackButton);
    
    app.AddLayout(snackContainer);
    
    
    box.SetBackColor(stateColor(md_theme_light_inverseSurface, md_theme_dark_inverseSurface))
    snackText.SetTextColor(stateColor(md_theme_light_inverseOnSurface, md_theme_dark_inverseOnSurface))
    snackButton.SetTextColor(stateColor(md_theme_light_inversePrimary, md_theme_dark_inversePrimary))
    
    if (timeout === undefined) {
        setTimeout(function () {
            this.snackContainer.Animate('FadeOut', null, 980);
            app.DestroyLayout(this.snackContainer);
            this.snackContainer.Destroy()
        }, 3000);
    } else {
        setTimeout(function () {
            this.snackContainer.Animate('FadeOut', null, 300);
            app.DestroyLayout(this.snackContainer);
            this.snackContainer.Destroy()
        }, timeout);
    }
}

var _seekBar;


function seekBarObject(value, range, width, parentLay) {
    
    this.setVisibility = function (mode) {
        _seekBar.SetVisibility(mode)
    }
    
    this.setSize = function (width, height, options) {
        _seekBar.SetSize(width, height, options)
    }
    this.setPosition = function (left, top, width, height, options) {
        _seekBar.SetPosition(left, top, width, height, options)
    }
    this.setOnTouch = function (onTouch) {
        _seekBar.SetOnTouch(onTouch)
    }
    this.getValue = function () {
        return _seekBar.GetValue();
    }
    this.isVisible = function () {
        return _seekBar.IsVisible();
    }
    this.animate = function (type, callback, time) {
        _seekBar.Animate(type, callback, time)
    }
    this.goneComponent = function () {
        _seekBar.Gone();
    }
    this.setDecimals = function (decimals) {
        _seekBar.SetDecimals(decimals)
    }
    
    drawSeekBar(value, range, width, parentLay, this);
}

function drawSeekBar(value, range, width, parentLay, seekObj) {
    
    const seekColor = function () {
        return stateColor(md_theme_light_onSurfaceVariant, md_theme_dark_onSurfaceVariant);
    }
    
    _seekBar = MUI.CreateSeekBar(value, range, width, seekColor())
    
    parentLay.AddChild(_seekBar)
}



var _bSheet;

function slideSheetObject(sheetLayout, width, options) {
    
    this.dismissSheet = function () {
        _bSheet.Animate('SlideToRight', function () {
            app.DestroyLayout(slideSheetContainer);
        }, 210);
    }
    
    this.showSheet = function () {
        drawSlideSheet(sheetLayout, width, options);
    }

}

function drawSlideSheet(sheetLayout, width, options) {
    slideSheetContainer = app.CreateLayout('Linear', 'FillXY,VCenter,Bottom,Right');
    slideSheetContainer.SetSize(1, 1);
    slideSheetContainer.SetOnTouchUp(dismissSlideSheet);
    
    _bSheet = app.CreateLayout('Card', 'FillX,VCenter,Right');
    _bSheet.SetSize(width, 1);
    _bSheet.SetCornerRadius();
    _bSheet.Animate('BounceRight', null, 550);
    _bSheet.AddChild(sheetLayout);
    slideSheetContainer.AddChild(_bSheet);
    slideSheetContainer.SetBackColor(stateColor(md_theme_light_scrim, md_theme_dark_scrim))
    _bSheet.SetBackColor(stateColor(md_theme_light_surfaceVariant, md_theme_dark_surfaceVariant))
    slideSheetContainer.SetBackAlpha(0.33);
    
    app.AddLayout(slideSheetContainer);
    
    
}

function dismissSlideSheet() {
    _bSheet.Animate('SlideToRight', function() {
        app.DestroyLayout(slideSheetContainer);
    }, 210);
}


function bottomSheetObject(sheetLayout, height, options) {
    this.dismissSheet = function () {
        dismissBSheet();
    }
    this.showSheet = function () {
        drawBottomSheet(sheetLayout, height, options);
    }
}

function drawBottomSheet(sheetLayout, height, options) {
    bottomSheetContainer = app.CreateLayout('Linear', 'FillXY,VCenter,Bottom');
    bottomSheetContainer.SetSize(1, 1);
    bottomSheetContainer.SetOnTouchUp(dismissBSheet);
    bottomSheetContainer.SetBackColor(stateColor(md_theme_light_scrim, md_theme_dark_scrim));
    bottomSheetContainer.SetBackAlpha(0.33);
    
    _bSheet = app.CreateLayout('Card', 'FillX,VCenter,Bottom');
    _bSheet.SetSize(-1, height);
    _bSheet.SetCornerRadius(28);
    _bSheet.Animate('BounceBottom', null, 550);
    _bSheet.AddChild(sheetLayout);
    _bSheet.SetBackColor(stateColor(md_theme_light_surfaceVariant, md_theme_dark_surfaceVariant))
    bottomSheetContainer.AddChild(_bSheet);
    
    
    app.AddLayout(bottomSheetContainer);
    
}

function dismissBSheet() {
    _bSheet.Animate('SlideToBottom', function() {
        app.DestroyLayout(bottomSheetContainer);
    }, 210);
}

function menuObj(menuType, list, position) {
    this.setOnTouch = function (onTouch) {
        this.onTouch = onTouch;
    }
    switch (menuType) {
    case 'simple':
        drawSimpleMenu(menuType, list, position, this);
        break;
    case 'withIcon':
        drawMenuWithIcon(menuType, list, position, this);
    }
}

function drawSimpleMenu(menuType, list, position, menuFunc) {
    let menuWidth = () => {
        if (app.IsTablet()) return 280;
        else return 190;
    }
    
    topValue = () => {
        //alert(top)
        if (top < 0.25) return top + 0.03
        else return top - 0.23;
    }
    
    
    menuContainer = app.CreateLayout('Linear', position);
    menuContainer.SetSize(1, 1)
    menuContainer.SetOnTouch(function () {
        app.RemoveLayout(menuContainer)
    })
    
    menuUi = app.CreateLayout('Card', position + 'Center')
    menuContainer.AddChild(menuUi)
    menuUi.SetMargins(0.05, topValue())
    menuUi.Animate('FadeIn', null, 100)
    menuUi.SetSize(menuWidth(), null, 'dp')
    menuUi.SetCornerRadius(4)
    
    list = app.CreateList(list, menuWidth(), null, 'Menu,Expand')
    list.SetOnTouch(function (title) {
        try {
            menuFunc.onTouch(title)
        } catch (err) {
            return null;
        }
    })
    menuUi.AddChild(list)
    
    app.AddLayout(menuContainer)
    
    if (theme === 'light') {
        menuUi.SetBackColor(md_theme_light_secondary)
        list.SetBackColor(md_theme_light_secondary)
    } else {
        menuUi.SetBackColor(md_theme_dark_secondary)
        list.SetBackColor(md_theme_dark_secondary)
    }
    
}

function drawMenuWithIcon(menuType, list, position, menuFunc) {
    let menuWidth = () => {
        if (app.IsTablet()) return 280;
        else return 190;
    }
    
    //alert(top)
    topValue = () => {
        if (top < 0.25) return top + 0.03
        else return top - 0.23;
    }
    menuContainer = app.CreateLayout('Linear', position);
    menuContainer.SetSize(1, 1)
    menuContainer.SetOnTouch(function () {
        app.RemoveLayout(menuContainer)
    })
    
    menuUi = app.CreateLayout('Card', position + 'Center')
    menuContainer.AddChild(menuUi)
    menuUi.SetMargins(0.05, topValue())
    menuUi.Animate('FadeIn', null, 100)
    menuUi.SetSize(menuWidth(), null, 'dp')
    menuUi.SetCornerRadius(4)
    
    list = app.CreateList(list, menuWidth(), null, 'Menu,Expand')
    list.SetFontFile(defaultFont)
    list.SetOnTouch(function (title, icon) {
        try {
            menuFunc.onTouch(title, icon)
        } catch (err) {
            return null;
        }
    })
    menuUi.AddChild(list)
    
    app.AddLayout(menuContainer)
    
    if (theme === 'light') {
        menuUi.SetBackColor(md_theme_light_secondary)
        list.SetBackColor(md_theme_light_secondary)
    } else {
        menuUi.SetBackColor(md_theme_dark_secondary)
        list.SetBackColor(md_theme_dark_secondary)
    }
}



function navDrawerObject(drawerLayout, side, width) {
    this.openDrawer = function (side) {
        app.OpenDrawer(side)
    }
    this.closeDrawer = function (side) {
        app.CloseDrawer(side)
    }
    this.removeDrawer = function (side) {
        
    }
    drawNavDrawer(drawerLayout, side, width, this)
}


function drawNavDrawer(drawerLayout, side, width) {
    _drawerContainer = app.CreateLayout('Card', 'FillXY')
    
    _drawerContainer.AddChild(drawerLayout)
    
    if (theme === 'dark') {
        _drawerContainer.SetBackColor(md_theme_dark_surface);
    } else {
        _drawerContainer.SetBackColor(md_theme_light_surface);
    }
    app.AddDrawer(_drawerContainer, side, width)
}


var bottomBarContainer;

function bottomBarObject(barPropsInjson, parentLay) {
    
    this.setOnTouch = function (onTouchFunc) {
        this.onTouchFunc = onTouchFunc;
    }
    
    this.setRawAdjustment = function (distanceFromTop) {
        if (layoutInfo.toLowerCase().includes('linear')) {
            bottomBarContainer.SetMargins(0, distanceFromTop);
        } else {
            bottomBarContainer.SetPosition(0, distanceFromTop);
        }
    }
    
    
    drawBottomBar(barPropsInjson, parentLay, this);
}

function drawBottomBar(barPropsInjson, parentLay, bottomBarObj) {
    
    let props = JSON.stringify(barPropsInjson);
    let info = JSON.parse(props);
    const icon1 = info.firstIcon;
    const icon2 = info.secondIcon;
    const icon3 = info.thirdIcon;
    const icon4 = info.fourthIcon;
    const fabIcon = info.fabIcon;
    
    bottomBarContainer = app.CreateLayout("Card", "Horizontal,Bottom,FillXY");
    
    bottomBarContainer.SetSize(null, 80, 'dp');
    bottomBarContainer.SetElevation(3, 'dp');
    
    
    if (layoutInfo.toLowerCase().includes('linear')) {
        bottomBarContainer.SetMargins(0, 0.9);
    } else {
        bottomBarContainer.SetPosition(0, 0.9);
    }
    const box = app.CreateLayout('Linear', 'Horizontal');
    bottomBarContainer.AddChild(box);
    box.SetSize(-1, 80, 'dp');
    
    const _icon1 = app.CreateText(icon1, null, null, 'H/VCenter,FillXY');
    _icon1.SetFontFile(defaultIcons);
    _icon1.SetTextSize(24);
    _icon1.SetOnTouchUp(function () {
        bottomBarObj.onTouchFunc(icon1);
    });
    
    _icon1.SetMargins(8, null, 16, null, 'dp');
    
    const _icon2 = app.CreateText(icon2, null, null, 'H/VCenter,FillXY');
    _icon2.SetFontFile(defaultIcons);
    _icon2.SetTextSize(24);
    _icon2.SetOnTouchUp(function () {
        bottomBarObj.onTouchFunc(icon2);
    });
    _icon2.SetMargins(8, null, 16, null, 'dp');
    
    const _icon3 = app.CreateText(icon3, null, null, 'H/VCenter,FillXY');
    _icon3.SetFontFile(defaultIcons);
    _icon3.SetTextSize(24);
    _icon3.SetOnTouchUp(function () {
        bottomBarObj.onTouchFunc(icon3);
    });
    _icon3.SetMargins(8, null, 16, null, 'dp');
    
    const _icon4 = app.CreateText(icon4, null, null, 'H/Vcenter,FillXY');
    _icon4.SetFontFile(defaultIcons);
    _icon4.SetTextSize(24);
    _icon4.SetOnTouchUp(function () {
        bottomBarObj.onTouchFunc(icon4);
    });
    _icon4.SetMargins(8, null, 16, null, 'dp');
    
    const fab = app.CreateLayout('Card', 'Right,FillXY');
    fab.SetSize(56, 56, 'dp');
    fab.SetElevation(0);
    fab.SetCornerRadius(16);
    fab.SetMargins(125, 12, 16, 12, 'dp');
    
    const _fabIcon = app.CreateText(fabIcon, null, null, 'H/VCenter,FillXY');
    _fabIcon.SetFontFile(defaultIcons);
    _fabIcon.SetOnTouchDown(function () {
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
    parentLay.AddChild(bottomBarContainer);
}
