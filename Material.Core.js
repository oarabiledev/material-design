// Material Design Library
// @license
// MIT

// @author
// Oarabile Koore

// @version
// 2.0.0

const mdui = (function () {
    const ui = {
        Initialize: function (defaultTheme, defaultIcons) {
            mdui_initialize(defaultTheme, defaultIcons);
        },

        SetTheme: function (theme) {
            themeSignal.value = theme;
        },

        CreateLayout: function (type, options) {
            return new mdui_layout(type, options);
        },

        AddLayout: function (layout, type, options) {
            return new mdui_layout(type, options, layout);
        },

        CreateButton: function (text, width, height, options) {
            return new mdui_button(text, width, height, options);
        },
    };
    return ui;
})();

// create a state managment tactic for switching theme modes

const createSignal = function (defaultValue) {
    let internal_value = defaultValue;
    let subscribers = [];

    function notify() {
        for (let subscriber of subscribers) {
            subscriber(internal_value);
        }
    }

    return {
        get value() {
            return internal_value;
        },
        set value(newVariable) {
            internal_value = newVariable;
            notify();
        },

        subscribe: (subscriber) => {
            subscribers.push(subscriber);
        },
    };
};

const mdui_initialize = function (defaultTheme, defaultIcons) {
    // check if a baseTheme file is provided, if not warn the dev
    // globalise themes

    if (app.FileExists("material-theme.json")) {
        window.themeSignal = createSignal(defaultTheme);

        themeSignal.subscribe((theme) => {
            window.defaultTheme = theme;
            extract_base_colors();
        });

        window.defaultTheme = themeSignal.value;
        window.defaultIcons = defaultIcons;
        extract_base_colors();
    } else {
        throw Error("json baseTheme File Not Provided");
    }
};

const extract_base_colors = function () {
    let materialFile = app.ReadFile("material-theme.json", "UTF-8");

    let materialJsonData = JSON.parse(materialFile);

    function getColorHexCode(colorName) {
        const colorScheme = materialJsonData.schemes[defaultTheme];
        return colorScheme[colorName];
    }

    mdui.statusColor = materialJsonData.schemes.dark.background;

    mdui.primary = getColorHexCode("primary");
    mdui.surfaceTint = getColorHexCode("surfaceTint");
    mdui.onPrimary = getColorHexCode("onPrimary");
    mdui.primaryContainer = getColorHexCode("primaryContainer");
    mdui.onPrimaryContainer = getColorHexCode("onPrimaryContainer");
    mdui.secondary = getColorHexCode("secondary");
    mdui.onSecondary = getColorHexCode("onSecondary");
    mdui.secondaryContainer = getColorHexCode("secondaryContainer");
    mdui.onSecondaryContainer = getColorHexCode("onSecondaryContainer");
    mdui.tertiary = getColorHexCode("tertiary");
    mdui.onTertiary = getColorHexCode("onTertiary");
    mdui.tertiaryContainer = getColorHexCode("tertiaryContainer");
    mdui.onTertiaryContainer = getColorHexCode("onTertiaryContainer");
    mdui.error = getColorHexCode("error");
    mdui.onError = getColorHexCode("onError");
    mdui.errorContainer = getColorHexCode("errorContainer");
    mdui.onErrorContainer = getColorHexCode("onErrorContainer");
    mdui.background = getColorHexCode("background");
    mdui.onBackground = getColorHexCode("onBackground");
    mdui.surface = getColorHexCode("surface");
    mdui.onSurface = getColorHexCode("onSurface");
    mdui.surfaceVariant = getColorHexCode("surfaceVariant");
    mdui.onSurfaceVariant = getColorHexCode("onSurfaceVariant");
    mdui.outline = getColorHexCode("outline");
    mdui.outlineVariant = getColorHexCode("outlineVariant");
    mdui.shadow = getColorHexCode("shadow");
    mdui.scrim = getColorHexCode("scrim");
    mdui.inverseSurface = getColorHexCode("inverseSurface");
    mdui.inverseOnSurface = getColorHexCode("inverseOnSurface");
    mdui.inversePrimary = getColorHexCode("inversePrimary");
    mdui.primaryFixed = getColorHexCode("primaryFixed");
    mdui.onPrimaryFixed = getColorHexCode("onPrimaryFixed");
    mdui.primaryFixedDim = getColorHexCode("primaryFixedDim");
    mdui.onPrimaryFixedVariant = getColorHexCode("onPrimaryFixedVariant");
    mdui.secondaryFixed = getColorHexCode("secondaryFixed");
    mdui.onSecondaryFixed = getColorHexCode("onSecondaryFixed");
    mdui.secondaryFixedDim = getColorHexCode("secondaryFixedDim");
    mdui.onSecondaryFixedVariant = getColorHexCode("onSecondaryFixedVariant");
    mdui.tertiaryFixed = getColorHexCode("tertiaryFixed");
    mdui.onTertiaryFixed = getColorHexCode("onTertiaryFixed");
    mdui.tertiaryFixedDim = getColorHexCode("tertiaryFixedDim");
    mdui.onTertiaryFixedVariant = getColorHexCode("onTertiaryFixedVariant");
    mdui.surfaceDim = getColorHexCode("surfaceDim");
    mdui.surfaceBright = getColorHexCode("surfaceBright");
    mdui.surfaceContainerLowest = getColorHexCode("surfaceContainerLowest");
    mdui.surfaceContainerLow = getColorHexCode("surfaceContainerLow");
    mdui.surfaceContainer = getColorHexCode("surfaceContainer");
    mdui.surfaceContainerHigh = getColorHexCode("surfaceContainerHigh");
    mdui.surfaceContainerHighest = getColorHexCode("surfaceContainerHighest");
};

const mdui_layout = function (type, options, layout) {
    // if layout is true use AddLayout else use CreateLayout
    // set statusBar to md color
    // set backgroundColor too

    app.SetStatusBarColor(mdui.statusColor);

    if (layout) {
        let layout = app.AddLayout(layout, type, options);
        layout.SetBackColor(mdui.background);

        // subscribe to the signal, to respond to mode changes
        themeSignal.subscribe(() => {
            layout.SetBackColor(mdui.background);
        });
        return layout;
    } else {
        let layout = app.CreateLayout(type, options);
        layout.SetBackColor(mdui.background);

        // subscribe to the signal, to respond to mode changes
        themeSignal.subscribe(() => {
            layout.SetBackColor(mdui.background);
        });
        return layout;
    }
};

const mdui_button = function (text, width, height, options) {
    let button_variants = ["filled", "outline", "tonal", "elevated"];
    let button_type = null;

    // stop function execution when options arent provided

    if (!options) return;
    options.split(",").forEach((el) => {
        if (button_variants.includes(el)) {
            button_type = el;
        }
    });

    let button = app.CreateButton(text, width, height, options + "Custom");
    if (button_type === "filled") {
        button.Batch({
            SetStyle: [
                mdui.primaryContainer,
                mdui.primaryContainer,
                20,
                null,
                null,
                0,
            ],
        });
    }

    // this is for syncing color mode changes
    themeSignal.subscribe(() => {
        if (button_type === "filled") {
            button.Batch({
                SetStyle: [
                    mdui.primaryContainer,
                    mdui.primaryContainer,
                    20,
                    null,
                    null,
                    0,
                ],
            });
        }
    });

    return button;
};

const loadPlugin = function (name) {
    const plugin = {
        init: function () {},
    };
    return plugin;
};
