/* Material 3 For Ds 🌚
   Mhmm yep perfect made by Oarabile Koore
*/

/* Why Use Classes ?
   They are better and make it easy to manage 
   a large codebase, thats why i migrated from objects 😒
*/

/* How appProps can are used:
   i.e:
      let appProps = {
                        "m3ColorDir":"appTheme.json"
                        "defaultMode":"light",
                        "defaultIconFill":"outline"
      }
      
*/

//Import Relevant Files:

app.Script('m3Buttons.js');

/* The following values will be used by other M3 Componets
       To SetPositions and Accuratly Align Properly:
       layoutInfo and layoutTopDistance
*/

var theme,iconFill,m3ColorSystem;
var layoutTopDistance,layoutInfo;

class Material3{
    /* appProps Are Predefined Data That The Applications
       UI will base off, i.e: default theme & location of 
       the m3Color System Values : 🫠
    */
    constructor(appProps) {
        const rawProps = JSON.stringify(appProps);
        const niceProps = JSON.parse(rawProps);
        
        theme = niceProps.defaultMode;
        iconFill = niceProps.defaultIconFill;
        m3ColorSystem = niceProps.m3ColorDir;
        
        setM3BaseColors(m3ColorSystem)
        
    }
    
    
    addLayout(type, options, width, height, parentLay) {
        if (parentLay === 'main') {
            const layout = app.CreateLayout(type, options);
            
            if (width && height) {
                layout.SetSize(width, height);
            }
            
            if (theme === 'light'){
                layout.SetBackColor(md_theme_light_background);
            }
            else{
                layout.SetBackColor(md_theme_dark_background);
                app.SetStatusBarColor(md_theme_dark_background);
            }
            
            layoutTopDistance = layout.GetTop();
            layoutInfo = type;
            return layout;
        } else {
            const layout = app.CreateLayout(type, options);
            if (width && height) {
                layout.SetSize(width, height);
            }
            layoutTopDistance = layout.GetTop();
            layoutInfo = type;
            parentLay.AddChild(layout);
            return layout;
        }
    }
    
    addFilledButton(btnName, width, height, icon, layout){
        return new filledButtonObject(btnName, width, height, icon, layout)
    }
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
