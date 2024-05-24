
//Force this app to portrait mode.
cfg.Portrait

//Main class for the app
class Main extends App
{
    //Called when app starts.
    onStart()
    {
        let prog,view;
        
        //Add main layout and set default child margins.
        this.layMain = ui.addLayout( "main", "linear", "Top,Center",1,1 )
        this.layMain.setBackColor('#cfd8dc')
        
        this.apb = ui.addAppBar(this.layMain, "Material Theme Builder ","Menu,Transparent",1)
        this.apb.icon = 'first_page'
        this.apb.textColor = 'black'
        this.apb.setOnMenu(function(){
            history.back();
        });
        
        //this.backBtn = ui.addButton(this.apb.layout, "back", "Icon")
        
        this.fab = ui.addFAB(this.layMain, "add", "Extended,Left","New Pallete")
        this.fab.backColor = '#81c784'
        this.fab.cornerRadius = 1
       
        
        this.fab.setOnTouch(function(){
            // Create a linear layout for the drawer.
            this.drawerLay = ui.addLayout(null, "Linear")


            this.drawer = ui.addDrawer(this.drawerLay,"Bottom",0.85)
            
            // Load Theme Builder Website & Show Progress Bar 
            
            view = ui.addWebView(this.drawerLay, 
            'https://material-foundation.github.io/material-theme-builder/',
            'IgnoreErrors',1, 1)
            
            view.hide();
            
            prog = ui.addProgress(this.drawerLay, null, "Linear,Inherit,indeterminate", 0.7)
            
            view.setOnLoad(function(){
                prog.animate('slideOutUp',450);
                setTimeout(()=>{
                    prog.destroy()
                    view.show();
                },450)
            });
            
            this.drawer.show('Bottom');
        });
    }
}