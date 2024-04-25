let filledBtnClr = createSignal();
let filledBtnTxtClr = createSignal();
let backgroundClr = createSignal();
let bottomBarClr = createSignal();
let activeShade = createSignal();
let secondaryTabClr = createSignal();
let lightBarClr = createSignal();
let secondaryTabTxtClr = createSignal();
let appBarColor = createSignal();
let appBarIconColor = createSignal();
let appBarTextsClr = createSignal();
let bottomBarAppClr = createSignal();
let bottomBarAppTxtClr = createSignal()
let bottomAppBarFAB = createSignal();

searchBarClr = createSignal();
searchBarIconClr = createSignal();
searchBarTextClr = createSignal();
searchBarInputTextClr = createSignal();

let defaultIcons, theme, iconFill;

let unpositionalLayout = ["Linear", "Frame", "Card"];

let _mDebug = app.GetAppPath().endsWith('/Material3');
let showUpdates = app.LoadBoolean('showUpdate?', true, M3Config);

let isFirstRun = app.LoadBoolean('isFirstRun?', true, M3Config);

let privateFolder =
  app.GetPrivateFolder('Plugins') + '/material3/';

let _m3Path = _mDebug ? '' : privateFolder;

let defaultFont = _m3Path + 'Roboto.ttf';
let mediumFont = _m3Path + 'Roboto-Medium.ttf';
let boldFont = _m3Path + 'Roboto-Bold.ttf';

let warningColor = "<div style='color:#FF7900'>";


function setM3BaseColors(isChangeTheming, file) {
  
  if (isChangeTheming !== undefined) {
    appTheme = app.ReadFile(file, 'UTF-8');
  } else appTheme = app.ReadFile('baseTheme.json', 'UTF-8');
  
  jsonData = JSON.parse(appTheme)
  
  iconFill = jsonData.baseIcons;
  
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
  }
  
  
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
  
  bottomBarClr.value = stateColor(md_theme_light_inverseOnSurface,
    md_theme_dark_inverseOnSurface);
  
  activeShade.value = stateColor(md_theme_light_secondaryContainer,
    md_theme_dark_secondaryContainer);
  
  secondaryTabClr.value = stateColor(md_theme_light_surface, md_theme_dark_surface)
  
  
  lightBarClr.value = stateColor(md_theme_light_primary, md_theme_dark_primary)
  
  secondaryTabTxtClr.value = stateColor(md_theme_light_onSurface, md_theme_dark_onSurface)
  
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
