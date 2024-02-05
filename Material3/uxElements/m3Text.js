
var _text;

function textObject(text,width,height,options,parent_Layout){
    this.setMargins = function(left,top,right,bottom,mode){
        _text.SetMargins(left,top,right,bottom,mode)
    }
    this.setPosition = function( left, top, width, height, options){
        _text.SetPosition( left, top, width, height, options)
    }
    this.setOnTouch = function(onTouch){
        _text.SetOnTouch(onTouch)
    }
    this.setOnTouchDown = function(onTouchDown){
        _text.SetOnTouchDown(onTouchDown)
    }
    this.setOnTouchUp  = function(onTouchUp){
        _text.SetOnTouchUp(onTouchUp)
     }
    this.setVisibility = function(mode){
        _text.SetVisibility(mode)
    }
    this.setTextColor = function(color){
        _text.SetTextColor(color)   
    }
    this.setTextSize = function(size,mode){
        _text.SetTextSize(size,mode)
    }
    this.setTextShadow = function( radius, dx, dy, color){
        _text.SetTextShadow( radius, dx, dy, color)
    }
    this.setScale = function(x,y){
        _text.SetScale(x,y)
    }
    this.setFontFile = function(fontFile){
        _text.SetFontFile(fontFile)
    }
    this.setSize = function(width,height,options){
        _text.SetSize(width,height,options)
    }
    this.setOnLongTouch = function(callback){
        _text.SetOnLongTouch(callback)
    }
    this.setHtml = function(str){
        _text.SetHtml(str)
    }
    this.setEllipsize = function(mode){
        _text.SetEllipsize(mode)
    }
    this.setLog = function(maxLines){
        _text.SetLog(maxLines)
    }
    this.show = function(){
        _text.SHow();
    }
    this.hide = function(){
        _text.Hide();
    }
    this.setBackAlpha = function(alpha){
        _text.SetBackAlpha(alpha)
    }
    this.setBackColor = function(color){
        _text.SetBackColor(color)
    }
    this.setBackGradient = function( color1, color2, color3, options){
        _text.SetBackGradient( color1, color2, color3, options)
    }
    this.setBackground = function(file, options){
        _text.SetBackground(file, options)   
    }
    this.setBackGradientRadial = function(x, y, radius, color1, color2, color3, options){
        _text.SetBackGradientRadial( x, y, radius, color1, color2, color3, options)
    }
    this.setColorFilter = function(color, mode ){
        _text.SetColorFilter(color, mode)
    }
    this.setDescription = function(desc){
        _text.SetDescription(desc)
    }
    this.isVisible = function(){
        return _text.IsVisible();
    }
    this.getText = function(){
        return _text.GetText();
    }
    this.adjustColor = function( hue, saturation, brightness, contrast){
        _text.AdjustColor( hue, saturation, brightness, contrast)
    }
    this.animate = function( type, callback, time){
        _text.Animate( type, callback, time)
    }
    this.focus = function(){
        _text.Focus()
    }
    this.tween = function( target, duration, type, repeat, yoyo, callback){
        _text.Tween( target, duration, type, repeat, yoyo, callback)
    }
    drawText(text,width,height,options,parent_Layout)
}

function drawText(text,width,height,options,parent_Layout){
    _text = app.CreateText(text,width,height,options);
    _text.SetFontFile(defaultFont)
    parent_Layout.AddChild(_text)
    
    if(theme==='light'){
        _text.SetTextColor(md_theme_light_onSurface)
    }
    else{
        _text.SetTextColor(md_theme_dark_onSurface)
    }
}
