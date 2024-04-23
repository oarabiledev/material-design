![](https://drive.google.com/file/d/1JO00Je5CGrtDUP_WqEDuHQqdNfp09Mf1/view?usp=sharing)
# Material3 For Droidscript:


Here is the implementation of Material Design 3 for Droidscript,
For those who dont know Droidscript is a JS Framework that allows
Js developers to easily and speedily release apps for the android
Os.

You can go ahead and install the plugin by following the releases 
tab or go to the DroidScript Justins Store::

[Material3 Plugin](https://ds.justplayer.de/uploads/material3)

The release does not favour use of Node and Python, however in the 
next release (0.80) both environments will get their fair amount of 
documentation.


##
Here Is A Code Snippet For The Impatient::

### Working With Standard Ds && Cfg.Fast

```javascript
cfg.Fast
app.LoadPlugin('Material3')


function OnStart(){

    app.CreateMaterial3();
    
    lay = ui.createLayout('Linear','FillXY')
    
    progressLoader = ui.addProgressBar('linear',0.85,lay)
    progressLoader.SetMargins(null,0.4)
    progressLoader.SetValue(79)

    app.AddLayout(lay)
}

```

### Working With NodeJs Environment

```javascript

//Configure app to use NodeJS as the main scripting engine
//giving you the full power of Node directly in your app!
cfg.Node

//Make sure the required node modules are installed to ide.
//(This downloads modules from https://www.npmjs.com).
//ide.AddModule( "moment" )

var ui = require("Material.js")
//and that

//Called when application is started.
function OnStart()
{   
   
    app.CreateMaterial3()
    lay = ui.createLayout('Linear','FillXY',1,1)
    
    progressLoader = ui.addProgressBar('linear',0.85,lay)
    progressLoader.SetMargins(null,0.4)
    progressLoader.SetValue(79)
    
    app.AddLayout(lay)
}
```

### Working In A Python Environment

```python
import javascript
from native import app
from browser import window


def OnStart():
    javascript.import_js('Material.js',alias='ui')
    app.CreateMaterial3()
    lay = ui.createLayout('Linear','FillXY')
    
    progressLoader = ui.addProgressBar('linear',0.85,lay)
    progressLoader.SetMargins(None,0.4)
    progressLoader.SetValue(79)
    app.AddLayout(lay)
```
##

## TOP CONTRIBUTORS 🏆

__press their links to visit profiles__


### 1. Symbrsom 🥇


[Error Fixing, Helped W Making Plugin Docs,Providing Better Way To Write Code](https://github.com/alex-Symbroson)


### 2. Alan H 🥈


[Provided Structural Components For Material Components]()


### 3. CaptainStarBuck 🥉


[Advised On Structural Project Integrity]()


##


## COTACTING ME 📪

[Email : Proton](oarabilekoore@protonmail.com)

[Social : Instagram](https://www.instagram.com/oneofakind_tm/)
