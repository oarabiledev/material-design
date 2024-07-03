
ui.css('cliBar.css')
ui.script('commandBar.js')

//Main class for the app
class Main extends App
{
  
    //Called when app starts.,""
    onStart()
    {
        
        let prog,view;
        ui.setTheme('dark')
        
        
        //Add main layout and set default child margins.
        this.layMain = ui.addLayout( "main", "linear", "Top,Center",1,1 )
        this.layMain.setBackColor('#131318')
        
        this.apb = ui.addAppBar(this.layMain, "Material Extension","Menu",1)
        this.apb.icon = 'first_page'
        this.apb.backColor = '#131318'
        this.apb.textColor = '#E4E1E9'
        
        
        this.apb.setOnMenu(function(){
            history.back();
        });
        
        this.divider = ui.addDivider(this.layMain, 0.85,'\n')
        this.divider.setMargins(null, '1.5rem')
        
        this.cliBar = ui.addCommandBar(this.layMain, 'command line & installer', 0.92, 0.2, "\n")
        this.cliBar.setMargins('1.5rem')
        
        this.fab = ui.addFAB(this.layMain, "add", "Extended,Left","Add Extension")
        this.fab.backColor = '#81c784'
        this.fab.cornerRadius = 1
       
        
        this.fab.setOnTouch(function(){
           
        });
    }
}