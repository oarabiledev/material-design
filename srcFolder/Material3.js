/* Material Design 3 Plugin.
   
   This Project Is Licensed
   Under The MIT License.
   @ 2024 - Till Forever.
*/

cfg.Fast
_Boost(true)

const ui = {};

app.Script('EnvVars.js',true);
app.Script('Actions.js',true);
app.Script('Electors.js',true);
app.Script('Navigators.js',true);
app.Script('Transmitters.js',true);
/* Added To Load Variables 
   While Not Waiting For 
   The Main Script To 
   Be Compiled.
*/

/** Initialize Material3, basically reads your baseTheme.json File
*/
ui.InitializeMaterialPlugin = function() {
    if (!app.FileExists('baseTheme.json')) {
        warnDeveloper(ErrorCodes["404"]);
        return;
    } 
    else {
        setM3BaseColors();
    }
    isInitialized.value = true;
}

/** Initialize Material3, basically reads your baseTheme.json File. Also Old.
*/
app.CreateMaterial3 = () => {
    ui.InitializeMaterialPlugin();
    warnDeveloper(ErrorCodes["301"]+`
    \nUse ui.InitializeMaterialPlugin()`);
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
            app.SetStatusBarColor(md_theme_dark_background);
            
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

/* Global Variables & Functions Here */

var theme;
let defaultFont = _m3Path + 'Roboto.ttf';
let mediumFont = _m3Path + 'Roboto-Medium.ttf';
let boldFont = _m3Path + 'Roboto-Bold.ttf';




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

function setM3BaseColors(isThemeChanging, file) {

  if (isThemeChanging !== undefined) {
    appTheme = app.ReadFile(file, 'UTF-8');
  } 
  else appTheme = app.ReadFile('baseTheme.json', 'UTF-8');
  
  jsonData = JSON.parse(appTheme)
  
  iconFill = jsonData.baseIcons;
  
  if(iconFill == undefined){
      defaultIcons = _m3Path + 'uxFonts/Icons/Outlined-Regular.otf';
  }
  else{
  switch (iconFill) {
    case 'outlined':
      defaultIcons = _m3Path + 'uxFonts/Icons/Outlined-Regular.otf';
      break;
    case 'sharp':
      defaultIcons = _m3Path + 'uxFonts/Icons/Sharp-Regular.otf';
      break;
    case 'two-tone':
      defaultIcons = _m3Path + 'uxFonts/Icons/TwoTone-Regular.otf';
      break;
    case 'round':
      defaultIcons = _m3Path + 'uxFonts/Icons/Round-Regular.otf'
      break;
  }
  } 
  //alert(defaultIcons)
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
  
  backgroundClr.value = stateColor(md_theme_light_background, md_theme_dark_background)
  
  filledBtnClr.value = stateColor(md_theme_light_primary, md_theme_dark_primary)
  
  filledBtnTxtClr.value = stateColor(md_theme_light_onPrimary, md_theme_dark_onPrimary)
  
  elevatedBtnClr.value = stateColor(md_theme_light_secondaryContainer, md_theme_dark_secondaryContainer);
  
  elevatedBtnTxtClr.value = stateColor(md_theme_light_primary, md_theme_dark_primary);
  
  filledTonalBtnClr.value = stateColor(md_theme_light_primaryContainer, md_theme_dark_primaryContainer)
  
  filledTonalBtnTxtClr.value = stateColor(md_theme_light_onSecondaryContainer, md_theme_dark_onSecondaryContainer)
  
  textBtnTxtClr.value = stateColor(md_theme_light_primary, md_theme_dark_primary)
  
  outlinedBtnClr.value = stateColor(md_theme_light_surface, md_theme_dark_surface);
  
  outlinedBtnTxtClr.value = stateColor(md_theme_light_primary, md_theme_dark_primary);
  
  _smallFabClr.value = stateColor(md_theme_light_primaryContainer, md_theme_dark_primaryContainer);
  
  _smallFabTxtClr.value = stateColor(md_theme_light_onPrimaryContainer, md_theme_dark_onPrimaryContainer);
  
  _fabColor.value = stateColor(md_theme_light_primaryContainer, md_theme_dark_primaryContainer)
  
  _fabIconClr.value = stateColor(md_theme_light_onPrimaryContainer, md_theme_dark_onPrimaryContainer)
  
  progressBackClr.value = stateColor(md_theme_light_surfaceVariant,md_theme_dark_surfaceVariant)
  
  progressIndicatorClr.value = stateColor(md_theme_light_primary,md_theme_dark_primary)
  
   appBarColor.value = stateColor(md_theme_light_surface, md_theme_dark_surface)
  
  appBarIconColor.value = stateColor(md_theme_light_background,md_theme_dark_background);
  
  appBarTextsClr.value = stateColor(md_theme_light_onSurface, md_theme_dark_onSurface);
  
  bottomBarAppClr.value = stateColor(md_theme_light_surfaceVariant,md_theme_dark_surfaceVariant)
  
  bottomBarAppTxtClr.value = stateColor(md_theme_light_onPrimaryContainer,md_theme_dark_onPrimaryContainer)
  
  bottomAppBarFAB.value = stateColor(md_theme_light_primaryContainer,md_theme_dark_primaryContainer)
    
  searchBarClr.value = stateColor(md_theme_light_surfaceVariant,md_theme_dark_surfaceVariant);
  
  searchBarIconClr.value = stateColor(md_theme_light_surfaceVariant,md_theme_dark_surfaceVariant);
  
  searchBarTextClr.value = stateColor(md_theme_light_onSurface,md_theme_dark_onSurface)
  
  searchBarInputTextClr.value = stateColor(md_theme_light_onSurfaceVariant,md_theme_dark_onSurfaceVariant)
  
  secondaryTabClr.value = stateColor(md_theme_light_surface, md_theme_dark_surface)
  
  
  lightBarClr.value = stateColor(md_theme_light_primary, md_theme_dark_primary)
  
  secondaryTabTxtClr.value = stateColor(md_theme_light_onSurface, md_theme_dark_onSurface)
  
  smallAppBarClr.value = stateColor(md_theme_light_surface, md_theme_dark_surface)
  
  smallAppBarIconClr.value = stateColor(md_theme_light_onSurface, md_theme_dark_onSurface)
  
  switchColor.value = stateColor(md_theme_light_secondaryContainer,md_theme_dark_secondaryContainer)
  
  switchHandleOffColor.value = stateColor(md_theme_light_outline,md_theme_dark_outline)
  
  switchHandleOnColor.value = stateColor(md_theme_light_primary,md_theme_dark_primary);
  
  switchSettingTextClr.value = stateColor(md_theme_light_onSurface,md_theme_dark_onSurface)
  
  mediumBarClr.value = stateColor(md_theme_light_surface, md_theme_dark_surface)
}
