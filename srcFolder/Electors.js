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


var switchValue = createSignal();


function switchObject(switchType, value, parent_Layout) {
    let _switch;
    
    this.GetValue = function () {
        return switchValue;
    }
    this.SetOnToggle = function (onToggle) {
        this.onToggle = onToggle;
    }
    this.SetPosition = function (left, top, width, height, options) {
        _switch.SetPosition(left, top, width, height, options)
    }
    
    this.SetMargins = function(left,top,right,bottom,mode){
        _switch.SetMargins(left,top,right,bottom,mode)
    }
    /*
    switch(switchType){
        case 'noIcon':
            drawSwitchNoIcon(value,parent_Layout,this);
            break;
        case 'onIcon':
            drawSwitchOnIcon(value,parent_Layout,this);
            break;
        case 'allIcon':
            drawSwitchAllIcon(value,parent_Layout,this);
    }
    */
    
    //Temporary !
    _switch = drawSwitchNoIcon(value, parent_Layout, this);
}



function drawSwitchNoIcon(value, parent_Layout, switchObj) {
    let _switch;
    let handle;
    switchValue.value = value;
    
    _switch = app.CreateLayout('Card')
    _switch.SetSize(52, 32, 'dp');
    _switch.SetElevation(0.9)
    _switch.SetCornerRadius(16)
    _switch.SetBackColor(switchColor.value)
    
    abs = app.AddLayout(_switch,'Absolute')
    abs.SetSize(52, 32, 'dp');
    
    handle = app.AddImage(abs,null, 0.085, 0.05)
    handle.SetAutoUpdate(true)
    
    /* This if else doesnt work in setHandleState Function Btw*/
    
    if(value){
        handle.SetPaintColor(switchHandleOnColor.value)
    }
    else{
        handle.SetPaintColor(switchHandleOffColor.value)
    }
    
    switchColor.subscribe((value)=>{
        _switch.SetBackColor(value)
    });
    
    
    const setHandleState = (bool) =>{
        if(bool){
            handle.SetPosition(0.052,0)
            handle.DrawCircle(0.52, 0.42, 0.45)
        }
        else { 
            handle.SetPosition(0,0)
            handle.DrawCircle(0.52, 0.42, 0.30) 
        }
    }
    
    setHandleState(switchValue.value)
    
    handle.SetOnTouchDown(M(this,function(){
        if(switchValue.value){
            switchValue.value = false
            handle.Tween({x:0.0,y:0},100,'Linear.None',0,false,()=>{
                handle.Clear()
                handle.DrawCircle(0.52, 0.42, 0.30)
            })
        }
        else{
            switchValue.value = true
            
            handle.Tween({x:0.05,y:0},100,'Linear.None',0,false,()=>{
                handle.Clear();
                handle.DrawCircle(0.52, 0.42, 0.45)
                
            })
        }
    }))
    
    /* Also wont work in SetOnTouchDown */
    switchValue.subscribe((value)=>{
        if(value){
            handle.SetPaintColor(switchHandleOnColor.value);
        }
        else{
            handle.SetPaintColor(switchHandleOffColor.value);
        }
        
        if(switchObj.onToggle) switchObj.onToggle(value);
    })
    
    parent_Layout.AddChild(_switch);
    return _switch;
    
}


function switchSettingsObject(listOfSettings, switchValues, width, height, parentLay){
    let _SwitchSettings;
    if(!parentLay){
        warnDeveloper('No Parent To Swicth Settings.')
    }
    else _SwitchSettings = drawSwitchSettings(listOfSettings, switchValues, width, height, parentLay);
}

function drawSwitchSettings(listOfSettings, switchValues, width, height, parentLay){
    
    /* Get No Of Switch Settings */
    if(!listOfSettings.includes(',')){
        warnDeveloper('It seems like you didnt give a list.');
        return;
    }
    
    noOfSettings = listOfSettings.split(',').length;
    
    __SwicthListContainer = app.AddLayout(parentLay,'Linear','Vertical')
    __SwicthListContainer.SetSize(width,height);
    
    
    /* Create A Template For A Single Setting */
    
    let __SwitchTemplate = function (headerValue, descriptionValue, boolSwitchValue){
        __layout = ui.createLayout('Linear','Left,Horizontal',-1,-1,__SwicthListContainer)
        __layout.SetSize(dsUnitsToDp(width,'w'),64,'dp');
        __layout.SetMargins(null, 0.01)
        
        if(descriptionValue){
            __headerText = app.AddText(__layout,null,0.6,-1,'Left,Multiline')
            __headerText.SetHtml(`<b>${headerValue}</b><br>${descriptionValue}`)
            __headerText.SetEllipsize( "end" );
            __headerText.SetMargins(8,4,null,null,'dp');
            __headerText.SetTextColor(switchSettingTextClr.value)
            __headerText.SetFontFile(boldFont)
            __headerText.SetTextSize(15)
        }
        else {
        __headerText = app.AddText(__layout, headerValue,0.6,-1,'Left,Bold')
        __headerText.SetMargins(8,4,null,null,'dp');
        __headerText.SetEllipsize( "end" );
        __headerText.SetFontFile(boldFont)
        __headerText.SetTextColor(switchSettingTextClr.value)
        __headerText.SetTextSize(15)
        }
        
        _cardLayout = ui.addSwitch('noIcon',true,__layout);
        _cardLayout.SetMargins(dsUnitsToDp(width,'w') - dsUnitsToDp(0.7,'w')-42,8,12,8,'dp')
    
    }
    
    switchSettingTextClr.subscribe((value)=>{
        __headerText.SetTextColor(value)
    }) 

    /* Get Any Description Values */
    
    for (let i = 0; i < noOfSettings; i++){
        if (listOfSettings.split(',')[i].includes('[')){
            
            posOfBracket = listOfSettings.split(',')[i].indexOf('[');
            posOfLastBracket = listOfSettings.split(',')[i].indexOf(']');
            
            headerValue = listOfSettings.split(',')[i].slice(0, posOfBracket).trim()
            
            descriptionValue = listOfSettings.split(',')[i].substring(posOfBracket +1,posOfLastBracket)
        
            __SwitchTemplate(headerValue,descriptionValue)
        }
        
        else {
            headerValue = listOfSettings.split(',')[i].trim()
            
            __SwitchTemplate(headerValue,null)
        }
        
    }
}
