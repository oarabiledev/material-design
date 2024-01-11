var filledButtonContainer;

class filledButtonObject {
    constructor(btnName, width, height, icon, layout) {
        this.drawFilledButton(btnName, width, height, icon, layout, this)
    }
    animate(type, callback, time) {
        filledButtonContainer.Animate(type, callback, time);
    }
    setVisibility(mode) {
        filledButtonContainer.SetVisibility(mode);
    }
    setMargins(left, top, right, bottom, mode) {
        filledButtonContainer.SetMargins(left, top, right, bottom, mode);
    }
    setPadding(left, top, right, bottom, mode) {
        filledButtonContainer.SetPadding(left, top, right, bottom, mode);
    }
    setOnTouch(onTouch) {
        this.onTouch = onTouch;
    }
    setOnLongTouch(onLongTouch) {
        this.onLongTouch = onLongTouch;
    }
    tween(target, duration, type, repeat, yoyo, callback) {
        filledButtonContainer.Tween(target, duration, type, repeat, yoyo, callback);
    }
    show() {
        filledButtonContainer.Show();
    }
    hide() {
        filledButtonContainer.Hide();
    }
    drawFilledButton(btnName, width, height, icon, layout, filledObj) {
        filledButtonContainer = app.CreateLayout('Frame', 'Spy,TouchThrough');
        
        let filledBtnUi = app.CreateLayout('Card', 'FillXY');
        filledBtnUi.SetCornerRadius(20);
        filledBtnUi.SetElevation(0);
        filledBtnUi.SetSize(width, height);
        filledButtonContainer.AddChild(filledBtnUi);
        
        let filledBtnText = app.AddText(filledBtnUi, btnName, null, null, 'H/VCenter,AutoScale,NoWrap,FillXY');
        filledBtnText.SetTextColor('black');
        
        if (height === null) {
            filledBtnUi.SetSize(null, 40, 'dp');
        }
        
        if (theme === 'light') {
            filledBtnUi.SetBackColor(md_theme_light_primaryContainer);
            filledBtnText.SetTextColor(md_theme_light_onPrimaryContainer);
        } else {
            filledBtnUi.SetBackColor(md_theme_dark_primaryContainer);
            filledBtnText.SetTextColor(md_theme_dark_onPrimaryContainer);
        }
        
        layout.AddChild(filledButtonContainer);
        filledButtonContainer.SetOnTouch = filledBtnText.SetOnTouchUp;
        filledButtonContainer.SetOnLongTouch = filledBtnText.SetOnLongTouch;
        
        filledButtonContainer.SetOnLongTouch(function () {
            if (filledObj.onLongTouch) {
                filledObj.onLongTouch();
            }
        })
        
        filledButtonContainer.SetOnTouch(function () {
            const top = filledButtonContainer.GetTop();
            const left = filledButtonContainer.GetLeft();
            
            if (filledObj.onTouch) {
                filledObj.onTouch();
            }
        });
    }
}
