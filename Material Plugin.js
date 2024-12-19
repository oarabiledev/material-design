//ide.MakePlugin('Material')
app.Script('Material.js')

function OnStart(){
    
    MUISetBackColor('white'), MUIScaffoldAppTheme('light', 'outlined');
    
    const homePage = MUICreateLayout('linear', 'fillxy, vcenter')
    homePage.SetChildMargins(0, 0.05)
    
    
    let btn = MUIButton(homePage, 'Hello World', 0.8, -1, 'filled')
    btn.SetOnTouch(()=>{
       MUISnackBar('Progress Updated',0.85).Show()
    })
    
    MUIFAB(homePage, 'edit')
    
    MUIIconButton(homePage, 'bookmark', 'filled', 
    'outlined')
    
    MUIRadioButton(homePage, false)
    
    MUICheckBox(homePage, true)
    
    MUIProgressBar(homePage, 28, 0.2)
    
    MUISwitch(homePage, true)
    
    app.AddLayout(homePage)
}
