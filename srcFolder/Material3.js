/* Material Design 3 Plugin.
   
   This Project Is Licensed
   Under The MIT License.
   @ 2024 - Till Forever.
   
   ------------------------
   Version :: 0.79.6
   Release Date :: 12/05/24
*/

/* Global Variables & Functions Here */

_Boost(true)
const ui = {};

var theme;
let defaultFont = _m3Path + 'Roboto.ttf';
let mediumFont = _m3Path + 'Roboto-Medium.ttf';
let boldFont = _m3Path + 'Roboto-Bold.ttf';


/** Initialize Material3, basically reads your baseTheme.json File
 * @param {string} baseTheme - Default theme. (light/dark etc)
 * @param {string} iconFill - Default icon fill. (sharp/two-tone etc)
*/
ui.InitializeMaterialPlugin = function(baseTheme, iconFill) {
    if (!app.FileExists('baseTheme.json')) {
        warnDeveloper(ErrorCodes["404"]);
        return;
    } 
    else {
        switch (iconFill) {
            case "outlined":
                defaultIcons = _m3Path + "uxFonts/Icons/Outlined-Regular.otf";
            break;
            case "sharp":
                defaultIcons = _m3Path + "uxFonts/Icons/Sharp-Regular.otf";
            break;
            case "two-tone":
                defaultIcons = _m3Path + "uxFonts/Icons/TwoTone-Regular.otf";
            break;
            case "round":
                defaultIcons = _m3Path + "uxFonts/Icons/Round-Regular.otf";
            break;
            default:
            defaultIcons = _m3Path + "uxFonts/Icons/Outlined-Regular.otf";
        }
        if (baseTheme === undefined){
            theme = 'dark';
        }
        else theme = baseTheme;
        setM3BaseColors();
    }
    isInitialized.value = true;
}

/** Initialize Material3, basically reads your baseTheme.json File
 * @param {string} baseTheme - Default theme. (light/dark etc)
 * @param {string} iconFill - Default icon fill. (sharp/two-tone etc)
*/

app.CreateMaterial3 = (baseTheme, iconFill) => {
    ui.InitializeMaterialPlugin(baseTheme, iconFill);
    warnDeveloper(ErrorCodes["301"]+`
    \nUse ui.InitializeMaterialPlugin()`);
}


/**
 * @returns Plugin Version Number
*/
ui.getVersion = function(){
    return '0.79.7';
}

/**
 * @param {string} mode - 'light' or 'dark'
*/
ui.setTheme = function (mode) {
    if (mode == undefined){
        if (theme == 'light'){
            theme = 'dark';
        }
        else theme = 'light';
        setM3BaseColors();
    }
    else theme = mode;
    setM3BaseColors();
}

/**
 * @param {string} type - A DroidScript Layout Type
 * @param {string} options - Options For Layout, i.e: FillXY
 * @param {number} width - layout Width in DroidScript Scale 0 - 1
 * @param {number} height - layout height in DroidScript Scale 0 - 1
*/

ui.createLayout = function(type, options, width, height, parentLay) {
    const statusBarColor = jsonData.schemes.dark.background;
    let lay;
    if(isInitialized.value === false) {
        warnDeveloper(ErrorCodes["428"]);
        
        // We Have To return a valid Object
        return ErrorLayout();
    }
    else {
        if (!parentLay) {
            lay = app.CreateLayout(type, options);
            lay.SetBackColor(backgroundClr.value)
            app.SetStatusBarColor(statusBarColor);
            
            layoutType = type;
            layoutOptions = options;
        } 
        else {
            lay = app.AddLayout(parentLay, type, options);
            lay.SetSize(width, height);
        }
        backgroundClr.subscribe((value)=>{
            lay.SetBackColor(value);
        });
    return lay;
    }
}

/**
 * @param {string} btnName - Name Of Your Button
 * @param {number} width - Width in DroidScript Scale 0 - 1
 * @param {number} height - Height in DroidScript Scale 0 - 1
 * @param {string} icon - Favicon for button (dont add fa)
 * @param {object} parentLay - parent For Button
*/

ui.addFilledButton = function (btnName, width, height, icon, parentLay) {
    return new filledButtonObject(btnName, width, height, icon, parentLay);
}

/**
 * @param {string} btnName - Name Of Your Button
 * @param {number} width - Width in DroidScript Scale 0 - 1
 * @param {number} height - Height in DroidScript Scale 0 - 1
 * @param {string} icon - Favicon for button (dont add fa)
 * @param {object} parentLay - parent For Button
*/
ui.addElevatedButton =  function (btnName, width, height, icon, parentLay) {
    return new elevatedButtonObject(btnName, width, height, icon, parentLay);
}

/**
 * @param {string} btnName - Name Of Your Button
 * @param {number} width - Width in DroidScript Scale 0 - 1
 * @param {number} height - Height in DroidScript Scale 0 - 1
 * @param {string} icon - Favicon for button (dont add fa)
 * @param {object} parentLay - parent For Button
*/
ui.addFilledTonalButton = function (btnName, width, height, icon, parentLay) {
    return new filledTonalButtonObject(btnName, width, height, icon, parentLay);
}

/**
 * @param {string} btnName - Name Of Your Button
 * @param {number} width - Width in DroidScript Scale 0 - 1
 * @param {number} height - Height in DroidScript Scale 0 - 1
 * @param {string} icon - Favicon for button (dont add fa)
 * @param {object} parentLay - parent For Button
*/
ui.addOutlinedButton = function (btnName, width, height, icon, parentLay) {
    return new outlinedButtonObject(btnName, width, height, icon, parentLay);
}

/**
 * @param {string} btnName - Name Of Your Button
 * @param {number} width - Width in DroidScript Scale 0 - 1
 * @param {number} height - Height in DroidScript Scale 0 - 1
 * @param {string} icon - Favicon for button (dont add fa)
 * @param {object} parentLay - parent For Button
*/   
ui.addTextButton = function (btnName, width, height, icon, parentLay) {
    return new textButtonObject(btnName, width, height, icon, parentLay);
}

/**
 * @param {string} icon - Icon
 * @param {object} layout - parent For Component
*/ 
ui.addSmallFAB = function (icon, layout) {
    return new smallFABObject(icon, layout);
}

/**
 * @param {string} icon - Icon
 * @param {object} layout - parent For Component
*/ 
ui.addFAB = function (icon, layout) {
    return new fabObject(icon, layout);
}

/**
 * @param {string} icon - Icon
 * @param {object} layout - parent For Component
*/ 
ui.addLargeFAB = function (icon, layout) {
    return new largeFABObject(icon, layout);
}
    
ui.addChip = function (type, text, icon, width, height, parentLay) {
    return new chipObject(type, text, icon, width, height, parentLay);
}

/**
 * @param {string} text - Information displayed on SnackBar
 * @param {string} btnAction - Name of The Button
 * @param {number} width - Width in DroidScript Scale 0 -1
*/
ui.addSnackBar = function (text, btnAction, width, alignment) {
    return new SnackBarObject(text, btnAction, width, alignment);
}

/**
 * @param {string} progressType - Progress Bar Type (linear,linearIntermediate or Circular)
 * @param {number} width - Width In DroidScript Scale 0 -1
 * @param {object} layout - Parent For SnackBar
*/ 
ui.addProgressBar = function (progressType, width, layout) {
    return new progressObject(progressType, width, layout);
}

/**
    * @param {string} title - AppBar Title
    * @param {string} leadingIcon - Left Icon of AppBar
    * @param {string} controlsIcons - Upto 3 Icons in a String With Commas.
    * @param {object} parentLay - ParentLayout For AppBar
*/
ui.addAlignedAppBar = function (title, leadingIcon, controlIcons, parentLay) {
    return new centerAlignedAppBarObj(title, leadingIcon, controlIcons, parentLay);
}

/**
    * @param {string} title - AppBar Title
    * @param {string} leadingIcon - Left Icon of AppBar
    * @param {string} controlsIcons - Upto 3 Icons in a String With Commas.
    * @param {object} parentLay - ParentLayout For AppBar
*/
ui.addSmallAppBar = function(title, leadingIcon, controlIcons, parentLay){
    return new smallAppBarObject(title, leadingIcon, controlIcons, parentLay);
}

/**
    * @param {string} title - AppBar Title
    * @param {string} leadingIcon - Left Icon of AppBar
    * @param {string} controlsIcons - Upto 3 Icons in a String With Commas.
    * @param {object} parentLay - ParentLayout For AppBar
*/
ui.addMediumAppBar = function(title, leadingIcon, controlIcons, parentLay){
    return new mediumAppBarObject(title, leadingIcon, controlIcons, parentLay);
}


/**
 * @param {json} barPropsInjson - Properties in a JSON Format
 * @param {object} parentLayout - Parent For bottomBar
*/

ui.addBottomAppBar = function (barPropsInjson, parentLayout) {
    return new bottomBarObject(barPropsInjson, parentLayout);
}

/**
 * @param {string} leadingIcon - Icon (Material Icon)
 * @param {string} leadingIcon - Icon (Material Icon)
 * @param {string} hint - Search Hint on TextArea
 * @param {number} width - Width In DroidScript Scale 0 -1
 * @param {object} layout - Parent For SearchBar
*/
ui.addSearchBar = function(leadingIcon, trailingIcon, hint, width, parentLayout){
    return new searchBarObject(leadingIcon, trailingIcon, hint, width, parentLayout);
}

/**
 * @param {string} listOfTabs - listOfTabs With Commas As One String
 * @param {number} width - Width In DroidScript Scale 0 -1
 * @param {number} height - Height In DroidScript Scale 0 -1
 * @param {string} options - Options
 * @param {object} parentLay - Parent for Tab Component
*/
ui.addTabs = function(listOfTabs,width, height, options, parentLay){
    return new secTabObject(listOfTabs,width, height, options, parentLay);
}

/**
 * @param {object} sheetLayout - Add a layout to the bottomsheet
 * @param {number} height - Height of BottomSheet In ds Unit Scale.
 * @param {string} options - BottomSheet Options (NoDim)
 * @returns A BottomSheet
*/
ui.addBottomSheet = function(sheetLayout, height, options){
    return new bottomSheetObject(sheetLayout, height, options);
}

/**
 * @param {string} switchType - Set The Type of switch
 * @param {boolean} value - Add Boolean 
 * @param {object} parentLayout - Add a parent
*/
ui.addSwitch = function (switchType, value, parentLayout) {
    return new switchObject(switchType, value, parentLayout);
}

/**
 * @param {string} listOfSettings - Add list of Settings, use [] to add descriptions.
 * @param {string} switchValues - Add list of true/false values 
 * @param {number} width - Component width in ds scale.
 * @param {number} height - Component height in ds scale.
 * @param {object} parentLay - Parent For Component
*/
ui.addSwitchSettings = function(listOfSettings, switchValues, width, height, parentLay){
    return new 
    switchSettingsObject(listOfSettings, switchValues, width, height, parentLay);
}

/**
 * @param {number} value - A value on a 0 - 100 scale.
 * @param {number} width - Component width in ds scale.
 * @param {object} parentLay - Parent For Component
*/
ui.addContinuousSlider = function(value, width, parentLay){
    return new continuosSliderObj(value, width, parentLay)
}

/**
 * @param {boolean} checked The state of Checked Button
 * @param {object} parentLay The parent for checkbox
*/
ui.addCheckBox = function(checked, parentLay){
    return new checkboxObject(checked, parentLay)
}

/**
 * @param {string} list - A String, list separated in commas.
 * @param {string} checkDefinitions - A String List Of True/False.
 * @param {number} width - Component width in ds scale.
 * @param {number} height - Component height in ds scale.
 * @param {object} parentLay - Parent For Component
*/
ui.addCheckBoxList = function(list, checkDefinitions, width, height, parentLay){
    return new checkBoxListObject(list, checkDefinitions, width, height, parentLay)
}

ui.addRadioButton = function(isChecked, parentLay){
    return new radioButtonObject(isChecked, parentLay)
}

function alternateView(viewMappings){
    let rawView = JSON.stringify(viewMappings);
    let view = JSON.parse(rawView);
    
    if (app.IsTablet()){
        return app.AddLayout(view.tabletView);
    }
    if (app.IsChrome()){
        return app.AddLayout(view.desktopView);
    }
    else return app.AddLayout(view.mobileView)
}


/* Using var To take advantage
   of hoisting.
*/
 
var isInitialized;

isInitialized = createSignal();

isInitialized.value = false;

var backgroundClr;
backgroundClr = createSignal();

var filledBtnClr;

filledBtnClr = createSignal();

var filledBtnTxtClr;

filledBtnTxtClr = createSignal();

var elevatedBtnClr;

elevatedBtnClr = createSignal();

var elevatedBtnTxtClr;

elevatedBtnTxtClr = createSignal();

var filledTonalBtnClr;

filledTonalBtnClr = createSignal();

var filledTonalBtnTxtClr;

filledTonalBtnTxtClr = createSignal();

var textBtnTxtClr;

textBtnTxtClr = createSignal();

var outlinedBtnClr;

outlinedBtnClr = createSignal();

var outlinedBtnTxtClr;

outlinedBtnTxtClr = createSignal();

var _smallFabClr;

_smallFabClr = createSignal();

var _smallFabTxtClr;

_smallFabTxtClr = createSignal();

var _fabColor;

_fabColor = createSignal();

var _fabIconClr;

_fabIconClr = createSignal();

var progressBackClr;

progressBackClr = createSignal();

var progressIndicatorClr;

progressIndicatorClr = createSignal();

var appBarColor = createSignal();
var appBarIconColor = createSignal();
var appBarTextsClr = createSignal();
var bottomBarAppClr = createSignal();
var bottomBarAppTxtClr = createSignal()
var bottomAppBarFAB = createSignal();

var searchBarClr = createSignal();
var searchBarIconClr = createSignal();
var searchBarTextClr = createSignal();
var searchBarInputTextClr = createSignal();

var secondaryTabClr = createSignal();
var lightBarClr = createSignal();
var secondaryTabTxtClr = createSignal();

var smallAppBarClr = createSignal();

var smallAppBarIconClr = createSignal();

var switchColor = createSignal();

var switchHandleOffColor;
switchHandleOffColor = createSignal();

var switchHandleOnColor;
switchHandleOnColor = createSignal();

var switchSettingTextClr = createSignal();


var mediumBarClr = createSignal();
var ErrorCodes;

ErrorCodes = {
    "301":"component Has Been Moved or Name Changed",
    "400":"parentLayout Is Not Defined For ::",
    "404":"baseTheme File Not Found",
    "415":"un-supported Media Type For ::",
    "428":"plugin Is Not Initialized"
}

var nil = '';
var unpositionalLayout = ["Linear", "Frame", "Card"];

var ErrorLayout;

ErrorLayout = () =>{
    let layout = app.CreateLayout('Linear','FillXY,H/VCenter');
    
    let errorMsg = app.AddText(layout,'Hi 🙋 you didnt Initailize Material3.')
    
    layoutType = 'Linear';
    layoutOptions = 'FillXY,H/VCenter';
    return layout;
}

var _mDebug,_m3Path,privateFolder;

_mDebug = app.GetAppPath().endsWith('/Material3');

privateFolder = 
app.GetPrivateFolder('Plugins') + '/material3/';

_m3Path = _mDebug ? '' : privateFolder;

const warnDeveloper = (Msg) =>{
    let alertClr = "<div style='color:#FF7900'>";
    console.log(alertClr + Msg);
}


const dpToPxConversion = (dpValue) => {
    return dpValue * (app.GetScreenDensity() / 160);
}

const pxToDpConversion = (pxValue) => {
    return pxValue / (app.GetScreenDensity() / 160);
}

const dsUnitsToDp = function(dsUnit, side){
    if (side == 'width' || side == 'w'){
        let dWidth = pxToDpConversion(DW());
        return dsUnit * dWidth;
    }
    else {
        let dHeight =  pxToDpConversion(DH());
        return dsUnit * dHeight;
    }
}

const dpToDsUnit = function(dpValue, side){
    if (side == 'width' || side == 'w'){
        let dWidth = pxToDpConversion(DW());
        return dpValue/dWidth;
    }
    else {
        let dHeight =  pxToDpConversion(DH());
        return dpValue/dHeight;
    }
}

function stateColor (lightValue, darkValue) {
    /* Default theme is always dark
       and can be changed w,
       setTheme method.
    */
    if(theme == undefined) theme = 'dark';
    if (theme === 'light') return lightValue;
    else return darkValue; 
}

  
function createSignal(defaultValue) {
    let __InnerValue = defaultValue;
    let subscribers = [];
    
    function notify() {
        for (let subscriber of subscribers) {
            subscriber(__InnerValue);
            }
    }
        
    return {
        get value() {
            return __InnerValue;
        },
        set value(newVariable) {
            __InnerValue = newVariable;
            notify();
        },
        
        subscribe: (subscriber) => {
            subscribers.push(subscriber);
        }
    }
}

function setM3BaseColors() {
    appTheme = app.ReadFile("baseTheme.json", "UTF-8");

    jsonData = JSON.parse(appTheme);

    function getColorHexCode(colorName) {
        const colorScheme = jsonData.schemes[theme];
        return colorScheme[colorName];
    }

    primary = getColorHexCode("primary");
    surfaceTint = getColorHexCode("surfaceTint");
    onPrimary = getColorHexCode("onPrimary");
    primaryContainer = getColorHexCode("primaryContainer");
    onPrimaryContainer = getColorHexCode("onPrimaryContainer");
    secondary = getColorHexCode("secondary");
    onSecondary = getColorHexCode("onSecondary");
    secondaryContainer = getColorHexCode("secondaryContainer");
    onSecondaryContainer = getColorHexCode("onSecondaryContainer");
    tertiary = getColorHexCode("tertiary");
    onTertiary = getColorHexCode("onTertiary");
    tertiaryContainer = getColorHexCode("tertiaryContainer");
    onTertiaryContainer = getColorHexCode("onTertiaryContainer");
    error = getColorHexCode("error");
    onError = getColorHexCode("onError");
    errorContainer = getColorHexCode("errorContainer");
    onErrorContainer = getColorHexCode("onErrorContainer");
    background = getColorHexCode("background");
    onBackground = getColorHexCode("onBackground");
    surface = getColorHexCode("surface");
    onSurface = getColorHexCode("onSurface");
    surfaceVariant = getColorHexCode("surfaceVariant");
    onSurfaceVariant = getColorHexCode("onSurfaceVariant");
    outline = getColorHexCode("outline");
    outlineVariant = getColorHexCode("outlineVariant");
    shadow = getColorHexCode("shadow");
    scrim = getColorHexCode("scrim");
    inverseSurface = getColorHexCode("inverseSurface");
    inverseOnSurface = getColorHexCode("inverseOnSurface");
    inversePrimary = getColorHexCode("inversePrimary");
    primaryFixed = getColorHexCode("primaryFixed");
    onPrimaryFixed = getColorHexCode("onPrimaryFixed");
    primaryFixedDim = getColorHexCode("primaryFixedDim");
    onPrimaryFixedVariant = getColorHexCode("onPrimaryFixedVariant");
    secondaryFixed = getColorHexCode("secondaryFixed");
    onSecondaryFixed = getColorHexCode("onSecondaryFixed");
    secondaryFixedDim = getColorHexCode("secondaryFixedDim");
    onSecondaryFixedVariant = getColorHexCode("onSecondaryFixedVariant");
    tertiaryFixed = getColorHexCode("tertiaryFixed");
    onTertiaryFixed = getColorHexCode("onTertiaryFixed");
    tertiaryFixedDim = getColorHexCode("tertiaryFixedDim");
    onTertiaryFixedVariant = getColorHexCode("onTertiaryFixedVariant");
    surfaceDim = getColorHexCode("surfaceDim");
    surfaceBright = getColorHexCode("surfaceBright");
    surfaceContainerLowest = getColorHexCode("surfaceContainerLowest");
    surfaceContainerLow = getColorHexCode("surfaceContainerLow");
    surfaceContainer = getColorHexCode("surfaceContainer");
    surfaceContainerHigh = getColorHexCode("surfaceContainerHigh");
    surfaceContainerHighest = getColorHexCode("surfaceContainerHighest");

    backgroundClr.value = background;

    filledBtnClr.value = primary;

    filledBtnTxtClr.value = onPrimary;

    elevatedBtnClr.value = secondaryContainer;

    elevatedBtnTxtClr.value = primary;

    filledTonalBtnClr.value = primaryContainer;

    filledTonalBtnTxtClr.value = onSecondaryContainer;

    textBtnTxtClr.value = primary;

    outlinedBtnClr.value = surface;

    outlinedBtnTxtClr.value = primary;

    _smallFabClr.value = primaryContainer;

    _smallFabTxtClr.value = onPrimaryContainer;

    _fabColor.value = primaryContainer;

    _fabIconClr.value = onPrimaryContainer;

    progressBackClr.value = surfaceVariant;

    progressIndicatorClr.value = primary;

    appBarColor.value = surface;

    appBarIconColor.value = background;

    appBarTextsClr.value = onSurface;

    bottomBarAppClr.value = surfaceVariant;

    bottomBarAppTxtClr.value = onPrimaryContainer;

    bottomAppBarFAB.value = primaryContainer;

    searchBarClr.value = surfaceVariant;

    searchBarIconClr.value = surfaceVariant;

    searchBarTextClr.value = onSurface;

    searchBarInputTextClr.value = onSurfaceVariant;

    secondaryTabClr.value = surface;

    lightBarClr.value = primary;

    secondaryTabTxtClr.value = onSurface;

    smallAppBarClr.value = surface;

    smallAppBarIconClr.value = onSurface;

    switchColor.value = secondaryContainer;

    switchHandleOffColor.value = outline;

    switchHandleOnColor.value = primary;

    switchSettingTextClr.value = onSurface;

    mediumBarClr.value = surface;
}

function radioButtonObject(isChecked, parentLay){
    let radio;
    
    this.SetOnCheck = function (onCheck){
        this.onCheck = onCheck;
    }
    
    /**
     * @param {boolean} boolValue True or False, For Enabled/Disabled CheckBox
    */
    
    this.SetEnabled = function(boolValue){
        if (boolValue) {
            radio.SetText('radio_button_checked')
            radio.SetFontFile(_m3Path + "uxFonts/Icons/Sharp-Regular.otf")
            radio.SetTextColor(outline)
            radio.SetEnabled(false)
        }
        else {
            radio.SetEnabled(true);
            if (isChecked){
                radio.SetText('radio_button_checked')
                radio.SetFontFile(_m3Path + "uxFonts/Icons/Sharp-Regular.otf")
                radio.SetTextColor(primary)
            }
            else {
                radio.SetText('radio_button_unchecked')
                radio.SetTextColor(onSurface);
                radio.SetFontFile(defaultIcons);
            }
        }
    }
    
    if (!parentLay){
        warnDeveloper('No Parent For Your RadioButton');
        return;
    }
    else radio = drawRadioButton(isChecked, parentLay, this)
}

function drawRadioButton(isChecked, parentLay, radioObj){
    let radio;
    let radius = 50/100 * (40)
    
     /* A subscriber for the checking utility */
    let checkSubscriber = createSignal();
    checkSubscriber.value = isChecked;
    
    
    radio = app.AddButton(parentLay,null,null,null,'Custom');
    
    radio.SetSize(40,40,'dp');
    radio.SetTextSize(24,'dp');
    radio.SetStyle('#00000000','#00000000',radius,null,null,0);
    
    radio.SetOnTouch(()=>{
       if (checkSubscriber.value){
           checkSubscriber.value = false;
           radio.SetTextColor(onSurface);
           radio.SetFontFile(defaultIcons);
           radio.SetText('radio_button_unchecked')
        }
        else {
            checkSubscriber.value = true;
            radio.SetText('radio_button_checked')
            radio.SetTextColor(primary);
            radio.SetFontFile(_m3Path + "uxFonts/Icons/Sharp-Regular.otf");
        }
        
        if (radioObj.onCheck){
            M(this,radioObj.onCheck(checkSubscriber.value));
        }
        else return null;
    });
    
    if (isChecked){
        radio.SetText('radio_button_checked')
        radio.SetFontFile(_m3Path + "uxFonts/Icons/Sharp-Regular.otf")
        radio.SetTextColor(primary)
    }
    else {
        radio.SetText('radio_button_unchecked')
        radio.SetTextColor(onSurface);
        radio.SetFontFile(defaultIcons);
    }
    
    return radio;
}

function checkboxObject(checked, parentLay){
    let checkbox;
    
    /** TODO
     * Add SetPosition
     * Add SetMargins
     * Add ClearFocus
     * Add Gone
     * Add Hide
     * Add Visibility
     * Animate
     * Tween
    */
    
    /**
     * @param {Function} onCheck This is your function called after a check.
    */
    this.SetOnCheck = function (onCheck){
        this.onCheck = onCheck;
    }
    
    /**
     * @param {boolean} boolValue True or False, For Enabled/Disabled CheckBox
    */
    
    this.SetEnabled = function(boolValue){
        if (boolValue) {
            checkbox.SetText('indeterminate_check_box')
            checkbox.SetFontFile(_m3Path + "uxFonts/Icons/Sharp-Regular.otf")
            checkbox.SetTextColor(primary)
            checkbox.SetEnabled(false)
        }
        else {
            checkbox.SetEnabled(true);
            if (checked){
                checkbox.SetText('check_box')
                checkbox.SetFontFile(_m3Path + "uxFonts/Icons/Sharp-Regular.otf")
                checkbox.SetTextColor(primary)
            }
            else {
                checkbox.SetText('check_box_outline_blank')
                checkbox.SetTextColor(onSurface);
                checkbox.SetFontFile(defaultIcons);
            }
        }
    }
    
    if (!parentLay){
        warnDeveloper('Add a parent for CheckBox');
        return;
    }
    else checkbox = drawCheckBox(checked, parentLay, this);
}

function drawCheckBox(checked, parentLay, checkObj){
    let checkbox;
    let radius = 50/100 * (40)
    
    /* A subscriber for the checking utility */
    let checkSubscriber = createSignal();
    checkSubscriber.value = checked;
    
    checkbox = app.AddButton(parentLay,null,null,null,'Custom');
    
    checkbox.SetSize(40,40,'dp');
    checkbox.SetTextSize(24,'dp');
    checkbox.SetStyle('#00000000','#00000000',radius,null,null,0);
    
    checkbox.SetOnTouch(()=>{
       if (checkSubscriber.value){
           checkSubscriber.value = false;
           checkbox.SetTextColor(onSurface);
           checkbox.SetFontFile(defaultIcons);
           checkbox.SetText('check_box_outline_blank')
        }
        else {
            checkSubscriber.value = true;
            checkbox.SetText('check_box')
            checkbox.SetTextColor(primary);
            checkbox.SetFontFile(_m3Path + "uxFonts/Icons/Sharp-Regular.otf");
        }
        
        if (checkObj.onCheck){
            M(this,checkObj.onCheck(checkSubscriber.value));
        }
        else return null;
    });
    
    if (checked){
        checkbox.SetText('check_box')
        checkbox.SetFontFile(_m3Path + "uxFonts/Icons/Sharp-Regular.otf")
        checkbox.SetTextColor(primary)
    }
    else {
        checkbox.SetText('check_box_outline_blank')
        checkbox.SetTextColor(onSurface);
        checkbox.SetFontFile(defaultIcons);
    }
    return checkbox;
}

function filledButtonObject(btnName, width, height, icon, parentLay) {
    let filledButton;

    this.Animate = function (type, callback, time) {
        filledButton.Animate(type, callback, time);
    }
    this.SetScale = function (x, y) {
        filledButton.SetScale(x, y);
    }
    this.SetVisibility = function (mode) {
        filledButton.SetVisibility(mode);
    }
    this.SetEnabled = function (enableBool) {
        filledButton.SetEnabled(enableBool);
    }
    this.SetEllipsize = function (mode) {
        filledButton.SetEllipsize(mode);
    }
    this.SetDescription = function (desc) {
        filledButton.SetDescription(desc);
    }
    this.SetHtml = function (str) {
        filledButton.SetHtml(str);
    }
    this.SetText = function (text) {
        filledButton.SetText(text);
    }
    this.SetTextSize = function (size, mode) {
        filledButton.SetTextSize(size, mode);
    }
    this.SetPosition = function(left,top,width,height,options) {
        filledButton.SetPosition(left,top,width,height,options)
    }
    this.SetMargins = function (left, top, right, bottom, mode) {
        filledButton.SetMargins(left, top, right, bottom, mode);
    }
    this.SetPadding = function (left, top, right, bottom, mode) {
        filledButton.SetPadding(left, top, right, bottom, mode);
    }
    this.SetOnTouch = function (onTouch) {
        filledButton.SetOnTouch(I(onTouch.bind(filledButton)));
    }
    this.SetOnLongTouch = function (onLongTouch) {
        filledButton.SetOnLongTouch(I(onLongTouch.bind(filledButton)));
    }
    this.Tween = function (target, duration, type, repeat, yoyo, callback) {
        filledButton.Tween(target, duration, type, repeat, yoyo, callback);
    }
    this.Focus = function () {
        filledButton.Focus();
    }
    this.Gone = function () {
        filledButton.Gone();
    }
    this.Show = function () {
        filledButton.Show();
    }
    this.Hide = function () {
        filledButton.Hide();
    }


    filledButton = drawFilledButton(btnName, width, height, icon, parentLay)
}

function drawFilledButton(btnName, width, height, icon, parentLay) {
    let filledButton;

    filledButton = app.AddButton(parentLay, null, width, height, 'Custom,FontAwesome');
    filledButton.SetStyle(filledBtnClr.value, filledBtnClr.value, 20, null, null, 0)
    filledButton.SetTextColor(filledBtnTxtClr.value)
    
    if (icon === null) {
        filledButton.SetText(btnName);
    } else {
        filledButton.SetText(`[fa-${icon}]` + ' ' + btnName);
    }
    
    filledButton.SetFontFile(defaultFont);
    
    
    /**To use Drag Api, The Parent of that component must be
     **an Absolute layout, it should have TouchSpy and TouchThrough
     **as options.
     enableDrag - Allow Button To Be Dragged
    */
    filledButtonObject.prototype.EnableDrag = function() {
    
    parentLay.SetOnTouchMove(function(event) {
        let xVal = JSON.stringify(event.x[0]);
        let yVal = JSON.stringify(event.y[0]);
        console.log("<div style='color:#FF7900'>" + 'X :: '+JSON.stringify(event.x[0]))
        console.log("<div style='color:red'>" + 'Y :: '+JSON.stringify(event.y[0]))
        filledButton.SetPosition(xVal,yVal)        
    });
    
    }
    

    filledBtnClr.subscribe((value)=>{
        filledButton.SetStyle(value, value, 20, null, null, 0)
    })
    
    filledBtnTxtClr.subscribe((value)=>{
        filledButton.SetTextColor(value)
    })
    
    return filledButton;
}



function elevatedButtonObject(btnName, width, height, icon, parentLay) {
    let elevatedButton;
    // Button Methods :::
    
    this.Animate = function (type, callback, time) {
        elevatedButton.Animate(type, callback, time);
    }
    this.SetScale = function (x, y) {
        elevatedButton.SetScale(x, y);
    }
    this.SetVisibility = function (mode) {
        elevatedButton.SetVisibility(mode);
    }
    this.SetEnabled = function (enableBool) {
        elevatedButton.SetEnabled(enableBool);
    }
    this.SetEllipsize = function (mode) {
        elevatedButton.SetEllipsize(mode);
    }
    this.SetDescription = function (desc) {
        elevatedButton.SetDescription(desc);
    }
    this.SetHtml = function (str) {
        elevatedButton.SetHtml(str);
    }
    this.SetText = function (text) {
        elevatedButton.SetText(text);
    }
    this.SetTextSize = function (size, mode) {
        elevatedButton.SetTextSize(size, mode);
    }
    this.SetMargins = function (left, top, right, bottom, mode) {
        elevatedButton.SetMargins(left, top, right, bottom, mode);
    }
    this.SetPadding = function (left, top, right, bottom, mode) {
        elevatedButton.SetPadding(left, top, right, bottom, mode);
    }
    this.SetOnTouch = function (onTouch) {
        elevatedButton.SetOnTouch(I(onTouch.bind(elevatedButton)));
    }
    this.SetOnLongTouch = function (onLongTouch) {
        elevatedButton.SetOnLongTouch(I(onLongTouch.bind(elevatedButton)));
    }
    this.Tween = function (target, duration, type, repeat, yoyo, callback) {
        elevatedButton.Tween(target, duration, type, repeat, yoyo, callback);
    }
    this.Focus = function () {
        elevatedButton.Focus();
    }
    this.Gone = function () {
        elevatedButton.Gone();
    }
    this.Show = function () {
        elevatedButton.Show();
    }
    this.Hide = function () {
        elevatedButton.Hide();
    }

    
    //Call It 
    elevatedButton = drawElevatedBtn(btnName, width, height, icon, parentLay, this)
}


function drawElevatedBtn(btnName, width, height, icon, parentLay, elevatedObj) {
    let elevatedButton;
    elevatedButton = app.AddButton(parentLay, null, width, height, 'Custom,FontAwesome');
    elevatedButton.SetTextColor(elevatedBtnTxtClr.value);
    elevatedButton.SetFontFile(defaultFont);
    
    if (icon === null) {
        elevatedButton.SetText(btnName);
    } else elevatedButton.SetText(`[fa-${icon}]` + ' ' + btnName);
    
    elevatedButton.SetStyle(elevatedBtnClr.value, elevatedBtnClr.value, 20, null, null, 0);
    
    elevatedBtnClr.subscribe((value)=>{
        elevatedButton.SetStyle(value,value, 20, null, null, 0);
    });
    
    elevatedBtnTxtClr.subscribe((value)=>{
        elevatedButton.SetTextColor(value);
    })
    return elevatedButton;
}


function filledTonalButtonObject(btnName, width, height, icon, parentLay) {
    let filledTonalButton;
    // Button Methods :::
    
    this.Animate = function (type, callback, time) {
        filledTonalButton.Animate(type, callback, time);
    }
    this.SetScale = function (x, y) {
        filledTonalButton.SetScale(x, y);
    }
    this.SetVisibility = function (mode) {
        filledTonalButton.SetVisibility(mode);
    }
    this.SetEnabled = function (enableBool) {
        filledTonalButton.SetEnabled(enableBool);
    }
    this.SetEllipsize = function (mode) {
        filledTonalButton.SetEllipsize(mode);
    }
    this.SetDescription = function (desc) {
        filledTonalButton.SetDescription(desc);
    }
    this.SetHtml = function (str) {
        filledTonalButton.SetHtml(str);
    }
    this.SetText = function (text) {
        filledTonalButton.SetText(text);
    }
    this.SetTextSize = function (size, mode) {
        filledTonalButton.SetTextSize(size, mode);
    }
    this.SetMargins = function (left, top, right, bottom, mode) {
        filledTonalButton.SetMargins(left, top, right, bottom, mode);
    }
    this.SetPadding = function (left, top, right, bottom, mode) {
        filledTonalButton.SetPadding(left, top, right, bottom, mode);
    }
    this.SetOnTouch = function (onTouch) {
        filledTonalButton.SetOnTouch(I(onTouch.bind(filledTonalButton)));
    }
    this.SetOnLongTouch = function (onLongTouch) {
        filledTonalButton.SetOnLongTouch(I(onLongTouch.bind(filledTonalButton)));
    }
    this.Tween = function (target, duration, type, repeat, yoyo, callback) {
        filledTonalButton.Tween(target, duration, type, repeat, yoyo, callback);
    }
    this.Focus = function () {
        filledTonalButton.Focus();
    }
    this.Gone = function () {
        filledTonalButton.Gone();
    }
    this.Show = function () {
        filledTonalButton.Show();
    }
    this.Hide = function () {
        filledTonalButton.Hide();
    }

    
    //Call It
    
    filledTonalButton = drawFilledTonalBtn(btnName, width, height, icon, parentLay, this)
}

function drawFilledTonalBtn(btnName, width, height, icon, parentLay, filledTonalObj) {
    let filledTonalButton;
    filledTonalButton = app.AddButton(parentLay, null, width, height, 'Custom,FontAwesome');
    filledTonalButton.SetFontFile(defaultFont)
    filledTonalButton.SetTextColor(filledTonalBtnTxtClr.value);
    
    
    if (icon === null) {
        filledTonalButton.SetText(btnName);
    } else filledTonalButton.SetText(`[fa-${icon}]` + ' ' + btnName);
    
    filledTonalButton.SetStyle(filledTonalBtnClr.value, filledTonalBtnClr.value, 20, null, null, 0);
    
    filledTonalBtnClr.subscribe((value)=>{
        filledTonalButton.SetStyle(value,value, 20, null, null, 0);
    });
    
    filledTonalBtnTxtClr.subscribe((value)=>{
        filledTonalButton.SetTextColor(value);
    });
    return filledTonalButton;
}

function outlinedButtonObject(btnName, width, height, icon, parentLay) {
    // Button Methods :::
    let _outlinedButton;
    this.Animate = function (type, callback, time) {
        _outlinedButton.Animate(type, callback, time);
    }
    this.SetScale = function (x, y) {
        _outlinedButton.SetScale(x, y);
    }
    this.SetVisibility = function (mode) {
        _outlinedButton.SetVisibility(mode);
    }
    this.SetEnabled = function (enableBool) {
        _outlinedButton.SetEnabled(enableBool);
    }
    this.SetEllipsize = function (mode) {
        _outlinedButton.SetEllipsize(mode);
    }
    this.SetDescription = function (desc) {
        _outlinedButton.SetDescription(desc);
    }
    this.SetHtml = function (str) {
        _outlinedButton.SetHtml(str);
    }
    this.SetText = function (text) {
        _outlinedButton.SetText(text);
    }
    this.SetTextSize = function (size, mode) {
        _outlinedButton.SetTextSize(size, mode);
    }
    this.SetMargins = function (left, top, right, bottom, mode) {
        _outlinedButton.SetMargins(left, top, right, bottom, mode);
    }
    this.SetPadding = function (left, top, right, bottom, mode) {
        _outlinedButton.SetPadding(left, top, right, bottom, mode);
    }
    this.SetOnTouch = function (onTouch) {
        _outlinedButton.SetOnTouch(I(onTouch.bind(_outlinedButton)));
    }
    this.SetOnLongTouch = function (onLongTouch) {
        _outlinedButton.SetOnLongTouch(I(onLongTouch.bind(_outlinedButton)));
    }
    this.Tween = function (target, duration, type, repeat, yoyo, callback) {
        _outlinedButton.Tween(target, duration, type, repeat, yoyo, callback);
    }
    this.Focus = function () {
        _outlinedButton.Focus();
    }
    this.Gone = function () {
        _outlinedButton.Gone();
    }
    this.Show = function () {
        _outlinedButton.Show();
    }
    this.Hide = function () {
        _outlinedButton.Hide();
    }

    
    //Call It 
    _outlinedButton = drawOutlinedBtn(btnName, width, height, icon, parentLay, this);
}

function drawOutlinedBtn(btnName, width, height, icon, parentLay, outlineObj) {
    
    
    let _outlinedButton = app.AddButton(parentLay, null, width, height, 'Custom,FontAwesome');
    _outlinedButton.SetFontFile(defaultFont)
    _outlinedButton.SetTextColor(outlinedBtnTxtClr.value);
    
    if (icon === null) {
        _outlinedButton.SetText(btnName);
    } else _outlinedButton.SetText(`[fa-${icon}]` + ' ' + btnName);
    
    _outlinedButton.SetStyle(outlinedBtnClr.value, outlinedBtnClr.value, 20, outline, 1, 0);
    
    outlinedBtnClr.subscribe((value)=>{
        _outlinedButton.SetStyle(value, value, 20, outline, 1, 0);
    })
    
    outlinedBtnTxtClr.subscribe((value)=>{
        _outlinedButton.SetTextColor(value);
    })
    return _outlinedButton;
}

function textButtonObject(btnName, width, height, icon, parentLay) {
    
    let _textButton;
    // Button Methods :::
    this.SetMargins = function (left, top, right, bottom, mode) {
        _textButton.SetMargins(left, top, right, bottom, mode);
    }
        this.Animate = function (type, callback, time) {
        _textButton.Animate(type, callback, time);
    }
    
    
    this.SetScale = function (x, y) {
        _textButton.SetScale(x, y);
    }
    this.SetVisibility = function (mode) {
        _textButton.SetVisibility(mode);
    }
    this.SetEnabled = function (enableBool) {
        _textButton.SetEnabled(enableBool);
    }
    this.SetEllipsize = function (mode) {
        _textButton.SetEllipsize(mode);
    }
    this.SetDescription = function (desc) {
        _textButton.SetDescription(desc);
    }
    this.SetHtml = function (str) {
        _textButton.SetHtml(str);
    }
    this.SetText = function (text) {
        _textButton.SetText(text);
    }
    this.SetTextSize = function (size, mode) {
        _textButton.SetTextSize(size, mode);
    }
    
    this.SetPadding = function (left, top, right, bottom, mode) {
        _textButton.SetPadding(left, top, right, bottom, mode);
    }
    this.SetOnTouch = function (onTouch) {
        _textButton.SetOnTouch(I(onTouch.bind(_textButton)));
    }
    this.SetOnLongTouch = function (onLongTouch) {
        _textButton.SetOnLongTouch(I(onLongTouch.bind(_textButton)));
    }
    this.Tween = function (target, duration, type, repeat, yoyo, callback) {
        _textButton.Tween(target, duration, type, repeat, yoyo, callback);
    }
    this.Focus = function () {
        _textButton.Focus();
    }
    this.Gone = function () {
        _textButton.Gone();
    }
    this.Show = function () {
        _textButton.Show();
    }
    
    this.Hide = function (){
        _textButton.Hide();
    }
    
    // Call It
    _textButton = drawTextBtn(btnName, width, height, icon, parentLay, this);
    
}

function drawTextBtn(btnName, width, height, icon, parentLay, textBtnObj) {
    let _textButton = app.AddButton(parentLay, null, width, height, 'Custom,FontAwesome');
    _textButton.SetFontFile(defaultFont)
    _textButton.SetTextColor(textBtnTxtClr.value);
    
    if (icon === null) {
        _textButton.SetText(btnName);
    } else _textButton.SetText(`[fa-${icon}]` + ' ' + btnName);
    
    _textButton.SetStyle(backgroundClr.value, backgroundClr.value, 20, null, null, 0);
    
    backgroundClr.subscribe((value)=>{
        _textButton.SetStyle(value,value, 20, null, null, 0);
    })
    
    textBtnTxtClr.subscribe((value)=>{
        _textButton.SetTextColor(value);
    });
    
    return _textButton;
}

function fabObject(icon, parentLay) {
    let fabContainer;
    this.SetOnTouch = function (onTouch) {
        fabContainer.SetOnTouch( M( fabContainer, onTouch) )
    }
    /* If the unwanted layout is detected warn dev
       If FillXY isnt being used notify dev
    */
   
    if (unpositionalLayout.includes(layoutType) || !layoutOptions.includes('FillXY')){
        warnDeveloper('FAB Component Only Used With Absolute Layouts\n With FillXY');
    }
    else fabContainer = drawFAB(icon, parentLay, this);
}

function drawFAB(icon, parentLay, fabObj) {
    let _fab;
    
    _fab = app.AddButton(parentLay, icon, null, null, 'Customize,Lego');
    _fab.SetSize(56,56,'dp');
    
    _fab.SetTextSize(24,'dp');
    _fab.SetTextColor(_fabIconClr.value);
    _fab.SetFontFile(defaultIcons);
    _fab.SetStyle(_fabColor.value,_fabColor.value,16,null,null,0);
    
    
    leftPos = DW()- dpToPxConversion(72);
    topPos = DH()- dpToPxConversion(56+16);
    
    _fab.SetPosition(leftPos, topPos, null, null, 'px')
    
    _fabColor.subscribe((value)=>{
        _fab.SetStyle(value,value,16,null,null,0);
    })
    
    _fabIconClr.subscribe((value)=>{
        _fab.SetTextColor(value);
    })
    return _fab;
}


function smallFABObject(icon, parentLay) {
    let smallFabContainer;
    
    this.SetOnTouch = function (onTouch) {
        smallFabContainer.SetOnTouch( M( null, onTouch) )
    }
    
    this.SetRawAlignment = function(left, top){
        smallFabContainer.SetPosition(left, top);
    }
    
    if (unpositionalLayout.includes(layoutType) || !layoutOptions.includes('FillXY')){
        warnDeveloper('FAB Component Only Used With Absolute Layouts\n With FillXY');
    }
    else {
        smallFabContainer = drawSmallFab(icon, parentLay, this);
        
    } 
}

function drawSmallFab(icon, parentLay, j) {
    let _smallFab;
    
    _smallFab = app.AddButton(parentLay, icon, null, null, 'Customize,Lego');
    _smallFab.SetSize(40,40,'dp');
    
    _smallFab.SetTextSize(20,'dp');
    _smallFab.SetTextColor(_smallFabTxtClr.value);
    _smallFab.SetFontFile(defaultIcons);
    _smallFab.SetStyle(_smallFabClr.value,_smallFabClr.value,12,null,null,0);
    
    _smallFabClr.subscribe((value)=>{
        _smallFab.SetStyle(value,value,12,null,null,0);
    });
    
    _smallFabTxtClr.subscribe((value)=>{
        _smallFab.SetTextColor(value);
    })
    
    leftPos = DW()- dpToPxConversion(72);
    topPos = DH()- dpToPxConversion(56+16);
    
    //_smallFab.SetPosition(leftPos, topPos, null, null, 'px')
    
    
    return _smallFab;
}




function largeFABObject(icon, parentLay) {
    let largeFabContainer;
    
    this.SetMargins = function (left, top, right, bottom, mode) {
        largeFabContainer.SetMargins(left, top, right, bottom, mode);
    }
    
    this.SetPosition = function (left, top, width, height, options) {
        largeFabContainer.SetPosition(left, top, width, height, options);
    }
    if(!parentLay){
        warnDeveloper('No Parent For FAB')
    }
    else largeFabContainer = drawLargeFab(icon, parentLay, this);
}

function drawLargeFab(icon, parentLay, largefabOBj, largeFABObj) {
    let largeFabContainer;
    
    largeFabContainer = app.CreateLayout('Linear', 'TouchThrough,Spy');
    largeFabContainer.SetSize(96, 96, 'dp');
    
    
    const fab = app.CreateLayout('Card', 'Right,Bottom,FillXY');
    fab.SetSize(96, 96, 'dp');
    fab.SetElevation(0);
    fab.SetCornerRadius(28);
    
    const _fabIcon = app.CreateText(icon, null, null, 'H/VCenter,FillXY');
    _fabIcon.SetFontFile(defaultIcons);
    
    
    _fabIcon.SetTextSize(36);
    fab.AddChild(_fabIcon);
    largeFabContainer.AddChild(fab);
    
    
    fab.SetBackColor(_smallFabClr.value);
    _fabIcon.SetTextColor(_smallFabTxtClr.value)
    
    largeFABObject.prototype.SetOnTouch = function(onTouch){
        _fabIcon.SetOnTouchDown(M(this,function(){
            onTouch();
        }))
    }
    
    _smallFabClr.subscribe((value)=>{
        _fabIcon.SetTextColor(value)
    });
    
    _smallFabTxtClr.subscribe((value)=>{
        _fabIcon.SetTextColor(value)
    })
    
    parentLay.AddChild(largeFabContainer);
    return largeFabContainer;
    
}


function checkBoxListObject(list, checkDefinitions, width, height, parentLay){
    let checkbox;
    
    if(!parentLay){
        warnDeveloper('No Parent For CheckBox');
        return;
    }
    else checkbox = drawCheckBoxList(list, checkDefinitions, width, height, parentLay);
    
}

function drawCheckBoxList(list, checkDefinitions, width, height, parentLay){
    let noOfSettings = list.split(',').length;
    
    /* If checkDefinitions is null or undefined assume all is true */
    let noOfCheckDefinitions = checkDefinitions.split(',').length;
    let checkbox,singleCheckList;
    
    checkbox = ui.createLayout('Linear',null,width,height,parentLay);
    
    /* Just A Simple Template */
    singleCheckList = function(item, checkDefinition){
        let singleCheckLay = ui.createLayout('Linear',null,width,height,checkbox)
        let check = app.AddButton(singleCheckLay,null,null,null,'Custom');
        /* TODO */
    }
    return checkbox;
}

function bottomSheetObject(sheetLayout, height, options) {
    this.Dismiss = function () {
        dismissBSheet();
    }
    this.Show = function () {
        drawBottomSheet(sheetLayout, height, options);
    }
}

function drawBottomSheet(sheetLayout, height, options) {
    let bottomSheet,cardLayout;
    
    bottomSheet = app.CreateLayout('Linear', 'FillXY,VCenter,Bottom');
    bottomSheet.SetSize(1, 1);
    bottomSheet.SetOnTouchUp(dismissBSheet);
    bottomSheet.SetBackColor(scrim);
    bottomSheet.SetBackAlpha(0.33);
    
    
    cardLayout = app.CreateLayout('Card', 'FillX,VCenter,Top');
    
    cardLayout.SetCornerRadius(28);
    
    cardLayout.AddChild(sheetLayout);
    cardLayout.SetBackColor(surfaceVariant)
    bottomSheet.AddChild(cardLayout);
    
    cardLayout.Animate('BounceBottom', null, 550);
    
    app.AddLayout(bottomSheet);
    
    function dismissBSheet() {
        cardLayout.Animate('SlideToBottom', function(){
            cardLayout.RemoveChild(sheetLayout);
            app.RemoveLayout(bottomSheet)
        }, 210);
        
    }
}


var switchValue = createSignal();


function switchObject(switchType, value, parent_Layout) {
    let _switch;
    
    this.GetValue = function () {
        return switchValue;
    }
    this.SetOnToggle = function (onToggle) {
        this.onToggle = onToggle;
    }
    this.SetPosition = function (left, top, width, height, options) {
        _switch.SetPosition(left, top, width, height, options)
    }
    
    this.SetMargins = function(left,top,right,bottom,mode){
        _switch.SetMargins(left,top,right,bottom,mode)
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
    _switch = drawSwitchNoIcon(value, parent_Layout, this);
}



function drawSwitchNoIcon(value, parent_Layout, switchObj) {
    let _switch;
    let handle;
    switchValue.value = value;
    
    _switch = app.CreateLayout('Card')
    _switch.SetSize(52, 32, 'dp');
    _switch.SetElevation(0.9)
    _switch.SetCornerRadius(16)
    _switch.SetBackColor(switchColor.value)
    
    abs = app.AddLayout(_switch,'Absolute')
    abs.SetSize(52, 32, 'dp');
    
    handle = app.AddImage(abs,null, 0.085, 0.05)
    handle.SetAutoUpdate(true)
    
    /* This if else doesnt work in setHandleState Function Btw*/
    
    if(value){
        handle.SetPaintColor(switchHandleOnColor.value)
    }
    else{
        handle.SetPaintColor(switchHandleOffColor.value)
    }
    
    switchColor.subscribe((value)=>{
        _switch.SetBackColor(value)
    });
    
    
    const setHandleState = (bool) =>{
        if(bool){
            handle.SetPosition(0.052,0)
            handle.DrawCircle(0.52, 0.42, 0.45)
        }
        else { 
            handle.SetPosition(0,0)
            handle.DrawCircle(0.52, 0.42, 0.30) 
        }
    }
    
    setHandleState(switchValue.value)
    
    handle.SetOnTouchDown(M(this,function(){
        if(switchValue.value){
            switchValue.value = false
            handle.Tween({x:0.0,y:0},100,'Linear.None',0,false,()=>{
                handle.Clear()
                handle.DrawCircle(0.52, 0.42, 0.30)
            })
        }
        else{
            switchValue.value = true
            
            handle.Tween({x:0.05,y:0},100,'Linear.None',0,false,()=>{
                handle.Clear();
                handle.DrawCircle(0.52, 0.42, 0.45)
                
            })
        }
    }))
    
    /* Also wont work in SetOnTouchDown */
    switchValue.subscribe((value)=>{
        if(value){
            handle.SetPaintColor(switchHandleOnColor.value);
        }
        else{
            handle.SetPaintColor(switchHandleOffColor.value);
        }
        
        if(switchObj.onToggle) switchObj.onToggle(value);
    })
    
    parent_Layout.AddChild(_switch);
    return _switch;
    
}


function switchSettingsObject(listOfSettings, switchValues, width, height, parentLay){
    let _SwitchSettings;
    if(!parentLay){
        warnDeveloper('No Parent To Swicth Settings.')
    }
    else _SwitchSettings = drawSwitchSettings(listOfSettings, switchValues, width, height, parentLay);
}

function drawSwitchSettings(listOfSettings, switchValues, width, height, parentLay){
    
    /* Get No Of Switch Settings */
    if(!listOfSettings.includes(',')){
        warnDeveloper('It seems like you didnt give a list.');
        return;
    }
    
    noOfSettings = listOfSettings.split(',').length;
    
    __SwicthListContainer = app.AddLayout(parentLay,'Linear','Vertical')
    __SwicthListContainer.SetSize(width,height);
    
    
    /* Create A Template For A Single Setting */
    
    let __SwitchTemplate = function (headerValue, descriptionValue, boolSwitchValue){
        __layout = ui.createLayout('Linear','Left,Horizontal',-1,-1,__SwicthListContainer)
        __layout.SetSize(dsUnitsToDp(width,'w'),64,'dp');
        __layout.SetMargins(null, 0.01)
        
        if(descriptionValue){
            __headerText = app.AddText(__layout,null,0.6,-1,'Left,Multiline')
            __headerText.SetHtml(`<b>${headerValue}</b><br>${descriptionValue}`)
            __headerText.SetEllipsize( "end" );
            __headerText.SetMargins(8,4,null,null,'dp');
            __headerText.SetTextColor(switchSettingTextClr.value)
            __headerText.SetFontFile(boldFont)
            __headerText.SetTextSize(15)
        }
        else {
        __headerText = app.AddText(__layout, headerValue,0.6,-1,'Left,Bold')
        __headerText.SetMargins(8,4,null,null,'dp');
        __headerText.SetEllipsize( "end" );
        __headerText.SetFontFile(boldFont)
        __headerText.SetTextColor(switchSettingTextClr.value)
        __headerText.SetTextSize(15)
        }
        
        _cardLayout = ui.addSwitch('noIcon',true,__layout);
        _cardLayout.SetMargins(dsUnitsToDp(width,'w') - dsUnitsToDp(0.7,'w')-42,8,12,8,'dp')
    
    }
    
    switchSettingTextClr.subscribe((value)=>{
        __headerText.SetTextColor(value)
    }) 

    /* Get Any Description Values */
    
    for (let i = 0; i < noOfSettings; i++){
        if (listOfSettings.split(',')[i].includes('[')){
            
            posOfBracket = listOfSettings.split(',')[i].indexOf('[');
            posOfLastBracket = listOfSettings.split(',')[i].indexOf(']');
            
            headerValue = listOfSettings.split(',')[i].slice(0, posOfBracket).trim()
            
            descriptionValue = listOfSettings.split(',')[i].substring(posOfBracket +1,posOfLastBracket)
        
            __SwitchTemplate(headerValue,descriptionValue)
        }
        
        else {
            headerValue = listOfSettings.split(',')[i].trim()
            
            __SwitchTemplate(headerValue,null)
        }
        
    }
}

function continuosSliderObj(value, width, parentLay){
    let slider;
    
    if(!parentLay){
        warnDeveloper('Add a parent to slider')
    }
    else{
        slider = drawContinousSlider(value, width, parentLay);
    }
}

function drawContinousSlider(value, width, parentLay){
    let slider;
    
    slider = app.CreateImage(null, 508 ,100 ,"px");
    slider.SetSize(dsUnitsToDp(width,'w'),64, 'dp');
    slider.SetAutoUpdate( false );
    slider.SetOnTouchMove(function(event){
        draw(event.x[0])
    });
    
    draw(value)
    
    
function draw(x) {
    hemi = 4/500
    slider.Clear()
    slider.SetLineWidth( 8 ) 
    slider.SetPaintColor( "#00ff00" ) // left
    slider.DrawLine( 0+hemi,0.5 ,x-hemi,0.5 ) 
    slider.DrawCircle(  hemi,0.5,hemi)
    slider.SetPaintColor( "#99ff99" ) // right
    slider.DrawLine( x+5*hemi,0.5 ,1-hemi ,0.5 ) 
    slider.DrawCircle(  1-hemi,0.5,hemi)  
    slider.SetPaintColor( "#ff0000" ) // bar
    slider.DrawLine( x+2*hemi,0.25 ,x+2*hemi ,0.75 ) 
    slider.Update()
}
    parentLay.AddChild(slider)
    return slider;
}


function mediumAppBarObject(title, leadingIcon, controlIcons, parentLay){
    let mediumBar;
    
    this.SetSize = function(width, height, options){
        mediumBar.SetSize(width,height,options);
    }
    
    /* Add SetOnTouch */
    
 
    if(!parentLay){
        warnDeveloper('No Parent For App Bar');
        return;
    }
    else {
        mediumBar = drawMediumAppBar(title, leadingIcon, controlIcons, parentLay);
    }
}

function drawMediumAppBar(title, leadingIcon, controlIcons, parentLay){
    let mediumBar,appBarContainer;
    let contentContainer,scroller;
    let firstIcon,header;
    let radius =  50/100 * 40;
    
    let noOfControlIcons = controlIcons.split(',').length;
    
    mediumBar = ui.createLayout('Linear','Vertical');
    mediumBar.SetSize(1,1);
   
    appBarContainer = app.AddLayout(mediumBar,'Card');
    appBarContainer.SetSize(pxToDpConversion(DW()),112,'dp');
    appBarContainer.SetBackColor(mediumBarClr.value)
    
    if (theme == 'dark'){
        app.SetStatusBarColor(mediumBarClr.value);
    }
    
    innerContainer = app.AddLayout(appBarContainer,'Absolute');
    innerContainer.SetSize(pxToDpConversion(DW()),112,'dp');
    
    firstIcon = app.AddButton(innerContainer,leadingIcon,-1,-1,'Custom')
    firstIcon.SetStyle(appBarIconColor.value,appBarIconColor.value,
    radius,null,null,0);
    firstIcon.SetSize(40,40,'dp')
    
    firstIcon.SetFontFile(defaultIcons)
    firstIcon.SetTextSize(20)
    firstIcon.SetTextColor(appBarTextsClr.value);
    firstIcon.SetPosition(dpToPxConversion(16),dpToPxConversion(20),null,null,'px')
    
    header = app.AddText(innerContainer,title,null,null,'Left');
    header.SetTextSize(24);
    header.SetFontFile(defaultFont)
    
    header.SetTextColor(appBarTextsClr.value);
    header.SetPosition(dpToPxConversion(20),dpToPxConversion(64),null,null,'px')
    
    if(noOfControlIcons < 2){
        warnDeveloper('Must Have More Than 2 Icons On App Bar.')
        return;
    }
    if (noOfControlIcons == 2) drawTwoControls();
    else drawThreeControls();
    
    function drawTwoControls (){
        let iconA = controlIcons.split(',')[1];
        let iconB = controlIcons.split(',')[0];
        
        controlA = app.AddButton(innerContainer, iconA, null, null, 'Custom,NoPad');
        controlA.SetFontFile(defaultIcons)
        controlA.SetStyle(appBarIconColor.value,
        appBarIconColor.value, radius, null,null, 0);
        
        controlA.SetTextColor(appBarTextsClr.value);
        controlA.SetPosition(DW() - (dpToPxConversion(16) + dpToPxConversion(46)),dpToPxConversion(20),null,null,'px')
        controlA.SetSize(40,40,'dp');
        controlA.SetTextSize(20);
        
        controlB = app.AddButton(innerContainer, iconB, null, null, 'Custom,NoPad');
        controlB.SetFontFile(defaultIcons)
        controlB.SetStyle(appBarIconColor.value,
        appBarIconColor.value, radius, null,null, 0);
        
        controlB.SetTextColor(appBarTextsClr.value);
        controlB.SetPosition(DW() - (dpToPxConversion(72) + dpToPxConversion(46)),dpToPxConversion(20),null,null,'px')
        controlB.SetSize(40,40,'dp');
        controlB.SetTextSize(20);
    }
    
    function drawThreeControls (){
        let iconA = controlIcons.split(',')[2];
        let iconB = controlIcons.split(',')[1];
        let iconC = controlIcons.split(',')[0];
        
        controlA = app.AddButton(innerContainer, iconA, null, null, 'Custom,NoPad');
        controlA.SetFontFile(defaultIcons)
        controlA.SetStyle(appBarIconColor.value,
        appBarIconColor.value, radius, null,null, 0);
        
        controlA.SetTextColor(appBarTextsClr.value);
        controlA.SetPosition(DW() - (dpToPxConversion(16) + dpToPxConversion(46)),dpToPxConversion(20),null,null,'px')
        controlA.SetSize(40,40,'dp');
        controlA.SetTextSize(20);
        
        controlB = app.AddButton(innerContainer, iconB, null, null, 'Custom,NoPad');
        controlB.SetFontFile(defaultIcons)
        controlB.SetStyle(appBarIconColor.value,
        appBarIconColor.value, radius, null,null, 0);
        
        controlB.SetTextColor(appBarTextsClr.value);
        controlB.SetPosition(DW() - (dpToPxConversion(72) + dpToPxConversion(46)),dpToPxConversion(20),null,null,'px')
        controlB.SetSize(40,40,'dp');
        controlB.SetTextSize(20);
        
        controlC = app.AddButton(innerContainer, iconC, null, null, 'Custom,NoPad');
        controlC.SetFontFile(defaultIcons)
        controlC.SetStyle(appBarIconColor.value,
        appBarIconColor.value, radius, null,null, 0);
        
        controlC.SetTextColor(appBarTextsClr.value);
        controlC.SetPosition(DW() - (dpToPxConversion(136) + dpToPxConversion(46)),dpToPxConversion(20),null,null,'px')
        controlC.SetSize(40,40,'dp');
        controlC.SetTextSize(20);
    }
    
    scroller = app.AddScroller(mediumBar,null,null,'NoScrollBar')
    scroller.SetSize(pxToDpConversion(DW()),pxToDpConversion(DH()) - 112,'dp');
    
    contentContainer = ui.createLayout('Linear',null,null,null);
    contentContainer.SetSize(pxToDpConversion(DW()),pxToDpConversion(DH()) - 112,'dp')
    scroller.AddChild(contentContainer)
    
    /**
     * @returns The Layout To Add Content Under The App Bar
    */
    mediumAppBarObject.prototype.GetLayout = function(){
        return contentContainer;
    }
    /* SubScribers */
    mediumBarClr.subscribe((value)=>{
        appBarContainer.SetBackColor(value);
        app.SetStatusBarColor(value)
    })
    appBarIconColor.subscribe((value)=>{
        firstIcon.SetStyle(value,value,radius,null,null,0);
        controlA.SetStyle(value,value, radius, null,null, 0);
        controlB.SetStyle(value,value, radius, null,null, 0);
        
        try {
            controlC.SetStyle(value,value, radius, null,null, 0);
        }
        catch (error){}
    })
    appBarTextsClr.subscribe((value)=>{
        header.SetTextColor(value);
        firstIcon.SetTextColor(value);
        controlA.SetTextColor(value)
        controlB.SetTextColor(value)
        try {
            controlC.SetTextColor(value)
        }
        catch (error){}
    })
    parentLay.AddChild(mediumBar)
    
    return mediumBar;
}

function centerAlignedAppBarObj(title, leadingIcon, controlIcons, parentLay) {
    let barCardLay;
    
    this.SetOnTouch = function (onTouch) {
        this.onTouch = onTouch
    }
    
    if(!parentLay){
        warnDeveloper('No Parent For App Bar.')
    }
    else{
        barCardLay = drawAppBar(title, leadingIcon, controlIcons, parentLay,this)
    }
}

function drawAppBar(title, leadingIcon, controlIcons, parentLay, appBarContainerObj) {
    barCardLay = app.AddLayout(parentLay, "Card");
    barCardLay.SetSize(DW(), dpToPxConversion(64), 'px');
    
    barCardLay.SetBackColor(appBarContainerColor.value)
    barCardLay.SetMargins(0, 0)
    
    
    barUi = app.CreateLayout('Linear', 'Horizontal,Left');
    barCardLay.AddChild(barUi);
    
    
    _IconRadius = 50/100 * 120;
    
    _leftIcon = app.AddButton(barUi, leadingIcon, null, null, 'Custom, Lego');
    _leftIcon.SetSize(144, 144, 'px');
    _leftIcon.SetStyle(appBarTextsClr.value,appBarTextsClr.value, _IconRadius, null,null, 0)
    _leftIcon.SetMargins(48, 24,  pxToDpConversion(DW()) - 190, null, 'px')
   
    _leftIcon.SetFontFile(defaultIcons)
    _leftIcon.SetTextSize(72, 'px');
    _leftIcon.SetTextColor(appBarTextsClr.value )
    _leftIcon.SetOnTouch(function () {
        if (appBarContainerObj.onTouch) {
            M(this,appBarContainerObj.onTouch(leadingIcon));
        }
    })
    
    _title = app.AddText(barUi, title, -1, -1, 'Wrap');
    _title.SetMargins(null, 24, null, 24, 'px')

    _title.SetTextSize(28, 'dp');
    _title.SetTextColor(appBarTextsClr.value)
    
    
    
    _rightIcon = app.AddButton(barUi, controlIcons, null, null, 'Custom, Lego');
    _rightIcon.SetMargins(pxToDpConversion(DW()) - 240, 24, 30, null, 'px')
    _rightIcon.SetStyle(appBarTextsClr.value,appBarTextsClr.value, _IconRadius, null,null, 0)
    _rightIcon.SetSize(144, 144, 'px');
    _rightIcon.SetTextSize(72, 'px');
    
    _rightIcon.SetFontFile(defaultIcons)
    _rightIcon.SetTextColor(appBarTextsClr.value )
    _rightIcon.SetOnTouch(function () {
        if (appBarContainerObj.onTouch) {
            M(this,appBarContainerObj.onTouch(controlIcons))
        }
    })
    
    appBarContainerColor.subscribe((value)=>{
        barCardLay.SetBackColor(value)
    })
    
    appBarTextsClr.subscribe((value)=>{
        _leftIcon.SetStyle(value,value, _IconRadius, null,null, 0)
        _rightIcon.SetStyle(value,value, _IconRadius, null,null, 0)
    })
    
    appBarTextsClr.subscribe((value)=>{
        _title.SetTextColor(value);
        _leftIcon.SetTextColor(value )
        _rightIcon.SetTextColor(value )
    })
    return barCardLay;
}


function smallAppBarObject(title, leadingIcon, controlIcons, parentLay){
    let smallAppBar;
    
    /**
     *@param {function} onTouch - Function To Be Called When An Icon Is Touched
    */
    this.SetOnTouch = function(onTouch){
        this.onTouch = onTouch;
    }
    if(!parentLay){
        warnDeveloper();
    }
   
    else smallAppBar = drawSmallAppBar(title, leadingIcon,controlIcons,parentLay,this);
}


function drawSmallAppBar(title, leadingIcon, controlIcons, parentLay, smallAbpObj){
    let smallAppBar,noOfControlIcons;
    
    smallAppBar = app.AddLayout(parentLay,'Card');
    smallAppBar.SetBackColor(smallAppBarClr.value);
    smallAppBar.SetSize(pxToDpConversion(DW()),64,'dp')
    
    let linearBarLayout = app.AddLayout(smallAppBar,'Linear','Horizontal,Left');
    
    if(controlIcons == null) {
        noOfControlIcons = nil ;
    }
    else {
        noOfControlIcons = controlIcons.split(',').length;
    }
    
    let IconRadius = 50/100 * 144;
    
    let firstIcon = app.AddButton(linearBarLayout,leadingIcon,null,null,'Custom');
    firstIcon.SetStyle(smallAppBarClr.value,smallAppBarClr.value,IconRadius,null,null,0)
    firstIcon.SetFontFile(defaultIcons)
    firstIcon.SetMargins(16, 24,null, null, 'px')
    firstIcon.SetSize(144, 144, 'px');
    firstIcon.SetTextSize(72, 'px');
    firstIcon.SetTextColor(smallAppBarIconClr.value)
    
    let header = app.AddText(linearBarLayout,title,-1,-1)
    header.SetMargins(16, pxToDpConversion(40), null, pxToDpConversion(30), 'dp')

    header.SetTextSize(24, 'dp');
    header.SetTextColor(smallAppBarIconClr.value)
    
    /* Loop And Add Buttons */

    let controlIconA = controlIcons.split(',')[0];
    let controlIconB = controlIcons.split(',')[1];
    let controlIconC = controlIcons.split(',')[2];
    
    let controlIconNames = [controlIconA, controlIconB, controlIconC];
    
    /**
     * @returns {number} Maximum distance to edge of device
    */
    
    let controlMargins = () =>{
        if (noOfControlIcons == 1){
            return pxToDpConversion(DW()) - 10;
        }
        if (noOfControlIcons == 2){
            return pxToDpConversion(DW()) - 320;
        }
        else {
            return 16;
        }
    }
    
    let controlMarginB = () =>{
        if (noOfControlIcons > 1 || noOfControlIcons >=2){
            return 16;
        }
        else {
            return null;
        }
    }
    for (let i = 0; i < noOfControlIcons; i++) {
        if (i < controlIconNames.length) {
            let icon = controlIconNames[i];
            
            let controlIcon = app.AddButton(linearBarLayout, icon, null, null, 'Custom');
            controlIcon.SetStyle(smallAppBarClr.value, smallAppBarClr.value, IconRadius, null, null, 0);
            controlIcon.SetSize(dpToPxConversion(48), dpToPxConversion(48), 'px');
            controlIcon.SetTextSize(72, 'px');
            controlIcon.SetMargins(controlMargins(), 8, null, null, 'dp');
            
            controlIcon.SetFontFile(defaultIcons)
            controlIcon.SetTextColor(smallAppBarIconClr.value);
            controlIcon.SetOnTouch(function () {
                if (smallAbpObj.onTouch) {
                    M(this, smallAbpObj.onTouch(icon));
                }
            });
        }
    }

    smallAppBarClr.subscribe((value)=>{
        smallAppBar.SetBackColor(value);
        firstIcon.SetStyle(value,value,IconRadius,null,null,0)
        controlIcon.SetStyle(value,value,IconRadius,null,null,0)
    })
    
    smallAppBarIconClr.subscribe((value)=>{
        firstIcon.SetTextColor(value)
        header.SetTextColor(value)
    })
    return smallAppBar;
}

function bottomBarObject(barPropsInjson, parentLay) {
    let bottomBarContainer;
    
    this.SetOnTouch = function (onTouchFunc) {
        this.onTouchFunc = onTouchFunc;
    }
    
    this.SetRawAdjustment = function (distanceFromTop) {
        bottomBarContainer.SetMargins(0, distanceFromTop);
    }
    
    if (unpositionalLayout.includes(layoutType)) {
        warnDeveloper('BottomAppBar Cannot Be Set On A Linear Layout',
        'Change To Absolute Layout');
        return;
    }
    else {
        bottomBarContainer = drawBottomBar(barPropsInjson, parentLay, this);
    }
}

function drawBottomBar(barPropsInjson, parentLay, bottomBarObj) {
    let bottomBarContainer;
    let props = JSON.stringify(barPropsInjson);
    let info = JSON.parse(props);
    let icon1 = info.firstIcon;
    let icon2 = info.secondIcon;
    let icon3 = info.thirdIcon;
    let icon4 = info.fourthIcon;
    let fabIcon = info.fabIcon;
    
    bottomBarContainer = app.CreateLayout("Card", "Horizontal,Bottom,FillXY");
    bottomBarContainer.SetSize(pxToDpConversion(DW()), 80, 'dp');
    bottomBarContainer.SetElevation(3, 'dp');
    bottomBarContainer.SetPosition(0, 0.9);
    
    const box = app.CreateLayout('Linear', 'Horizontal');
    bottomBarContainer.AddChild(box);
    box.SetSize(-1, 80, 'dp');
    
    const _icon1 = app.CreateText(icon1, null, null, 'H/VCenter,FillXY');
    _icon1.SetFontFile(defaultIcons);
    _icon1.SetTextSize(24);
    _icon1.SetOnTouchUp(function () {
        if (bottomBarObj.onTouchFunc){
            bottomBarObj.onTouchFunc(icon1);
        }
    });
    
    _icon1.SetMargins(8, null, 16, null, 'dp');
    
    const _icon2 = app.CreateText(icon2, null, null, 'H/VCenter,FillXY');
    _icon2.SetFontFile(defaultIcons);
    _icon2.SetTextSize(24);
    _icon2.SetOnTouchUp(function () {
        if (bottomBarObj.onTouchFunc){
        bottomBarObj.onTouchFunc(icon2);
        }
    });
    _icon2.SetMargins(8, null, 16, null, 'dp');
    
    const _icon3 = app.CreateText(icon3, null, null, 'H/VCenter,FillXY');
    _icon3.SetFontFile(defaultIcons);
    _icon3.SetTextSize(24);
    _icon3.SetOnTouchUp(function () {
        if (bottomBarObj.onTouchFunc){
        bottomBarObj.onTouchFunc(icon3);
        }
    });
    _icon3.SetMargins(8, null, 16, null, 'dp');
    
    const _icon4 = app.CreateText(icon4, null, null, 'H/Vcenter,FillXY');
    _icon4.SetFontFile(defaultIcons);
    _icon4.SetTextSize(24);
    _icon4.SetOnTouchUp(function () {
        if (bottomBarObj.onTouchFunc){
        bottomBarObj.onTouchFunc(icon4);
        }
    });
    _icon4.SetMargins(8, null, 16, null, 'dp');
    
    const fab = app.CreateLayout('Card', 'Right,FillXY');
    fab.SetSize(56, 56, 'dp');
    fab.SetElevation(0);
    fab.SetCornerRadius(16);
    fab.SetMargins(96, 12, 16, 12, 'dp');
    
    const _fabIcon = app.CreateText(fabIcon, null, null, 'H/VCenter,FillXY');
    _fabIcon.SetFontFile(defaultIcons);
    _fabIcon.SetOnTouchDown(function () {
        if (bottomBarObj.onTouchFunc){
        bottomBarObj.onTouchFunc(fabIcon);
        }
    });
    
    _fabIcon.SetTextSize(24);
    fab.AddChild(_fabIcon);
    
    box.AddChild(_icon1);
    box.AddChild(_icon2);
    box.AddChild(_icon3);
    box.AddChild(_icon4);
    box.AddChild(fab);
    
    bottomBarContainer.SetBackColor(bottomBarAppClr.value);
    _icon1.SetTextColor(bottomBarAppTxtClr.value);
    _icon2.SetTextColor(bottomBarAppTxtClr.value);
    _icon3.SetTextColor(bottomBarAppTxtClr.value);
    _icon4.SetTextColor(bottomBarAppTxtClr.value);
    _fabIcon.SetTextColor(bottomBarAppTxtClr.value);
    fab.SetBackColor(bottomAppBarFAB.value);
    
    bottomBarAppClr.subscribe((value)=>{
        bottomBarContainer.SetBackColor(value)
    })
    
    bottomAppBarFAB.subscribe((value)=>{
        fab.SetBackColor(value)
    })
    bottomBarAppTxtClr.subscribe((value)=>{
        _icon1.SetTextColor(value);
        _icon2.SetTextColor(value);
        _icon3.SetTextColor(value);
        _icon4.SetTextColor(value);
        _fabIcon.SetTextColor(bottomBarAppTxtClr.value);
    })
    parentLay.AddChild(bottomBarContainer);
    return bottomBarContainer;
}


function searchBarObject(leadingIcon, trailingIcon, hint, width, parentLayout){
    this.Animate = function(type, callback, time){
        _search.Animate(type, callback, time);
    }
    
    
    this.ClearFocus = function(){
        _searchInput.ClearFocus();
    }
    
    this.GetCursorLine = function(){
        return _searchInput.GetCursorLine();
    }
    
    this.GetCursorPos = function(){
        return _searchInput.GetCursorPos();
    }
    
    this.GetHtml = function(){
        return _searchInput.GetHtml();
    }
    
    this.GetSelectedText = function(){
        return _searchInput.GetSelectedText();
    }
    
    this.GetSelectionEnd = function(){
        return _searchInput.GetSelectionEnd();
    }
    
    this.GetSelectionStart = function(){
        return _searchInput.GetSelectionStart();
    }
    
    this.GetText = function(){
        _searchInput.GetText();
    }
    
    this.GetVisibility = function(){
        return _search.GetVisibility();
    }
    
    this.GetType = function(){
        return 'SearchBar';
    }
    
    this.Gone = function(){
        _search.Gone();
    }
    
    this.Hide = function(){
        _search.Hide();
    }
    
    this.InsertText = function(text, start){
        _searchInput.InsertItem(text, start);
    }
    
    this.IsOverlap = function(){
        return _search.IsOverlap();
    }
    
    this.SetEnabled = function(bool){
        _search.SetEnabled(bool);
    }
    
    this.SetHtml = function(html){
        _searchInput.SetHtml(html);
    }
    
    this.SetOnChange = function(onChange){
        _searchInput.SetOnChange(onChange)
    }
    
    this.SetOnEnter = function(onEnter){
        _searchInput.SetOnEnter(onEnter);
    }
    
    this.SetOnFocus = function(onFocus){
        _searchInput.SetOnFocus(onFocus);
    }
    
    this.SetOnTouch = function(onTouch){
        this.onTouch = onTouch;
    }
    
    this.SetText = function(text){
        _searchInput.SetText(text);
    }
    
    this.SetVisibility = function(mode){
        _search.SetVisibility(mode);
    }
    
    this.Show = function(){
        _search.Show();
    }
    
    this.Tween = function(target, duration, type, repeat, yoyo, callback){
        _search.Tween(target, duration, type, repeat, yoyo, callback);
    }
    
    this.SetMargins = function(left, top, right, bottom, mode){
        //.SetMargins(left, top, right, bottom, mode);
    }
    if (parentLayout){
        drawSearchBar(leadingIcon, trailingIcon, hint, width, parentLayout, this);
    }
    else warnDeveloper('You didnt add a parent to the search component',
    'Add parent To SearchBar');
}

function drawSearchBar(leadingIcon, trailingIcon, hint, width, parentLayout, searchObj) {
    const imageFileTypes = ['jpg','png','jpeg','ico','tiff']
    
    const searchBarType = (trailingIcon) => {
        if (trailingIcon.includes(',')) {
            const firstTrailingIcon = trailingIcon.split(',')[0];
            const secondTrailingIcon = trailingIcon.split(',')[1];
            
            if (imageFileTypes.includes(secondTrailingIcon)) {
                return {
                    firstTrailingIcon,
                    secondTrailingIcon,
                    barType: 'WithAvatar&Icon'
                };
            } else {
                return {
                    firstTrailingIcon,
                    secondTrailingIcon,
                    barType: 'WithTwoIcons'
                };
            }
        }else {
            /* If TrailingIcon doesn't have a comma test if it's either:
            WithAvatar
            WithIcon
            */
            
            if (imageFileTypes.includes(trailingIcon)) {
                return {
                    trailingIcon,
                    barType: 'WithAvatar'
                };
            }
            else {
                return {
                    barType: 'WithIcon'
                };
            }
        }
    }

    const searchType = searchBarType(trailingIcon); 

    switch (searchType.barType) {
        case 'WithIcon':
            drawSearchWithIcon();
            break;
        case 'WithAvatar':
            drawSearchWithAvatar();
            break;
        case 'WithTwoIcons':
            drawSearchWithTwoIcons(searchType.firstTrailingIcon, searchType.secondTrailingIcon);
            break;
        case 'WithAvatar&Icon':
            drawSearchWithAvatarIcon(searchType.firstTrailingIcon, searchType.secondTrailingIcon);
            break; 
    }
    
    
    function drawSearchWithIcon() {
        let _search, _searchContainer, _leadingIcon, _searchInput, _trailingIcon;
        
        let _iconRadius = 50/100 * 34;
        let _searchBarWidth = function(){
            if (dsUnitsToDp(width,'w') < 144){
                warnDeveloper(`SearchBar Width Cant Be Less Than \n
                0.4 dsUnits or 144 dp.\n
                So Have Been Set To 0.4 !`,'SearchBar Width Cant Be Less Than 0.4. Check Debug Log');
                return 144;
            }
            else {
                return dsUnitsToDp(width,'w');
            }
        }
        let _searchInputWidth = function(){
            return dsUnitsToDp(width,'w') - 128;
        }
        _search = app.AddLayout(parentLayout, 'Card');
        _search.SetCornerRadius(36)
        _search.SetSize(_searchBarWidth(), 56, 'dp')
        _search.SetBackColor(searchBarClr.value);
        
        _searchContainer = app.AddLayout(_search, 'Linear','Horizontal,Left')
        _leadingIcon = app.AddButton(_searchContainer, leadingIcon, null, null, 'Custom,Lego');
        _leadingIcon.SetSize(34, 34, 'dp');
        _leadingIcon.SetTextSize(24)
        _leadingIcon.SetTextColor(searchBarTextClr.value)
        _leadingIcon.SetStyle(searchBarIconClr.value,searchBarIconClr.value,_iconRadius,null,null,0);
        _leadingIcon.SetFontFile(defaultIcons)
        _leadingIcon.SetMargins(16,13,16,null,'dp')
        
        _searchInput = app.AddTextEdit(_searchContainer, '', null,null,'Singleline,Left')
        _searchInput.SetBackColor(searchBarClr.value)
        _searchInput.SetMargins(null,8,null,null,'dp')
        _searchInput.SetSize(_searchInputWidth(), -1, 'dp');
        _searchInput.SetTextColor(searchBarInputTextClr.value);
        
        
        
        if(hint !== null){
            _searchInput.SetHint(hint);
        }
        
        
        _trailingIcon = app.AddButton(_searchContainer, trailingIcon, null, null, 'Custom,Lego');
        _trailingIcon.SetSize(34, 34, 'dp');
        _trailingIcon.SetTextSize(24)
        _trailingIcon.SetTextColor(searchBarTextClr.value)
        _trailingIcon.SetStyle(searchBarIconClr.value,searchBarIconClr.value,_iconRadius,null,null,0);
        _trailingIcon.SetFontFile(defaultIcons)
        _trailingIcon.SetMargins(16,13,16,null,'dp')
        
        //SetOnTouch Implementation
        _leadingIcon.SetOnTouch(function(){
            if(searchObj.onTouch){
                M(this, searchObj.onTouch(leadingIcon))
        
            }
        });
        
        _trailingIcon.SetOnTouch(function(){
            if(searchObj.onTouch){
                M(this, searchObj.onTouch(trailingIcon))
            }
        });
        
        searchBarClr.subscribe((value)=>{
            _search.SetBackColor(value);
            _searchInput.SetBackColor(value)
        })
        
        searchBarIconClr.subscribe((value)=>{
            _leadingIcon.SetStyle(value,value,_iconRadius,null,null,0);
            _trailingIcon.SetStyle(value,value,_iconRadius,null,null,0);
        })
        
        searchBarTextClr.subscribe((value)=>{
            _leadingIcon.SetTextColor(value);
            _trailingIcon.SetTextColor(value)
        })
        
        searchBarInputTextClr.subscribe((value)=>{
            _searchInput.SetTextColor(value);
        })
        
    }
    
    function drawSearchWithAvatar() {
        let _search, _searchContainer, _leadingIcon, _searchInput, _trailingIcon, _trailingLay;
        
        let _iconRadius = 50/100 * 34;
        let _searchBarWidth = function(){
            if (dsUnitsToDp(width,'w') < 144){
                warnDeveloper(`SearchBar Width Cant Be Less Than \n
                0.4 dsUnits or 144 dp.\n
                So Have Been Set To 0.4 !`,'SearchBar Width Cant Be Less Than 0.4. Check Debug Log');
                return 144;
            }
            else {
                return dsUnitsToDp(width,'w');
            }
        }
        let _searchInputWidth = function(){
            return dsUnitsToDp(width,'w') - 128;
        }
        _search = app.AddLayout(parentLayout, 'Card');
        _search.SetCornerRadius(36)
        _search.SetSize(_searchBarWidth(), 56, 'dp')
        _search.SetBackColor(searchBarClr.value);
        
        _searchContainer = app.AddLayout(_search, 'Linear','Horizontal,Left')
        _leadingIcon = app.AddButton(_searchContainer, leadingIcon, null, null, 'Custom,Lego');
        _leadingIcon.SetSize(34, 34, 'dp');
        _leadingIcon.SetTextSize(24)
        _leadingIcon.SetTextColor(searchBarTextClr.value)
        _leadingIcon.SetStyle(searchBarIconClr.value,searchBarIconClr.value,_iconRadius,null,null,0);
        _leadingIcon.SetFontFile(defaultIcons)
        _leadingIcon.SetMargins(16,13,16,null,'dp')
        
        _searchInput = app.AddTextEdit(_searchContainer, '', null,null,'Singleline,Left')
        _searchInput.SetBackColor(searchBarClr.value)
        _searchInput.SetMargins(null,8,null,null,'dp')
        _searchInput.SetSize(_searchInputWidth(), -1, 'dp');
        _searchInput.SetTextColor(searchBarInputTextClr.value);
        
        if(hint !== null){
            _searchInput.SetHint(hint);
        }
        
        //Check If Image File Exists And If Not Dont Procced
        if (!app.FileExists(trailingIcon)){
            warnDeveloper(`The Avatar ${trailingIcon}, Does Not Exist`,'Search Avatar Not Found');
            return
        }
        
        else{
        _trailingLay = app.AddLayout(_searchContainer,'Card');
        _trailingLay.SetCornerRadius(15)
        _trailingIcon = app.AddImage(_trailingLay, trailingIcon, null, null,'async')
        _trailingIcon.SetSize(30, 30, 'dp');
        _trailingLay.SetMargins(16,13,16,null,'dp')
        }
        _leadingIcon.SetOnTouch(function(){
            if(searchObj.onTouch){
                M(this, searchObj.onTouch(leadingIcon))
                }
        });
        
        _trailingIcon.SetOnTouchDown(function(){
            if(searchObj.onTouch){
                M(this,searchObj.onTouch('avatar'))
            }
        });
        searchBarClr.subscribe((value)=>{
            _search.SetBackColor(value);
            _searchInput.SetBackColor(value)
        })
        
        searchBarIconClr.subscribe((value)=>{
            _leadingIcon.SetStyle(value,value,_iconRadius,null,null,0);
            _trailingIcon.SetStyle(value,value,_iconRadius,null,null,0);
        })
        
        searchBarTextClr.subscribe((value)=>{
            _leadingIcon.SetTextColor(value);
            _trailingIcon.SetTextColor(value)
        })
        
        searchBarInputTextClr.subscribe((value)=>{
            _searchInput.SetTextColor(value);
        })
    }
    
    function drawSearchWithTwoIcons(firstTrailingIcon, secondTrailingIcon) {
        let _search, _searchContainer, _leadingIcon, _searchInput, _firstTrailingIcon,
        _secondTrailingIcon;
        let _iconRadius = 50/100 * 34;
        let _searchBarWidth = function(){
            if (dsUnitsToDp(width,'w') < 144){
                warnDeveloper(`SearchBar Width Cant Be Less Than \n
                0.4 dsUnits or 144 dp.\n
                So Have Been Set To 0.4 !`,'SearchBar Width Cant Be Less Than 0.4. Check Debug Log');
                return 144;
            }
            else {
                return dsUnitsToDp(width,'w');
            }
        }
        let _searchInputWidth = function(){
            return dsUnitsToDp(width,'w') - 176;
        }
        
        _search = app.AddLayout(parentLayout, 'Card');
        _search.SetCornerRadius(36)
        _search.SetSize(_searchBarWidth(), 56, 'dp')
        _search.SetBackColor(searchBarClr.value);
        
        _searchContainer = app.AddLayout(_search, 'Linear','Horizontal,Left')
        _leadingIcon = app.AddButton(_searchContainer, leadingIcon, null, null, 'Custom,Lego');
        _leadingIcon.SetSize(34, 34, 'dp');
        _leadingIcon.SetTextSize(24)
        _leadingIcon.SetTextColor(searchBarTextClr.value)
        _leadingIcon.SetStyle(searchBarIconClr.value,searchBarIconClr.value,_iconRadius,null,null,0);
        _leadingIcon.SetFontFile(defaultIcons)
        _leadingIcon.SetMargins(16,13,16,null,'dp')
        
        _searchInput = app.AddTextEdit(_searchContainer, '', null,null,'Singleline,Left')
        _searchInput.SetBackColor(searchBarClr.value)
        _searchInput.SetMargins(null,8,null,null,'dp')
        _searchInput.SetSize(_searchInputWidth(), -1, 'dp');
        _searchInput.SetTextColor(searchBarInputTextClr.value);
        
        if(hint !== null){
            _searchInput.SetHint(hint);
        }
        
        
        _firstTrailingIcon = app.AddButton(_searchContainer, firstTrailingIcon, null, null, 'Custom,Lego');
        _firstTrailingIcon.SetSize(34, 34, 'dp');
        _firstTrailingIcon.SetTextSize(24)
        _firstTrailingIcon.SetTextColor(searchBarTextClr.value)
        _firstTrailingIcon.SetStyle(searchBarIconClr.value,searchBarIconClr.value,_iconRadius,null,null,0);
        _firstTrailingIcon.SetFontFile(defaultIcons)
        _firstTrailingIcon.SetMargins(16,13,8,null,'dp')
        
        _secondTrailingIcon = app.AddButton(_searchContainer, secondTrailingIcon, null, null, 'Custom,Lego');
        _secondTrailingIcon.SetSize(34, 34, 'dp');
        _secondTrailingIcon.SetTextSize(24)
        _secondTrailingIcon.SetTextColor(searchBarTextClr.value)
        _secondTrailingIcon.SetStyle(searchBarIconClr.value,searchBarIconClr.value,_iconRadius,null,null,0);
        _secondTrailingIcon.SetFontFile(defaultIcons)
        _secondTrailingIcon.SetMargins(null,13,16,null,'dp')
        
        //SetOnTouch Implementation
        _leadingIcon.SetOnTouch(function(){
            if(searchObj.onTouch){
                M(this,searchObj.onTouch(leadingIcon))
            }
        });
        
        _firstTrailingIcon.SetOnTouch(function(){
            if(searchObj.onTouch){
                M(this, searchObj.onTouch(firstTrailingIcon))
            }
        });
        
         _secondTrailingIcon.SetOnTouch(function(){
            if(searchObj.onTouch){
                M(this,searchObj.onTouch(secondTrailingIcon))
            }
        });
        
        searchBarClr.subscribe((value)=>{
            _search.SetBackColor(value);
            _searchInput.SetBackColor(value)
        })
        
        searchBarIconClr.subscribe((value)=>{
            _leadingIcon.SetStyle(value,value,_iconRadius,null,null,0);
            _firstTrailingIcon.SetStyle(value,value,_iconRadius,null,null,0);
            _secondTrailingIcon.SetStyle(value,value,_iconRadius,null,null,0);
        })
        
        searchBarTextClr.subscribe((value)=>{
            _leadingIcon.SetTextColor(value);
            _firstTrailingIcon.SetTextColor(value)
             _secondTrailingIcon.SetTextColor(value)
        })
        
        searchBarInputTextClr.subscribe((value)=>{
            _searchInput.SetTextColor(value);
        })
        
    }
    
    function drawSearchWithAvatarIcon(firstTrailingIcon, secondTrailingIcon) {
        
    
        let _iconRadius = 50/100 * 34;
        let _searchBarWidth = function(){
            if (dsUnitsToDp(width,'w') < 144){
                warnDeveloper(`SearchBar Width Cant Be Less Than \n
                0.4 dsUnits or 144 dp.\n
                So Have Been Set To 0.4 !`,'SearchBar Width Cant Be Less Than 0.4. Check Debug Log');
                return 144;
            }
            else {
                return dsUnitsToDp(width,'w');
            }
        }
        let _searchInputWidth = function(){
            return dsUnitsToDp(width,'w') - 178;
        }
        
        
        
        _search = app.AddLayout(parentLayout, 'Card');
        _search.SetCornerRadius(36)
        _search.SetSize(_searchBarWidth(), 56, 'dp')
        _search.SetBackColor(searchBarClr.value);
        
        _searchContainer = app.AddLayout(_search, 'Linear','Horizontal,Left')
        _leadingIcon = app.AddButton(_searchContainer, leadingIcon, null, null, 'Custom,Lego');
        _leadingIcon.SetSize(34, 34, 'dp');
        _leadingIcon.SetTextSize(24)
        _leadingIcon.SetTextColor(searchBarTextClr.value)
        _leadingIcon.SetStyle(searchBarIconClr.value,searchBarIconClr.value,_iconRadius,null,null,0);
        _leadingIcon.SetFontFile(defaultIcons)
        _leadingIcon.SetMargins(16,13,16,null,'dp')
        
        _searchInput = app.AddTextEdit(_searchContainer, '', null,null,'Singleline,Left')
        _searchInput.SetBackColor(searchBarClr.value)
        _searchInput.SetMargins(null,8,null,null,'dp')
        _searchInput.SetSize(_searchInputWidth(), -1, 'dp');
        _searchInput.SetTextColor(searchBarInputTextClr.value);
        
        if(hint !== null){
            _searchInput.SetHint(hint);
        }
        
        _trailingIcon = app.AddButton(_searchContainer, firstTrailingIcon, null, null, 'Custom,Lego');
        _trailingIcon.SetSize(34, 34, 'dp');
        _trailingIcon.SetTextSize(24)
        _trailingIcon.SetTextColor(searchBarTextClr.value)
        _trailingIcon.SetStyle(searchBarIconClr.value,searchBarIconClr.value,_iconRadius,null,null,0);
        _trailingIcon.SetFontFile(defaultIcons)
        _trailingIcon.SetMargins(16,13,8,null,'dp')
        
        _avatarLay = app.AddLayout(_searchContainer,'Card');
        _avatarLay.SetCornerRadius(15)
        _avatarIcon = app.AddImage(_avatarLay, secondTrailingIcon, null, null,'async')
        _avatarIcon.SetSize(30, 30, 'dp');
        _avatarLay.SetMargins(0,13,16,null,'dp')
        
        //SetOnTouch Implementation
        _leadingIcon.SetOnTouch(function(){
            if(searchObj.onTouch){
                M(this, searchObj.onTouch(leadingIcon))
                //searchObj.onTouch(leadingIcon);
            }
        });
        
        _trailingIcon.SetOnTouch(function(){
            if(searchObj.onTouch){
                M(this, searchObj.onTouch(firstTrailingIcon))
                //searchObj.onTouch(firstTrailingIcon);
            }
        });
        
        
        _avatarIcon.SetOnTouchDown(function(){
            if(searchObj.onTouch){
                M(this,searchObj.onTouch('avatar'))
                //searchObj.onTouch('avatar');
            }
        });
    searchBarClr.subscribe((value)=>{
            _search.SetBackColor(value);
            _searchInput.SetBackColor(value)
        })
        
        searchBarIconClr.subscribe((value)=>{
            _leadingIcon.SetStyle(value,value,_iconRadius,null,null,0);
            _firstTrailingIcon.SetStyle(value,value,_iconRadius,null,null,0);
            _secondTrailingIcon.SetStyle(value,value,_iconRadius,null,null,0);
        })
        
        searchBarTextClr.subscribe((value)=>{
            _leadingIcon.SetTextColor(value);
            _firstTrailingIcon.SetTextColor(value)
             _secondTrailingIcon.SetStyle(value,value,_iconRadius,null,null,0);
        })
        
        searchBarInputTextClr.subscribe((value)=>{
            _searchInput.SetTextColor(value);
        })
    }
}

function secTabObject(listOfTabs, width, height, options, parentLay) {
    let _secondaryTab;
    
    this.SetMargins = function(left,top,right,bottom,mode){
        _secondaryTab.SetMargins(left,top,right,bottom,mode)
    }
    
    this.SetPosition = function(left, top, width, height, options){
        _secondaryTab.SetPosition(left, top, width, height, options);
    }
    this.Gone = function(){
        _secondaryTab.Gone();
    }
    
    this.SetVisibility = function(mode){
        _secondaryTab.SetVisibility(mode)
    }
    if (!parentLay) {
        warnDeveloper('No Parent To Tab', 'No Parent To Tab');
    } 
    else {
        _secondaryTab = drawSecondaryTabs(listOfTabs, width, height, options, parentLay);
    }
}

function drawSecondaryTabs(listOfTabs, width, height, options, parentLay){
    let __activeTab;
    
    let qaudTween = 'Quadratic.In';
    let linTween = 'Linear.None'
    let __tabCount = listOfTabs.split(',').length;
    
    const noOfTabs = (listOfTabs) =>{
        if(__tabCount >= 1 && __tabCount <= 3){
           __firstTab = listOfTabs.split(',')[0];
           __secondTab = listOfTabs.split(',')[1], 
           __thirdTab = listOfTabs.split(',')[2]
        }
        else {
            warnDeveloper(`You must have 2 or more tabs`);
            return;
        }
    }
    
    noOfTabs(listOfTabs);
    
    let __secondaryMain = app.AddLayout(parentLay, 'Linear','Vertical')
    __secondaryMain.SetSize(width, height);
   
    
    let __secondaryTab = app.AddLayout(__secondaryMain, 'Card','Vertical');
    __secondaryTab.SetMargins(0,0,0,null);
    __secondaryTab.SetSize(pxToDpConversion(DW()), 48, 'dp');
    __secondaryTab.SetBackColor(secondaryTabClr.value);
    
    let __secTabInnerTab = app.AddLayout(__secondaryTab, 'Absolute','Vertical,Left')
    __secTabInnerTab.SetSize(pxToDpConversion(DW()), 48, 'dp');
    __secTabInnerTab.SetBackColor(secondaryTabClr.value);
    
    __secTabInnerLay = app.AddLayout(__secTabInnerTab, 'Linear','Horizontal');
    __secTabInnerLay.SetSize(pxToDpConversion(DW()), 46, 'dp');
    __secTabInnerLay.SetBackColor(secondaryTabClr.value);
    
    // By default active tab is the first
    
    if (__tabCount == 2){
        if(!__activeTab) {
            __firstTabActive = true;
        }
        
        let __firstTabBtn = app.AddButton(__secTabInnerLay, __firstTab,null,null, 'Custom');
        __firstTabBtn.SetTextColor(secondaryTabTxtClr.value)
        __firstTabBtn.SetStyle(secondaryTabClr.value,secondaryTabClr.value,0,null,null,0)
    
        __firstTabBtn.SetSize(pxToDpConversion(DW())/2,46,'dp')
        __firstTabBtn.SetMargins(0,0,0)
        
        __secondTabBtn = app.AddButton(__secTabInnerLay, __secondTab, 0.5, -1, 'NoPad,Custom');
        __secondTabBtn.SetTextColor(secondaryTabTxtClr.value)
        __secondTabBtn.SetStyle(secondaryTabClr.value,secondaryTabClr.value,0,null,null,0)
        
        __secondTabBtn.SetSize(pxToDpConversion(DW())/2,46,'dp')
        
        lightStrip = app.AddText(__secTabInnerTab,'',null, null,'Wrap')
        lightStrip.SetSize(pxToDpConversion(DW())/2,2,'dp')
        lightStrip.SetBackColor(lightBarClr.value) 
        
        
        const tweenValues = ()=>{
            if(__firstTabActive) return { x: 0.0, y: dpToDsUnit(46) };
            else return { x: 0.5, y: dpToDsUnit(46) };
        }
        
        const lightStripPower = (x) =>{
            /* If We Booted It Shouldnt AppparentLay An Animation */
            
            if(x) lightStrip.SetPosition(0,dpToDsUnit(46),null,null);
            else{
                if(__firstTabActive === true && x === undefined) lightStrip.Tween(tweenValues() ,250,linTween,false,null) 
                else lightStrip.Tween(tweenValues() ,350,qaudTween,false,null) 
            }
        }
        
        lightStripPower(true);
        
        __firstTabBtn.SetOnTouch(()=>{
            if(!__firstTabActive) {
                __firstTabActive = true;
                lightStripPower();
                activeTabLayoutSwitch();
            }
        });
        
        __secondTabBtn.SetOnTouch(()=>{
            if(__firstTabActive) {
                __firstTabActive = false;
                lightStripPower();
                activeTabLayoutSwitch();
            }
        })
        
        /* Add Tab Specific Layouts */
        
        __secondaryLayJacket = app.AddLayout(__secondaryMain, 'Frame', 'Horizontal')
        
        __firstTabLay = ui.createLayout(layoutType, options, width, 
        height - dpToDsUnit(48,'h'), __secondaryLayJacket)
        
        __secondTabLay = ui.createLayout(layoutType, options, width,
        height - dpToDsUnit(48,'h'), __secondaryLayJacket)
        
        
        /* If firstTabActive first layout shows and vice versa */
        
        const activeTabLayoutSwitch = (x) =>{
            if (x) __firstTabLay.Show() || __secondTabLay.Hide();
            else{
            if (__firstTabActive === true && x === undefined){
                __firstTabLay.Animate('SlideFromLeft',null,350) || __secondTabLay.Hide();
            }
            else {
                __firstTabLay.Hide() || __secondTabLay.Animate('SlideFromRight',null,350);
                }
            }
        }
        
        activeTabLayoutSwitch(true);
        
        secTabObject.prototype.SetActiveTab = function(index){
            setTab(index);
        }
        
        const setTab = (index)=>{
            if(__firstTabActive && index == 0) return;
            if(index == 0){
                __firstTabActive = true
                __secondTabLay.Hide() || __firstTabLay.Animate('SlideFromLeft',null,350) 
            }
            if(index == 1){
                 __firstTabActive = false
                __firstTabLay.Hide() || __secondTabLay.Animate('SlideFromLeft',null,350)
            }
            lightStripPower();
        }
    secondaryTabClr.subscribe((value)=>{
        __secTabInnerTab.SetBackColor(value)
        __secTabInnerLay.SetBackColor(value);
        __firstTabBtn.SetStyle(value,value,0,null,null,0)
        __secondTabBtn.SetStyle(value,value,0,null,null,0)
    }) 
    
    secondaryTabTxtClr.subscribe((value)=>{
        __firstTabBtn.SetTextColor(value)
        __secondTabBtn.SetTextColor(value)
    })
    
    lightBarClr.subscribe((value)=>{
        lightStrip.SetBackColor(value) 
    })
    
    }
    
    else {
        /* We use an almost ternary system */
        if(!__activeTab) {
            __firstTabActive = 0;
        }
        
        __firstTabBtn = app.AddButton(__secTabInnerLay, __firstTab,null,null, 'Custom,NoPad');
        __firstTabBtn.SetTextColor(secondaryTabTxtClr.value)
        __firstTabBtn.SetStyle(secondaryTabClr.value,secondaryTabClr.value,0,null,null,0)
        __firstTabBtn.SetSize(pxToDpConversion(DW())/3,46,'dp')
        __firstTabBtn.SetMargins(0,0,0)
        
        __secondTabBtn = app.AddButton(__secTabInnerLay, __secondTab, null, null, 'Custom,NoPad');
        __secondTabBtn.SetTextColor(secondaryTabTxtClr.value)
        __secondTabBtn.SetStyle(secondaryTabClr.value,secondaryTabClr.value,0,null,null,0)
        __secondTabBtn.SetSize(pxToDpConversion(DW())/3,46,'dp')
        
        __thirdTabBtn = app.AddButton(__secTabInnerLay, __thirdTab, null, null, 'Custom,NoPad');
        __thirdTabBtn.SetTextColor(secondaryTabTxtClr.value)
        __thirdTabBtn.SetStyle(secondaryTabClr.value,secondaryTabClr.value,0,null,null,0)
        __thirdTabBtn.SetSize(pxToDpConversion(DW())/3,46,'dp')
        
        lightStrip = app.AddText(__secTabInnerTab,'',null, null)
        lightStrip.SetSize(pxToDpConversion(DW())/3,2,'dp')
        lightStrip.SetBackColor(lightBarClr.value) 
        
        
        const tweenValues = ()=>{
            if(__firstTabActive == 0) return { x: 0.0, y: dpToDsUnit(46) };
            if (__firstTabActive == 1) return { x: 0.33, y: dpToDsUnit(46) };
            else return { x: 0.7, y: dpToDsUnit(46) };
        }
        
        const lightStripPower = (x) =>{
            
            /* If We Booted It Shouldnt Apply An Animation */
            //'Quadratic.In'
            if(x) lightStrip.SetPosition(0,dpToDsUnit(46),null,null);
            
            else{
                if(__firstTabActive === 0 && x === undefined){
                    lightStrip.Tween(tweenValues() ,250,qaudTween,false,null);
                }
                if(__firstTabActive === 1) {
                    lightStrip.Tween(tweenValues() ,250,linTween,false,null);
                }
                
                else lightStrip.Tween(tweenValues() ,250,qaudTween,false,null);
            }
        }
        
        lightStripPower(true);
        
        __firstTabBtn.SetOnTouch(()=>{
            __firstTabActive = 0;
            lightStripPower();
            activeTabLayoutSwitch();
        });
        
        __secondTabBtn.SetOnTouch(()=>{
            
            __firstTabActive = 1;
            lightStripPower();
            activeTabLayoutSwitch();
        })
        
        __thirdTabBtn.SetOnTouch(()=>{
            __firstTabActive = 2;
            lightStripPower();
            activeTabLayoutSwitch();
        })
        
        /* Add Tab Specific Layouts */
        
        __secondaryLayJacket = app.AddLayout(__secondaryMain, 'Frame', 'Horizontal')
        
        __firstTabLay = ui.createLayout(layoutType, options, width, 
        height - dpToDsUnit(48,'h'), __secondaryLayJacket)
        
        __secondTabLay = ui.createLayout(layoutType, options, width,
        height - dpToDsUnit(48,'h'), __secondaryLayJacket)
        
        __thirdTabLay = ui.createLayout(layoutType, options, width,
        height - dpToDsUnit(48,'h'), __secondaryLayJacket)
        
        /* If firstTabActive first layout shows and vice versa */
        
        /* All Layouts must be hidden before animating */
        
        const activeTabLayoutSwitch = (x) =>{
            
            if (x){
                __firstTabLay.Show()
                __secondTabLay.Hide()
                __thirdTabLay.Hide();
            }
            
            else{
                
            if (__firstTabActive === 0 && x === undefined){
                __secondTabLay.Hide()
                __thirdTabLay.Hide() 
                __firstTabLay.Animate('SlideFromLeft',null,350) 
            }
            
            if(__firstTabActive === 1){
               __firstTabLay.Hide()
               __thirdTabLay.Hide()
               __secondTabLay.Animate('SlideFromLeft',null,350)
            }
            
            if(__firstTabActive === 2){
                __firstTabLay.Hide()
                __secondTabLay.Hide()
                __thirdTabLay.Animate('SlideFromRight',null,350);
            }
            }
        }
        
        activeTabLayoutSwitch(true);  
        
       
        
        secTabObject.prototype.SetActiveTab = function(index){
            setTab(index);
        }
        
        const setTab = (index)=>{
            if(index === __firstTabActive) return;
            if(index == 0){
                __firstTabActive = 0
                __secondTabLay.Hide()
                __thirdTabLay.Hide()
                __firstTabLay.Animate('SlideFromLeft',null,350) 
            }
            
            if(index == 1){
                 __firstTabActive = 1
                __firstTabLay.Hide()
                __thirdTabLay.Hide()
                __secondTabLay.Animate('SlideFromLeft',null,350)
            }
            
            if(index == 2){
                 __firstTabActive = 2
                __firstTabLay.Hide()
                __secondTabLay.Hide()
                __thirdTabLay.Animate('SlideFromRight',null,350);
            }
            
            lightStripPower();
        }
    
    secondaryTabClr.subscribe((value)=>{
         __secTabInnerTab.SetBackColor(value)
        __secondaryTab.SetBackColor(value)
        
        __secTabInnerLay.SetBackColor(value);
        __firstTabBtn.SetStyle(value,value,0,null,null,0)
        __secondTabBtn.SetStyle(value,value,0,null,null,0)
        __thirdTabBtn.SetStyle(value,value,0,null,null,0)
    }) 
    
    secondaryTabTxtClr.subscribe((value)=>{
        __firstTabBtn.SetTextColor(value)
        __secondTabBtn.SetTextColor(value)
        __thirdTabBtn.SetTextColor(value)
    })
    
    lightBarClr.subscribe((value)=>{
        lightStrip.SetBackColor(value) 
    })
    }
    
    
    
    secTabObject.prototype.GetTabLayout = function(tab){
        if (tab == __firstTab) return __firstTabLay;
        if (tab == __secondTab) return __secondTabLay;
        if (tab == __thirdTab) return __thirdTabLay;
    }
    
    return __secondaryMain;
}


/* SnackBar doesnt need a signal.
   Because if started in light mode
   it will do correct
   as in dark mode since its using 
   stateColor.
   It redeclares and dissapears unlike a
   button its permanent
*/

function SnackBarObject(text, btnAction, width, alignment) {
    
    let snackContainer;
    
    this.SetRawAlignment = function (top) {
        this.top = top;
    }
    
    this.SetTimeout = function (timeout) {
        this.timeout = timeout;
    }
    
    this.SetOnAction = function (onTouch) {
        this.onTouch = onTouch;
    }
    
    this.Show = function () {
        snackContainer = M(null,drawSnackBarUi(text, btnAction, width, alignment, this.onTouch, this.timeout, this.top));
    }
    
}

function drawSnackBarUi(text, btnAction, width, alignment, onTouch, timeout, top) {
    let snackUi;
    
    snackContainer = app.CreateLayout('Linear', alignment + ',FillXY,TouchThrough,Center');
    snackUi = app.CreateLayout('Card', '');
    
    snackContainer.AddChild(snackUi);
    if (top) {
        snackContainer.SetMargins(null, top);
    }
    snackUi.SetMargins(0.055, 0.018, 0.055, 0.018);
    snackUi.SetCornerRadius(4);
    snackUi.SetElevation(6);
    snackUi.SetSize(width, 0.065);
    
    const box = app.CreateLayout("Linear", "Horizontal");
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
    
    
    
    
    box.SetBackColor(inverseSurface)
    snackText.SetTextColor(inverseOnSurface)
    snackButton.SetTextColor(inversePrimary)
    
    if (timeout === undefined) {
        setTimeout(function () {
            snackContainer.Animate('FadeOut', null, 980);
            //app.DestroyLayout(snackContainer);
            //snackContainer.Destroy()
            this.snackContainer.Release();
        }, 3000);
    } else {
        setTimeout(function () {
            this.snackContainer.Animate('FadeOut', null, 300);
            app.DestroyLayout(this.snackContainer);
            this.snackContainer.Destroy()
        }, timeout);
    }
    app.AddLayout(snackContainer);
    return snackContainer;
}


//Variable Is made global so that clearInterval with method
//stopProgress works, to avoid an not defined error.
var animation, progressContainer, _progressIndicator;


function progressObject(progressType, width, parentLay) {
    
    this.StopProgress = function () {
        progressContainer.Hide();
        progressContainer.Destroy();
        clearInterval(animation);
    }
    
    this.SetValue = function (value) {
        this.value = value;
        //
        _progressIndicator.SetSize(M(progressContainer, parseFloat(value / 100), 0.05));
    }
    
    this.HideContainer = function () {
        app.DestroyLayout(this.progressContainer);
    }
    
    this.GetValue = function () {
        return this.value;
    }
    
    this.SetMargins = function (left, top, right, bottom, mode) {
        progressContainer.SetMargins(left, top, right, bottom, mode)
    }
    this.SetPosition = function (left, top, width, height, options) {
        progressContainer.SetPosition(left, top, width, height, options)
    }
    
    if (!parentLay){
        warnDeveloper('No Parent For Progress','No Parent For Progress');
    }
    else{
        drawProgressBar(progressType, width, parentLay, this);
    }
}

function drawProgressBar(progressType, width, parentLay, progressObj) {
    
    if (progressType === 'linear') {
        let trackColor = '#E6E0E9';
        progressContainer = app.CreateLayout('Linear', 'Horizontal,Left,FillXY');
        progressContainer.SetSize(width, 0.005);
        _progressIndicator = app.AddText(progressContainer, '');
        
        progressContainer.SetBackColor(progressBackClr.value)
        _progressIndicator.SetBackColor(progressIndicatorClr.value)
       
        progressBackClr.subscribe((value)=>{
            progressContainer.SetBackColor(value)
        })
        
        progressIndicatorClr.subscribe((value)=>{
            _progressIndicator.SetBackColor(value)
        })
        parentLay.AddChild(progressContainer);
    }
    
    if (progressType === 'linearIntermediate') {
        
        progressContainer = app.CreateLayout('Linear', 'Horizontal,Left,FillXY');
        progressContainer.SetSize(width, 0.005);
        
        _progressIndicator = app.AddText(progressContainer, '', null, null, 'Left,FillXy');
        
        animation = setInterval(function () {
            _progressIndicator.Animate('SlideToRight', null, null);
        }, 600);
        
        progressContainer.SetBackColor(progressBackClr.value)
        _progressIndicator.SetBackColor(progressIndicatorClr.value)
        
        progressBackClr.subscribe((value)=>{
            progressContainer.SetBackColor(value)
        })
        
        progressIndicatorClr.subscribe((value)=>{
            _progressIndicator.SetBackColor(value)
        });
        
        parentLay.AddChild(progressContainer);
    }
} 
