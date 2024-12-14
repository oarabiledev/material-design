//ide.MakePlugin('Material')
app.Script("Material.js");

function OnStart() {
    mdui.ScaffoldAppTheme("dark", "outlined");

    let lay = mdui.CreateLayout("linear", "FillXY, VCenter");
    lay.SetChildMargins(0, 0.02);

    let btn = mdui.AddButton(lay, "Hello World", 0.85, -1);

    btn.SetOnTouch(() => {
        pg.SetValue(70);
    });

    let fab = mdui.AddIconFAB(lay, "edit").SetOnTouch(() => {
        //pgl.SetValue(100)
    });

    let icon = mdui.AddIconButton(lay, "edit", "filled");

    let rad = mdui.AddRadioButton(lay, false).SetOnCheck(function () {
        app.ShowPopup("rad: ");
    });

    let chk = mdui.AddCheckBox(lay, false).SetOnCheck(function () {
        app.ShowPopup("chk: ");
    });

    let sw = mdui.AddSwitch(lay, false).SetOnCheck(() => {
        mdui.SetTheme("light");
    });

    let pg = mdui.AddProgressBar(lay, 20, 0.8);

    //let pgl = mdui.AddProgressBar(lay, null, 0.8, 'linearintermediate')
    app.AddLayout(lay);
}
