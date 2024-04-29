
/* SnackBar doesnt need a signal.
   Because if started in light mode
   it will do correct
   as in dark mode since its using 
   stateColor.
   It redeclares and dissapears unlike a
   button its permanent
*/

function SnackBarObject(text, btnAction, width, alignment) {
    
    let snackContainer;
    
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
        snackContainer = M(null,drawSnackBarUi(text, btnAction, width, alignment, this.onTouch, this.timeout, this.top));
    }
    
}

function drawSnackBarUi(text, btnAction, width, alignment, onTouch, timeout, top) {
    let snackUi;
    
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
    
    const box = app.CreateLayout("Linear", "Horizontal");
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
    
    
    
    
    box.SetBackColor(stateColor(md_theme_light_inverseSurface, md_theme_dark_inverseSurface))
    snackText.SetTextColor(stateColor(md_theme_light_inverseOnSurface, md_theme_dark_inverseOnSurface))
    snackButton.SetTextColor(stateColor(md_theme_light_inversePrimary, md_theme_dark_inversePrimary))
    
    if (timeout === undefined) {
        setTimeout(function () {
            snackContainer.Animate('FadeOut', null, 980);
            //app.DestroyLayout(snackContainer);
            //snackContainer.Destroy()
            this.snackContainer.Release();
        }, 3000);
    } else {
        setTimeout(function () {
            this.snackContainer.Animate('FadeOut', null, 300);
            app.DestroyLayout(this.snackContainer);
            this.snackContainer.Destroy()
        }, timeout);
    }
    app.AddLayout(snackContainer);
    return snackContainer;
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
        //
        _progressIndicator.SetSize(M(progressContainer, parseFloat(value / 100), 0.05));
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
    
    if (!parentLay){
        warnDeveloper('No Parent For Progress','No Parent For Progress');
    }
    else{
        drawProgressBar(progressType, width, parentLay, this);
    }
}

function drawProgressBar(progressType, width, parentLay, progressObj) {
    
    if (progressType === 'linear') {
        let trackColor = '#E6E0E9';
        progressContainer = app.CreateLayout('Linear', 'Horizontal,Left,FillXY');
        progressContainer.SetSize(width, 0.005);
        _progressIndicator = app.AddText(progressContainer, '');
        
        progressContainer.SetBackColor(progressBackClr.value)
        _progressIndicator.SetBackColor(progressIndicatorClr.value)
       
        progressBackClr.subscribe((value)=>{
            progressContainer.SetBackColor(value)
        })
        
        progressIndicatorClr.subscribe((value)=>{
            _progressIndicator.SetBackColor(value)
        })
        parentLay.AddChild(progressContainer);
    }
    
    if (progressType === 'linearIntermediate') {
        
        progressContainer = app.CreateLayout('Linear', 'Horizontal,Left,FillXY');
        progressContainer.SetSize(width, 0.005);
        
        _progressIndicator = app.AddText(progressContainer, '', null, null, 'Left,FillXy');
        
        animation = setInterval(function () {
            _progressIndicator.Animate('SlideToRight', null, null);
        }, 600);
        
        progressContainer.SetBackColor(progressBackClr.value)
        _progressIndicator.SetBackColor(progressIndicatorClr.value)
        
        progressBackClr.subscribe((value)=>{
            progressContainer.SetBackColor(value)
        })
        
        progressIndicatorClr.subscribe((value)=>{
            _progressIndicator.SetBackColor(value)
        });
        
        parentLay.AddChild(progressContainer);
    }
}
