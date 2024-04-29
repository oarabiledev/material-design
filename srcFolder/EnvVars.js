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
var ErrorCodes;

ErrorCodes = {
    "301":"component Has Been Moved or Name Changed",
    "400":"parentLayout Is Not Defined For ::",
    "404":"baseTheme File Not Found",
    "415":"un-supported Media Type For ::",
    "428":"plugin Is Not Initialized"
}

var unpositionalLayout = ["Linear", "Frame", "Card"];

var ErrorLayout;

ErrorLayout = () =>{
    let layout = app.CreateLayout('Linear','FillXY,H/VCenter');
    
    let errorMsg = app.AddText(layout,'Hi 🙋 you didnt Initailize Material3.')
    
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
