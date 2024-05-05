/* Material Design 3 Plugin.
   
   This Project Is Licensed
   Under The MIT License.
   @ 2024 - Till Forever.
*/

cfg.Fast
_Boost(true)

module.exports = {};

/* Added To Load Variables 
   While Not Waiting For 
   The Main Script To 
   Be Compiled.
*/

/** Initialize Material3, basically reads your baseTheme.json File
*/
module.exports.InitializeMaterialPlugin = function() {
    app.SetDebug('console')
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
    module.exports.InitializeMaterialPlugin();
    warnDeveloper(ErrorCodes["301"]+`
    \nUse module.exports.InitializeMaterialPlugin()`);
}

/**
 * @param {string} mode - 'light' or 'dark'
*/
module.exports.setTheme = function (mode) {
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


/**Experimental Api - Bmodule.exportsldFromForm
*/

module.exports.readFromForm = function(){
    
}

/*Experimental Api - Bmodule.exportsld Hybrid Apps using Euphoria 
  Framework.
  https://github.com/oarabiledev/Euphoria
*/

/**
 * @param {json} appProps - Properties like page routing in json
*/
module.exports.mixWithEuphoria = function(appProps){
    folderName = app.GetAppName();
    
    // Create A New Folder Called Euphoria
    
    fs = app.MakeFolder('Euphoria');
    
    moveNxpXFolder = app.CopyFolder()
    AppJsFile = app.CreateFile('Euphoria/App.mjs','rw');
    //AppJsFile.WriteData()
    
    euphoriaServer = app.CreateWebServer(5188,'ListDir');
    euphoriaServer.SetFolder('./');
    euphoriaServer.Start();
    
    var ip = app.GetIPAddress();
    app.Alert( ip +":5188", "Type the following address into your browser" );
}

/**
 * @param {string} type - A DroidScript Layout Type
 * @param {string} options - Options For Layout, i.e: FillXY
 * @param {number} width - layout Width in DroidScript Scale 0 - 1
 * @param {number} height - layout height in DroidScript Scale 0 - 1
*/
module.exports.createLayout = function(type, options, width, height, parentLay) {
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

module.exports.addFilledButton = function (btnName, width, height, icon, parentLay) {
    return new filledButtonObject(btnName, width, height, icon, parentLay);
}

/**
 * @param {string} btnName - Name Of Your Button
 * @param {number} width - Width in DroidScript Scale 0 - 1
 * @param {number} height - Height in DroidScript Scale 0 - 1
 * @param {string} icon - Favicon for button (dont add fa)
 * @param {object} parentLay - parent For Button
*/
module.exports.addElevatedButton =  function (btnName, width, height, icon, parentLay) {
    return new elevatedButtonObject(btnName, width, height, icon, parentLay);
}

/**
 * @param {string} btnName - Name Of Your Button
 * @param {number} width - Width in DroidScript Scale 0 - 1
 * @param {number} height - Height in DroidScript Scale 0 - 1
 * @param {string} icon - Favicon for button (dont add fa)
 * @param {object} parentLay - parent For Button
*/
module.exports.addFilledTonalButton = function (btnName, width, height, icon, parentLay) {
    return new filledTonalButtonObject(btnName, width, height, icon, parentLay);
}

/**
 * @param {string} btnName - Name Of Your Button
 * @param {number} width - Width in DroidScript Scale 0 - 1
 * @param {number} height - Height in DroidScript Scale 0 - 1
 * @param {string} icon - Favicon for button (dont add fa)
 * @param {object} parentLay - parent For Button
*/
module.exports.addOutlinedButton = function (btnName, width, height, icon, parentLay) {
    return new outlinedButtonObject(btnName, width, height, icon, parentLay);
}

/**
 * @param {string} btnName - Name Of Your Button
 * @param {number} width - Width in DroidScript Scale 0 - 1
 * @param {number} height - Height in DroidScript Scale 0 - 1
 * @param {string} icon - Favicon for button (dont add fa)
 * @param {object} parentLay - parent For Button
*/   
module.exports.addTextButton = function (btnName, width, height, icon, parentLay) {
    return new textButtonObject(btnName, width, height, icon, parentLay);
}

/**
 * @param {string} icon - Icon
 * @param {object} layout - parent For Component
*/ 
module.exports.addSmallFAB = function (icon, layout) {
    return new smallFABObject(icon, layout);
}

/**
 * @param {string} icon - Icon
 * @param {object} layout - parent For Component
*/ 
module.exports.addFAB = function (icon, layout) {
    return new fabObject(icon, layout);
}

/**
 * @param {string} icon - Icon
 * @param {object} layout - parent For Component
*/ 
module.exports.addLargeFAB = function (icon, layout) {
    return new largeFABObject(icon, layout);
}
    
module.exports.addChip = function (type, text, icon, width, height, parentLay) {
    return new chipObject(type, text, icon, width, height, parentLay);
}

/**
 * @param {string} text - Information displayed on SnackBar
 * @param {string} btnAction - Name of The Button
 * @param {number} width - Width in DroidScript Scale 0 -1
*/
module.exports.addSnackBar = function (text, btnAction, width, alignment) {
    return new SnackBarObject(text, btnAction, width, alignment);
}

/**
 * @param {string} progressType - Progress Bar Type (linear,linearIntermediate or Circular)
 * @param {number} width - Width In DroidScript Scale 0 -1
 * @param {object} layout - Parent For SnackBar
*/ 
module.exports.addProgressBar = function (progressType, width, layout) {
    return new progressObject(progressType, width, layout);
}

/**
    * @param {string} title - AppBar Title
    * @param {string} leadingIcon - Left Icon of AppBar
    * @param {string} controlsIcons - Upto 3 Icons in a String With Commas.
    * @param {object} parentLay - ParentLayout For AppBar
*/
module.exports.addAlignedAppBar = function (title, leadingIcon, controlIcons, parentLay) {
    return new centerAlignedAppBarObj(title, leadingIcon, controlIcons, parentLay);
}

/**
    * @param {string} title - AppBar Title
    * @param {string} leadingIcon - Left Icon of AppBar
    * @param {string} controlsIcons - Upto 3 Icons in a String With Commas.
    * @param {object} parentLay - ParentLayout For AppBar
*/
module.exports.addSmallAppBar = function(title, leadingIcon, controlIcons, parentLay){
    return new smallAppBarObject(title, leadingIcon, controlIcons, parentLay);
}


/**
 * @param {json} barPropsInjson - Properties in a JSON Format
 * @param {object} parentLayout - Parent For bottomBar
*/

module.exports.addBottomAppBar = function (barPropsInjson, parentLayout) {
    return new bottomBarObject(barPropsInjson, parentLayout);
}

/**
 * @param {string} leadingIcon - Icon (Material Icon)
 * @param {string} leadingIcon - Icon (Material Icon)
 * @param {string} hint - Search Hint on TextArea
 * @param {number} width - Width In DroidScript Scale 0 -1
 * @param {object} layout - Parent For SearchBar
*/
module.exports.addSearchBar = function(leadingIcon, trailingIcon, hint, width, parentLayout){
    return new searchBarObject(leadingIcon, trailingIcon, hint, width, parentLayout);
}

/**
 * @param {string} listOfTabs - listOfTabs With Commas As One String
 * @param {number} width - Width In DroidScript Scale 0 -1
 * @param {number} height - Height In DroidScript Scale 0 -1
 * @param {string} options - Options
 * @param {object} parentLay - Parent for Tab Component
*/
module.exports.addTabs = function(listOfTabs,width, height, options, parentLay){
    return new secTabObject(listOfTabs,width, height, options, parentLay);
}
    

/* Global Variables & Functions Here */

var theme;

var _mDebug,_m3Path,privateFolder;

_mDebug = app.GetAppPath().endsWith('/Material3');
privateFolder = 
app.GetPrivateFolder('Plugins') + '/material3/';
_m3Path = _mDebug ? '' : privateFolder;

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
    
    let outline = ()=>{
        return stateColor(md_theme_light_outline,
        md_theme_dark_outline)
    }
    
    let _outlinedButton = app.AddButton(parentLay, null, width, height, 'Custom,FontAwesome');
    _outlinedButton.SetFontFile(defaultFont)
    _outlinedButton.SetTextColor(outlinedBtnTxtClr.value);
    
    if (icon === null) {
        _outlinedButton.SetText(btnName);
    } else _outlinedButton.SetText(`[fa-${icon}]` + ' ' + btnName);
    
    _outlinedButton.SetStyle(outlinedBtnClr.value, outlinedBtnClr.value, 20, outline(), 1, 0);
    
    outlinedBtnClr.subscribe((value)=>{
        _outlinedButton.SetStyle(value, value, 20, outline(), 1, 0);
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

function drawAppBar(title, leadingIcon, controlIcons, parentLay, appBarObj) {
    barCardLay = app.AddLayout(parentLay, "Card");
    barCardLay.SetSize(DW(), dpToPxConversion(64), 'px');
    
    barCardLay.SetBackColor(appBarColor.value)
    barCardLay.SetMargins(0, 0)
    
    
    barUi = app.CreateLayout('Linear', 'Horizontal,Left');
    barCardLay.AddChild(barUi);
    
    
    _IconRadius = 50/100 * 120;
    
    _leftIcon = app.AddButton(barUi, leadingIcon, null, null, 'Custom, Lego');
    _leftIcon.SetSize(144, 144, 'px');
    _leftIcon.SetStyle(appBarIconColor.value,appBarIconColor.value, _IconRadius, null,null, 0)
    _leftIcon.SetMargins(48, 24,  pxToDpConversion(DW()) - 190, null, 'px')
   
    _leftIcon.SetFontFile(defaultIcons)
    _leftIcon.SetTextSize(72, 'px');
    _leftIcon.SetTextColor(appBarTextsClr.value )
    _leftIcon.SetOnTouch(function () {
        if (appBarObj.onTouch) {
            M(this,appBarObj.onTouch(leadingIcon));
        }
    })
    
    _title = app.AddText(barUi, title, -1, -1, 'Wrap');
    _title.SetMargins(null, 24, null, 24, 'px')

    _title.SetTextSize(28, 'dp');
    _title.SetTextColor(appBarTextsClr.value)
    
    
    
    _rightIcon = app.AddButton(barUi, controlIcons, null, null, 'Custom, Lego');
    _rightIcon.SetMargins(pxToDpConversion(DW()) - 240, 24, 30, null, 'px')
    _rightIcon.SetStyle(appBarIconColor.value,appBarIconColor.value, _IconRadius, null,null, 0)
    _rightIcon.SetSize(144, 144, 'px');
    _rightIcon.SetTextSize(72, 'px');
    
    _rightIcon.SetFontFile(defaultIcons)
    _rightIcon.SetTextColor(appBarTextsClr.value )
    _rightIcon.SetOnTouch(function () {
        if (appBarObj.onTouch) {
            M(this,appBarObj.onTouch(controlIcons))
        }
    })
    
    appBarColor.subscribe((value)=>{
        barCardLay.SetBackColor(value)
    })
    
    appBarIconColor.subscribe((value)=>{
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
        
        __firstTabLay = module.exports.createLayout(layoutType, options, width, 
        height - dpToDsUnit(48,'h'), __secondaryLayJacket)
        
        __secondTabLay = module.exports.createLayout(layoutType, options, width,
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
        
        __firstTabLay = module.exports.createLayout(layoutType, options, width, 
        height - dpToDsUnit(48,'h'), __secondaryLayJacket)
        
        __secondTabLay = module.exports.createLayout(layoutType, options, width,
        height - dpToDsUnit(48,'h'), __secondaryLayJacket)
        
        __thirdTabLay = module.exports.createLayout(layoutType, options, width,
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
    
    
    
    
    box.SetBackColor(stateColor(md_theme_light_inverseSurface, md_theme_dark_inverseSurface))
    snackText.SetTextColor(stateColor(md_theme_light_inverseOnSurface, md_theme_dark_inverseOnSurface))
    snackButton.SetTextColor(stateColor(md_theme_light_inversePrimary, md_theme_dark_inversePrimary))
    
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
