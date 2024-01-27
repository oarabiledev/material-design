
var snackUi,snackContainer;

class SnackBarObject{
    constructor(text, btnAction, width, alignment){
        this.text = text;
        this.btnAction = btnAction;
        this.width = width;
        this.alignment = alignment;
        
    }
   setRawAlignment(top){
        snackContainer.SetMargins(null,top)
    } 
    
    setTimeout(timeout) {
        this.timeout = timeout;
    }
    
    setOnAction(onTouch) {
        this.onTouch = onTouch; 
    }
    
    showObj(){
        this.drawSnackBarUi(this.text, this.btnAction, this.width, this.alignment, this.onTouch, this.timeout);
    }
    
    drawSnackBarUi(text, btnAction, width, alignment, onTouch, timeout) {
    
    snackContainer = app.CreateLayout('Linear', alignment + ',FillXY,TouchThrough,Center');
    snackUi = app.CreateLayout('Card', '');
    
    snackContainer.AddChild(snackUi);

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
    
    
    if(onTouch){
        snackButton.SetOnTouchUp(onTouch)
    }
    
    box.AddChild(snackButton);

    app.AddLayout(snackContainer);
    
    
    box.SetBackColor(stateColor(md_theme_light_inverseSurface,md_theme_dark_inverseSurface))
    snackText.SetTextColor(stateColor(md_theme_light_inverseOnSurface,md_theme_dark_inverseOnSurface))
    snackButton.SetTextColor(stateColor(md_theme_light_inversePrimary,md_theme_dark_inversePrimary))
    
    if (timeout === undefined) {
        setTimeout(function() {
            this.snackContainer.Animate('FadeOut', null, 980);
            app.DestroyLayout(this.snackContainer);
            this.snackContainer.Destroy()
        }, 3000);
    } else {
        setTimeout(function() {
            this.snackContainer.Animate('FadeOut', null, 300);
            app.DestroyLayout(this.snackContainer);
            this.snackContainer.Destroy()
        }, timeout);
    }
    }
}

