


function centerAlignedAppBarObj(title, leadingIcon, controlIcons, parentLay) {
    let barCardLay;
    
    this.SetOnTouch = function (onTouch) {
        this.onTouch = onTouch
    }
    
    if(!parentLay){
        warnDeveloper('No Parent For App Bar.')
    }
    else{
        barCardLay = drawAppBar(title, leadingIcon, controlIcons, parentLay,this)
    }
}

function drawAppBar(title, leadingIcon, controlIcons, parentLay, appBarObj) {
    barCardLay = app.AddLayout(parentLay, "Card");
    barCardLay.SetSize(DW(), dpToPxConversion(64), 'px');
    
    barCardLay.SetBackColor(appBarColor.value)
    barCardLay.SetMargins(0, 0)
    
    
    barUi = app.CreateLayout('Linear', 'Horizontal,Left');
    barCardLay.AddChild(barUi);
    
    
    _IconRadius = 50/100 * 120;
    
    _leftIcon = app.AddButton(barUi, leadingIcon, null, null, 'Custom, Lego');
    _leftIcon.SetSize(144, 144, 'px');
    _leftIcon.SetStyle(appBarIconColor.value,appBarIconColor.value, _IconRadius, null,null, 0)
    _leftIcon.SetMargins(48, 24,  pxToDpConversion(DW()) - 190, null, 'px')
    
    _leftIcon.SetFontFile(defaultIcons)
    _leftIcon.SetTextSize(72, 'px');
    _leftIcon.SetTextColor(appBarTextsClr.value )
    _leftIcon.SetOnTouch(function () {
        if (appBarObj.onTouch) {
            M(this,appBarObj.onTouch(leadingIcon));
        }
    })
    
    _title = app.AddText(barUi, title, -1, -1, 'Wrap');
    _title.SetMargins(null, 24, null, 24, 'px')

    _title.SetTextSize(28, 'dp');
    _title.SetTextColor(appBarTextsClr.value)
    
    
    
    _rightIcon = app.AddButton(barUi, controlIcons, null, null, 'Custom, Lego');
    _rightIcon.SetMargins(pxToDpConversion(DW()) - 240, 24, 30, null, 'px')
    _rightIcon.SetStyle(appBarIconColor.value,appBarIconColor.value, _IconRadius, null,null, 0)
    _rightIcon.SetSize(144, 144, 'px');
    _rightIcon.SetTextSize(72, 'px');
    
    _rightIcon.SetFontFile(defaultIcons)
    _rightIcon.SetTextColor(appBarTextsClr.value )
    _rightIcon.SetOnTouch(function () {
        if (appBarObj.onTouch) {
            M(this,appBarObj.onTouch(controlIcons))
        }
    })
    
    appBarColor.subscribe((value)=>{
        barCardLay.SetBackColor(value)
    })
    
    appBarIconColor.subscribe((value)=>{
        _leftIcon.SetStyle(value,value, _IconRadius, null,null, 0)
        _rightIcon.SetStyle(value,value, _IconRadius, null,null, 0)
    })
    
    appBarTextsClr.subscribe((value)=>{
        _title.SetTextColor(value);
        _leftIcon.SetTextColor(value )
        _rightIcon.SetTextColor(value )
    })
    return barCardLay;
}

function bottomBarObject(barPropsInjson, parentLay) {
    let bottomBarContainer;
    
    this.SetOnTouch = function (onTouchFunc) {
        this.onTouchFunc = onTouchFunc;
    }
    
    this.SetRawAdjustment = function (distanceFromTop) {
        bottomBarContainer.SetMargins(0, distanceFromTop);
    }
    
    if (unpositionalLayout.includes(layoutType)) {
        warnDeveloper('BottomAppBar Cannot Be Set On A Linear Layout',
        'Change To Absolute Layout');
        return;
    }
    else {
        bottomBarContainer = drawBottomBar(barPropsInjson, parentLay, this);
    }
}

function drawBottomBar(barPropsInjson, parentLay, bottomBarObj) {
    let bottomBarContainer;
    let props = JSON.stringify(barPropsInjson);
    let info = JSON.parse(props);
    let icon1 = info.firstIcon;
    let icon2 = info.secondIcon;
    let icon3 = info.thirdIcon;
    let icon4 = info.fourthIcon;
    let fabIcon = info.fabIcon;
    
    bottomBarContainer = app.CreateLayout("Card", "Horizontal,Bottom,FillXY");
    bottomBarContainer.SetSize(pxToDpConversion(DW()), 80, 'dp');
    bottomBarContainer.SetElevation(3, 'dp');
    bottomBarContainer.SetPosition(0, 0.9);
    
    const box = app.CreateLayout('Linear', 'Horizontal');
    bottomBarContainer.AddChild(box);
    box.SetSize(-1, 80, 'dp');
    
    const _icon1 = app.CreateText(icon1, null, null, 'H/VCenter,FillXY');
    _icon1.SetFontFile(defaultIcons);
    _icon1.SetTextSize(24);
    _icon1.SetOnTouchUp(function () {
        if (bottomBarObj.onTouchFunc){
            bottomBarObj.onTouchFunc(icon1);
        }
    });
    
    _icon1.SetMargins(8, null, 16, null, 'dp');
    
    const _icon2 = app.CreateText(icon2, null, null, 'H/VCenter,FillXY');
    _icon2.SetFontFile(defaultIcons);
    _icon2.SetTextSize(24);
    _icon2.SetOnTouchUp(function () {
        if (bottomBarObj.onTouchFunc){
        bottomBarObj.onTouchFunc(icon2);
        }
    });
    _icon2.SetMargins(8, null, 16, null, 'dp');
    
    const _icon3 = app.CreateText(icon3, null, null, 'H/VCenter,FillXY');
    _icon3.SetFontFile(defaultIcons);
    _icon3.SetTextSize(24);
    _icon3.SetOnTouchUp(function () {
        if (bottomBarObj.onTouchFunc){
        bottomBarObj.onTouchFunc(icon3);
        }
    });
    _icon3.SetMargins(8, null, 16, null, 'dp');
    
    const _icon4 = app.CreateText(icon4, null, null, 'H/Vcenter,FillXY');
    _icon4.SetFontFile(defaultIcons);
    _icon4.SetTextSize(24);
    _icon4.SetOnTouchUp(function () {
        if (bottomBarObj.onTouchFunc){
        bottomBarObj.onTouchFunc(icon4);
        }
    });
    _icon4.SetMargins(8, null, 16, null, 'dp');
    
    const fab = app.CreateLayout('Card', 'Right,FillXY');
    fab.SetSize(56, 56, 'dp');
    fab.SetElevation(0);
    fab.SetCornerRadius(16);
    fab.SetMargins(96, 12, 16, 12, 'dp');
    
    const _fabIcon = app.CreateText(fabIcon, null, null, 'H/VCenter,FillXY');
    _fabIcon.SetFontFile(defaultIcons);
    _fabIcon.SetOnTouchDown(function () {
        if (bottomBarObj.onTouchFunc){
        bottomBarObj.onTouchFunc(fabIcon);
        }
    });
    
    _fabIcon.SetTextSize(24);
    fab.AddChild(_fabIcon);
    
    box.AddChild(_icon1);
    box.AddChild(_icon2);
    box.AddChild(_icon3);
    box.AddChild(_icon4);
    box.AddChild(fab);
    
    bottomBarContainer.SetBackColor(bottomBarAppClr.value);
    _icon1.SetTextColor(bottomBarAppTxtClr.value);
    _icon2.SetTextColor(bottomBarAppTxtClr.value);
    _icon3.SetTextColor(bottomBarAppTxtClr.value);
    _icon4.SetTextColor(bottomBarAppTxtClr.value);
    _fabIcon.SetTextColor(bottomBarAppTxtClr.value);
    fab.SetBackColor(bottomAppBarFAB.value);
    
    bottomBarAppClr.subscribe((value)=>{
        bottomBarContainer.SetBackColor(value)
    })
    
    bottomAppBarFAB.subscribe((value)=>{
        fab.SetBackColor(value)
    })
    bottomBarAppTxtClr.subscribe((value)=>{
        _icon1.SetTextColor(value);
        _icon2.SetTextColor(value);
        _icon3.SetTextColor(value);
        _icon4.SetTextColor(value);
        _fabIcon.SetTextColor(bottomBarAppTxtClr.value);
    })
    parentLay.AddChild(bottomBarContainer);
    return bottomBarContainer;
}


function searchBarObject(leadingIcon, trailingIcon, hint, width, parentLayout){
    this.Animate = function(type, callback, time){
        _search.Animate(type, callback, time);
    }
    
    
    this.ClearFocus = function(){
        _searchInput.ClearFocus();
    }
    
    this.GetCursorLine = function(){
        return _searchInput.GetCursorLine();
    }
    
    this.GetCursorPos = function(){
        return _searchInput.GetCursorPos();
    }
    
    this.GetHtml = function(){
        return _searchInput.GetHtml();
    }
    
    this.GetSelectedText = function(){
        return _searchInput.GetSelectedText();
    }
    
    this.GetSelectionEnd = function(){
        return _searchInput.GetSelectionEnd();
    }
    
    this.GetSelectionStart = function(){
        return _searchInput.GetSelectionStart();
    }
    
    this.GetText = function(){
        _searchInput.GetText();
    }
    
    this.GetVisibility = function(){
        return _search.GetVisibility();
    }
    
    this.GetType = function(){
        return 'SearchBar';
    }
    
    this.Gone = function(){
        _search.Gone();
    }
    
    this.Hide = function(){
        _search.Hide();
    }
    
    this.InsertText = function(text, start){
        _searchInput.InsertItem(text, start);
    }
    
    this.IsOverlap = function(){
        return _search.IsOverlap();
    }
    
    this.SetEnabled = function(bool){
        _search.SetEnabled(bool);
    }
    
    this.SetHtml = function(html){
        _searchInput.SetHtml(html);
    }
    
    this.SetOnChange = function(onChange){
        _searchInput.SetOnChange(onChange)
    }
    
    this.SetOnEnter = function(onEnter){
        _searchInput.SetOnEnter(onEnter);
    }
    
    this.SetOnFocus = function(onFocus){
        _searchInput.SetOnFocus(onFocus);
    }
    
    this.SetOnTouch = function(onTouch){
        this.onTouch = onTouch;
    }
    
    this.SetText = function(text){
        _searchInput.SetText(text);
    }
    
    this.SetVisibility = function(mode){
        _search.SetVisibility(mode);
    }
    
    this.Show = function(){
        _search.Show();
    }
    
    this.Tween = function(target, duration, type, repeat, yoyo, callback){
        _search.Tween(target, duration, type, repeat, yoyo, callback);
    }
    
    this.SetMargins = function(left, top, right, bottom, mode){
        //.SetMargins(left, top, right, bottom, mode);
    }
    if (parentLayout){
        drawSearchBar(leadingIcon, trailingIcon, hint, width, parentLayout, this);
    }
    else warnDeveloper('You didnt add a parent to the search component',
    'Add parent To SearchBar');
}

function drawSearchBar(leadingIcon, trailingIcon, hint, width, parentLayout, searchObj) {
    const imageFileTypes = ['jpg','png','jpeg','ico','tiff']
    
    const searchBarType = (trailingIcon) => {
        if (trailingIcon.includes(',')) {
            const firstTrailingIcon = trailingIcon.split(',')[0];
            const secondTrailingIcon = trailingIcon.split(',')[1];
            
            if (imageFileTypes.includes(secondTrailingIcon)) {
                return {
                    firstTrailingIcon,
                    secondTrailingIcon,
                    barType: 'WithAvatar&Icon'
                };
            } else {
                return {
                    firstTrailingIcon,
                    secondTrailingIcon,
                    barType: 'WithTwoIcons'
                };
            }
        }else {
            /* If TrailingIcon doesn't have a comma test if it's either:
            WithAvatar
            WithIcon
            */
            
            if (imageFileTypes.includes(trailingIcon)) {
                return {
                    trailingIcon,
                    barType: 'WithAvatar'
                };
            }
            else {
                return {
                    barType: 'WithIcon'
                };
            }
        }
    }

    const searchType = searchBarType(trailingIcon); 

    switch (searchType.barType) {
        case 'WithIcon':
            drawSearchWithIcon();
            break;
        case 'WithAvatar':
            drawSearchWithAvatar();
            break;
        case 'WithTwoIcons':
            drawSearchWithTwoIcons(searchType.firstTrailingIcon, searchType.secondTrailingIcon);
            break;
        case 'WithAvatar&Icon':
            drawSearchWithAvatarIcon(searchType.firstTrailingIcon, searchType.secondTrailingIcon);
            break; 
    }
    
    
    function drawSearchWithIcon() {
        let _search, _searchContainer, _leadingIcon, _searchInput, _trailingIcon;
        
        let _iconRadius = 50/100 * 34;
        let _searchBarWidth = function(){
            if (dsUnitsToDp(width,'w') < 144){
                warnDeveloper(`SearchBar Width Cant Be Less Than \n
                0.4 dsUnits or 144 dp.\n
                So Have Been Set To 0.4 !`,'SearchBar Width Cant Be Less Than 0.4. Check Debug Log');
                return 144;
            }
            else {
                return dsUnitsToDp(width,'w');
            }
        }
        let _searchInputWidth = function(){
            return dsUnitsToDp(width,'w') - 128;
        }
        _search = app.AddLayout(parentLayout, 'Card');
        _search.SetCornerRadius(36)
        _search.SetSize(_searchBarWidth(), 56, 'dp')
        _search.SetBackColor(searchBarClr.value);
        
        _searchContainer = app.AddLayout(_search, 'Linear','Horizontal,Left')
        _leadingIcon = app.AddButton(_searchContainer, leadingIcon, null, null, 'Custom,Lego');
        _leadingIcon.SetSize(34, 34, 'dp');
        _leadingIcon.SetTextSize(24)
        _leadingIcon.SetTextColor(searchBarTextClr.value)
        _leadingIcon.SetStyle(searchBarIconClr.value,searchBarIconClr.value,_iconRadius,null,null,0);
        _leadingIcon.SetFontFile(defaultIcons)
        _leadingIcon.SetMargins(16,13,16,null,'dp')
        
        _searchInput = app.AddTextEdit(_searchContainer, '', null,null,'Singleline,Left')
        _searchInput.SetBackColor(searchBarClr.value)
        _searchInput.SetMargins(null,8,null,null,'dp')
        _searchInput.SetSize(_searchInputWidth(), -1, 'dp');
        _searchInput.SetTextColor(searchBarInputTextClr.value);
        
        
        
        if(hint !== null){
            _searchInput.SetHint(hint);
        }
        
        
        _trailingIcon = app.AddButton(_searchContainer, trailingIcon, null, null, 'Custom,Lego');
        _trailingIcon.SetSize(34, 34, 'dp');
        _trailingIcon.SetTextSize(24)
        _trailingIcon.SetTextColor(searchBarTextClr.value)
        _trailingIcon.SetStyle(searchBarIconClr.value,searchBarIconClr.value,_iconRadius,null,null,0);
        _trailingIcon.SetFontFile(defaultIcons)
        _trailingIcon.SetMargins(16,13,16,null,'dp')
        
        //SetOnTouch Implementation
        _leadingIcon.SetOnTouch(function(){
            if(searchObj.onTouch){
                M(this, searchObj.onTouch(leadingIcon))
        
            }
        });
        
        _trailingIcon.SetOnTouch(function(){
            if(searchObj.onTouch){
                M(this, searchObj.onTouch(trailingIcon))
            }
        });
        
        searchBarClr.subscribe((value)=>{
            _search.SetBackColor(value);
            _searchInput.SetBackColor(value)
        })
        
        searchBarIconClr.subscribe((value)=>{
            _leadingIcon.SetStyle(value,value,_iconRadius,null,null,0);
            _trailingIcon.SetStyle(value,value,_iconRadius,null,null,0);
        })
        
        searchBarTextClr.subscribe((value)=>{
            _leadingIcon.SetTextColor(value);
            _trailingIcon.SetTextColor(value)
        })
        
        searchBarInputTextClr.subscribe((value)=>{
            _searchInput.SetTextColor(value);
        })
        
    }
    
    function drawSearchWithAvatar() {
        let _search, _searchContainer, _leadingIcon, _searchInput, _trailingIcon, _trailingLay;
        
        let _iconRadius = 50/100 * 34;
        let _searchBarWidth = function(){
            if (dsUnitsToDp(width,'w') < 144){
                warnDeveloper(`SearchBar Width Cant Be Less Than \n
                0.4 dsUnits or 144 dp.\n
                So Have Been Set To 0.4 !`,'SearchBar Width Cant Be Less Than 0.4. Check Debug Log');
                return 144;
            }
            else {
                return dsUnitsToDp(width,'w');
            }
        }
        let _searchInputWidth = function(){
            return dsUnitsToDp(width,'w') - 128;
        }
        _search = app.AddLayout(parentLayout, 'Card');
        _search.SetCornerRadius(36)
        _search.SetSize(_searchBarWidth(), 56, 'dp')
        _search.SetBackColor(searchBarClr.value);
        
        _searchContainer = app.AddLayout(_search, 'Linear','Horizontal,Left')
        _leadingIcon = app.AddButton(_searchContainer, leadingIcon, null, null, 'Custom,Lego');
        _leadingIcon.SetSize(34, 34, 'dp');
        _leadingIcon.SetTextSize(24)
        _leadingIcon.SetTextColor(searchBarTextClr.value)
        _leadingIcon.SetStyle(searchBarIconClr.value,searchBarIconClr.value,_iconRadius,null,null,0);
        _leadingIcon.SetFontFile(defaultIcons)
        _leadingIcon.SetMargins(16,13,16,null,'dp')
        
        _searchInput = app.AddTextEdit(_searchContainer, '', null,null,'Singleline,Left')
        _searchInput.SetBackColor(searchBarClr.value)
        _searchInput.SetMargins(null,8,null,null,'dp')
        _searchInput.SetSize(_searchInputWidth(), -1, 'dp');
        _searchInput.SetTextColor(searchBarInputTextClr.value);
        
        if(hint !== null){
            _searchInput.SetHint(hint);
        }
        
        //Check If Image File Exists And If Not Dont Procced
        if (!app.FileExists(trailingIcon)){
            warnDeveloper(`The Avatar ${trailingIcon}, Does Not Exist`,'Search Avatar Not Found');
            return
        }
        
        else{
        _trailingLay = app.AddLayout(_searchContainer,'Card');
        _trailingLay.SetCornerRadius(15)
        _trailingIcon = app.AddImage(_trailingLay, trailingIcon, null, null,'async')
        _trailingIcon.SetSize(30, 30, 'dp');
        _trailingLay.SetMargins(16,13,16,null,'dp')
        }
        _leadingIcon.SetOnTouch(function(){
            if(searchObj.onTouch){
                M(this, searchObj.onTouch(leadingIcon))
                }
        });
        
        _trailingIcon.SetOnTouchDown(function(){
            if(searchObj.onTouch){
                M(this,searchObj.onTouch('avatar'))
            }
        });
        searchBarClr.subscribe((value)=>{
            _search.SetBackColor(value);
            _searchInput.SetBackColor(value)
        })
        
        searchBarIconClr.subscribe((value)=>{
            _leadingIcon.SetStyle(value,value,_iconRadius,null,null,0);
            _trailingIcon.SetStyle(value,value,_iconRadius,null,null,0);
        })
        
        searchBarTextClr.subscribe((value)=>{
            _leadingIcon.SetTextColor(value);
            _trailingIcon.SetTextColor(value)
        })
        
        searchBarInputTextClr.subscribe((value)=>{
            _searchInput.SetTextColor(value);
        })
    }
    
    function drawSearchWithTwoIcons(firstTrailingIcon, secondTrailingIcon) {
        let _search, _searchContainer, _leadingIcon, _searchInput, _firstTrailingIcon,
        _secondTrailingIcon;
        let _iconRadius = 50/100 * 34;
        let _searchBarWidth = function(){
            if (dsUnitsToDp(width,'w') < 144){
                warnDeveloper(`SearchBar Width Cant Be Less Than \n
                0.4 dsUnits or 144 dp.\n
                So Have Been Set To 0.4 !`,'SearchBar Width Cant Be Less Than 0.4. Check Debug Log');
                return 144;
            }
            else {
                return dsUnitsToDp(width,'w');
            }
        }
        let _searchInputWidth = function(){
            return dsUnitsToDp(width,'w') - 176;
        }
        
        _search = app.AddLayout(parentLayout, 'Card');
        _search.SetCornerRadius(36)
        _search.SetSize(_searchBarWidth(), 56, 'dp')
        _search.SetBackColor(searchBarClr.value);
        
        _searchContainer = app.AddLayout(_search, 'Linear','Horizontal,Left')
        _leadingIcon = app.AddButton(_searchContainer, leadingIcon, null, null, 'Custom,Lego');
        _leadingIcon.SetSize(34, 34, 'dp');
        _leadingIcon.SetTextSize(24)
        _leadingIcon.SetTextColor(searchBarTextClr.value)
        _leadingIcon.SetStyle(searchBarIconClr.value,searchBarIconClr.value,_iconRadius,null,null,0);
        _leadingIcon.SetFontFile(defaultIcons)
        _leadingIcon.SetMargins(16,13,16,null,'dp')
        
        _searchInput = app.AddTextEdit(_searchContainer, '', null,null,'Singleline,Left')
        _searchInput.SetBackColor(searchBarClr.value)
        _searchInput.SetMargins(null,8,null,null,'dp')
        _searchInput.SetSize(_searchInputWidth(), -1, 'dp');
        _searchInput.SetTextColor(searchBarInputTextClr.value);
        
        if(hint !== null){
            _searchInput.SetHint(hint);
        }
        
        
        _firstTrailingIcon = app.AddButton(_searchContainer, firstTrailingIcon, null, null, 'Custom,Lego');
        _firstTrailingIcon.SetSize(34, 34, 'dp');
        _firstTrailingIcon.SetTextSize(24)
        _firstTrailingIcon.SetTextColor(searchBarTextClr.value)
        _firstTrailingIcon.SetStyle(searchBarIconClr.value,searchBarIconClr.value,_iconRadius,null,null,0);
        _firstTrailingIcon.SetFontFile(defaultIcons)
        _firstTrailingIcon.SetMargins(16,13,8,null,'dp')
        
        _secondTrailingIcon = app.AddButton(_searchContainer, secondTrailingIcon, null, null, 'Custom,Lego');
        _secondTrailingIcon.SetSize(34, 34, 'dp');
        _secondTrailingIcon.SetTextSize(24)
        _secondTrailingIcon.SetTextColor(searchBarTextClr.value)
        _secondTrailingIcon.SetStyle(searchBarIconClr.value,searchBarIconClr.value,_iconRadius,null,null,0);
        _secondTrailingIcon.SetFontFile(defaultIcons)
        _secondTrailingIcon.SetMargins(null,13,16,null,'dp')
        
        //SetOnTouch Implementation
        _leadingIcon.SetOnTouch(function(){
            if(searchObj.onTouch){
                M(this,searchObj.onTouch(leadingIcon))
            }
        });
        
        _firstTrailingIcon.SetOnTouch(function(){
            if(searchObj.onTouch){
                M(this, searchObj.onTouch(firstTrailingIcon))
            }
        });
        
         _secondTrailingIcon.SetOnTouch(function(){
            if(searchObj.onTouch){
                M(this,searchObj.onTouch(secondTrailingIcon))
            }
        });
        
        searchBarClr.subscribe((value)=>{
            _search.SetBackColor(value);
            _searchInput.SetBackColor(value)
        })
        
        searchBarIconClr.subscribe((value)=>{
            _leadingIcon.SetStyle(value,value,_iconRadius,null,null,0);
            _firstTrailingIcon.SetStyle(value,value,_iconRadius,null,null,0);
            _secondTrailingIcon.SetStyle(value,value,_iconRadius,null,null,0);
        })
        
        searchBarTextClr.subscribe((value)=>{
            _leadingIcon.SetTextColor(value);
            _firstTrailingIcon.SetTextColor(value)
             _secondTrailingIcon.SetTextColor(value)
        })
        
        searchBarInputTextClr.subscribe((value)=>{
            _searchInput.SetTextColor(value);
        })
        
    }
    
    function drawSearchWithAvatarIcon(firstTrailingIcon, secondTrailingIcon) {
        
    
        let _iconRadius = 50/100 * 34;
        let _searchBarWidth = function(){
            if (dsUnitsToDp(width,'w') < 144){
                warnDeveloper(`SearchBar Width Cant Be Less Than \n
                0.4 dsUnits or 144 dp.\n
                So Have Been Set To 0.4 !`,'SearchBar Width Cant Be Less Than 0.4. Check Debug Log');
                return 144;
            }
            else {
                return dsUnitsToDp(width,'w');
            }
        }
        let _searchInputWidth = function(){
            return dsUnitsToDp(width,'w') - 178;
        }
        
        
        
        _search = app.AddLayout(parentLayout, 'Card');
        _search.SetCornerRadius(36)
        _search.SetSize(_searchBarWidth(), 56, 'dp')
        _search.SetBackColor(searchBarClr.value);
        
        _searchContainer = app.AddLayout(_search, 'Linear','Horizontal,Left')
        _leadingIcon = app.AddButton(_searchContainer, leadingIcon, null, null, 'Custom,Lego');
        _leadingIcon.SetSize(34, 34, 'dp');
        _leadingIcon.SetTextSize(24)
        _leadingIcon.SetTextColor(searchBarTextClr.value)
        _leadingIcon.SetStyle(searchBarIconClr.value,searchBarIconClr.value,_iconRadius,null,null,0);
        _leadingIcon.SetFontFile(defaultIcons)
        _leadingIcon.SetMargins(16,13,16,null,'dp')
        
        _searchInput = app.AddTextEdit(_searchContainer, '', null,null,'Singleline,Left')
        _searchInput.SetBackColor(searchBarClr.value)
        _searchInput.SetMargins(null,8,null,null,'dp')
        _searchInput.SetSize(_searchInputWidth(), -1, 'dp');
        _searchInput.SetTextColor(searchBarInputTextClr.value);
        
        if(hint !== null){
            _searchInput.SetHint(hint);
        }
        
        _trailingIcon = app.AddButton(_searchContainer, firstTrailingIcon, null, null, 'Custom,Lego');
        _trailingIcon.SetSize(34, 34, 'dp');
        _trailingIcon.SetTextSize(24)
        _trailingIcon.SetTextColor(searchBarTextClr.value)
        _trailingIcon.SetStyle(searchBarIconClr.value,searchBarIconClr.value,_iconRadius,null,null,0);
        _trailingIcon.SetFontFile(defaultIcons)
        _trailingIcon.SetMargins(16,13,8,null,'dp')
        
        _avatarLay = app.AddLayout(_searchContainer,'Card');
        _avatarLay.SetCornerRadius(15)
        _avatarIcon = app.AddImage(_avatarLay, secondTrailingIcon, null, null,'async')
        _avatarIcon.SetSize(30, 30, 'dp');
        _avatarLay.SetMargins(0,13,16,null,'dp')
        
        //SetOnTouch Implementation
        _leadingIcon.SetOnTouch(function(){
            if(searchObj.onTouch){
                M(this, searchObj.onTouch(leadingIcon))
                //searchObj.onTouch(leadingIcon);
            }
        });
        
        _trailingIcon.SetOnTouch(function(){
            if(searchObj.onTouch){
                M(this, searchObj.onTouch(firstTrailingIcon))
                //searchObj.onTouch(firstTrailingIcon);
            }
        });
        
        
        _avatarIcon.SetOnTouchDown(function(){
            if(searchObj.onTouch){
                M(this,searchObj.onTouch('avatar'))
                //searchObj.onTouch('avatar');
            }
        });
    searchBarClr.subscribe((value)=>{
            _search.SetBackColor(value);
            _searchInput.SetBackColor(value)
        })
        
        searchBarIconClr.subscribe((value)=>{
            _leadingIcon.SetStyle(value,value,_iconRadius,null,null,0);
            _firstTrailingIcon.SetStyle(value,value,_iconRadius,null,null,0);
            _secondTrailingIcon.SetStyle(value,value,_iconRadius,null,null,0);
        })
        
        searchBarTextClr.subscribe((value)=>{
            _leadingIcon.SetTextColor(value);
            _firstTrailingIcon.SetTextColor(value)
             _secondTrailingIcon.SetStyle(value,value,_iconRadius,null,null,0);
        })
        
        searchBarInputTextClr.subscribe((value)=>{
            _searchInput.SetTextColor(value);
        })
    }
}

function secTabObject(listOfTabs, width, height, options, parentLay) {
    let _secondaryTab;
    
    this.SetMargins = function(left,top,right,bottom,mode){
        _secondaryTab.SetMargins(left,top,right,bottom,mode)
    }
    
    this.SetPosition = function(left, top, width, height, options){
        _secondaryTab.SetPosition(left, top, width, height, options);
    }
    this.Gone = function(){
        _secondaryTab.Gone();
    }
    
    this.SetVisibility = function(mode){
        _secondaryTab.SetVisibility(mode)
    }
    if (!parentLay) {
        warnDeveloper('No Parent To Tab', 'No Parent To Tab');
    } 
    else {
        _secondaryTab = drawSecondaryTabs(listOfTabs, width, height, options, parentLay);
    }
}

function drawSecondaryTabs(listOfTabs, width, height, options, parentLay){
    let __activeTab;
    
    let qaudTween = 'Quadratic.In';
    let linTween = 'Linear.None'
    let __tabCount = listOfTabs.split(',').length;
    
    const noOfTabs = (listOfTabs) =>{
        if(__tabCount >= 1 && __tabCount <= 3){
           __firstTab = listOfTabs.split(',')[0];
           __secondTab = listOfTabs.split(',')[1], 
           __thirdTab = listOfTabs.split(',')[2]
        }
        else {
            warnDeveloper(`You must have 2 or more tabs`);
            return;
        }
    }
    
    noOfTabs(listOfTabs);
    
    let __secondaryMain = app.AddLayout(parentLay, 'Linear','Vertical')
    __secondaryMain.SetSize(width, height);
   
    
    let __secondaryTab = app.AddLayout(__secondaryMain, 'Card','Vertical');
    __secondaryTab.SetMargins(0,0,0,null);
    __secondaryTab.SetSize(pxToDpConversion(DW()), 48, 'dp');
    __secondaryTab.SetBackColor(secondaryTabClr.value);
    
    let __secTabInnerTab = app.AddLayout(__secondaryTab, 'Absolute','Vertical,Left')
    __secTabInnerTab.SetSize(pxToDpConversion(DW()), 48, 'dp');
    __secTabInnerTab.SetBackColor(secondaryTabClr.value);
    
    __secTabInnerLay = app.AddLayout(__secTabInnerTab, 'Linear','Horizontal');
    __secTabInnerLay.SetSize(pxToDpConversion(DW()), 46, 'dp');
    __secTabInnerLay.SetBackColor(secondaryTabClr.value);
    
    // By default active tab is the first
    
    if (__tabCount == 2){
        if(!__activeTab) {
            __firstTabActive = true;
        }
        
        let __firstTabBtn = app.AddButton(__secTabInnerLay, __firstTab,null,null, 'Custom');
        __firstTabBtn.SetTextColor(secondaryTabTxtClr.value)
        __firstTabBtn.SetStyle(secondaryTabClr.value,secondaryTabClr.value,0,null,null,0)
    
        __firstTabBtn.SetSize(pxToDpConversion(DW())/2,46,'dp')
        __firstTabBtn.SetMargins(0,0,0)
        
        __secondTabBtn = app.AddButton(__secTabInnerLay, __secondTab, 0.5, -1, 'NoPad,Custom');
        __secondTabBtn.SetTextColor(secondaryTabTxtClr.value)
        __secondTabBtn.SetStyle(secondaryTabClr.value,secondaryTabClr.value,0,null,null,0)
        
        __secondTabBtn.SetSize(pxToDpConversion(DW())/2,46,'dp')
        
        lightStrip = app.AddText(__secTabInnerTab,'',null, null,'Wrap')
        lightStrip.SetSize(pxToDpConversion(DW())/2,2,'dp')
        lightStrip.SetBackColor(lightBarClr.value) 
        
        
        const tweenValues = ()=>{
            if(__firstTabActive) return { x: 0.0, y: dpToDsUnit(46) };
            else return { x: 0.5, y: dpToDsUnit(46) };
        }
        
        const lightStripPower = (x) =>{
            /* If We Booted It Shouldnt AppparentLay An Animation */
            
            if(x) lightStrip.SetPosition(0,dpToDsUnit(46),null,null);
            else{
                if(__firstTabActive === true && x === undefined) lightStrip.Tween(tweenValues() ,250,linTween,false,null) 
                else lightStrip.Tween(tweenValues() ,350,qaudTween,false,null) 
            }
        }
        
        lightStripPower(true);
        
        __firstTabBtn.SetOnTouch(()=>{
            if(!__firstTabActive) {
                __firstTabActive = true;
                lightStripPower();
                activeTabLayoutSwitch();
            }
        });
        
        __secondTabBtn.SetOnTouch(()=>{
            if(__firstTabActive) {
                __firstTabActive = false;
                lightStripPower();
                activeTabLayoutSwitch();
            }
        })
        
        /* Add Tab Specific Layouts */
        
        __secondaryLayJacket = app.AddLayout(__secondaryMain, 'Frame', 'Horizontal')
        
        __firstTabLay = ui.createLayout(layoutType, options, width, 
        height - dpToDsUnit(48,'h'), __secondaryLayJacket)
        
        __secondTabLay = ui.createLayout(layoutType, options, width,
        height - dpToDsUnit(48,'h'), __secondaryLayJacket)
        
        
        /* If firstTabActive first layout shows and vice versa */
        
        const activeTabLayoutSwitch = (x) =>{
            if (x) __firstTabLay.Show() || __secondTabLay.Hide();
            else{
            if (__firstTabActive === true && x === undefined){
                __firstTabLay.Animate('SlideFromLeft',null,350) || __secondTabLay.Hide();
            }
            else {
                __firstTabLay.Hide() || __secondTabLay.Animate('SlideFromRight',null,350);
                }
            }
        }
        
        activeTabLayoutSwitch(true);
        
        secTabObject.prototype.SetActiveTab = function(index){
            setTab(index);
        }
        
        const setTab = (index)=>{
            if(__firstTabActive && index == 0) return;
            if(index == 0){
                __firstTabActive = true
                __secondTabLay.Hide() || __firstTabLay.Animate('SlideFromLeft',null,350) 
            }
            if(index == 1){
                 __firstTabActive = false
                __firstTabLay.Hide() || __secondTabLay.Animate('SlideFromLeft',null,350)
            }
            lightStripPower();
        }
    secondaryTabClr.subscribe((value)=>{
        __secTabInnerTab.SetBackColor(value)
        __secTabInnerLay.SetBackColor(value);
        __firstTabBtn.SetStyle(value,value,0,null,null,0)
        __secondTabBtn.SetStyle(value,value,0,null,null,0)
    }) 
    
    secondaryTabTxtClr.subscribe((value)=>{
        __firstTabBtn.SetTextColor(value)
        __secondTabBtn.SetTextColor(value)
    })
    
    lightBarClr.subscribe((value)=>{
        lightStrip.SetBackColor(value) 
    })
    
    }
    
    else {
        /* We use an almost ternary system */
        if(!__activeTab) {
            __firstTabActive = 0;
        }
        
        __firstTabBtn = app.AddButton(__secTabInnerLay, __firstTab,null,null, 'Custom,NoPad');
        __firstTabBtn.SetTextColor(secondaryTabTxtClr.value)
        __firstTabBtn.SetStyle(secondaryTabClr.value,secondaryTabClr.value,0,null,null,0)
        __firstTabBtn.SetSize(pxToDpConversion(DW())/3,46,'dp')
        __firstTabBtn.SetMargins(0,0,0)
        
        __secondTabBtn = app.AddButton(__secTabInnerLay, __secondTab, null, null, 'Custom,NoPad');
        __secondTabBtn.SetTextColor(secondaryTabTxtClr.value)
        __secondTabBtn.SetStyle(secondaryTabClr.value,secondaryTabClr.value,0,null,null,0)
        __secondTabBtn.SetSize(pxToDpConversion(DW())/3,46,'dp')
        
        __thirdTabBtn = app.AddButton(__secTabInnerLay, __thirdTab, null, null, 'Custom,NoPad');
        __thirdTabBtn.SetTextColor(secondaryTabTxtClr.value)
        __thirdTabBtn.SetStyle(secondaryTabClr.value,secondaryTabClr.value,0,null,null,0)
        __thirdTabBtn.SetSize(pxToDpConversion(DW())/3,46,'dp')
        
        lightStrip = app.AddText(__secTabInnerTab,'',null, null)
        lightStrip.SetSize(pxToDpConversion(DW())/3,2,'dp')
        lightStrip.SetBackColor(lightBarClr.value) 
        
        
        const tweenValues = ()=>{
            if(__firstTabActive == 0) return { x: 0.0, y: dpToDsUnit(46) };
            if (__firstTabActive == 1) return { x: 0.33, y: dpToDsUnit(46) };
            else return { x: 0.7, y: dpToDsUnit(46) };
        }
        
        const lightStripPower = (x) =>{
            
            /* If We Booted It Shouldnt Apply An Animation */
            //'Quadratic.In'
            if(x) lightStrip.SetPosition(0,dpToDsUnit(46),null,null);
            
            else{
                if(__firstTabActive === 0 && x === undefined){
                    lightStrip.Tween(tweenValues() ,250,qaudTween,false,null);
                }
                if(__firstTabActive === 1) {
                    lightStrip.Tween(tweenValues() ,250,linTween,false,null);
                }
                
                else lightStrip.Tween(tweenValues() ,250,qaudTween,false,null);
            }
        }
        
        lightStripPower(true);
        
        __firstTabBtn.SetOnTouch(()=>{
            __firstTabActive = 0;
            lightStripPower();
            activeTabLayoutSwitch();
        });
        
        __secondTabBtn.SetOnTouch(()=>{
            
            __firstTabActive = 1;
            lightStripPower();
            activeTabLayoutSwitch();
        })
        
        __thirdTabBtn.SetOnTouch(()=>{
            __firstTabActive = 2;
            lightStripPower();
            activeTabLayoutSwitch();
        })
        
        /* Add Tab Specific Layouts */
        
        __secondaryLayJacket = app.AddLayout(__secondaryMain, 'Frame', 'Horizontal')
        
        __firstTabLay = ui.createLayout(layoutType, options, width, 
        height - dpToDsUnit(48,'h'), __secondaryLayJacket)
        
        __secondTabLay = ui.createLayout(layoutType, options, width,
        height - dpToDsUnit(48,'h'), __secondaryLayJacket)
        
        __thirdTabLay = ui.createLayout(layoutType, options, width,
        height - dpToDsUnit(48,'h'), __secondaryLayJacket)
        
        /* If firstTabActive first layout shows and vice versa */
        
        /* All Layouts must be hidden before animating */
        
        const activeTabLayoutSwitch = (x) =>{
            
            if (x){
                __firstTabLay.Show()
                __secondTabLay.Hide()
                __thirdTabLay.Hide();
            }
            
            else{
                
            if (__firstTabActive === 0 && x === undefined){
                __secondTabLay.Hide()
                __thirdTabLay.Hide() 
                __firstTabLay.Animate('SlideFromLeft',null,350) 
            }
            
            if(__firstTabActive === 1){
               __firstTabLay.Hide()
               __thirdTabLay.Hide()
               __secondTabLay.Animate('SlideFromLeft',null,350)
            }
            
            if(__firstTabActive === 2){
                __firstTabLay.Hide()
                __secondTabLay.Hide()
                __thirdTabLay.Animate('SlideFromRight',null,350);
            }
            }
        }
        
        activeTabLayoutSwitch(true);  
        
       
        
        secTabObject.prototype.SetActiveTab = function(index){
            setTab(index);
        }
        
        const setTab = (index)=>{
            if(index === __firstTabActive) return;
            if(index == 0){
                __firstTabActive = 0
                __secondTabLay.Hide()
                __thirdTabLay.Hide()
                __firstTabLay.Animate('SlideFromLeft',null,350) 
            }
            
            if(index == 1){
                 __firstTabActive = 1
                __firstTabLay.Hide()
                __thirdTabLay.Hide()
                __secondTabLay.Animate('SlideFromLeft',null,350)
            }
            
            if(index == 2){
                 __firstTabActive = 2
                __firstTabLay.Hide()
                __secondTabLay.Hide()
                __thirdTabLay.Animate('SlideFromRight',null,350);
            }
            
            lightStripPower();
        }
    
    secondaryTabClr.subscribe((value)=>{
         __secTabInnerTab.SetBackColor(value)
        __secondaryTab.SetBackColor(value)
        
        __secTabInnerLay.SetBackColor(value);
        __firstTabBtn.SetStyle(value,value,0,null,null,0)
        __secondTabBtn.SetStyle(value,value,0,null,null,0)
        __thirdTabBtn.SetStyle(value,value,0,null,null,0)
    }) 
    
    secondaryTabTxtClr.subscribe((value)=>{
        __firstTabBtn.SetTextColor(value)
        __secondTabBtn.SetTextColor(value)
        __thirdTabBtn.SetTextColor(value)
    })
    
    lightBarClr.subscribe((value)=>{
        lightStrip.SetBackColor(value) 
    })
    }
    
    
    
    secTabObject.prototype.GetTabLayout = function(tab){
        if (tab == __firstTab) return __firstTabLay;
        if (tab == __secondTab) return __secondTabLay;
        if (tab == __thirdTab) return __thirdTabLay;
    }
    
    return __secondaryMain;
}
