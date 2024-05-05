function bottomSheetObject(sheetLayout, height, options) {
    this.Dismiss = function () {
        dismissBSheet();
    }
    this.Show = function () {
        drawBottomSheet(sheetLayout, height, options);
    }
}

function drawBottomSheet(sheetLayout, height, options) {
    let bottomSheet,cardLayout;
    
    bottomSheet = app.CreateLayout('Linear', 'FillXY,VCenter,Bottom');
    bottomSheet.SetSize(1, 1);
    bottomSheet.SetOnTouchUp(dismissBSheet);
    bottomSheet.SetBackColor(stateColor(md_theme_light_scrim, md_theme_dark_scrim));
    bottomSheet.SetBackAlpha(0.33);
    
    
    cardLayout = app.CreateLayout('Card', 'FillX,VCenter,Top');
    
    cardLayout.SetCornerRadius(28);
    
    cardLayout.AddChild(sheetLayout);
    cardLayout.SetBackColor(stateColor(md_theme_light_surfaceVariant, md_theme_dark_surfaceVariant))
    bottomSheet.AddChild(cardLayout);
    
    cardLayout.Animate('BounceBottom', null, 550);
    
    app.AddLayout(bottomSheet);
    
    function dismissBSheet() {
        cardLayout.Animate('SlideToBottom', function(){
            cardLayout.RemoveChild(sheetLayout);
            app.RemoveLayout(bottomSheet)
        }, 210);
        
    }
}

