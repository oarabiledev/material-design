
function filledButtonObject(btnName, width, height, icon, parentLay) {
    let filledButton;

    this.Animate = function (type, callback, time) {
        filledButton.Animate(type, callback, time);
    }
    this.SetScale = function (x, y) {
        filledButton.SetScale(x, y);
    }
    this.SetVisibility = function (mode) {
        filledButton.SetVisibility(mode);
    }
    this.SetEnabled = function (enableBool) {
        filledButton.SetEnabled(enableBool);
    }
    this.SetEllipsize = function (mode) {
        filledButton.SetEllipsize(mode);
    }
    this.SetDescription = function (desc) {
        filledButton.SetDescription(desc);
    }
    this.SetHtml = function (str) {
        filledButton.SetHtml(str);
    }
    this.SetText = function (text) {
        filledButton.SetText(text);
    }
    this.SetTextSize = function (size, mode) {
        filledButton.SetTextSize(size, mode);
    }
    this.SetPosition = function(left,top,width,height,options) {
        filledButton.SetPosition(left,top,width,height,options)
    }
    this.SetMargins = function (left, top, right, bottom, mode) {
        filledButton.SetMargins(left, top, right, bottom, mode);
    }
    this.SetPadding = function (left, top, right, bottom, mode) {
        filledButton.SetPadding(left, top, right, bottom, mode);
    }
    this.SetOnTouch = function (onTouch) {
        filledButton.SetOnTouch(I(onTouch.bind(filledButton)));
    }
    this.SetOnLongTouch = function (onLongTouch) {
        filledButton.SetOnLongTouch(I(onLongTouch.bind(filledButton)));
    }
    this.Tween = function (target, duration, type, repeat, yoyo, callback) {
        filledButton.Tween(target, duration, type, repeat, yoyo, callback);
    }
    this.Focus = function () {
        filledButton.Focus();
    }
    this.Gone = function () {
        filledButton.Gone();
    }
    this.Show = function () {
        filledButton.Show();
    }
    this.Hide = function () {
        filledButton.Hide();
    }


    filledButton = drawFilledButton(btnName, width, height, icon, parentLay)
}

function drawFilledButton(btnName, width, height, icon, parentLay) {
    let filledButton;

    filledButton = app.AddButton(parentLay, null, width, height, 'Custom,FontAwesome');
    filledButton.SetStyle(filledBtnClr.value, filledBtnClr.value, 20, null, null, 0)
    filledButton.SetTextColor(filledBtnTxtClr.value)
    
    if (icon === null) {
        filledButton.SetText(btnName);
    } else {
        filledButton.SetText(`[fa-${icon}]` + ' ' + btnName);
    }
    
    filledButton.SetFontFile(defaultFont);
    var pos = filledButton.GetPosition()
    /**
     * @params {boolean} enableDrag - Allow Button To Be Dragged
    */
    filledButtonObject.prototype.EnableDrag = function() {
    // Create signal outside the function scope
    var dragInitializer = createSignal();
    dragInitializer.value = false;
    
    var hasDragBeenEnabled = createSignal();
    hasDragBeenEnabled.value = 0;

    /**Only calls it subscriber event once*/
    filledButton.SetOnLongTouch(() => {
        if(hasDragBeenEnabled.value === true) return;
        else {
        dragInitializer.value = true;
        hasDragBeenEnabled.value = true;
        }
    });

    // Subscribe to dragInitializer outside the callback
    dragInitializer.subscribe((value) => {
       
            // Your drag logic here
            let main = app.CreateLayout('Absolute', 'FillXY,TouchSpy,TouchThrough');
            main.SetSize(1, 1)
            
            
            let clonedObj = app.AddButton(main, null, width, height, 'Custom,FontAwesome');
            clonedObj.SetStyle(filledBtnClr.value, filledBtnClr.value, 20, null, null, 0)
            clonedObj.SetTextColor(filledBtnTxtClr.value)
            clonedObj.SetPosition(filledButton.GetPosition().left,filledButton.GetPosition().top)
            
            
            filledButton.Gone();
            
            if (icon === null) {
                clonedObj.SetText(btnName);
            } else {
                clonedObj.SetText(`[fa-${icon}]` + ' ' + btnName);
            }
            
            clonedObj.SetFontFile(defaultFont);
            
            
            main.SetOnTouchMove(function(event) {
                let xVal = JSON.stringify(event.x[0]);
                let yVal = JSON.stringify(event.y[0])
                console.log("<div style='color:#FF7900'>" + 'X :: '+JSON.stringify(event.x[0]))
                console.log("<div style='color:red'>" + 'Y :: '+JSON.stringify(event.y[0]))
                clonedObj.SetPosition(xVal,yVal)        
            });
            
            app.AddLayout(main);
        
    });
};

    filledBtnClr.subscribe((value)=>{
        filledButton.SetStyle(value, value, 20, null, null, 0)
    })
    
    filledBtnTxtClr.subscribe((value)=>{
        filledButton.SetTextColor(value)
    })
    
    return filledButton;
}



function elevatedButtonObject(btnName, width, height, icon, parentLay) {
    let elevatedButton;
    // Button Methods :::
    
    this.Animate = function (type, callback, time) {
        elevatedButton.Animate(type, callback, time);
    }
    this.SetScale = function (x, y) {
        elevatedButton.SetScale(x, y);
    }
    this.SetVisibility = function (mode) {
        elevatedButton.SetVisibility(mode);
    }
    this.SetEnabled = function (enableBool) {
        elevatedButton.SetEnabled(enableBool);
    }
    this.SetEllipsize = function (mode) {
        elevatedButton.SetEllipsize(mode);
    }
    this.SetDescription = function (desc) {
        elevatedButton.SetDescription(desc);
    }
    this.SetHtml = function (str) {
        elevatedButton.SetHtml(str);
    }
    this.SetText = function (text) {
        elevatedButton.SetText(text);
    }
    this.SetTextSize = function (size, mode) {
        elevatedButton.SetTextSize(size, mode);
    }
    this.SetMargins = function (left, top, right, bottom, mode) {
        elevatedButton.SetMargins(left, top, right, bottom, mode);
    }
    this.SetPadding = function (left, top, right, bottom, mode) {
        elevatedButton.SetPadding(left, top, right, bottom, mode);
    }
    this.SetOnTouch = function (onTouch) {
        elevatedButton.SetOnTouch(I(onTouch.bind(elevatedButton)));
    }
    this.SetOnLongTouch = function (onLongTouch) {
        elevatedButton.SetOnLongTouch(I(onLongTouch.bind(elevatedButton)));
    }
    this.Tween = function (target, duration, type, repeat, yoyo, callback) {
        elevatedButton.Tween(target, duration, type, repeat, yoyo, callback);
    }
    this.Focus = function () {
        elevatedButton.Focus();
    }
    this.Gone = function () {
        elevatedButton.Gone();
    }
    this.Show = function () {
        elevatedButton.Show();
    }
    this.Hide = function () {
        elevatedButton.Hide();
    }

    
    //Call It 
    elevatedButton = drawElevatedBtn(btnName, width, height, icon, parentLay, this)
}


function drawElevatedBtn(btnName, width, height, icon, parentLay, elevatedObj) {
    let elevatedButton;
    elevatedButton = app.AddButton(parentLay, null, width, height, 'Custom,FontAwesome');
    elevatedButton.SetTextColor(elevatedBtnTxtClr.value);
    elevatedButton.SetFontFile(defaultFont);
    
    if (icon === null) {
        elevatedButton.SetText(btnName);
    } else elevatedButton.SetText(`[fa-${icon}]` + ' ' + btnName);
    
    elevatedButton.SetStyle(elevatedBtnClr.value, elevatedBtnClr.value, 20, null, null, 0);
    
    elevatedBtnClr.subscribe((value)=>{
        elevatedButton.SetStyle(value,value, 20, null, null, 0);
    });
    
    elevatedBtnTxtClr.subscribe((value)=>{
        elevatedButton.SetTextColor(value);
    })
    return elevatedButton;
}


function filledTonalButtonObject(btnName, width, height, icon, parentLay) {
    let filledTonalButton;
    // Button Methods :::
    
    this.Animate = function (type, callback, time) {
        filledTonalButton.Animate(type, callback, time);
    }
    this.SetScale = function (x, y) {
        filledTonalButton.SetScale(x, y);
    }
    this.SetVisibility = function (mode) {
        filledTonalButton.SetVisibility(mode);
    }
    this.SetEnabled = function (enableBool) {
        filledTonalButton.SetEnabled(enableBool);
    }
    this.SetEllipsize = function (mode) {
        filledTonalButton.SetEllipsize(mode);
    }
    this.SetDescription = function (desc) {
        filledTonalButton.SetDescription(desc);
    }
    this.SetHtml = function (str) {
        filledTonalButton.SetHtml(str);
    }
    this.SetText = function (text) {
        filledTonalButton.SetText(text);
    }
    this.SetTextSize = function (size, mode) {
        filledTonalButton.SetTextSize(size, mode);
    }
    this.SetMargins = function (left, top, right, bottom, mode) {
        filledTonalButton.SetMargins(left, top, right, bottom, mode);
    }
    this.SetPadding = function (left, top, right, bottom, mode) {
        filledTonalButton.SetPadding(left, top, right, bottom, mode);
    }
    this.SetOnTouch = function (onTouch) {
        filledTonalButton.SetOnTouch(I(onTouch.bind(filledTonalButton)));
    }
    this.SetOnLongTouch = function (onLongTouch) {
        filledTonalButton.SetOnLongTouch(I(onLongTouch.bind(filledTonalButton)));
    }
    this.Tween = function (target, duration, type, repeat, yoyo, callback) {
        filledTonalButton.Tween(target, duration, type, repeat, yoyo, callback);
    }
    this.Focus = function () {
        filledTonalButton.Focus();
    }
    this.Gone = function () {
        filledTonalButton.Gone();
    }
    this.Show = function () {
        filledTonalButton.Show();
    }
    this.Hide = function () {
        filledTonalButton.Hide();
    }

    
    //Call It
    
    filledTonalButton = drawFilledTonalBtn(btnName, width, height, icon, parentLay, this)
}

function drawFilledTonalBtn(btnName, width, height, icon, parentLay, filledTonalObj) {
    let filledTonalButton;
    filledTonalButton = app.AddButton(parentLay, null, width, height, 'Custom,FontAwesome');
    filledTonalButton.SetFontFile(defaultFont)
    filledTonalButton.SetTextColor(filledTonalBtnTxtClr.value);
    
    
    if (icon === null) {
        filledTonalButton.SetText(btnName);
    } else filledTonalButton.SetText(`[fa-${icon}]` + ' ' + btnName);
    
    filledTonalButton.SetStyle(filledTonalBtnClr.value, filledTonalBtnClr.value, 20, null, null, 0);
    
    filledTonalBtnClr.subscribe((value)=>{
        filledTonalButton.SetStyle(value,value, 20, null, null, 0);
    });
    
    filledTonalBtnTxtClr.subscribe((value)=>{
        filledTonalButton.SetTextColor(value);
    });
    return filledTonalButton;
}

function outlinedButtonObject(btnName, width, height, icon, parentLay) {
    // Button Methods :::
    let _outlinedButton;
    this.Animate = function (type, callback, time) {
        _outlinedButton.Animate(type, callback, time);
    }
    this.SetScale = function (x, y) {
        _outlinedButton.SetScale(x, y);
    }
    this.SetVisibility = function (mode) {
        _outlinedButton.SetVisibility(mode);
    }
    this.SetEnabled = function (enableBool) {
        _outlinedButton.SetEnabled(enableBool);
    }
    this.SetEllipsize = function (mode) {
        _outlinedButton.SetEllipsize(mode);
    }
    this.SetDescription = function (desc) {
        _outlinedButton.SetDescription(desc);
    }
    this.SetHtml = function (str) {
        _outlinedButton.SetHtml(str);
    }
    this.SetText = function (text) {
        _outlinedButton.SetText(text);
    }
    this.SetTextSize = function (size, mode) {
        _outlinedButton.SetTextSize(size, mode);
    }
    this.SetMargins = function (left, top, right, bottom, mode) {
        _outlinedButton.SetMargins(left, top, right, bottom, mode);
    }
    this.SetPadding = function (left, top, right, bottom, mode) {
        _outlinedButton.SetPadding(left, top, right, bottom, mode);
    }
    this.SetOnTouch = function (onTouch) {
        _outlinedButton.SetOnTouch(I(onTouch.bind(_outlinedButton)));
    }
    this.SetOnLongTouch = function (onLongTouch) {
        _outlinedButton.SetOnLongTouch(I(onLongTouch.bind(_outlinedButton)));
    }
    this.Tween = function (target, duration, type, repeat, yoyo, callback) {
        _outlinedButton.Tween(target, duration, type, repeat, yoyo, callback);
    }
    this.Focus = function () {
        _outlinedButton.Focus();
    }
    this.Gone = function () {
        _outlinedButton.Gone();
    }
    this.Show = function () {
        _outlinedButton.Show();
    }
    this.Hide = function () {
        _outlinedButton.Hide();
    }

    
    //Call It 
    _outlinedButton = drawOutlinedBtn(btnName, width, height, icon, parentLay, this);
}

function drawOutlinedBtn(btnName, width, height, icon, parentLay, outlineObj) {
    
    let outline = ()=>{
        return stateColor(md_theme_light_outline,
        md_theme_dark_outline)
    }
    
    let _outlinedButton = app.AddButton(parentLay, null, width, height, 'Custom,FontAwesome');
    _outlinedButton.SetFontFile(defaultFont)
    _outlinedButton.SetTextColor(outlinedBtnTxtClr.value);
    
    if (icon === null) {
        _outlinedButton.SetText(btnName);
    } else _outlinedButton.SetText(`[fa-${icon}]` + ' ' + btnName);
    
    _outlinedButton.SetStyle(outlinedBtnClr.value, outlinedBtnClr.value, 20, outline(), 1, 0);
    
    outlinedBtnClr.subscribe((value)=>{
        _outlinedButton.SetStyle(value, value, 20, outline(), 1, 0);
    })
    
    outlinedBtnTxtClr.subscribe((value)=>{
        _outlinedButton.SetTextColor(value);
    })
    return _outlinedButton;
}

function textButtonObject(btnName, width, height, icon, parentLay) {
    
    let _textButton;
    // Button Methods :::
    this.SetMargins = function (left, top, right, bottom, mode) {
        _textButton.SetMargins(left, top, right, bottom, mode);
    }
        this.Animate = function (type, callback, time) {
        _textButton.Animate(type, callback, time);
    }
    
    
    this.SetScale = function (x, y) {
        _textButton.SetScale(x, y);
    }
    this.SetVisibility = function (mode) {
        _textButton.SetVisibility(mode);
    }
    this.SetEnabled = function (enableBool) {
        _textButton.SetEnabled(enableBool);
    }
    this.SetEllipsize = function (mode) {
        _textButton.SetEllipsize(mode);
    }
    this.SetDescription = function (desc) {
        _textButton.SetDescription(desc);
    }
    this.SetHtml = function (str) {
        _textButton.SetHtml(str);
    }
    this.SetText = function (text) {
        _textButton.SetText(text);
    }
    this.SetTextSize = function (size, mode) {
        _textButton.SetTextSize(size, mode);
    }
    
    this.SetPadding = function (left, top, right, bottom, mode) {
        _textButton.SetPadding(left, top, right, bottom, mode);
    }
    this.SetOnTouch = function (onTouch) {
        _textButton.SetOnTouch(I(onTouch.bind(_textButton)));
    }
    this.SetOnLongTouch = function (onLongTouch) {
        _textButton.SetOnLongTouch(I(onLongTouch.bind(_textButton)));
    }
    this.Tween = function (target, duration, type, repeat, yoyo, callback) {
        _textButton.Tween(target, duration, type, repeat, yoyo, callback);
    }
    this.Focus = function () {
        _textButton.Focus();
    }
    this.Gone = function () {
        _textButton.Gone();
    }
    this.Show = function () {
        _textButton.Show();
    }
    
    this.Hide = function (){
        _textButton.Hide();
    }
    
    // Call It
    _textButton = drawTextBtn(btnName, width, height, icon, parentLay, this);
    
}

function drawTextBtn(btnName, width, height, icon, parentLay, textBtnObj) {
    let _textButton = app.AddButton(parentLay, null, width, height, 'Custom,FontAwesome');
    _textButton.SetFontFile(defaultFont)
    _textButton.SetTextColor(textBtnTxtClr.value);
    
    if (icon === null) {
        _textButton.SetText(btnName);
    } else _textButton.SetText(`[fa-${icon}]` + ' ' + btnName);
    
    _textButton.SetStyle(backgroundClr.value, backgroundClr.value, 20, null, null, 0);
    
    backgroundClr.subscribe((value)=>{
        _textButton.SetStyle(value,value, 20, null, null, 0);
    })
    
    textBtnTxtClr.subscribe((value)=>{
        _textButton.SetTextColor(value);
    });
    
    return _textButton;
}

function fabObject(icon, parentLay) {
    let fabContainer;
    this.SetOnTouch = function (onTouch) {
        fabContainer.SetOnTouch( M( fabContainer, onTouch) )
    }
    /* If the unwanted layout is detected warn dev
       If FillXY isnt being used notify dev
    */
   
    if (unpositionalLayout.includes(layoutType) || !layoutOptions.includes('FillXY')){
        warnDeveloper('FAB Component Only Used With Absolute Layouts\n With FillXY');
    }
    else fabContainer = drawFAB(icon, parentLay, this);
}

function drawFAB(icon, parentLay, fabObj) {
    let _fab;
    
    _fab = app.AddButton(parentLay, icon, null, null, 'Customize,Lego');
    _fab.SetSize(56,56,'dp');
    
    _fab.SetTextSize(24,'dp');
    _fab.SetTextColor(_fabIconClr.value);
    _fab.SetFontFile(defaultIcons);
    _fab.SetStyle(_fabColor.value,_fabColor.value,16,null,null,0);
    
    
    leftPos = DW()- dpToPxConversion(72);
    topPos = DH()- dpToPxConversion(56+16);
    
    _fab.SetPosition(leftPos, topPos, null, null, 'px')
    
    _fabColor.subscribe((value)=>{
        _fab.SetStyle(value,value,16,null,null,0);
    })
    
    _fabIconClr.subscribe((value)=>{
        _fab.SetTextColor(value);
    })
    return _fab;
}


function smallFABObject(icon, parentLay) {
    let smallFabContainer;
    
    this.SetOnTouch = function (onTouch) {
        smallFabContainer.SetOnTouch( M( null, onTouch) )
    }
    
    this.SetRawAlignment = function(left, top){
        smallFabContainer.SetPosition(left, top);
    }
    
    if (unpositionalLayout.includes(layoutType) || !layoutOptions.includes('FillXY')){
        warnDeveloper('FAB Component Only Used With Absolute Layouts\n With FillXY');
    }
    else {
        smallFabContainer = drawSmallFab(icon, parentLay, this);
        
    } 
}

function drawSmallFab(icon, parentLay, j) {
    let _smallFab;
    
    _smallFab = app.AddButton(parentLay, icon, null, null, 'Customize,Lego');
    _smallFab.SetSize(40,40,'dp');
    
    _smallFab.SetTextSize(20,'dp');
    _smallFab.SetTextColor(_smallFabTxtClr.value);
    _smallFab.SetFontFile(defaultIcons);
    _smallFab.SetStyle(_smallFabClr.value,_smallFabClr.value,12,null,null,0);
    
    _smallFabClr.subscribe((value)=>{
        _smallFab.SetStyle(value,value,12,null,null,0);
    });
    
    _smallFabTxtClr.subscribe((value)=>{
        _smallFab.SetTextColor(value);
    })
    
    leftPos = DW()- dpToPxConversion(72);
    topPos = DH()- dpToPxConversion(56+16);
    
    //_smallFab.SetPosition(leftPos, topPos, null, null, 'px')
    
    
    return _smallFab;
}




function largeFABObject(icon, parentLay) {
    let largeFabContainer;
    
    this.SetMargins = function (left, top, right, bottom, mode) {
        largeFabContainer.SetMargins(left, top, right, bottom, mode);
    }
    
    this.SetPosition = function (left, top, width, height, options) {
        largeFabContainer.SetPosition(left, top, width, height, options);
    }
    if(!parentLay){
        warnDeveloper('No Parent For FAB')
    }
    else largeFabContainer = drawLargeFab(icon, parentLay, this);
}

function drawLargeFab(icon, parentLay, largefabOBj, largeFABObj) {
    let largeFabContainer;
    
    largeFabContainer = app.CreateLayout('Linear', 'TouchThrough,Spy');
    largeFabContainer.SetSize(96, 96, 'dp');
    
    
    const fab = app.CreateLayout('Card', 'Right,Bottom,FillXY');
    fab.SetSize(96, 96, 'dp');
    fab.SetElevation(0);
    fab.SetCornerRadius(28);
    
    const _fabIcon = app.CreateText(icon, null, null, 'H/VCenter,FillXY');
    _fabIcon.SetFontFile(defaultIcons);
    
    
    _fabIcon.SetTextSize(36);
    fab.AddChild(_fabIcon);
    largeFabContainer.AddChild(fab);
    
    
    fab.SetBackColor(_smallFabClr.value);
    _fabIcon.SetTextColor(_smallFabTxtClr.value)
    
    largeFABObject.prototype.SetOnTouch = function(onTouch){
        _fabIcon.SetOnTouchDown(M(this,function(){
            onTouch();
        }))
    }
    
    _smallFabClr.subscribe((value)=>{
        _fabIcon.SetTextColor(value)
    });
    
    _smallFabTxtClr.subscribe((value)=>{
        _fabIcon.SetTextColor(value)
    })
    
    parentLay.AddChild(largeFabContainer);
    return largeFabContainer;
    
}
