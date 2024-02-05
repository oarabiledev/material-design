

function dlgBarObject(title, text, dlgOptions, noAction, yesAction) {
    this.setOnCancel = function(onCancel) {
        this.onCancel = onCancel;
    }
    this.setOnAction = function(onAction){
        this.onAction = onAction;
    }
    showDialogBar(title, text, dlgOptions, noAction, yesAction,this)
}

function showDialogBar(title, text, dlgOptions, noAction, yesAction,dlgFunc) {
    
    let width = function(){
        if(app.IsTablet()) return 560;
        else return 280;
    }
    
    dlgA = app.CreateDialog();
    dlgA.SetBackColor("#00000000");
    dlgA.SetOnCancel(function(){
        try{
            dlgFunc.onCancel();
            }
        catch(err){
            return null;
            }
    })
    
    dlgUi = app.CreateLayout('Card')
    dlgA.AddLayout(dlgUi)

    
    dlgUi.SetElevation(0)
    dlgUi.SetSize(width(), null,'dp')
    dlgUi.SetCornerRadius(28)

    const box = app.CreateLayout("Linear", "Left");
    box.SetSize(width(), null,'dp')
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
    footer.SetSize(width(), null,'dp');
    footer.SetPadding(24, null, 24, 24, "dp");

    noBtn = app.AddText(footer, noAction, null, null, 'Bold')
    noBtn.SetOnTouchUp(function(){
        try{
            dlgFunc.onAction(false);
            dlgA.Dismiss();
        }
        catch(err){
            return null;
        }
    })
    noBtn.SetPadding(8, null, 8, null, "dp");

    yesBtn = app.AddText(footer, yesAction, null, null, 'Bold,VCenter')
    yesBtn.SetOnTouchUp(function(){
        try{
            dlgFunc.onAction(true);
            dlgA.Dismiss();
        }
        catch(err){
            return null;
        }
    })
    yesBtn.SetPadding(8, null, 8, null, "dp");
    
    if(theme === 'light'){
        noBtn.SetBackColor(md_theme_light_primary)
        yesBtn.SetBackColor(md_theme_light_primary)
        dlgUi.SetBackColor(md_theme_light_secondaryContainer)
        dlgTitle.SetTextColor(md_theme_light_onSurface)
        dlgText.SetTextColor(md_theme_light_onSurfaceVariant)
    }
    else{
        noBtn.SetTextColor(md_theme_dark_primary)
        yesBtn.SetTextColor(md_theme_dark_primary)
        dlgUi.SetBackColor(md_theme_dark_secondaryContainer)
        dlgTitle.SetTextColor(md_theme_dark_onSurface)
        dlgText.SetTextColor(md_theme_dark_onSurfaceVariant)
    }
    this.dlgA.Show()
}
