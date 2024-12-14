// Material Design 3 Library / Plugin For DroidScript
// @Author: Oarabile Koore
// @LICENSE : MIT

let pluginFolder = app.GetPrivateFolder("Plugins") + "/material/";
let debugFolder = app.GetAppPath().endsWith("/Material");
let prodFolder = debugFolder ? "" : pluginFolder;

//mdui object contains all the ui functions.
const mdui = new Object({});

/**
 * ScaffoldAppTheme function lets you predefine variables like theme and icon types to be used.
 * @param {string} theme dark | light | light-high-contrast | dark-high-contrast & more
 * @param {string} iconFill sharp | round | outlined | two-toned
 */
mdui.ScaffoldAppTheme = function (theme = "light", iconFill = "outlined") {
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

    // Update theme and notify subscribers
    globalThis.theme.subscribe(() => {
        const selectedColors = fileObject?.schemes[globalThis.theme.value];
        Object.entries(selectedColors).forEach(([key, value]) => {
            color[key] = value;
        });
    });
    if (globalThis.usingDefault) globalThis.theme.value = "light";
    else globalThis.theme.value = theme || "light";
};

/**
 * Create a DroidScript Layout
 * @param {string} type
 * @param {string} options
 * @returns mduiLayout
 */
mdui.CreateLayout = function (type, options) {
    return new mduiLayout(type, options);
};

function mduiLayout(type, options) {
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
mdui.AddButton = function (parent, text, width, height, type) {
    return new mduiButton(parent, text, width, height, type);
};

function mduiButton(parent, text, width, height, type) {
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

            case "outline":
                button.Batch({
                    SetStyle: [btnColor, btnColor, radius, color.outline, 1, 0],
                    SetTextColor: [color.primary],
                });
                break;

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
 * @param {string} type
 * @param {string} iconFill
 */
mdui.AddIconButton = function (parent, icon, type, iconFill) {
    return new mduiIconButton(parent, icon, type, iconFill);
};

function mduiIconButton(parent, icon, type, iconFill) {
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
mdui.AddRadioButton = function (parent, isChecked) {
    return new mduiRadioButton(parent, isChecked);
};

function mduiRadioButton(parent, isChecked = false) {
    let isCheckedStatus = signal(isChecked);
    let icon;

    if (isChecked) {
        icon = "radio_button_checked";
    } else icon = "radio_button_unchecked";

    let btn = mdui.AddIconButton(parent, icon, "clear", "sharp");
    btn.data.i = crypto.randomUUID();

    isCheckedStatus.subscribe((status) => {
        if (btn.data.onCheckHandler) btn.data.onCheckHandler(status);
        if (status) icon = "radio_button_checked";
        else icon = "radio_button_unchecked";
        I(() => btn.SetText(icon));
    });

    btn.SetOnTouch(() => {
        isCheckedStatus.value = !isCheckedStatus.value;
    });

    btn.SetOnCheck = function (onCheckHandler) {
        if (typeof onCheckHandler != "function") {
            console.error("onCheckHandler is not a function.");
            return;
        }
        I(() => (btn.data.onCheckHandler = onCheckHandler));
    };
    return btn;
}

/**
 * Add a checkbox to your view.
 * @param {Ds-Layout} parent
 * @param {boolean} isChecked
 */
mdui.AddCheckBox = function (parent, isChecked) {
    return new mduiCheckBox(parent, isChecked);
};

function mduiCheckBox(parent, isChecked = false) {
    let isCheckedStatus = signal(isChecked);
    let icon;

    let btn = mdui.AddIconButton(parent, "", "clear", "sharp");
    btn.data.i = crypto.randomUUID();
    if (isChecked === "disabled") {
        icon = "indeterminate_check_box";
        btn.SetText(icon);
        btn.SetEnabled(false);
    } else if (isChecked) {
        icon = "check_box";
        I(() => btn.SetText(icon));
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

    btn.SetOnTouch(() => {
        isCheckedStatus.value = !isCheckedStatus.value;
    });

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
mdui.AddSwitch = function (parent, isChecked) {
    return new mduiSwitch(parent, isChecked);
};

function mduiSwitch(parent, isChecked = false) {
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
            handle.SetPosition(0.052, 0);
            handle.DrawCircle(0.52, 0.42, 0.45);
        } else {
            handle.SetPosition(0, 0);
            handle.DrawCircle(0.52, 0.42, 0.3);
        }
    }

    function moveHandle(bool) {
        if (bool) {
            handle.Tween({ x: 0.0, y: 0, sw: 0.75, sh: 0.75 }, 100, "Sinusoidal.Out", 0, false, () => {
                handle.SetPaintColor(color.outline);
                handle.DrawCircle(0.52, 0.42, 0.45);
                handle.Update();
                isCheckedStatus.value = false;
            });
        } else {
            handle.Tween({ x: 0.05, y: 0, sw: 1, sh: 1 }, 100, "Back.Out", 0, false, () => {
                handle.SetPaintColor(color.primary);
                handle.DrawCircle(0.52, 0.42, 0.45);
                handle.Update();
                isCheckedStatus.value = true;
            });
        }
    }

    handle.SetOnTouchDown(() => moveHandle(isCheckedStatus.value));

    function applyStyling() {
        container.SetBackColor(color.surfaceContainerHighest);

        if (isChecked) {
            handle.SetPaintColor(color.primary);
            handle.DrawCircle(0.52, 0.42, 0.45);
            handle.Update();
        } else {
            handle.SetPaintColor(color.outline);
            handle.DrawCircle(0.52, 0.42, 0.45);
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
mdui.AddIconFAB = function (parent, icon, size) {
    return new mduiIconFAB(parent, icon, size);
};

function mduiIconFAB(parent, icon = "edit", size) {
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

mdui.AddProgressBar = function (parent, value, max, type) {
    return new mduiProgressBar(parent, value, max, type);
};

function mduiProgressBar(parent, value = 40, width = 0.8, type = "linear") {
    let container = app.AddLayout(parent, "Absolute", "Horizontal,Left,FillXY");
    container.SetSize(width, 0.005);
    container.data.value = value;

    let bar = app.AddText(container, " ");
    let animationTimeout;

    function startAnimation(shouldStartAhead) {
        animationTimeout = setTimeout(function () {
            shouldStartAhead ? (delay = 500) : (delay = 2000);

            // DO NOT REMOVE THESE TRY-CATCHES, THEY ARE TO PREVENT A NULL ERROR !!!!!!
            try {
                bar.Tween({ x: 1.5, y: 0, w: 1, h: -1 }, delay, "Linear.None", 0, false, () => {
                    try {
                        bar.Gone();
                        bar.Tween({ x: -0.1, y: 0, w: 0.1, h: -1 }, 0, "Linear.None", 0, false, () => {
                            try {
                                bar.Show(), startAnimation();
                            } catch (e) {
                                bar.Release();
                                container.Release();
                            }
                        });
                    } catch (e) {
                        bar.Release();
                        container.Release();
                    }
                });
            } catch (e) {
                bar.Release();
                container.Release();
            }
        }, 0);
    }

    function applyStyling() {
        switch (type) {
            case "linearintermediate":
                container.SetBackColor(color.secondaryContainer);
                container.data.type = "linearintermediate";
                bar.SetBackColor(color.primary);
                bar.SetPosition(-0.1);
                bar.SetSize(0.1, -1);
                startAnimation(1);

                break;

            default:
                container.SetBackColor(color.secondaryContainer);
                bar.SetSize(parseFloat(value / 100), -1);
                bar.SetBackColor(color.primary);
                container.data.type = "linear";
        }
    }

    applyStyling() ||
        globalThis.theme.subscribe(() => {
            container.SetBackColor(color.secondaryContainer);
            bar.SetBackColor(color.primary);
        });

    /**
     * set the value of the progress-bar
     * @param {number} value
     */
    container.SetValue = function (value) {
        if (value >= 100) {
            if (container.data.type.includes("intermediate")) {
                container.DestroyChild(bar);
                parent.DestroyChild(container);
            } else {
                bar.Tween({ x: 0, y: 0, w: parseFloat(value / 100), h: -1 }, 750, "Linear.None", 0, 0, () => {
                    parent.DestroyChild(container);
                    container.Release();
                });
            }
        } else {
            bar.Tween({ x: 0, y: 0, w: parseFloat(value / 100), h: -1 }, 750, "Linear.None");
            container.data.value = value;
        }
    };

    /**
     * get the progress value
     */
    container.GetValue = function () {
        return container.data.value;
    };
    return container;
}

/**
 * Switch between themes dynamically without app restart
 * @param {string} theme
 */
mdui.SetTheme = function (theme) {
    // a time-out is used to avoid having a janky like ux
    setTimeout(() => {
        if (globalThis.usingDefault) {
            alert(`SetTheme Is Usable Only, If You Have A Theme Source File.`);
            return;
        }
        globalThis.theme.value = theme;
    }, 150);
};

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

// Default Theme Fallback
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
