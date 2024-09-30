// Main Testing Script
app.Script("Material.Core.js");

function OnStart() {
    mdui.Initialize("light-high-contrast", "outlined");
    lay = mdui.CreateLayout("Linear", "FillXY, H/VCenter");

    btn = mdui.CreateButton("Hello", 0.8, -1, "filled");
    btn.SetOnTouch(function () {
        mdui.SetTheme("dark");
    });

    lay.AddChild(btn);
    app.AddLayout(lay);
}
