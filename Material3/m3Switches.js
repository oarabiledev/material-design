var switchux,switchValue;

//Using Var But Please Do Not Re-Assign These
//Also we can never go const value;

class switchObject{
    constructor(switchType,value,parent_Layout){
        this.drawSwitchNoIcon(value,parent_Layout,this);
        switchValue = value;  
    }
    
    // Switch Methods
    getValue(){
        /* why not using this.value to avoid an issue whereby the 
           switchValue is the same always as the preset value
        */
        return switchValue;
    }
    setOnToggle(onToggle){
        this.onToggle = onToggle;
    }
    setPosition( left, top, width, height, options){
        switchux.SetPosition( left, top, width, height, options)
    }
    setMargins(left, top, right, bottom, mode){
        switchux.SetMargins(left, top, right, bottom, mode);
    }

    
    drawSwitchNoIcon(value,parent_Layout,switchObj){
    
    /* Why am i not using a tradition switch because 
       I cannot modify its shape/trackColor/outlineShape
    */
    
    switchux = app.AddLayout(parent_Layout, 'Card')
    switchux.SetSize(52,32,'dp');
    switchux.SetElevation(0.9)
    switchux.SetCornerRadius(16)
    

    const handle = app.CreateImage(null,0.085,0.05)
	handle.DrawCircle( 0.52, 0.42, 0.30 )
	handle.SetAutoUpdate(false)
	
	handle.Hide()
	
	const handle2 = app.CreateImage(null,0.085,0.05)
	handle2.DrawCircle( 0.52, 0.42, 0.45 )
	handle2.SetAutoUpdate(false)
	handle2.SetMargins(0.052)
	handle2.Hide()
	
	if(value){
	    handle2.Show()
	    if(theme==='light'){
	        handle2.SetPaintColor(md_theme_light_onPrimary)
	        switchux.SetBackColor(md_theme_light_primaryContainer)
	    }
	    else{
	        handle2.SetPaintColor(md_theme_dark_onPrimary)
	        switchux.SetBackColor(md_theme_dark_primaryContainer)
	    }
	}
	else{
	    handle.Show()
	    handle2.Hide()
	    if(theme==='light'){
	        handle.SetPaintColor(md_theme_light_onSurfaceVariant)
	        switchux.SetBackColor(md_theme_light_surfaceVariant)
	    }
	    else{
	        handle.SetPaintColor(md_theme_dark_onSurfaceVariant)
	        switchux.SetBackColor(md_theme_dark_surfaceVariant)
	    }
	}
	
	handle.SetOnTouchUp(function(){
	       handle.Hide()
	       handle2.Show()
	       switchValue = true;
	       if(theme==='light'){
	        handle2.SetPaintColor(md_theme_light_onPrimary)
	        switchux.SetBackColor(md_theme_light_primaryContainer)
	      }
	      else{
	        handle2.SetPaintColor(md_theme_dark_onPrimary)
	        switchux.SetBackColor(md_theme_dark_primaryContainer)
	      }
	      if(switchObj.onToggle){
	          switchObj.onToggle(switchValue);
	      }
	       
	       })

	handle2.SetOnTouchUp(function(){
	       handle2.Hide()
	       handle.Show()
	       switchValue = false;
	       
	       if(theme==='light'){
	        handle.SetPaintColor(md_theme_light_onSurfaceVariant)
	        switchux.SetBackColor(md_theme_light_surfaceVariant)
	    }
	    else{
	        handle.SetPaintColor(md_theme_dark_onSurfaceVariant)
	        switchux.SetBackColor(md_theme_dark_surfaceVariant)
	    }
	    if(switchObj.onToggle){
	          switchObj.onToggle(switchValue);
	      }
})

    switchux.AddChild(handle)
    switchux.AddChild(handle2)
    
    }
    
}
