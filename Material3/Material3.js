/* Material 3 For Ds 🌚
   Mhmm yep perfect made by Oarabile Koore
*/

/* Why Use Classes ?
   They are better and make it easy to manage 
   a large codebase, thats why i migrated from objects 😒
*/

//Import Relevant Files:

cfg.MUI

app.Script('uxElements/m3Navigation.js');
app.Script('uxElements/m3Switches.js');
app.Script('uxElements/m3Progress.js');
app.Script('uxElements/m3SnackBar.js');
app.Script('uxElements/m3Buttons.js');
app.Script('uxElements/m3Dialog.js');
app.Script('uxElements/m3Search.js');
app.Script('uxElements/m3Text.js');


/* The following values will be used by other M3 Componets
       To SetPositions and Accuratly Align Properly:
       layoutInfo and layoutTopDistance
*/

var theme,iconFill,m3ColorSystem;
var layoutTopDistance,layoutInfo;
var defaultIcons;
var defaultFont = 'Fonts/Text/Roboto.ttf';

class Material3{
    
    constructor(defaultTheme,defaultIconFill,defaultThemeDir) {
        
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
        else{
            m3ColorSystem = defaultThemeDir;
        }
        
        // Test Function if All Data Has Been Recieved Well
        //alert(theme + ' ' + iconFill + ' ' + m3ColorSystem)
        
        
        // Variable Location For Icon Fills
        
        switch(iconFill){
            case 'outline':
                defaultIcons = 'uxFonts/Icons/Outlined-Regular.otf';
                break;
            case 'sharp':
                defaultIcons = 'uxFonts/Icons/Sharp-Regular.otf';
                break;
            case 'two-tone':
                defaultIcons = 'uxFonts/Icons/TwoTone-Regular.otf';
                break;
            case 'round':
                defaultIcons = 'uxFonts/Icons/Round-Regular.otf'
        }
        
        setM3BaseColors(m3ColorSystem)
        
    }
    
    getVersion(){
        return 'uiVersion : 0.51 \nuiPatch : 0.0 \nexportDate : 05/02/2024'   
    }
    
    addLayout(type, options, width, height, parentLay) {
    const lay = app.CreateLayout(type, options)
    if (theme ==='dark') {
        lay.SetBackColor(md_theme_dark_background);
        
    } else {
        lay.SetBackColor(md_theme_light_background);
    }
    layoutInfo = type;
    layoutTopDistance = lay.GetTop();
    return lay;
    }
    
    // m3 Buttons 
    addFilledButton(btnName, width, height, icon, parentLay){
        return new filledButtonObject(btnName, width, height, icon, parentLay)
    }
    addElevatedButton(btnName, width, height, icon, parentLay){
        return new elevatedButtonObject(btnName, width, height, icon, parentLay)
    }
    addFilledTonalButton(btnName, width, height, icon, parentLay){
        return new filledButtonObject(btnName, width, height, icon, parentLay);
    }
    addOutlinedButton(btnName, width, height, icon, parentLay){
        return new outlinedButtonObject(btnName, width, height, icon, parentLay);
    }
    addTextButton(btnName, width, height, icon, parentLay){
        return new textButtonObject(btnName, width, height, icon, parentLay)
    }
    addExtendedFAB(btnName, icon, width, parentLay){
        return new extendedFABObject(btnName, icon, width, parentLay);
    }
    
    addFAB(icon, layout) {
        return new fabObject(icon, layout);
    }
    
    addSmallFAB(icon, layout) {
        return new smallFABObject(icon, layout);
    }
    
    addLargeFAB(icon, layout) {
        return new largeFABObject(icon, layout);
    }
    
    addRadioButtons(list,width,height,layout){
        return new radioListObject(list,width,height,layout);
    }
    // m3 Switches
    addSwitch(switchType,value,parent_Layout){
        return new switchObject(switchType,value,parent_Layout);
    }
    
    // m3 Progress
    addProgressBar(progressType, width, layout){
        return new progressObject(progressType, width, layout);
    }
    
    // m3 SnackBar
    addSnackBar(text, btnAction, width, alignment){
        return new SnackBarObject(text, btnAction, width, alignment);
    }
    
    // m3 Navigation
    addMenu(menuType,list,position){
        return new menuObj(menuType,list,position);
    }

    addBottomAppBar(barPropsInjson,parentLayout){
        return new bottomBarObject(barPropsInjson,parentLayout)
    }
    
    addDrawer(drawerLayout,side,width){
        return new navDrawerObject(drawerLayout,side,width)
    }
    
    addSeekBar(value,range,width,layout){
        return new seekBarObject(value,range,width,layout)
    }
    
    addSlideSheet(sheetLayout, width, options){
        return new slideSheetObject(sheetLayout, width, options);
    }
    
    addBottomSheet(sheetLayout, height, options){
        return new bottomSheetObject(sheetLayout, height, options);
    }
    
    // m3Dialogs
    
    showDialog(title, text, dlgOptions, noAction, yesAction) {
        return new dlgBarObject(title, text, dlgOptions, noAction, yesAction);
    }
    
    // m3Search
    addSearchBar(barProps,width,height,parent_Layout){
        return new searchObject(barProps,width,height,parent_Layout)
    }
    
    // m3Text
    addText(text,width,height,options,parent_Layout){
        return new textObject(text,width,height,options,parent_Layout)
    }
}

//This Function Basically Returns The Appropraite Color For The Correct Theme

const stateColor = (lightColor,darkColor)=>{
    if(theme === 'light') return lightColor;
    else return darkColor;
}

const backgroundColor = ()=>{
    if(theme === 'light') return md_theme_light_background;
    else return md_theme_dark_background;
}
    
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
