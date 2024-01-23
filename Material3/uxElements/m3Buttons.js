var filledButton;

class filledButtonObject {
    constructor(btnName, width, height, icon, parentLay) {
        this.drawFilledButton(btnName, width, height, icon, parentLay, this)
    }
    animate(type, callback, time) {
        filledButton.Animate(type, callback, time);
    }
    setScale(x,y){
        filledButton.SetScale(x,y);
    }
    setVisibility(mode) {
        filledButton.SetVisibility(mode);
    }
    setEnabled(enableBool){
        filledButton.SetEnabled(enableBool);
    }
    setEllipsize(mode){
        filledButton.SetEllipsize(mode);
    }
    setDescription(desc){
        filledButton.SetDescription(desc);
    }
    setHtml(str){
        filledButton.SetHtml(str);
    }
    setText(text){
        filledButton.SetText(text);
    }
    setTextSize(size,mode){
        filledButton.SetTextSize(size,mode);
    }
    setMargins(left, top, right, bottom, mode) {
        filledButton.SetMargins(left, top, right, bottom, mode);
    }
    setPadding(left, top, right, bottom, mode) {
        filledButton.SetPadding(left, top, right, bottom, mode);
    }
    setOnTouch(onTouch) {
        this.onTouch = onTouch;
    }
    setOnLongTouch(onLongTouch) {
        this.onLongTouch = onLongTouch;
    }
    tween(target, duration, type, repeat, yoyo, callback) {
        filledButton.Tween(target, duration, type, repeat, yoyo, callback);
    }
    focus(){
        filledButton.Focus();
    }
    gone(){
        filledButton.Gone();
    }
    show() {
        filledButton.Show();
    }
    hide() {
        filledButton.Hide();
    }
    drawFilledButton(btnName, width, height, icon, parentLay, filledObj) {
        filledButton = app.AddButton(parentLay, btnName, width, height, 'Custom');
    
        filledButton.SetTextColor(stateColor(md_theme_light_onPrimary,md_theme_dark_onPrimary))
        filledButton.SetStyle(this.clr1(),this.clr1(),20,null,null,0)
        filledButton.SetFontFile(defaultFont)
        filledButton.SetOnTouch(()=>{
            if(filledObj.onTouch){
                filledObj.onTouch();
            }
        });
        
        filledButton.SetOnLongTouch(()=>{
            if(filledObj.onTouch){
                filledObj.onLongTouch();
            }
        });
    }
    
    clr1(){
        return stateColor(md_theme_light_primary,md_theme_dark_primary);
    }
}

var elevatedButton;

class elevatedButtonObject{
    constructor(btnName, width, height, icon, parentLay){
        this.drawElevatedBtn(btnName, width, height, icon, parentLay, this)
    }
    animate(type, callback, time) {
        elevatedButton.Animate(type, callback, time);
    }
    setScale(x,y){
        elevatedButton.SetScale(x,y);
    }
    setEllipsize(mode){
        elevatedButton.SetEllipsize(mode);
    }
    setDescription(desc){
        elevatedButton.SetDescription(desc);
    }
    setHtml(str){
        elevatedButton.SetHtml(str);
    }
    setText(text){
        elevatedButton.SetText(text);
    }
    setTextSize(size,mode){
        elevatedButton.SetTextSize(size,mode);
    }
    setVisibility(mode) {
        elevatedButton.SetVisibility(mode);
    }
    setEnabled(enableBool){
        elevatedButton.SetEnabled(enableBool);
    }
    setMargins(left, top, right, bottom, mode) {
        elevatedButton.SetMargins(left, top, right, bottom, mode);
    }
    setPadding(left, top, right, bottom, mode) {
        elevatedButton.SetPadding(left, top, right, bottom, mode);
    }
    setOnTouch(onTouch) {
        this.onTouch = onTouch;
    }
    setOnLongTouch(onLongTouch) {
        this.onLongTouch = onLongTouch;
    }
    tween(target, duration, type, repeat, yoyo, callback) {
        elevatedButton.Tween(target, duration, type, repeat, yoyo, callback);
    }
    focus(){
        elevatedButton.Focus();
    }
    gone(){
        elevatedButton.Gone();
    }
    show() {
        elevatedButton.Show();
    }
    hide() {
        elevatedButton.Hide();
    }
    
    drawElevatedBtn(btnName, width, height, icon, parentLay, elevatedObj){
        elevatedButton = app.AddButton(parentLay, btnName, width, height, 'Custom');
        elevatedButton.SetTextColor(stateColor(md_theme_light_primary,md_theme_dark_primary));
        elevatedButton.SetFontFile(defaultFont)
        elevatedButton.SetStyle(this.clr1(),this.clr1(),20,null,null,0.1);
        
        elevatedButton.SetOnTouch(()=>{
            if(elevatedObj.onTouch){
                elevatedObj.onTouch()
                }
        });
        
        elevatedButton.SetOnTouch(()=>{
            if(elevatedObj.onLongTouch){
                elevatedObj.onLongTouch();
                }
        });
        
    }
    
    clr1(){
        return stateColor(md_theme_light_secondaryContainer,md_theme_dark_secondaryContainer);
    }
    
}
  
var filledTonalButton;

class filledTonalButtonObject{
    constructor(btnName, width, height, icon, parentLay){
        this.drawFilledTonalBtn(btnName, width, height, icon, parentLay, this)
    }
    
    animate(type, callback, time) {
        filledTonalButton.Animate(type, callback, time);
    }
    setScale(x,y){
        filledTonalButton.SetScale(x,y);
    }
    setEllipsize(mode){
        filledTonalButton.SetEllipsize(mode);
    }
    setDescription(desc){
        filledTonalButton.SetDescription(desc);
    }
    setHtml(str){
        filledTonalButton.SetHtml(str);
    }
    setText(text){
        filledTonalButton.SetText(text);
    }
    setTextSize(size,mode){
        filledTonalButton.SetTextSize(size,mode);
    }
    setVisibility(mode) {
        filledTonalButton.SetVisibility(mode);
    }
    setEnabled(enableBool){
        filledTonalButton.SetEnabled(enableBool);
    }
    setMargins(left, top, right, bottom, mode) {
        filledTonalButton.SetMargins(left, top, right, bottom, mode);
    }
    setPadding(left, top, right, bottom, mode) {
        filledTonalButton.SetPadding(left, top, right, bottom, mode);
    }
    setOnTouch(onTouch) {
        this.onTouch = onTouch;
    }
    setOnLongTouch(onLongTouch) {
        this.onLongTouch = onLongTouch;
    }
    tween(target, duration, type, repeat, yoyo, callback) {
        filledTonalButton.Tween(target, duration, type, repeat, yoyo, callback);
    }
    focus(){
        filledTonalButton.Focus();
    }
    gone(){
        filledTonalButton.Gone();
    }
    show() {
        filledTonalButton.Show();
    }
    hide() {
        filledTonalButton.Hide();
    }
    
    drawFilledTonalBtn(btnName, width, height, icon, parentLay, filledTonalObj){
        filledTonalButton = app.AddButton(parentLay, btnName, width, height, 'Custom');
        filledTonalButton.SetFontFile(defaultFont)
        filledTonalButton.SetTextColor(stateColor(md_theme_light_onSecondaryContainer,md_theme_dark_onSecondaryContainer));
        
        filledTonalButton.SetStyle(this.clr1(),this.clr1(),20,null,null,0.1);
        
        filledTonalButton.SetOnTouch(()=>{
            if(elevatedObj.onTouch){
                elevatedObj.onTouch()
                }
        });
        
        filledTonalButton.SetOnTouch(()=>{
            if(elevatedObj.onLongTouch){
                elevatedObj.onLongTouch();
                }
        });
        
    }
    
    /* For Some Reason Freaking Google State Filled Tonal Back Color As 
        A reference To Container, wtf, The XML Values dont have The color
       Variable Container, place an issue(fix) and ill give you, github 
       fame, specifically in this comment (❁´◡`❁)
    */
    
    clr1(){
        return stateColor(md_theme_light_surface,md_theme_dark_surface);
    }   
}

var outlinedButton;

class outlinedButtonObject{
    constructor(btnName, width, height, icon, parentLay){
        this.drawOutlinedBtn(btnName, width, height, icon, parentLay, this);
    }
    
    animate(type, callback, time) {
        outlinedButton.Animate(type, callback, time);
    }
    setScale(x,y){
        outlinedButton.SetScale(x,y);
    }
    setEllipsize(mode){
        outlinedButton.SetEllipsize(mode);
    }
    setDescription(desc){
        outlinedButton.SetDescription(desc);
    }
    setHtml(str){
        outlinedButton.SetHtml(str);
    }
    setText(text){
        outlinedButton.SetText(text);
    }
    setTextSize(size,mode){
        outlinedButton.SetTextSize(size,mode);
    }
    setVisibility(mode) {
        outlinedButton.SetVisibility(mode);
    }
    setEnabled(enableBool){
        outlinedButton.SetEnabled(enableBool);
    }
    setMargins(left, top, right, bottom, mode) {
        outlinedButton.SetMargins(left, top, right, bottom, mode);
    }
    setPadding(left, top, right, bottom, mode) {
        outlinedButton.SetPadding(left, top, right, bottom, mode);
    }
    setOnTouch(onTouch) {
        this.onTouch = onTouch;
    }
    setOnLongTouch(onLongTouch) {
        this.onLongTouch = onLongTouch;
    }
    tween(target, duration, type, repeat, yoyo, callback) {
        outlinedButton.Tween(target, duration, type, repeat, yoyo, callback);
    }
    focus(){
        outlinedButton.Focus();
    }
    gone(){
        outlinedButton.Gone();
    }
    show() {
        outlinedButton.Show();
    }
    hide() {
        outlinedButton.Hide();
    }
    
    drawOutlinedBtn(btnName, width, height, icon, parentLay, outlineObj){
        outlinedButton = app.AddButton(parentLay, btnName, width, height, 'Custom');
        outlinedButton.SetFontFile(defaultFont)
        outlinedButton.SetTextColor(stateColor(md_theme_light_primary,md_theme_dark_primary));
        
        outlinedButton.SetStyle(this.clr1(),this.clr1(),20,this.strokeClr(),1,0.1);
        
        outlinedButton.SetOnTouch(()=>{
            if(outlineObj.onTouch){
                outlineObj.onTouch()
                }
        });
        
        outlinedButton.SetOnTouch(()=>{
            if(outlineObj.onLongTouch){
                outlineObj.onLongTouch();
                }
        });
        
    }
    
    clr1(){
        return stateColor(md_theme_light_surface,md_theme_dark_surface);
    }  
    
    strokeClr(){
        return stateColor(md_theme_light_outline,md_theme_dark_outline);
    }
}

var textButton;

class textButtonObject{
    constructor(btnName, width, height, icon, parentLay){
        this.drawTextBtn(btnName, width, height, icon, parentLay, this)
    }
    
    animate(type, callback, time) {
        textButton.Animate(type, callback, time);
    }
    setScale(x,y){
        textButton.SetScale(x,y);
    }
    setEllipsize(mode){
        textButton.SetEltextButtonlipsize(mode);
    }
    setDescription(desc){
        textButton.SetDescription(desc);
    }
    setHtml(str){
        textButton.SetHtml(str);
    }
    setText(text){
        textButton.SetText(text);
    }
    setTextSize(size,mode){
        textButton.SetTextSize(size,mode);
    }
    setVisibility(mode) {
        textButton.SetVisibility(mode);
    }
    setEnabled(enableBool){
        textButton.SetEnabled(enableBool);
    }
    setMargins(left, top, right, bottom, mode) {
        textButton.SetMargins(left, top, right, bottom, mode);
    }
    setPadding(left, top, right, bottom, mode) {
        textButton.SetPadding(left, top, right, bottom, mode);
    }
    setOnTouch(onTouch) {
        this.onTouch = onTouch;
    }
    setOnLongTouch(onLongTouch) {
        this.onLongTouch = onLongTouch;
    }
    tween(target, duration, type, repeat, yoyo, callback) {
        textButton.Tween(target, duration, type, repeat, yoyo, callback);
    }
    focus(){
        textButton.Focus();
    }
    gone(){
        textButton.Gone();
    }
    show() {
        textButton.Show();
    }
    hide() {
        textButton.Hide();
    }
    
    drawTextBtn(btnName, width, height, icon, parentLay, textBtnObj){
        textButton = app.AddButton(parentLay, btnName, width, height, 'Custom');
        textButton.SetFontFile(defaultFont)
        textButton.SetTextColor(stateColor(md_theme_light_primary,md_theme_dark_primary));
        
        textButton.SetStyle(backgroundColor(),backgroundColor(),20,null,null,0);
        
        textButton.SetOnTouch(()=>{
            if(textBtnObj.onTouch){
                textBtnObj.onTouch()
                }
        });
        
        textButton.SetOnTouch(()=>{
            if(textBtnObj.onLongTouch){
                textBtnObj.onLongTouch();
                }
        });
    }
}

var extendedFAB,extendedFABText;
class extendedFABObject{
    constructor(btnName, icon, width, parentLay){
        this.drawExtendedFAB(btnName, icon, width, parentLay, this)
    }
    setMargins(left,top,right,bottom,mode){
        extendedFAB.SetMargins(left,top,right,bottom,mode)
    }
    setPosition( left, top, width, height, options){
        extendedFAB.SetPosition( left, top, width, height, options)
    }
    setOnTouch(onTouch){
        this.onTouch = onTouch
    }
    setOnLongTouch(onLongTouch){
        this.onLongTouch = onLongTouch;
    }
    animate( type, callback, time ){
        extendedFAB.Animate( type, callback, time )
    }
    isVisible(){
        return extendedFAB.IsVisible();
    }
    setSize(width,height,options){
        extendedFAB.SetSize(width,height,options)
    }
    setDesription(desc){
        extendedFAB.SetDescription(desc)
    }
    setScale(x,y){
        extendedFAB.SetScale(x,y)
    }
    
    drawExtendedFAB(btnName, icon, width, parentLay, extendedObj){
       
        const extendedFAB = app.AddButton(parentLay,`${icon} ${btnName}`,null,null,'Custom');
        extendedFAB.SetSize(118,56,'dp');
        extendedFAB.SetFontFile(defaultIcons)
        
        extendedFAB.SetTextColor(stateColor(md_theme_light_onPrimaryContainer,md_theme_dark_onPrimaryContainer))
        extendedFAB.SetStyle(this.clr1(), this.clr1(), 16, null, null, 0)
    }
    clr1(){
        return stateColor(md_theme_light_primaryContainer,md_theme_dark_primaryContainer)
    }
}
