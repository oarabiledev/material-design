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

    
let M3Config = 'M3Config';
const pluginVersion = 'v0.80';

let defaultIcons, theme, iconFill;

let infinity = Number.POSITIVE_INFINITY;

const __materialDebug = app.GetAppPath().endsWith('/Material3');
let showUpdates = app.LoadBoolean('showUpdate?', true, M3Config);

const isThisAppFirstRun = app.LoadBoolean('isFirstRun?', true, M3Config);

const _materialPath = __materialDebug ? '' : app.GetPrivateFolder('Plugins') + '/material3/';
let defaultFont = _materialPath + 'Roboto.ttf';


const warningColor = "<div style='color:#FF7900'>";


const ui = {
    
    //-----------------------------------------------------------------Top Level
    
    InitializeUIKit: () => {
        if (isThisAppFirstRun) app.SaveBoolean('isFirstRun?', false, 'M3Config');
        
        if (!app.FileExists('baseTheme.json')) {
            warnDeveloper('baseTheme File Not Found In Directory');
        } else setM3BaseColors();
    },
    
    
    getVersion: () => {
        return pluginVersion;
    },
    
    isFirstStart: () => {
        return isThisAppFirstRun;
    },
    
    
    clearConfiguration: () => {
        app.ClearData('M3Config');
    },
    
    createLayout: function (type, options, width, height, parentLay) {
        const lay = app.CreateLayout(type, options);
        if (theme === 'dark') {
            lay.SetBackColor(md_theme_dark_background);
            app.SetStatusBarColor(md_theme_dark_background);
        } else {
            lay.SetBackColor(md_theme_light_background);
            app.SetStatusBarColor();
        }
        layoutInfo = type;
        layoutTopDistance = lay.GetTop();
        return lay;
    },
    
    //------------------------------------------------------------------App Bars
    addCenterAlignedAppBar: function (title, leadingIcon, controlIcons, parentLay) {
        return new appBarObject(title, leadingIcon, controlIcons, parentLay);
    },
    
    addSmallAppBar: function(title, leadingIcon, controlIcons, parentLay){
        return new smallAppBarObject(title, leadingIcon, controlIcons, parentLay);
    },
    
    addBottomAppBar: function (barPropsInjson, parentLayout) {
        return new bottomBarObject(barPropsInjson, parentLayout);
    },
    
    addSearchBar: function(leadingIcon, trailingIcon, hint, width, parentLayout){
        return new searchBarObject(leadingIcon, trailingIcon, hint, width, parentLayout);
    },
    
    
    
    //----------------------------------------------Additional Layouts Container
    addBottomSheet: function (sheetLayout, height, options) {
        return new bottomSheetObject(sheetLayout, height, options);
    },
    
    addSlideSheet: function (sheetLayout, width, options) {
        return new slideSheetObject(sheetLayout, width, options);
    },
    
    
    
    
    //-------------------------------------------------------------------Buttons
    addElevatedButton: function (btnName, width, height, icon, parentLay) {
        return new elevatedButtonObject(btnName, width, height, icon, parentLay);
    },
    
    addExtendedFAB: function (btnName, icon, parentLay) {
        return new extendedFABObject(btnName, icon, parentLay);
    },
    
    addFilledButton: function (btnName, width, height, icon, parentLay) {
        return new filledButtonObject(btnName, width, height, icon, parentLay);
    },
    
    addFilledTonalButton: function (btnName, width, height, icon, parentLay) {
        return new filledTonalButtonObject(btnName, width, height, icon, parentLay);
    },
    
    addOutlinedButton: function (btnName, width, height, icon, parentLay) {
        return new outlinedButtonObject(btnName, width, height, icon, parentLay);
    },
    
    addTextButton: function (btnName, width, height, icon, parentLay) {
        return new textButtonObject(btnName, width, height, icon, parentLay);
    },
    
    
    addSmallFAB: function (icon, layout) {
        return new smallFABObject(icon, layout);
    },
    
    addFAB: function (icon, layout) {
        return new fabObject(icon, layout);
    },
    
    addLargeFAB: function (icon, layout) {
        return new largeFABObject(icon, layout);
    },
    
    addChip: function (type, text, icon, width, height, parentLay) {
        return new chipObject(type, text, icon, width, height, parentLay);
    },
    
    addIconButton: function (iconName, parentLay) {
        return new _iconButtonObject(iconName, parentLay)
    },
    
    
    
    //----------------------------------------------------------------Navigation 
    addDrawer: function (drawerLayout, side, width, options) {
        return new navDrawerObject(drawerLayout, side, width, options);
    },
    
    addTabs: function (list, width, height, options){
        
    },
    
    
    //---------------------------------------------------------------Addon Comps
    addMenu: function (menuType, list, position) {
        return new menuObj(menuType, list, position);
    },
    
    addProgressBar: function (progressType, width, layout) {
        return new progressObject(progressType, width, layout);
    },
    addRadioButtons: function (list, width, height, layout) {
        return new radioListObject(list, width, height, layout);
    },
    addSeekBar: function (value, range, width, layout) {
        return new seekBarObject(value, range, width, layout);
    },
    
    showDialog : function(title, text, dlgOptions, noAction, yesAction) { 
        return new dlgBarObject(title, text, dlgOptions, noAction, yesAction); 
    },
    
    showEmptyDialog : function(dialogLayout, width, height, options){
        return new emptyDlgObject(dialogLayout, width, height, options);
    },
    
    addSnackBar: function (text, btnAction, width, alignment) {
        return new SnackBarObject(text, btnAction, width, alignment);
    },
    
    
    addSwitch: function (switchType, value, parent_Layout) {
        return new switchObject(switchType, value, parent_Layout);
    },
    
    
    //---------------------------------------------------------------Text Fields
    
    addText: function(text, width, height, options, parentLay){
        return new textObject(text, width, height, options, parentLay)
    },
    
    addTextField: function (type, width, height, hint, options, labeled, parentLay) {
        return new inputObj(type, width, height, hint, options, labeled, parentLay);
    },
    
};

app.CreateMaterial3 = function () {
    ui.InitializeUIKit();
}


const warnDeveloper = (context,shortContext) => {
    console.log(warningColor + context);
    app.ShowPopup(shortContext,'Top, Short')
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

const stateColor = (x, y) => {
    if (theme === 'light') return x;
    else return y;
};


function setM3BaseColors() {
    appTheme = app.ReadFile('baseTheme.json','UTF-8');
    
    jsonData = JSON.parse(appTheme)
    
    theme = jsonData.baseTheme;
    iconFill = jsonData.baseIcons;
    
    switch (iconFill) {
    case 'outlined':
        defaultIcons = _materialPath + 'uxFonts/Icons/Outlined-Regular.otf';
        break;
    case 'sharp':
        defaultIcons = _materialPath + 'uxFonts/Icons/Sharp-Regular.otf';
        break;
    case 'two-tone':
        defaultIcons = _materialPath + 'uxFonts/Icons/TwoTone-Regular.otf';
        break;
    case 'round':
        defaultIcons = _materialPath + 'uxFonts/Icons/Round-Regular.otf'
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
}

let _smallAppBar;
function smallAppBarObject(title, leadingIcon, controlIcons, parentLay){
    drawSmallAppBar(title, leadingIcon, controlIcons, parentLay, this)
}

function drawSmallAppBar(title, leadingIcon, controlIcons, parentLay, smallAppBarObj){
    let noOfControlsIco;
    let firstControlIcon,secondControlIcon,thirdControlIcon;
    
    mobileWarning = 'You Can Only Have Upto 3 Icons For AppBar';
    
    if (controlIcons.includes(',')){
        firstControlIcon = controlIcons.split(',')[0];
        if (controlIcons.split(',')[1]){
            secondControlIcon = controlIcons.split(',')[1];
            noOfControlsIco = 2;
        }
        if(controlIcons.split(',')[2]){
            thirdControlIcon = controlIcons.split(',')[2];
            noOfControlsIco = 3;
        }
    }
    else {
        noOfControlsIco = 1;
    }
    
    if (parentLay){
        _smallAppBarIconRadius = 50/100 * 40;
        __smallAppBarClr = stateColor(md_theme_light_surface,md_theme_dark_surface)
        _smallApBIcoClr = stateColor(md_theme_light_background,md_theme_dark_background);
        
        _smallAppBar = app.AddLayout(parentLay, 'Card');
        _smallAppBar.SetMargins(null,0);
        _smallAppBar.SetSize(pxToDpConversion(DW()),64,'dp');
        _smallAppBar.SetCornerRadius(0)
        _smallAppBar.SetBackColor(__smallAppBarClr);
        
        smallAppBarLay = app.AddLayout(_smallAppBar, 'Linear','Horizontal');
        
        smallAppBarIcon = app.AddButton(smallAppBarLay, leadingIcon,null,null,'Custom,Lego' );
        smallAppBarIcon.SetSize(40, 40, 'dp')
        smallAppBarIcon.SetStyle(_smallApBIcoClr,_smallApBIcoClr,_smallAppBarIconRadius,null,null,0);
        smallAppBarIcon.SetFontFile(defaultIcons);
        smallAppBarIcon.SetMargins(16, 13,16, null, 'dp')
        smallAppBarIcon.SetTextSize(26);
        
        smallAppBarTitle = app.AddText(smallAppBarLay, title, null, null);
        
        if(noOfControlsIco == 1){
            smallApBrightIcon = app.AddButton(smallAppBarLay, leadingIcon,null,null,'Custom,Lego' );
            smallApBrightIcon.SetSize(40, 40, 'dp')
            smallApBrightIcon.SetStyle(_smallApBIcoClr,_smallApBIcoClr,_smallAppBarIconRadius,null,null,0);
            smallApBrightIcon.SetFontFile(defaultIcons);
            smallApBrightIcon.SetTextSize(26);
            
        }
        else if (noOfControlsIco == 2){
            smallApBrightIcon = app.AddButton(smallAppBarLay, firstControlIcon,null,null,'Custom,Lego' );
            smallApBrightIcon.SetSize(40, 40, 'dp')
            smallApBrightIcon.SetStyle(_smallApBIcoClr,_smallApBIcoClr,_smallAppBarIconRadius,null,null,0);
            smallApBrightIcon.SetFontFile(defaultIcons);
            smallApBrightIcon.SetTextSize(26);
            
            smallApBrightIcon2 = app.AddButton(smallAppBarLay, secondControlIcon,null,null,'Custom,Lego' );
            smallApBrightIcon2.SetSize(40, 40, 'dp')
            smallApBrightIcon2.SetStyle(_smallApBIcoClr,_smallApBIcoClr,_smallAppBarIconRadius,null,null,0);
            smallApBrightIcon2.SetFontFile(defaultIcons);
            smallApBrightIcon2.SetTextSize(26);
        }
        else {
            smallApBrightIcon = app.AddButton(smallAppBarLay, firstControlIcon,null,null,'Custom,Lego' );
            smallApBrightIcon.SetSize(40, 40, 'dp')
            smallApBrightIcon.SetStyle(_smallApBIcoClr,_smallApBIcoClr,_smallAppBarIconRadius,null,null,0);
            smallApBrightIcon.SetFontFile(defaultIcons);
            smallApBrightIcon.SetTextSize(26);
            
            smallApBrightIcon2 = app.AddButton(smallAppBarLay, secondControlIcon,null,null,'Custom,Lego' );
            smallApBrightIcon2.SetSize(40, 40, 'dp')
            smallApBrightIcon2.SetStyle(_smallApBIcoClr,_smallApBIcoClr,_smallAppBarIconRadius,null,null,0);
            smallApBrightIcon2.SetFontFile(defaultIcons);
            smallApBrightIcon2.SetTextSize(26);
            
            smallApBrightIcon3 = app.AddButton(smallAppBarLay, thirdControlIcon,null,null,'Custom,Lego' );
            smallApBrightIcon3.SetSize(40, 40, 'dp')
            smallApBrightIcon3.SetStyle(_smallApBIcoClr,_smallApBIcoClr,_smallAppBarIconRadius,null,null,0);
            smallApBrightIcon3.SetFontFile(defaultIcons);
            smallApBrightIcon3.SetTextSize(26);
        }
        
    }
    else warnDeveloper('No Parent For AppBar','No Parent For AppBar');
}



//------------------------------------------------------------Actual Components


let _search,_searchInput;

function searchBarObject(leadingIcon, trailingIcon, hint, width, parentLayout){
    
    this.Animate = function(type, callback, time){
        _search.Animate(type, callback, time);
    }
    
    this.Batch = function(props){
        _search.Batch(props);
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
        _search.SetMargins(left, top, right, bottom, mode);
    }
    if (parentLayout){
        drawSearchBar(leadingIcon, trailingIcon, hint, width, parentLayout, this);
    }
    else warnDeveloper('You didnt add a parent to the search component','Add parent To SearchBar');
}

function drawSearchBar(leadingIcon, trailingIcon, hint, width, parentLayout, searchObj) {
    const searchBarType = (trailingIcon) => {
        if (trailingIcon.includes(',')) {
            // Now Get The Individual Icons
            const firstTrailingIcon = trailingIcon.split(',')[0];
            const secondTrailingIcon = trailingIcon.split(',')[1];
            
            // Test If It's An Avatar Type Bar
            if (secondTrailingIcon.includes('.png') || secondTrailingIcon.includes('.jpg') || secondTrailingIcon.includes('.jpeg')) {
                return {
                    firstTrailingIcon,
                    secondTrailingIcon,
                    searchBarType: 'WithAvatar&Icon'
                };
            }
            // If It's Not then It's with two icons
            else {
                return {
                    firstTrailingIcon,
                    secondTrailingIcon,
                    searchBarType: 'WithTwoIcons'
                };
            }
        }
        else {
            /* If TrailingIcon doesn't have a comma test if it's either:
            WithAvatar
            WithIcon
            */
            
            if (trailingIcon.includes('.png') || trailingIcon.includes('.jpg') || trailingIcon.includes('.jpeg')) {
                return {
                    trailingIcon,
                    searchBarType: 'WithAvatar'
                };
            }
            else {
                return {
                    searchBarType: 'WithIcon'
                };
            }
        }
    }

    const searchType = searchBarType(trailingIcon); 

    switch (searchType.searchBarType) {
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
        let searchColor = stateColor(md_theme_light_surfaceVariant,md_theme_dark_surfaceVariant);
        let _iconColor = stateColor(md_theme_light_surfaceVariant,md_theme_dark_surfaceVariant);
        let _iconTextColor = stateColor(md_theme_light_onSurface,md_theme_dark_onSurface)
        let _searchInputTextColor = stateColor(md_theme_light_onSurfaceVariant,md_theme_dark_onSurfaceVariant)
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
        _search.SetBackColor(searchColor);
        
        _searchContainer = app.AddLayout(_search, 'Linear','Horizontal,Left')
        _leadingIcon = app.AddButton(_searchContainer, leadingIcon, null, null, 'Custom,Lego');
        _leadingIcon.SetSize(34, 34, 'dp');
        _leadingIcon.SetTextSize(24)
        _leadingIcon.SetTextColor(_iconTextColor)
        _leadingIcon.SetStyle(_iconColor,_iconColor,_iconRadius,null,null,0);
        _leadingIcon.SetFontFile(defaultIcons)
        _leadingIcon.SetMargins(16,13,16,null,'dp')
        
        _searchInput = app.AddTextEdit(_searchContainer, '', null,null,'Singleline,Left')
        _searchInput.SetBackColor(searchColor)
        _searchInput.SetMargins(null,8,null,null,'dp')
        _searchInput.SetSize(_searchInputWidth(), -1, 'dp');
        _searchInput.SetTextColor(_searchInputTextColor);
        
        
        
        if(hint !== null){
            _searchInput.SetHint(hint);
        }
        
        
        _trailingIcon = app.AddButton(_searchContainer, trailingIcon, null, null, 'Custom,Lego');
        _trailingIcon.SetSize(34, 34, 'dp');
        _trailingIcon.SetTextSize(24)
        _trailingIcon.SetTextColor(_iconTextColor)
        _trailingIcon.SetStyle(_iconColor,_iconColor,_iconRadius,null,null,0);
        _trailingIcon.SetFontFile(defaultIcons)
        _trailingIcon.SetMargins(16,13,16,null,'dp')
        
        //SetOnTouch Implementation
        _leadingIcon.SetOnTouch(function(){
            if(searchObj.onTouch){
                searchObj.onTouch(leadingIcon);
            }
        });
        
        _trailingIcon.SetOnTouch(function(){
            if(searchObj.onTouch){
                searchObj.onTouch(trailingIcon);
            }
        });
    }
    
    function drawSearchWithAvatar() {
        let searchColor = stateColor(md_theme_light_surfaceVariant,md_theme_dark_surfaceVariant);
        let _iconColor = stateColor(md_theme_light_surfaceVariant,md_theme_dark_surfaceVariant);
        let _iconTextColor = stateColor(md_theme_light_onSurface,md_theme_dark_onSurface)
        let _searchInputTextColor = stateColor(md_theme_light_onSurfaceVariant,md_theme_dark_onSurfaceVariant)
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
        _search.SetBackColor(searchColor);
        
        b_searchContainer = app.AddLayout(_search, 'Linear','Horizontal,Left')
        b_leadingIcon = app.AddButton(b_searchContainer, leadingIcon, null, null, 'Custom,Lego');
        b_leadingIcon.SetSize(34, 34, 'dp');
        b_leadingIcon.SetTextSize(24)
        b_leadingIcon.SetTextColor(_iconTextColor)
        b_leadingIcon.SetStyle(_iconColor,_iconColor,_iconRadius,null,null,0);
        b_leadingIcon.SetFontFile(defaultIcons)
        b_leadingIcon.SetMargins(16,13,16,null,'dp')
        
        _searchInput = app.AddTextEdit(b_searchContainer, '', null,null,'Singleline,Left')
        _searchInput.SetBackColor(searchColor)
        _searchInput.SetMargins(null,8,null,null,'dp')
        _searchInput.SetSize(_searchInputWidth(), -1, 'dp');
        _searchInput.SetTextColor(_searchInputTextColor);
        
        if(hint !== null){
            _searchInput.SetHint(hint);
        }
        
        //Check If Image File Exists And If Not Dont Procced
        if (!app.FileExists(trailingIcon)){
            warnDeveloper(`The Avatar ${trailingIcon}, Does Not Exist`,'Search Avatar Not Found');
            return
        }
        
        else{
        b_trailingLay = app.AddLayout(b_searchContainer,'Card');
        b_trailingLay.SetCornerRadius(15)
        b_trailingIcon = app.AddImage(b_trailingLay, trailingIcon, null, null,'Button')
        b_trailingIcon.SetSize(30, 30, 'dp');
        b_trailingLay.SetMargins(16,13,16,null,'dp')
        }
        b_leadingIcon.SetOnTouch(function(){
            if(searchObj.onTouch){
                searchObj.onTouch(leadingIcon);
            }
        });
        
        b_trailingIcon.SetOnTouchDown(function(){
            if(searchObj.onTouch){
                searchObj.onTouch('avatar');
            }
        });
        
    }
    
    function drawSearchWithTwoIcons(firstTrailingIcon, secondTrailingIcon) {
        let searchColor = stateColor(md_theme_light_surfaceVariant,md_theme_dark_surfaceVariant);
        let _iconColor = stateColor(md_theme_light_surfaceVariant,md_theme_dark_surfaceVariant);
        let _iconTextColor = stateColor(md_theme_light_onSurface,md_theme_dark_onSurface)
        let _searchInputTextColor = stateColor(md_theme_light_onSurfaceVariant,md_theme_dark_onSurfaceVariant)
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
        _search.SetBackColor(searchColor);
        
        _searchContainer = app.AddLayout(_search, 'Linear','Horizontal,Left')
        _leadingIcon = app.AddButton(_searchContainer, leadingIcon, null, null, 'Custom,Lego');
        _leadingIcon.SetSize(34, 34, 'dp');
        _leadingIcon.SetTextSize(24)
        _leadingIcon.SetTextColor(_iconTextColor)
        _leadingIcon.SetStyle(_iconColor,_iconColor,_iconRadius,null,null,0);
        _leadingIcon.SetFontFile(defaultIcons)
        _leadingIcon.SetMargins(16,13,16,null,'dp')
        
        _searchInput = app.AddTextEdit(_searchContainer, '', null,null,'Singleline,Left')
        _searchInput.SetBackColor(searchColor)
        _searchInput.SetMargins(null,8,null,null,'dp')
        _searchInput.SetSize(_searchInputWidth(), -1, 'dp');
        _searchInput.SetTextColor(_searchInputTextColor);
        
        if(hint !== null){
            _searchInput.SetHint(hint);
        }
        
        
        _firstTrailingIcon = app.AddButton(_searchContainer, firstTrailingIcon, null, null, 'Custom,Lego');
        _firstTrailingIcon.SetSize(34, 34, 'dp');
        _firstTrailingIcon.SetTextSize(24)
        _firstTrailingIcon.SetTextColor(_iconTextColor)
        _firstTrailingIcon.SetStyle(_iconColor,_iconColor,_iconRadius,null,null,0);
        _firstTrailingIcon.SetFontFile(defaultIcons)
        _firstTrailingIcon.SetMargins(16,13,8,null,'dp')
        
        _secondTrailingIcon = app.AddButton(_searchContainer, secondTrailingIcon, null, null, 'Custom,Lego');
        _secondTrailingIcon.SetSize(34, 34, 'dp');
        _secondTrailingIcon.SetTextSize(24)
        _secondTrailingIcon.SetTextColor(_iconTextColor)
        _secondTrailingIcon.SetStyle(_iconColor,_iconColor,_iconRadius,null,null,0);
        _secondTrailingIcon.SetFontFile(defaultIcons)
        _secondTrailingIcon.SetMargins(null,13,16,null,'dp')
        
        //SetOnTouch Implementation
        _leadingIcon.SetOnTouch(function(){
            if(searchObj.onTouch){
                searchObj.onTouch(leadingIcon);
            }
        });
        
        _firstTrailingIcon.SetOnTouch(function(){
            if(searchObj.onTouch){
                searchObj.onTouch(firstTrailingIcon);
            }
        });
        
         _secondTrailingIcon.SetOnTouch(function(){
            if(searchObj.onTouch){
                searchObj.onTouch(secondTrailingIcon);
            }
        });
    }
    
    function drawSearchWithAvatarIcon(firstTrailingIcon, secondTrailingIcon) {
        let searchColor = stateColor(md_theme_light_surfaceVariant,md_theme_dark_surfaceVariant);
        let _iconColor = stateColor(md_theme_light_surfaceVariant,md_theme_dark_surfaceVariant);
        let _iconTextColor = stateColor(md_theme_light_onSurface,md_theme_dark_onSurface)
        let _searchInputTextColor = stateColor(md_theme_light_onSurfaceVariant,md_theme_dark_onSurfaceVariant)
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
        _search.SetBackColor(searchColor);
        
        _searchContainer = app.AddLayout(_search, 'Linear','Horizontal,Left')
        _leadingIcon = app.AddButton(_searchContainer, leadingIcon, null, null, 'Custom,Lego');
        _leadingIcon.SetSize(34, 34, 'dp');
        _leadingIcon.SetTextSize(24)
        _leadingIcon.SetTextColor(_iconTextColor)
        _leadingIcon.SetStyle(_iconColor,_iconColor,_iconRadius,null,null,0);
        _leadingIcon.SetFontFile(defaultIcons)
        _leadingIcon.SetMargins(16,13,16,null,'dp')
        
        _searchInput = app.AddTextEdit(_searchContainer, '', null,null,'Singleline,Left')
        _searchInput.SetBackColor(searchColor)
        _searchInput.SetMargins(null,8,null,null,'dp')
        _searchInput.SetSize(_searchInputWidth(), -1, 'dp');
        _searchInput.SetTextColor(_searchInputTextColor);
        
        if(hint !== null){
            _searchInput.SetHint(hint);
        }
        
        _trailingIcon = app.AddButton(_searchContainer, firstTrailingIcon, null, null, 'Custom,Lego');
        _trailingIcon.SetSize(34, 34, 'dp');
        _trailingIcon.SetTextSize(24)
        _trailingIcon.SetTextColor(_iconTextColor)
        _trailingIcon.SetStyle(_iconColor,_iconColor,_iconRadius,null,null,0);
        _trailingIcon.SetFontFile(defaultIcons)
        _trailingIcon.SetMargins(16,13,8,null,'dp')
        
        _avatarLay = app.AddLayout(_searchContainer,'Card');
        _avatarLay.SetCornerRadius(15)
        _avatarIcon = app.AddImage(_avatarLay, secondTrailingIcon, null, null,'Button')
        _avatarIcon.SetSize(30, 30, 'dp');
        _avatarLay.SetMargins(0,13,16,null,'dp')
        
        //SetOnTouch Implementation
        _leadingIcon.SetOnTouch(function(){
            if(searchObj.onTouch){
                searchObj.onTouch(leadingIcon);
            }
        });
        
        _trailingIcon.SetOnTouch(function(){
            if(searchObj.onTouch){
                searchObj.onTouch(firstTrailingIcon);
            }
        });
        
        
        _avatarIcon.SetOnTouchDown(function(){
            if(searchObj.onTouch){
                searchObj.onTouch('avatar');
            }
        });
    }
}

let _text;
function textObject(text, width, height, options, parentLay){
    this.Animate = function(type,callback, time){
        _text.Animate(type,callback, time);
    }
    
    this.Batch = function (props) {
        _text.Batch(props);
    }
    
    this.ClearFocus = function(){
        _text.ClearFocus();
    }
    this.Focus = function(){
        _text.Focus();
    }
    
    this.GetHtml = function(){
        return _text.GetHtml();
    }
    
    this.GetLineCount = function(){
        return _text.GetLineCount();
    }
    
    this.GetLineStart = function (line){
        return _text.GetLineStart(line);
    }
    
    this.GetLineTop = function(line){
        return _text.GetLineTop(line);
    }
    
    this.GetMaxLines = function(){
        return _text.GetMaxLines();
    }
    
    this.GetText = function(){
        return _text.GetText();
    }
    
    this.GetTextSize = function(mode){
        return _text.GetTextSize(mode);
    }
    
    this.GetTop = function(){
        return _text.GetTop();
    }
    
    this.GetVisibility = function(){
        return _text.GetVisibility();
    }
    
    this.GetWidth = function(options){
        return _text.GetWidth(options);
    }
    
    
    this.Gone = function(){
        _text.Gone();
    }
    
    this.Hide = function(){
        _text.Hide();
    }
    
    this.IsEnabled = function(){
        return _text.IsEnabled();
    }
    
    this.IsOverlap = function(obj, depth){
        return _text.IsOverlap(obj, depth);
    }
    
    this.Resize = function(){
        _text.Resize();
    }
    
    this.SetBackAlpha = function(alpha){
        text.SetBackAlpha(alpha);
    }
    
    this.SetBackColor = function(color){
        _text.SetBackColor(color);
    }
    
    this.SetBackGradient = function (color1, color2, color3, options){
        _text.SetBackGradient(color1, color2, color3, options);
    }
    
    this.SetBackGradientRadial = function( x, y, radius, color1, color2, color3, options){
        _text.SetBackGradientRadial( x, y, radius, color1, color2, color3, options);
    }
    
    
    this.SetBackground = function(file, options){
        _text.SetBackground(file, options);
    }
    
    this.SetColorFilter = function(color, mode){
        _text.SetColorFilter(color, mode);
    }
    
    this.SetDescription = function(desc){
        _text.SetDescription(desc);
    }
    
    this.SetEllipsize = function(mode){
        _text.SetEllipsize(mode);
    }
    
    this.SetEnabled = function(bool){
        _text.SetEnabled(bool);
    }
    
    this.SetHtml = function(html){
        _text.SetHtml(html);
    }
    
    this.SetLog = function(maxlines){
        _text.SetLog(maxlines);
    }
    
    this.SetMargins = function(left, top, right, bottom, mode){
        _text.SetMargins(left, top, right, bottom, mode);
    }
    
    this.SetPosition = function(left, top, width, height, options){
        _text.SetPosition(left, top, width, height, options);
    }
    
    this.SetPadding = function(left, top, right, bottom, mode){
        _text.SetPadding(left, top, right, bottom, mode);
    }
    this.SetOnTouch = function(onTouch){
        _text.SetOnTouch(onTouch);
    }
    
    this.SetOnTouchDown = function(onTouchDown){
        _text.SetOnTouchDown(onTouchDown);
    }
    
    this.SetOnTouchMove = function(onTouchMove){
        _text.SetOnTouchMove(onTouchMove);
    }
    
    this.SetOnTouchUp = function(onTouchUp){
        _text.SetOnTouchUp(onTouchUp);
    }
    
    this.SetOnLongTouch = function(onLongTouch){
        _text.SetOnLongTouch(onLongTouch);
    }
    
    this.SetScale = function(x, y){
        _text.SetScale(x,y);
    }
    
    this.SetText = function (text){
        _text.SetText(text);
    }
    
    this.SetTextColor = function(color){
        _text.SetTextColor(color);
    }
    
    this.SetTextSize = function(size, mode){
        _text.SetTextSize(size, mode);
    }
    
    this.SetTextShadow = function(radius, dx, dy, color){
        _text.SetTextShadow(radius, dx, dy, color);
    }
    
    this.SetVisibility = function(mode){
        _text.SetVisibility(mode);
    }
    
    this.Show = function(){
        _text.Show();
    }
    
    this.Tween = function( target, duration, type, repeat, yoyo, callback){
        _text.Tween( target, duration, type, repeat, yoyo, callback)
    }
    
    drawText(text, width, height, options, parentLay, this);
}

function drawText(text, width, height, options, parentLay, textObj){
    _text = app.AddText(parentLay, text, width, height, options);
    _text.SetFontFile(defaultFont);
}



// The Icon Code Should Be Used For Help For Creating Other Components

let _iconButton;
function _iconButtonObject(iconName, parentLay){
    
    _drawIconButton(iconName, parentLay, this)
}


function _drawIconButton(iconName, parentLay, iconObj){
    _iconColor = stateColor(md_theme_light_background,md_theme_dark_background);
    radius = 50/100 * 120;
    
    _iconButton = app.AddButton(parentLay, iconName, null, null, 'Custom,Lego');
    _iconButton.SetSize(120, 120, 'px')
    
    _iconButton.SetStyle(_iconColor,_iconColor,radius,null,null,0);
    _iconButton.SetFontFile(defaultIcons)
}



let emptyDlg;

function emptyDlgObject(dialogLayout, width, height, options){
    
    this.Dismiss = function(){
        emptyDlg.Dismiss()
    }
    
    this.Focus = function(){
        emptyDlg.Focus()
    }
    
    this.ClearFocus = function(){
        emptyDlg.ClearFocus()
    }
    
    this.SetDescription = function(description){
        emptyDlg.SetDescription(description)
    }
    
    this.SetMargins = function(left, top, right, bottom, mode){
        emptyDlg.SetMargins(left, top, right, bottom, mode)
    }
    
    this.SetPosition = function(left, top, width, height, options){
        emptyDlg.SetPosition(left, top, width, height, options)
    }
    
    this.SetOnCancel = function(onCancel){
        emptyDlg.SetOnCancel(onCancel)
    }
    
    this.SetOnTouch = function(onTouch){
        emptyDlg.SetOnTouch(onTouch(evDetails))
    }
    
    this.Hide = function(){
        emptyDlg.Hide()
    }
    
    this.Gone = function(){
        emptyDlg.Gone()
    }
    
    this.EnableBackKey = function(bool){
        emptyDlg.EnableBackKey(bool)
    }
    
    this.SetOnBack = function(onBack){
        emptyDlg.SetOnBack(onBack)
    }
    
    drawEmptyDialog(dialogLayout, width, height, options, this)
}

function drawEmptyDialog(dialogLayout, width, height, options, emptyDlgObj){
    dlgColor = stateColor(md_theme_light_secondaryContainer,md_theme_dark_secondaryContainer);
    
    emptyDlg = app.CreateDialog();
    emptyDlg.SetSize(width, height);
    emptyDlg.SetBackColor("#00000000");
    
    dlgUi = app.CreateLayout('Card')
    dlgUi.SetElevation(0)
    dlgUi.SetSize(width, height) 
    dlgUi.SetCornerRadius(12)
    
    dlgUi.SetBackColor(dlgColor)
    emptyDlg.AddLayout(dlgUi);
    emptyDlg.Show();
}


function appBarObject(title, leadingIcon, controlIcons, parentLay) {
    
    this.SetOnTouch = function (onTouch) {
        this.onTouch = onTouch
    }
    
    
    drawAppBar(title, leadingIcon, controlIcons, parentLay, this)
}

//144 w
//72 ts


function drawAppBar(title, leadingIcon, controlIcons, parentLay, appBarObj) {
    barCardLay = app.AddLayout(parentLay, "Card");
    barCardLay.SetSize(DW(), dpToPxConversion(64), 'px');
    
    barCardLay.SetBackColor(stateColor(md_theme_light_surface, md_theme_dark_surface))
    barCardLay.SetMargins(0, 0)
    
    
    barUi = app.CreateLayout('Linear', 'Horizontal,Left');
    barCardLay.AddChild(barUi);
    
    _iconColor = stateColor(md_theme_light_background,md_theme_dark_background);
    _IconRadius = 50/100 * 120;
    
    _leftIcon = app.AddButton(barUi, leadingIcon, null, null, 'Custom, Lego');
    _leftIcon.SetSize(144, 144, 'px');
    _leftIcon.SetStyle(_iconColor,_iconColor, _IconRadius, null,null, 0)
    _leftIcon.SetMargins(48, 24,  pxToDpConversion(DW()) - 190, null, 'px')
    
    _leftIcon.SetFontFile(defaultIcons)
    _leftIcon.SetTextSize(72, 'px');
    _leftIcon.SetTextColor(stateColor(md_theme_light_onSurface, md_theme_dark_onSurface))
    _leftIcon.SetOnTouch(function () {
        if (appBarObj.onTouch) {
            appBarObj.onTouch(leadingIcon)
        }
    })
    
    _title = app.AddText(barUi, title, -1, -1, 'Wrap');
    _title.SetMargins(null, 24, null, 24, 'px')

    _title.SetTextSize(28, 'dp');
    _title.SetTextColor(stateColor(md_theme_light_onSurface, md_theme_dark_onSurface))
    
    
    
    _rightIcon = app.AddButton(barUi, controlIcons, null, null, 'Custom, Lego');
    _rightIcon.SetMargins(pxToDpConversion(DW()) - 190, 24, 30, null, 'px')
    _rightIcon.SetStyle(_iconColor,_iconColor, _IconRadius, null,null, 0)
    _rightIcon.SetSize(144, 144, 'px');
    _rightIcon.SetTextSize(72, 'px');
    
    _rightIcon.SetFontFile(defaultIcons)
    _rightIcon.SetTextColor(stateColor(md_theme_light_onSurface, md_theme_dark_onSurface))
    _rightIcon.SetOnTouch(function () {
        if (appBarObj.onTouch) {
            appBarObj.onTouch(controlIcons)
        }
    })
    
}



var sliderElem;

function sliderObject(value, range, width, layout) {
    this.GetValue = function () {
        
    }
    
    this.SetValue = function (value) {
        
    }
    
    drawSlider(value, range, width, layout);
}

function drawSlider(value, range, width, layout) {
    sliderElem = app.AddImage(layout, null, width, 0.1);
    //sliderElem.SetMargins( 16,16,16,16,"px")
    sliderElem.SetOnTouchMove((ev) => {
        drawSliderShading(ev.x[0]);
    })
    sliderElem.SetAutoUpdate(false)
    drawSliderShading(0);
}

function drawSliderShading(x) {
    
    sliderElem.Clear()
    sliderElem.SetLineWidth(8)
    sliderElem.SetPaintColor(stateColor(md_theme_light_primaryContainer, md_theme_dark_primaryContainer))
    sliderElem.DrawLine(x, 0.5, 1, 0.5)
    sliderElem.SetPaintColor(stateColor(md_theme_light_primary, md_theme_dark_primary))
    sliderElem.DrawLine(0, 0.5, x, 0.5)
    sliderElem.SetPaintColor(stateColor(md_theme_light_primary, md_theme_dark_primary))
    sliderElem.DrawLine(x, 0.25, x, 0.75)
    sliderElem.Update()
}


var chipElem;

function chipObject(type, text, icon, width, height, parentLay) {
    drawChip(type, text, icon, width, height, parentLay)
}


function drawChip(type, text, icon, width, height, parentLay) {
    if (type.toLowerCase() === 'assist') {
        chipElem = app.AddButton(parentLay, text, width, height, 'Custom,FontAwesome');
        chipElem.SetFontFile(defaultFont)
        chipElem.SetTextColor(stateColor(md_theme_light_onSurface, md_theme_dark_onSurface));
        chipElem.SetText(text)
        chipElem.SetStyle(clrOutlined(), clrOutlined(), 8, stateColor(md_theme_light_outline, md_theme_dark_outline), 1, 0.1);
    } else if (type.toLowerCase() === 'filter') {
        chipElem = app.AddButton(parentLay, text, width, height, 'Custom,FontAwesome');
        chipElem.SetFontFile(defaultFont)
        chipElem.SetTextColor(stateColor(md_theme_light_onSurface, md_theme_dark_onSurface));
        chipElem.SetText(text)
        chipElem.SetStyle(clrOutlined(), clrOutlined(), 8, stateColor(md_theme_light_outline, md_theme_dark_outline), 1, 0.1);
        
        chipElem.SetOnTouch(() => {
            chipElem.SetText(`[fa-check]` + ' ' + text)
            chipElem.SetStyle(stateColor(md_theme_light_onSurfaceVariant, md_theme_dark_onSurfaceVariant), stateColor(md_theme_light_onSurfaceVariant, md_theme_dark_onSurfaceVariant), 8, stateColor(md_theme_light_outline, md_theme_dark_outline), 1, 0.1);
        });
    }
}


var textEdit;

function textFieldObject(type, width, height, hint, options, labeled, parentLay) {
    this.SetOnEnter = function (onEnter) {
        textEdit.SetOnEnter(onEnter)
    }
    drawTextField(type, width, height, hint, options, labeled, parentLay)
}

function drawTextField(type, width, height, hint, options, labeled, parentLay) {
    if (type.toLowerCase() === 'texteditfilled' || type.toLowerCase() === 'tef') {
        
        textEdit = MUI.CreateTextEditFilled(width, options, hint, labeled, stateColor(md_theme_light_primary, md_theme_dark_primary));
        parentLay.AddChild(textEdit);
        
    } else if (type.toLowerCase() === 'texteditfilledactive' || type.toLowerCase() === 'tefa') {
        
        textEdit = MUI.CreateTextEditFilledA(width, options, hint, labeled, stateColor(md_theme_light_primary, md_theme_dark_primary));
        parentLay.AddChild(textEdit);
        
    } else if (type.toLowerCase() === 'texteditoutline' || type.toLowerCase() === 'teo') {
        
        textEdit = MUI.CreateTextEditOutline(width, options, hint, labeled, stateColor(md_theme_light_primary, md_theme_dark_primary));
        parentLay.AddChild(textEdit);
        
    } else if (type.toLowerCase() === 'texteditoutlineactive' || type.toLowerCase() === 'teoa') {
        
        textEdit = MUI.CreateTextEditOutlineA(width, options, hint, labeled, stateColor(md_theme_light_primary, md_theme_dark_primary), stateColor(md_theme_light_primary, md_theme_dark_primary));
        parentLay.AddChild(textEdit);
        
    }
}
var filledButton;

function filledButtonObject(btnName, width, height, icon, parentLay) {
    
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
    this.SetMargins = function (left, top, right, bottom, mode) {
        filledButton.SetMargins(left, top, right, bottom, mode);
    }
    this.SetPadding = function (left, top, right, bottom, mode) {
        filledButton.SetPadding(left, top, right, bottom, mode);
    }
    this.SetOnTouch = function (onTouch) {
        this.onTouch = onTouch;
    }
    this.SetOnLongTouch = function (onLongTouch) {
        this.onLongTouch = onLongTouch;
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


    drawFilledButton(btnName, width, height, icon, parentLay, this)
}

function drawFilledButton(btnName, width, height, icon, parentLay, filledObj) {
    filledButton = app.AddButton(parentLay, null, width, height, 'Custom,FontAwesome');
    
    filledButton.SetTextColor(stateColor(md_theme_light_onPrimary, md_theme_dark_onPrimary))
    filledButton.SetStyle(stateColor(md_theme_light_primary, md_theme_dark_primary), stateColor(md_theme_light_primary, md_theme_dark_primary), 20, null, null, 0)
    filledButton.SetFontFile(defaultFont);
    
    if (icon === null) {
        filledButton.SetText(btnName);
    } else filledButton.SetText(`[fa-${icon}]` + ' ' + btnName);
    
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
        this.onTouch = onTouch;
    }
    this.SetOnLongTouch = function (onLongTouch) {
        this.onLongTouch = onLongTouch;
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
    drawElevatedBtn(btnName, width, height, icon, parentLay, this)
}


function drawElevatedBtn(btnName, width, height, icon, parentLay, elevatedObj) {
    elevatedButton = app.AddButton(parentLay, null, width, height, 'Custom,FontAwesome');
    elevatedButton.SetTextColor(stateColor(md_theme_light_primary, md_theme_dark_primary));
    elevatedButton.SetFontFile(defaultFont);
    
    if (icon === null) {
        elevatedButton.SetText(btnName);
    } else elevatedButton.SetText(`[fa-${icon}]` + ' ' + btnName);
    
    elevatedButton.SetStyle(clr1(), clr1(), 20, null, null, 0);
    
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
        this.onTouch = onTouch;
    }
    this.SetOnLongTouch = function (onLongTouch) {
        this.onLongTouch = onLongTouch;
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
    
    drawFilledTonalBtn(btnName, width, height, icon, parentLay, this)
}

function drawFilledTonalBtn(btnName, width, height, icon, parentLay, filledTonalObj) {
    filledTonalButton = app.AddButton(parentLay, null, width, height, 'Custom,FontAwesome');
    filledTonalButton.SetFontFile(defaultFont)
    filledTonalButton.SetTextColor(stateColor(md_theme_light_onSecondaryContainer, md_theme_dark_onSecondaryContainer));
    
    
    if (icon === null) {
        filledTonalButton.SetText(btnName);
    } else filledTonalButton.SetText(`[fa-${icon}]` + ' ' + btnName);
    
    filledTonalButton.SetStyle(stateColor(md_theme_light_primaryContainer, md_theme_dark_primaryContainer), stateColor(md_theme_light_primaryContainer, md_theme_dark_primaryContainer), 20, null, null, 0);
    
    filledTonalButton.SetOnTouch(() => {
        if (filledTonalObj.onTouch) {
            filledTonalObj.onTouch();
        }
    });
    
    filledTonalButton.SetOnLongTouch(() => {
        if (filledTonalObj.onLongTouch) {
            filledTonalObj.onLongTouch();
        }
    });
}

var outlinedButton;

function outlinedButtonObject(btnName, width, height, icon, parentLay) {
    // Button Methods :::
    
        this.Animate = function (type, callback, time) {
        outlinedButton.Animate(type, callback, time);
    }
    this.SetScale = function (x, y) {
        outlinedButton.SetScale(x, y);
    }
    this.SetVisibility = function (mode) {
        outlinedButton.SetVisibility(mode);
    }
    this.SetEnabled = function (enableBool) {
        outlinedButton.SetEnabled(enableBool);
    }
    this.SetEllipsize = function (mode) {
        outlinedButton.SetEllipsize(mode);
    }
    this.SetDescription = function (desc) {
        outlinedButton.SetDescription(desc);
    }
    this.SetHtml = function (str) {
        outlinedButton.SetHtml(str);
    }
    this.SetText = function (text) {
        outlinedButton.SetText(text);
    }
    this.SetTextSize = function (size, mode) {
        outlinedButton.SetTextSize(size, mode);
    }
    this.SetMargins = function (left, top, right, bottom, mode) {
        outlinedButton.SetMargins(left, top, right, bottom, mode);
    }
    this.SetPadding = function (left, top, right, bottom, mode) {
        outlinedButton.SetPadding(left, top, right, bottom, mode);
    }
    this.SetOnTouch = function (onTouch) {
        this.onTouch = onTouch;
    }
    this.SetOnLongTouch = function (onLongTouch) {
        this.onLongTouch = onLongTouch;
    }
    this.Tween = function (target, duration, type, repeat, yoyo, callback) {
        outlinedButton.Tween(target, duration, type, repeat, yoyo, callback);
    }
    this.Focus = function () {
        outlinedButton.Focus();
    }
    this.Gone = function () {
        outlinedButton.Gone();
    }
    this.Show = function () {
        outlinedButton.Show();
    }
    this.Hide = function () {
        outlinedButton.Hide();
    }

    
    //Call It 
    drawOutlinedBtn(btnName, width, height, icon, parentLay, this);
}

function drawOutlinedBtn(btnName, width, height, icon, parentLay, outlineObj) {
    outlinedButton = app.AddButton(parentLay, null, width, height, 'Custom,FontAwesome');
    outlinedButton.SetFontFile(defaultFont)
    outlinedButton.SetTextColor(stateColor(md_theme_light_primary, md_theme_dark_primary));
    
    if (icon === null) {
        outlinedButton.SetText(btnName);
    } else outlinedButton.SetText(`[fa-${icon}]` + ' ' + btnName);
    
    outlinedButton.SetStyle(clrOutlined(), clrOutlined(), 20, strokeClrOutlined(), 1, 0);
    
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
    
        this.Animate = function (type, callback, time) {
        textButton.Animate(type, callback, time);
    }
    this.SetScale = function (x, y) {
        textButton.SetScale(x, y);
    }
    this.SetVisibility = function (mode) {
        textButton.SetVisibility(mode);
    }
    this.SetEnabled = function (enableBool) {
        textButton.SetEnabled(enableBool);
    }
    this.SetEllipsize = function (mode) {
        textButton.SetEllipsize(mode);
    }
    this.SetDescription = function (desc) {
        textButton.SetDescription(desc);
    }
    this.SetHtml = function (str) {
        textButton.SetHtml(str);
    }
    this.SetText = function (text) {
        textButton.SetText(text);
    }
    this.SetTextSize = function (size, mode) {
        textButton.SetTextSize(size, mode);
    }
    this.SetMargins = function (left, top, right, bottom, mode) {
        textButton.SetMargins(left, top, right, bottom, mode);
    }
    this.SetPadding = function (left, top, right, bottom, mode) {
        textButton.SetPadding(left, top, right, bottom, mode);
    }
    this.SetOnTouch = function (onTouch) {
        this.onTouch = onTouch;
    }
    this.SetOnLongTouch = function (onLongTouch) {
        this.onLongTouch = onLongTouch;
    }
    this.Tween = function (target, duration, type, repeat, yoyo, callback) {
        textButton.Tween(target, duration, type, repeat, yoyo, callback);
    }
    this.Focus = function () {
        textButton.Focus();
    }
    this.Gone = function () {
        textButton.Gone();
    }
    this.Show = function () {
        textButton.Show();
    }
    
    this.Hide = function (){
        textButton.Hide();
    }
    
    // Call It
    drawTextBtn(btnName, width, height, icon, parentLay, this);
    
}

function drawTextBtn(btnName, width, height, icon, parentLay, textBtnObj) {
    textButton = app.AddButton(parentLay, null, width, height, 'Custom,FontAwesome');
    textButton.SetFontFile(defaultFont)
    textButton.SetTextColor(stateColor(md_theme_light_primary, md_theme_dark_primary));
    
    if (icon === null) {
        textButton.SetText(btnName);
    } else textButton.SetText(`[fa-${icon}]` + ' ' + btnName);
    
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
    
    this.SetOnTouch = function (onTouch) {
        this.onTouch = onTouch;
    }
    
    this.SetMargins = function (left, top, right, bottom, mode) {
        fabContainer.SetMargins(left, top, right, bottom, mode);
    }
    
    this.SetPosition = function (left, top, width, height, options) {
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
    
    this.s=SetOnTouch = function (onTouch) {
        this.onTouch = onTouch;
    }
    
    this.SetMargins = function (left, top, right, bottom, mode) {
        smallFabContainer.SetMargins(left, top, right, bottom, mode);
    }
    
    this.SetPosition = function (left, top, width, height, options) {
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
    
    _fabIcon.SetOnTouchDown(function () {
        if (fabObj.onTouch) {
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
    
    this.SetOnTouch = function (onTouch) {
        this.onTouch = onTouch;
    }
    
    this.SetMargins = function (left, top, right, bottom, mode) {
        largeFabContainer.SetMargins(left, top, right, bottom, mode);
    }
    
    this.SetPosition = function (left, top, width, height, options) {
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

function switchObject(switchType, value, parent_Layout) {
    this.GetValue = function () {
        return switchValue;
    }
    this.SetOnToggle = function (onToggle) {
        this.onToggle = onToggle;
    }
    this.SetPosition = function (left, top, width, height, options) {
        _switch.SetPosition(left, top, width, height, options)
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
    drawSwitchNoIcon(value, parent_Layout, this);
}

var switchValue;

function drawSwitchNoIcon(value, parent_Layout, objFunc) {
    switchValue = value;
    
    _switch = app.CreateLayout('Card')
    _switch.SetSize(52, 32, 'dp');
    _switch.SetElevation(0.9)
    _switch.SetCornerRadius(16)
    
    
    handle = app.CreateImage(null, 0.085, 0.05)
    handle.DrawCircle(0.52, 0.42, 0.30)
    handle.SetAutoUpdate(false)
    _switch.SetMargins(0.05)
    handle.Hide()
    
    handle2 = app.CreateImage(null, 0.085, 0.05)
    handle2.DrawCircle(0.52, 0.42, 0.45)
    handle2.SetAutoUpdate(false)
    handle2.SetMargins(0.052)
    handle2.Hide()
    
    if (value) {
        handle2.Show()
        if (theme === 'light') {
            handle2.SetPaintColor(md_theme_light_onPrimary)
            _switch.SetBackColor(md_theme_light_primaryContainer)
        } else {
            handle2.SetPaintColor(md_theme_dark_onPrimary)
            _switch.SetBackColor(md_theme_dark_primaryContainer)
        }
    } else {
        handle.Show()
        handle2.Hide()
        if (theme === 'light') {
            handle.SetPaintColor(md_theme_light_onSurfaceVariant)
            _switch.SetBackColor(md_theme_light_surfaceVariant)
        } else {
            handle.SetPaintColor(md_theme_dark_onSurfaceVariant)
            _switch.SetBackColor(md_theme_dark_surfaceVariant)
        }
    }
    
    handle.SetOnTouchUp(function () {
        handle.Hide()
        handle2.Show()
        switchValue = true;
        if (theme === 'light') {
            handle2.SetPaintColor(md_theme_light_onPrimary)
            _switch.SetBackColor(md_theme_light_primaryContainer)
        } else {
            handle2.SetPaintColor(md_theme_dark_onPrimary)
            _switch.SetBackColor(md_theme_dark_primaryContainer)
        }
        try {
            objFunc.onToggle(switchValue);
        } catch (err) {
            return null;
        }
        
    })
    
    handle2.SetOnTouchUp(function () {
        handle2.Hide()
        handle.Show()
        switchValue = false;
        
        if (theme === 'light') {
            handle.SetPaintColor(md_theme_light_onSurfaceVariant)
            _switch.SetBackColor(md_theme_light_surfaceVariant)
        } else {
            handle.SetPaintColor(md_theme_dark_onSurfaceVariant)
            _switch.SetBackColor(md_theme_dark_surfaceVariant)
        }
        
        try {
            objFunc.onToggle(switchValue);
        } catch (err) {
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
    
    this.StopProgress = function () {
        progressContainer.Hide();
        progressContainer.Destroy();
        clearInterval(animation);
    }
    
    this.SetValue = function (value) {
        this.value = value;
        _progressIndicator.SetSize(parseFloat(value / 100), 0.05);
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
        this.GetCheckedItems = function () {
        return _radio.GetCheckItem();
    }
    
    this.CheckItemByIndex = function (checkItem) {
        return _radio.CheckItemByIndex(checkItem);
    }
    
    this.GetItem = function (title) {
        return _radio.GetItem(title);
    }
    
    this.RemoveAll = function () {
        return _radio.RemoveAll();
    }
    
    this.RemoveItem = function (title) {
        return _radio.RemoveItem(title);
    }
    
    this.RemoveItemByIndex = function (index) {
        return _radio.RemoveItemByIndex(index);
    }
    
    this.ScrollToItem = function (title, body) {
        return _radio.ScrollToItem(title, body);
    }
    
    this.ScrollToItemByIndex = function (index) {
        return _radio.ScrollToItemByIndex(index);
    }
    
    this.SelectItem = function (item) {
        return _radio.SelectItem(item);
    }
    
    this.SelectItemByIndex = function (index, scroll) {
        _radio.SelectItemByIndex(index, scroll);
    }
    
    this.SetOnSelect = function (onSelect) {
        return _radio.SetOnSelect(onSelect);
    }
    
    this.SetOnTouch = function (onTouch) {
        this.onTouch = onTouch;
    }
    
    this.SetList = function (list, delim) {
        return _radio.SetList(list, delim);
    }
    
    this.SetMargins = function (left, top, right, bottom) {
        _radio.SetMargins(left, top, right, bottom);
    }
    
    this.SetPosition = function (left, top, width, height, options) {
        _radio.SetPosition(left, top, width, height, options);
    }
    
    this.SetSize = function (width, height) {
        _radio.SetSize(width, height);
    }
    
    this.SetScale = function (x, y) {
        _radio.SetScale(x, y);
    }
    
    this.ShowContainer = function () {
        _radio.Show();
    }
    
    this.HideContainer = function () {
        _radio.Hide();
    }
    
    this.GetLength = function () {
        return _radio.GetLength();
    }
    
    this.InsertItem = function (index, title, body, image) {
        _radio.InsertItem(index, title, body, image);
    }
    
    this.IsVisible = function () {
        return _radio.IsVisible();
    }
    
    this.IsEnabled = function () {
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

var dlgA;

function dlgBarObject(title, text, dlgOptions, noAction, yesAction) {
    
    this.Hide = function () {
        dlgA.Hide();
    }
    
    this.SetOnCancel = function (onCancel) {
        this.onCancel = onCancel;
    }
    this.SetOnAction = function (onAction) {
        this.onAction = onAction;
    }
    showDialogBar(title, text, dlgOptions, noAction, yesAction, this)
}

function showDialogBar(title, text, dlgOptions, noAction, yesAction, dlgFunc) {
    
    let width = function () {
        if (app.IsTablet()) return 560;
        else return 280;
    }
    
    dlgA = app.CreateDialog();
    dlgA.SetBackColor("#00000000");
    dlgA.SetOnCancel(function () {
        try {
            dlgFunc.onCancel();
            dlgA.Hide();
        } catch (err) {
            return null;
        }
    })
    
    dlgUi = app.CreateLayout('Card')
    dlgA.AddLayout(dlgUi)
    
    dlgUi.SetElevation(0)
    dlgUi.SetSize(width(), null, 'dp')
    dlgUi.SetCornerRadius(28)
    
    const box = app.CreateLayout("Linear", "Left");
    box.SetSize(width(), null, 'dp')
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
    footer.SetSize(width(), null, 'dp');
    footer.SetPadding(24, null, 24, 24, "dp");
    
    noBtn = app.AddText(footer, noAction, null, null, 'Bold')
    noBtn.SetOnTouchUp(function () {
        if (dlgFunc.onAction) {
            dlgFunc.onAction(false);
            dlgA.Dismiss();
        }
    })
    noBtn.SetPadding(8, null, 8, null, "dp");
    
    yesBtn = app.AddText(footer, yesAction, null, null, 'Bold,VCenter')
    yesBtn.SetOnTouchUp(function () {
        if (dlgFunc.onAction) {
            dlgFunc.onAction(true);
            dlgA.Dismiss();
        }
    })
    yesBtn.SetPadding(8, null, 8, null, "dp");
    
    if (theme === 'light') {
        noBtn.SetTextColor(md_theme_light_primary)
        yesBtn.SetTextColor(md_theme_light_primary)
        dlgUi.SetBackColor(md_theme_light_secondaryContainer)
        dlgTitle.SetTextColor(md_theme_light_onSurface)
        dlgText.SetTextColor(md_theme_light_onSurfaceVariant)
    } else {
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
        drawSnackBarUi(text, btnAction, width, alignment, this.onTouch, this.timeout, this.top);
    }
    
}

function drawSnackBarUi(text, btnAction, width, alignment, onTouch, timeout, top) {
    
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
    
    this.SetVisibility = function (mode) {
        _seekBar.SetVisibility(mode)
    }
    
    this.SetSize = function (width, height, options) {
        _seekBar.SetSize(width, height, options)
    }
    this.SetPosition = function (left, top, width, height, options) {
        _seekBar.SetPosition(left, top, width, height, options)
    }
    this.SetOnTouch = function (onTouch) {
        _seekBar.SetOnTouch(onTouch)
    }
    
    this.SetValue = function (value){
        _seekBar.SetValue(value);
    }
    this.GetValue = function () {
        return _seekBar.GetValue();
    }
    this.IsVisible = function () {
        return _seekBar.IsVisible();
    }
    this.Animate = function (type, callback, time) {
        _seekBar.Animate(type, callback, time)
    }
    this.Gone = function () {
        _seekBar.Gone();
    }
    this.SetDecimals = function (decimals) {
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
var _sSheet;

function slideSheetObject(sheetLayout, width, options) {
    
    this.Dismiss = function () {
        _sSheet.Animate('SlideToRight', function () {
            app.DestroyLayout(slideSheetContainer);
        }, 210);
    }
    
    this.Show = function () {
        drawSlideSheet(sheetLayout, width, options, this);
    }
    
}

function drawSlideSheet(sheetLayout, width, options, that) {
    slideSheetContainer = app.CreateLayout('Linear', 'FillXY,VCenter,Bottom,Right');
    slideSheetContainer.SetSize(1, 1);
    slideSheetContainer.SetOnTouchUp(that.dismissSlideSheet);
    
    _sSheet = app.CreateLayout('Card', 'FillX,VCenter,Right');
    _sSheet.SetSize(width, 1);
    _sSheet.SetCornerRadius(15);
    _sSheet.Animate('BounceRight', null, 550);
    _sSheet.AddChild(sheetLayout);
    
    slideSheetContainer.SetBackColor(stateColor(md_theme_light_scrim, md_theme_dark_scrim))
    _sSheet.SetBackColor(stateColor(md_theme_light_surfaceVariant, md_theme_dark_surfaceVariant))
    slideSheetContainer.SetBackAlpha(0.33);
    slideSheetContainer.AddChild(_sSheet);
    app.AddLayout(slideSheetContainer);
    
    
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
    _bSheet.Animate('SlideToBottom', function () {
        app.DestroyLayout(bottomSheetContainer);
    }, 210);
}

function menuObj(menuType, list, position) {
    this.SetOnTouch = function (onTouch) {
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



function navDrawerObject(drawerLayout, side, width, options) {
    this.OpenDrawer = function (side) {
        app.OpenDrawer(side)
    }
    this.CloseDrawer = function (side) {
        app.CloseDrawer(side)
    }
    this.RemoveDrawer = function (side) {
        
    }
    drawNavDrawer(drawerLayout, side, width, options, this)
}


function drawNavDrawer(drawerLayout, side, width, options) {
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
    
    this.SetOnTouch = function (onTouchFunc) {
        this.onTouchFunc = onTouchFunc;
    }
    
    this.SetRawAdjustment = function (distanceFromTop) {
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


const param = '/repos/oarabiledev/Material3/releases/latest';

app.HttpRequest('GET', 'https://api.github.com', param, null, function (error,reply,status) {
    if(app.InIDE() && showUpdates){
    if(status === 200 && !error){
    let ans = JSON.parse(reply);
    app.WriteFile('gitAns.json',reply)
    const latestVersion = ans.tag_name;
    
    
    if (latestVersion !== pluginVersion) {
        const updateMessage = `An update is available :: Version ${latestVersion} \n
        Update Link:: https://github.com/oarabiledev/Material3/releases/tag/${latestVersion}`;
        
        console.log("<div style='color:yellow'> " + updateMessage);
        
        updateDialog = ui.showDialog('Update Warning !', `This Version Of Material3 is not upto-date.
        \nLatest Version Is :: ${latestVersion}`, null, 'Ignore', 'Update');
        
        updateDialog.setOnAction( function (boolAnswer) {
            if (boolAnswer) {
                app.OpenUrl(`https://github.com/oarabiledev/Material3/releases/tag/${latestVersion}`);
            } else {
                app.SaveBoolean('showUpdate?', false, M3Config);
            }
        });
    }
    }
    else {
        warnDeveloper('No Internet, Cannot Check For Updates','Issue With Checking For Updates')
    }
    }
    else return;
}, null);


