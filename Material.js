// Material Design 3 Library / Plugin For DroidScript
// @Author: Oarabile Koore

/********************************************************************

                                                            *********
                                                              /\  /\
                                                              \ \/ /
                                                               \  /
   Under The ZLib License.                                      \/
   @2024, Built With Love From Botswana.                    *********
********************************************************************/


let pluginFolder = app.GetPrivateFolder("Plugins") + "/material/";
let debugFolder = app.GetAppPath().endsWith("/Material");
let prodFolder = debugFolder ? "" : pluginFolder;

/**
 * ScaffoldAppTheme function lets you predefine variables like theme and icon types to be used.
 * @param {string} theme dark | light | light-high-contrast | dark-high-contrast & more
 * @param {string} iconFill sharp | round | outlined | two-toned
 */
const MUIScaffoldAppTheme = function (theme = "light", iconFill = "outlined") {
    if (!app.FileExists("./Src/material-theme.json")) {
        useDefaultTheme();
    } else {
        fileContent = app.ReadFile("./Src/material-theme.json");
        fileObject = JSON.parse(fileContent);
    }

    globalThis.color = {};
    globalThis.theme = signal();

    switch (iconFill) {
        case "sharp":
            globalThis.iconFill = prodFolder + "./Lib/MaterialIcons-Sharp.otf";
            break;

        case "round":
            globalThis.iconFill = prodFolder + "./Lib/MaterialIcons-Round.otf";
            break;

        case "outlined":
            globalThis.iconFill = prodFolder + "./Lib/MaterialIcons-Outlined.otf";
            break;

        case "two-toned":
            globalThis.iconFill = prodFolder + "./Lib/MaterialIcons-TwoToned.otf";
            break;

        default:
            globalThis.iconFill = prodFolder + "./Lib/MaterialIcons-Regular.ttf";
    }
    
    function applyNavigationalColors(){
        app.SetStatusBarColor(fileObject?.schemes.dark.surface)
        app.SetNavBarColor(color.background)
    }
    applyNavigationalColors()
    
    // Update theme and notify subscribers
    globalThis.theme.subscribe(() => {
        const selectedColors = fileObject?.schemes[globalThis.theme.value];
        Object.entries(selectedColors).forEach(([key, value]) => {
            color[key] = value;
        });
        applyNavigationalColors()
    });
    if (globalThis.usingDefault) globalThis.theme.value = "light";
    else globalThis.theme.value = theme || "light";    
};

/**
* Set the back color of the app
*/
function MUISetBackColor(color){
    app.SetBackColor(color)
}
/**
 * Create a DroidScript Layout
 * @param {string} type
 * @param {string} options
 * @returns mduiLayout
 */
function MUICreateLayout(type, options, properties) {
    let layout = app.CreateLayout(type, options);

    layout.SetBackColor(color.background);

    globalThis.theme.subscribe(() => {
        layout.SetBackColor(color.background);
    });

    return layout;
}

/**
 * Add a button to your view
 * @param {Dso-Layout} parent
 * @param {string} text
 * @param {number} width
 * @param {number} height
 * @param {string} type type of button to add
 */
const MUIButton = function (parent,text, width, height, type) {
    let button = app.AddButton(parent, text, width, height, "Custom");
    const radius = 20;

    function applyStyling() {
        let btnColor = color.primary;
        switch (type) {
            case "filled":
                button.Batch({
                    SetStyle: [btnColor, btnColor, radius, null, 0, 0],
                    SetTextColor: [color.onPrimary],
                });
                break;

            case "text":
                button.Batch({
                    SetStyle: [btnColor, btnColor, radius, null, 0, 0],
                    SetTextColor: [color.primary],
                });
                break;

            case "outlined":
                button.Batch({
                    SetStyle: [color.background, color.background, radius, color.outline, 1, 0],
                    SetTextColor: [color.primary],
                });
                break;
                
                //default is tonal
            default:
                button.Batch({
                    SetStyle: [color.secondaryContainer, color.secondaryContainer, radius, null, 0, 0],
                    SetTextColor: [color.onSecondaryContainer],
                });
        }
    }

    applyStyling();

    globalThis.theme.subscribe(() => {
        applyStyling();
    });

    return button;
}

/**
 * Add an icon button to your view.
 * @param {Ds-Layout} parent
 * @param {string} icon
 * @param {string} type filled | tonal | clear
 * @param {string} iconFill sharp | round | outlined | two-toned
 */
const MUIIconButton = function (parent, icon, type, iconFill) {
    let btn = app.AddButton(parent, icon, null, null, "Custom");
    btn.SetSize(48, 48, "dp");
    btn.SetTextSize(24, "dp");

    if (iconFill) {
        btn.SetFontFile(returnProperIconFill());
    } else {
        btn.SetFontFile(globalThis.iconFill);
    }

    function returnProperIconFill() {
        switch (iconFill) {
            case "sharp":
                return prodFolder + "./Lib/MaterialIcons-Sharp.otf";
                break;

            case "round":
                return prodFolder + "./Lib/MaterialIcons-Round.otf";
                break;

            case "outlined":
                return prodFolder + "./Lib/MaterialIcons-Outlined.otf";
                break;

            case "two-toned":
                return prodFolder + "./Lib/MaterialIcons-TwoToned.otf";
                break;

            default:
                return prodFolder + "./Lib/MaterialIcons-Regular.ttf";
        }
    }

    function applyStyling() {
        switch (type) {
            case "filled":
                btn.SetStyle(color.primary, color.primary, 24, null, null, 0);
                btn.SetTextColor(color.surfaceContainerHighest);

                break;

            case "tonal":
                btn.SetStyle(color.secondaryContainer, color.secondaryContainer, 24, null, null, 0);
                btn.SetTextColor(color.surfaceContainerHighest);
                break;

            case "clear":
                btn.SetStyle(color.background, color.background, 24, null, null, 0);
                btn.SetTextColor(color.inverseSurface);
                break;

            default:
                btn.SetStyle(color.background, color.background, 24, color.inverseSurface, 1, 0);
                btn.SetTextColor(color.inverseSurface);
        }
    }
    applyStyling();

    globalThis.theme.subscribe(() => {
        applyStyling();
    });
    return btn;
}

/**
 * Add a radio button to your view.
 * @param {Ds-Layout} parent
 * @param {boolean} isChecked
 */
const MUIRadioButton = function (parent, isChecked = false) {
    let isCheckedStatus = signal(isChecked);
    let icon;

    if (isChecked) {
        icon = "radio_button_checked";
    } else icon = "radio_button_unchecked";

    let btn = MUIIconButton(parent, icon, "clear", "sharp");
    btn.data.i = crypto.randomUUID()
    
    isCheckedStatus.subscribe((status) => {
        if (btn.data.onCheckHandler) btn.data.onCheckHandler(status);
        if (status) icon = "radio_button_checked";
        else icon = "radio_button_unchecked";
        btn.SetText(icon);
    });
    
    //Added I() To avoid callback optimization done 
    //by Ds
    btn.SetOnTouch(I(() => {
        isCheckedStatus.value = !isCheckedStatus.value;
    }));

    btn.SetOnCheck = function (onCheckHandler) {
        if (typeof onCheckHandler != "function") {
            console.error("onCheckHandler is not a function.");
            return;
        }
        btn.data.onCheckHandler = onCheckHandler;
    };
    return btn;
}

/**
 * Add a checkbox to your view.
 * @param {Ds-Layout} parent
 * @param {boolean} isChecked
 */
const MUICheckBox = function (parent, isChecked = false) {
    let isCheckedStatus = signal(isChecked);
    let icon;

    let btn = MUIIconButton(parent, "", "clear", "sharp");
    btn.data.i = crypto.randomUUID()
    
    if (isChecked === "disabled") {
        icon = "indeterminate_check_box";
        btn.SetText(icon);
        btn.SetEnabled(false);
    } else if (isChecked) {
        icon = "check_box";
        btn.SetText(icon);
    } else {
        icon = "check_box_outline_blank";
        btn.SetText(icon);
    }

    isCheckedStatus.subscribe((status) => {
        if (btn.data.onCheckHandler) btn.data.onCheckHandler(status);
        if (status) icon = "check_box";
        else icon = "check_box_outline_blank";
        btn.SetText(icon);
    });

    btn.SetOnTouch(I(() => {
        isCheckedStatus.value = !isCheckedStatus.value;
    }));

    btn.SetOnCheck = function (onCheckHandler) {
        if (typeof onCheckHandler != "function") {
            console.error("onCheckHandler is not a function.");
            return;
        }
        btn.data.onCheckHandler = onCheckHandler;
    };
    return btn;
}

/**
 * Add a switch to your view.
 * @param {Ds-Layout} parent
 * @param {boolean} isChecked
 */
const MUISwitch = function (parent, isChecked = false) {
    let isCheckedStatus = signal(isChecked);

    let container = app.AddLayout(parent, "Card");
    container.SetCornerRadius(16);
    container.SetElevation(0.9);
    container.SetSize(52, 32, "dp");

    let abs_container = app.AddLayout(container, "Absolute");

    let handle = app.AddImage(abs_container, null, 0.085, 0.05);
    handle.SetAutoUpdate(true);

    function initiateHandleState(bool) {
        if (bool) {
            handle.SetPosition(0.06, 0);
            handle.DrawCircle(0.45, 0.45, 0.45);
        } else {
            handle.Scale(0.75, 0.75);
            handle.SetPosition(0, 0);
            handle.DrawCircle(0.45, 0.45, 0.45);
        }
    }

    function moveHandle(bool) {
        if (bool) {
            handle.Tween({ x: 0.0, y: 0, sw: 0.75, sh: 0.75 }, 100, "Sinusoidal.Out", 0, false, () => {
                handle.SetPaintColor(color.outline);
                handle.DrawCircle(0.45, 0.45, 0.45);
                handle.Update();
                isCheckedStatus.value = false;
            });
        } else {
            handle.Tween({ x: 0.06, y: 0, sw: 1, sh: 1 }, 100, "Back.Out", 0, false, () => {
                handle.SetPaintColor(color.primary);
                handle.DrawCircle(0.45, 0.45, 0.45);
                handle.Update();
                isCheckedStatus.value = true;
            });
        }
    }

    handle.SetOnTouchDown(() => moveHandle(isCheckedStatus.value));

    function applyStyling() {
        container.SetBackColor(color.surfaceContainerHighest);

        if (isCheckedStatus.value) {
            handle.SetPaintColor(color.primary);
            handle.DrawCircle(0.45, 0.45, 0.45);
            handle.Update();
        } else {
            handle.SetPaintColor(color.outline);
            handle.DrawCircle(0.45, 0.45, 0.45);
            handle.Update();
        }
    }

    isCheckedStatus.subscribe((status) => {
        if (container.data.onCheckHandler) container.data.onCheckHandler(status);
    });

    /**
     * when the switch is checked call a function
     * @param {} onCheckHandler
     */
    container.SetOnCheck = function (onCheckHandler) {
        if (typeof onCheckHandler != "function") {
            console.error("onCheckHandler is not a function.");
            return;
        }
        container.data.onCheckHandler = onCheckHandler;
    };

    globalThis.theme.subscribe(() => {
        applyStyling();
    });
    applyStyling();
    initiateHandleState(isChecked);

    return container;
}
/**
 * Add a Floating Action Button to your view.
 * @param {Ds-Layout} parent
 * @param {string} icon
 * @param {string} size small | large | medium
 */
const MUIFAB = function (parent, icon = "edit", size) {
    let fab = app.AddButton(parent, icon, null, null, "Custom,Lego");
    fab.SetFontFile(globalThis.iconFill);

    // separated the styling configs to avoid unnecesary XML DOM Shifts.
    // remember these are permanent configurations unlike the colro of
    // the control as its reliant on theme property
    switch (size) {
        case "large":
            fab.SetSize(96, 96, "dp");
            fab.SetTextSize(36, "dp");
            break;

        case "small":
            fab.SetSize(40, 40, "dp");
            fab.SetTextSize(24, "dp");
            break;

        default:
            fab.SetSize(56, 56, "dp");
            fab.SetTextSize(24, "dp");
    }

    function applyStyling() {
        let btnColor = color.primaryContainer;
        let iconColor = color.onPrimaryContainer;
        switch (size) {
            case "large":
                fab.Batch({
                    SetTextColor: [iconColor],
                    SetStyle: [btnColor, btnColor, 28, null, null, 0],
                });
                break;

            case "small":
                fab.Batch({
                    SetTextColor: [iconColor],
                    SetStyle: [btnColor, btnColor, 12, null, null, 0],
                });
                break;

            default:
                fab.Batch({
                    SetTextColor: [iconColor],
                    SetStyle: [btnColor, btnColor, 16, null, null, 0],
                });
        }
    }

    applyStyling();

    globalThis.theme.subscribe(() => {
        applyStyling();
    });

    return fab;
}

const MUIDialog = function() {
    
}

/**
 * Add a progress bar to your view
 * @param {Ds-Layout} parent 
 * @param {number} value = 40 
 * @param {number} width = 0.8 
 * @param {string} type = "linear" | "linearintermediate"
 */
const MUIProgressBar = function (parent, value = 40, width = 0.8, type = "linear") {
    let container = app.AddLayout(parent, "Absolute", "Horizontal,Left,FillXY");
    container.SetSize(width, 0.005);
    container.data.value = value;
    
    let bar = app.AddText(container, " ");
    let animationTimeout;
    
    function startAnimation(shouldStartAhead) {
        animationTimeout = setTimeout(function () {
            shouldStartAhead ? delay = 500 : delay = 2000
            
            // DO NOT REMOVE THESE TRY-CATCHES, THEY ARE TO PREVENT A NULL ERROR !!!!!!
            try {
                bar.Tween({ x: 1.5, y: 0, w: width, h: -1 }, delay, "Sinusoidal.In", 0, false, () => {
                    try{
                        //bar.Hide()
                        bar.Tween({ x: -0.1, y: 0, w: 0.1, h: -1 }, 0, 'Sinusoidal.In', 0, false,
                        () => {
                            try {
                                bar.Show(), startAnimation();
                            }catch(e){
                                bar.Release()
                                container.Release()
                            }
                        });
                    }
                    catch(e){
                        bar.Release()
                        container.Release()
                    }
                });
            }
            catch(e){
                bar.Release()
                container.Release()
            }
        }, 0);
        
    }
    
    function applyStyling() {
        switch (type) {
            case "linearintermediate":
                container.SetBackColor(color.secondaryContainer);
                container.data.type = 'linearintermediate'
                bar.SetBackColor(color.primary);
                bar.SetPosition(-0.1)
                bar.SetSize(0.1, -1);
                startAnimation();
                
                break;

            default:
                container.SetBackColor(color.secondaryContainer);
                bar.SetSize(parseFloat(value / 100) * width, -1);
                bar.SetBackColor(color.primary);
                container.data.type = 'linear'
        }
    }

    applyStyling() || globalThis.theme.subscribe(()=>{
        container.SetBackColor(color.secondaryContainer);
        bar.SetBackColor(color.primary);
    })
    
    /**    
     * set the value of the progress-bar
     * @param {number} value 
     */
    container.SetValue = function(value){
        if (value >= 100) {
            if (container.data.type.includes('intermediate')){
                container.DestroyChild(bar)
                parent.DestroyChild(container)      
            }
            else {
                bar.Tween({ x: 0, y: 0, w: parseFloat(value / 100) * width, h: -1 }, 750, 
                "Linear.None", 0, 0, ()=>{
                    parent.DestroyChild(container)
                    container.Release()
                }) 
            }
        } 
        else {
            bar.Tween({ x: 0, y: 0, w: parseFloat(value / 100) * width, h: -1 }, 750, 
            "Linear.None")
            container.data.value = value
        }
    }
    
    /**    
     * get the progress value
     */
    container.GetValue = function(){
        return container.data.value;
    }
    return container;
}

/**
 * Add a snackbar to your view
 * @param {string} text = '' 
 * @param {number} width = 0.85 
 * @param {string} alignment = 'Bottom' Top or Bottom
 * @param {string} endonmentButtonName = 'Okay' Name of the closing button
 */
const MUISnackBar = function(text = '', width = 0.85, alignment = 'Bottom', endonmentButtonName = 'Okay'){
  
    let container = app.CreateLayout('Linear', alignment + ',FillXY,TouchThrough,Center');
    let body = app.CreateLayout('Card');
    
    container.AddChild(body);
    container.data.timeout = 2500;
    container.data.alignment = alignment;
    
    body.SetMargins(0.055, 0.018, 0.055, 0.018);
    body.SetCornerRadius(4);
    body.SetElevation(6);
    body.SetSize(width, 0.065);
    
    const box = app.CreateLayout("Linear", "Horizontal");
    box.SetSize(width, 0.065);
    body.AddChild(box);
    
    let snackText = app.CreateText(text, null, null, 'Multiline,AutoScale,VCenter');
    snackText.SetTextColor('black');
    snackText.SetMargins(0.055, 0.018, 0.055, 0.01);
    snackText.SetTextSize(16);
    box.AddChild(snackText);
    
    let snackButton = app.CreateText(endonmentButtonName, null, null, "VCenter,FillXY,AutoScale,Wrap,Right");
    snackButton.SetMargins(null, null, 16, null, 'dp');
    snackButton.SetTextSize(16);
    snackButton.SetOnTouchDown(callClosingFn)

    box.AddChild(snackButton);
    
    function applyStyling(){
        box.SetBackColor(color.inverseSurface)
        snackText.SetTextColor(color.inverseOnSurface)
        snackButton.SetTextColor(color.inversePrimary)
    }
    
    applyStyling()
    
    globalThis.theme.subscribe(()=>{
        applyStyling()
    })
    
    function callClosingFn(){
        if (container.data.onpress){
            container.data.onpress()
        } else {
            snackBarFunctions.Hide()
        }
    }
    
    function getProperAnimation(isMovingIn){
        if (container.data.alignment.toLocaleLowerCase() == 'bottom'){
            if (isMovingIn){
                return 'SlideFromBottom'
            } else {
                return 'SlideToBottom'
            }
        } else {
            if (isMovingIn){
                return 'SlideFromTop'
            } else {
                return 'SlideToTop'
            }
        }
    }
    
    let timeout;
    
    const snackBarFunctions = {
        
        /**        
         * Set the timeout for the snackbar to close
         * @param {number} time 
         */
        set Timeout(time){
            container.data.timeout = time;
        },
        
        /**        
         * Show the snackbar
         */
        Show: function(){
            container.Animate(getProperAnimation(1), ()=>{
                timeout = setTimeout(()=>{
                    snackBarFunctions.Hide()
                }, 
                container.data.timeout + 750)
            }, 750)
            
            app.AddLayout(container);
            
        },
        
        /**        
         * Hide the snackbar
         */
        Hide: function(){
            container.Animate(getProperAnimation(0), ()=>{
                 app.DestroyLayout(container);
                 container.Destroy()
                 clearTimeout(timeout)
            }, 750) 
        },
        
        /**        
         * Call a function when the user touches your endonement
         * Button
         * @param {Function} Fn 
         */
        SetOnTouch: function(Fn){
            container.data._nohash = false;
            container.data.onpress = Fn;
        }
    }
    
    return snackBarFunctions;
}

/**
 * Switch between themes dynamically without app restart
 * @param {string} theme
 */
const MUISetTheme = function (theme) {
    app.Hide()
    globalThis.theme.value = theme, 
    app.Show();
};

/**
 * create a reactive value, that responds to a change in its
 * value by firing the subscribed function to changes.
 * it sends down the new value into the subscriber function.
 * @param {any} defaultValue 
 */
function signal(defaultValue) {
    let internalValue = defaultValue;
    let subscriptions = [];

    function notifySubscribers() {
        subscriptions.forEach((fn) => fn(internalValue));
    }

    return {
        get value() {
            return internalValue;
        },
        set value(newValue) {
            internalValue = newValue;
            notifySubscribers();
        },
        subscribe(fn) {
            subscriptions.push(fn);
        },
    };
}

function useDefaultTheme() {
    globalThis.usingDefault = true;
    const fileContent = `{
        "schemes": {
            "light": {
                "primary": "#4C662B",
                "surfaceTint": "#4C662B",
                "onPrimary": "#FFFFFF",
                "primaryContainer": "#CDEDA3",
                "onPrimaryContainer": "#102000",
                "secondary": "#586249",
                "onSecondary": "#FFFFFF",
                "secondaryContainer": "#DCE7C8",
                "onSecondaryContainer": "#151E0B",
                "tertiary": "#386663",
                "onTertiary": "#FFFFFF",
                "tertiaryContainer": "#BCECE7",
                "onTertiaryContainer": "#00201E",
                "error": "#BA1A1A",
                "onError": "#FFFFFF",
                "errorContainer": "#FFDAD6",
                "onErrorContainer": "#410002",
                "background": "#F9FAEF",
                "onBackground": "#1A1C16",
                "surface": "#F9FAEF",
                "onSurface": "#1A1C16",
                "surfaceVariant": "#E1E4D5",
                "onSurfaceVariant": "#44483D",
                "outline": "#75796C",
                "outlineVariant": "#C5C8BA",
                "shadow": "#000000",
                "scrim": "#000000",
                "inverseSurface": "#2F312A",
                "inverseOnSurface": "#F1F2E6",
                "inversePrimary": "#B1D18A",
                "primaryFixed": "#CDEDA3",
                "onPrimaryFixed": "#102000",
                "primaryFixedDim": "#B1D18A",
                "onPrimaryFixedVariant": "#354E16",
                "secondaryFixed": "#DCE7C8",
                "onSecondaryFixed": "#151E0B",
                "secondaryFixedDim": "#BFCBAD",
                "onSecondaryFixedVariant": "#404A33",
                "tertiaryFixed": "#BCECE7",
                "onTertiaryFixed": "#00201E",
                "tertiaryFixedDim": "#A0D0CB",
                "onTertiaryFixedVariant": "#1F4E4B",
                "surfaceDim": "#DADBD0",
                "surfaceBright": "#F9FAEF",
                "surfaceContainerLowest": "#FFFFFF",
                "surfaceContainerLow": "#F3F4E9",
                "surfaceContainer": "#EEEFE3",
                "surfaceContainerHigh": "#E8E9DE",
                "surfaceContainerHighest": "#E2E3D8"
            }
        }
    }`;
    fileObject = JSON.parse(fileContent);
}
