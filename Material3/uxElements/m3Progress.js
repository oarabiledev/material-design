
//Variable Is made global so that clearInterval with method
//stopProgress works, to avoid an not defined error.
var animation,progressContainer,_progressIndicator;

class progressObject{
    constructor(progressType, width, parentLay){
        this.drawProgressBar(progressType, width, parentLay, this)
    }
    
    stopProgress(){
        progressContainer.Hide();
        progressContainer.Destroy();
        clearInterval(animation);
    }
    
    setValue(value) {
        this.value = value;
        _progressIndicator.SetSize(parseFloat(value / 100), 0.05);
    }
        
    hideContainer(){
        app.DestroyLayout(this.progressContainer);
    }
    
    getValue() {
        return this.value;
    }
    
    setMargins(left, top, right, bottom, mode){
        progressContainer.SetMargins(left, top, right, bottom, mode)
    }
    setPosition( left, top, width, height, options){
        progressContainer.SetPosition( left, top, width, height, options)
    }
    
    drawProgressBar(progressType, width, parentLay, progressObj) {

    if (progressType === 'linear') {
        let trackColor = '#E6E0E9';
        progressContainer = app.CreateLayout('Linear', 'Horizontal,Left,FillXY');
        progressContainer.SetSize(width, 0.005);
        _progressIndicator = app.AddText(progressContainer, '');

        if (theme === 'light') {
            progressContainer.SetBackColor(md_theme_light_surfaceVariant);
            _progressIndicator.SetBackColor(md_theme_light_primary);
        } else {
            progressContainer.SetBackColor(md_theme_dark_surfaceVariant);
            _progressIndicator.SetBackColor(md_theme_dark_primary);
        }
        parentLay.AddChild(progressContainer);
    }

    if (progressType === 'linearIntermediate') {
        
        progressContainer = app.CreateLayout('Linear', 'Horizontal,Left,FillXY');
        progressContainer.SetSize(width, 0.005);

        _progressIndicator = app.AddText(progressContainer, '', null, null, 'Left,FillXy');
        
        animation = setInterval(function() {
            _progressIndicator.Animate('SlideToRight', null, null);
        }, 600);
        
        progressContainer.SetBackColor(stateColor(md_theme_light_surfaceVariant,md_theme_dark_surfaceVariant))
        _progressIndicator.SetBackColor(stateColor(md_theme_light_primary,md_theme_dark_primary))
        
        parentLay.AddChild(progressContainer);
    }
    }

}
